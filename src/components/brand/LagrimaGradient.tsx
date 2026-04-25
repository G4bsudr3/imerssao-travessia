import { forwardRef, useEffect, useMemo, useState } from "react";
import { interpolate } from "flubber";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  spinning?: boolean;
  /** Quando true, faz o morph contínuo gota → plasma → cadeado → plasma → gota. */
  morphing?: boolean;
  className?: string;
};

/**
 * Shapes desenhadas no viewBox 100x125. O corpo do cadeado é um rounded-square
 * centralizado; o arco fica num path separado, que se "desenha" via pathLength
 * só quando estamos no estado lock (índice 3).
 *
 * Flubber faz a interpolação geométrica entre paths de topologias diferentes,
 * então não precisamos forçar mesmo número de comandos.
 */

// Gota brand (lágrima clássica)
const SHAPE_TEAR =
  "M50 6 C 60 20, 88 50, 88 80 a 38 38 0 0 1 -76 0 C 12 50, 40 20, 50 6 Z";

// Plasma A — leve "derretendo", lado direito mais cheio
const SHAPE_PLASMA_A =
  "M52 12 C 78 16, 94 40, 88 64 C 96 84, 76 112, 54 114 C 30 116, 10 96, 14 70 C 6 50, 24 22, 46 14 Z";

// Plasma B — espelhado, lado esquerdo mais cheio
const SHAPE_PLASMA_B =
  "M48 12 C 22 16, 6 40, 12 64 C 4 84, 24 112, 46 114 C 70 116, 90 96, 86 70 C 94 50, 76 22, 54 14 Z";

// Corpo do cadeado: rounded square gordinho, centralizado em ~62 (deixa espaço pro arco em cima)
const SHAPE_LOCK_BODY =
  "M50 38 C 78 38, 88 48, 88 76 C 88 104, 78 114, 50 114 C 22 114, 12 104, 12 76 C 12 48, 22 38, 50 38 Z";

// Arco/shackle do cadeado — U aberto centrado em x=50, descendo até y≈48
const LOCK_SHACKLE = "M30 48 C 30 22, 70 22, 70 48";

// Sequência narrativa: gota → plasma A → plasma B → cadeado → plasma B → plasma A → gota
const SHAPES = [
  SHAPE_TEAR,        // 0
  SHAPE_PLASMA_A,    // 1
  SHAPE_PLASMA_B,    // 2
  SHAPE_LOCK_BODY,   // 3 — momento "cadeado"
  SHAPE_PLASMA_B,    // 4
  SHAPE_PLASMA_A,    // 5
  SHAPE_TEAR,        // 6 (volta pro 0 sem salto)
];

// Duração de cada transição (segundos). Pausa adicional dentro do estado cadeado.
const SEGMENT_DURATION = 1.6;
const LOCK_HOLD = 1.4;

export const LagrimaGradient = forwardRef<SVGSVGElement, Props>(function LagrimaGradient(
  { size = 200, spinning = false, morphing = false, className },
  ref,
) {
  const reduce = useReducedMotion();
  const animateMorph = morphing && !reduce;

  // Index "fluido" de 0 a SHAPES.length-1 — flubber interpola entre os shapes adjacentes
  const progress = useMotionValue(0);

  // Pré-computa interpoladores entre cada par adjacente (mais performático)
  const interpolators = useMemo(() => {
    return SHAPES.slice(0, -1).map((from, i) =>
      interpolate(from, SHAPES[i + 1], { maxSegmentLength: 2 }),
    );
  }, []);

  const path = useTransform(progress, (v) => {
    if (!animateMorph) return SHAPES[0];
    const idx = Math.min(Math.floor(v), interpolators.length - 1);
    const t = v - idx;
    return interpolators[idx](t);
  });

  // Estado pra controlar o arco do cadeado (aparece só perto do shape 3)
  const [shackleVisible, setShackleVisible] = useState(false);

  useEffect(() => {
    if (!animateMorph) return;

    let cancelled = false;

    const runCycle = async () => {
      while (!cancelled) {
        // 0 → 3 (gota até o cadeado)
        for (let i = 0; i < 3; i++) {
          if (cancelled) return;
          await animate(progress, i + 1, { duration: SEGMENT_DURATION, ease: [0.65, 0, 0.35, 1] }).then();
        }
        // chegou no cadeado: revela o arco (cresce desenhando)
        if (cancelled) return;
        setShackleVisible(true);
        await new Promise((r) => setTimeout(r, LOCK_HOLD * 1000));
        // some o arco antes de voltar a derreter
        if (cancelled) return;
        setShackleVisible(false);
        await new Promise((r) => setTimeout(r, 350));
        // 3 → 6 (volta pra gota passando pelos plasmas)
        for (let i = 3; i < SHAPES.length - 1; i++) {
          if (cancelled) return;
          await animate(progress, i + 1, { duration: SEGMENT_DURATION, ease: [0.65, 0, 0.35, 1] }).then();
        }
        // volta o motionValue pro início sem animar (sem salto visual: shape 6 === shape 0)
        progress.set(0);
        // pausa respirando antes do próximo ciclo
        await new Promise((r) => setTimeout(r, 1200));
      }
    };

    runCycle();
    return () => {
      cancelled = true;
    };
  }, [animateMorph, progress, interpolators]);

  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size * 1.25}
      viewBox="0 0 100 125"
      className={cn(spinning && !morphing && "animate-tear-spin", className)}
      aria-hidden
      // Camadas secundárias: rotação muito sutil + breathing (só quando morphing)
      animate={
        animateMorph
          ? { rotate: [-2, 2, -2], scale: [0.985, 1.015, 0.985] }
          : undefined
      }
      transition={
        animateMorph
          ? {
              rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }
          : undefined
      }
      style={{ transformOrigin: "50px 65px" }}
    >
      <defs>
        <linearGradient id="tearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fe7b02">
            {animateMorph && (
              <animate
                attributeName="offset"
                values="0;0.05;0"
                dur="6s"
                repeatCount="indefinite"
              />
            )}
          </stop>
          <stop offset="50%" stopColor="#f756a6">
            {animateMorph && (
              <animate
                attributeName="offset"
                values="0.5;0.55;0.5"
                dur="6s"
                repeatCount="indefinite"
              />
            )}
          </stop>
          <stop offset="100%" stopColor="#6f77fc" />
        </linearGradient>
      </defs>

      {/* Forma principal: gota / plasma / corpo do cadeado */}
      {animateMorph ? (
        <motion.path d={path} fill="url(#tearGrad)" />
      ) : (
        <path d={SHAPES[0]} fill="url(#tearGrad)" />
      )}

      {/* Arco do cadeado — só aparece no estado lock, com efeito de desenhar */}
      {animateMorph && (
        <motion.path
          d={LOCK_SHACKLE}
          fill="none"
          stroke="url(#tearGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            shackleVisible
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={
            shackleVisible
              ? { pathLength: { duration: 0.6, ease: "easeOut", delay: 0.1 }, opacity: { duration: 0.2 } }
              : { pathLength: { duration: 0.35, ease: "easeIn" }, opacity: { duration: 0.25, delay: 0.1 } }
          }
        />
      )}
    </motion.svg>
  );
});
