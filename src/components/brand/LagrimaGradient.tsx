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
  /** Quando true, faz o morph contínuo gota → gosma → cadeado → gosma → gota. */
  morphing?: boolean;
  className?: string;
};

/**
 * viewBox 100x125. Sequência: gota → drip (gota esticada) → blob (amoeba) →
 * plasma (assimétrico) → corpo do cadeado → plasma → blob → drip → gota.
 *
 * Filtro goo (metaball) liga nos frames intermediários pra dar viscosidade real.
 * Cadeado tem corpo + shackle (arco grosso) + keyhole (vão da chave).
 */

// 0/8 — Gota brand clássica
const SHAPE_TEAR =
  "M50 6 C 60 20, 88 50, 88 80 a 38 38 0 0 1 -76 0 C 12 50, 40 20, 50 6 Z";

// 1/7 — Drip: gota esticada verticalmente, com afunilamento mais agressivo no topo
const SHAPE_DRIP =
  "M50 4 C 56 24, 86 56, 86 84 C 86 104, 70 118, 50 118 C 30 118, 14 104, 14 84 C 14 56, 44 24, 50 4 Z";

// 2/6 — Blob: amoeba assimétrica, dois lóbulos (esquerdo mais alto, direito mais largo)
const SHAPE_BLOB =
  "M48 10 C 70 8, 96 30, 88 56 C 100 78, 80 116, 56 114 C 28 118, 6 98, 14 70 C 0 48, 22 18, 48 10 Z";

// 3/5 — Plasma: forma intermediária mais redonda, prepara entrada no cadeado
const SHAPE_PLASMA =
  "M50 16 C 76 16, 90 36, 88 62 C 92 86, 76 110, 50 110 C 24 110, 8 86, 12 62 C 10 36, 24 16, 50 16 Z";

// 4 — Corpo do cadeado: PROPORÇÃO VERTICAL (62 largura × 70 altura), ombros levemente
// achatados em cima onde o shackle entra, base com cantos generosos
const SHAPE_LOCK_BODY =
  "M50 46 C 62 46, 70 47, 76 52 C 81 58, 82 66, 82 80 C 82 100, 76 114, 50 114 C 24 114, 18 100, 18 80 C 18 66, 19 58, 24 52 C 30 47, 38 46, 50 46 Z";

// Sequência completa (9 frames, simétrica)
const SHAPES = [
  SHAPE_TEAR,        // 0
  SHAPE_DRIP,        // 1
  SHAPE_BLOB,        // 2
  SHAPE_PLASMA,      // 3
  SHAPE_LOCK_BODY,   // 4 — momento cadeado
  SHAPE_PLASMA,      // 5
  SHAPE_BLOB,        // 6
  SHAPE_DRIP,        // 7
  SHAPE_TEAR,        // 8 (volta pro 0 sem salto)
];

// Quais frames são "gosmentos" (filtro goo ativo, easing squishy)
const GOOEY_FRAMES = new Set([1, 2, 3, 5, 6, 7]);
// Frame do cadeado
const LOCK_FRAME = 4;

// Shackle (arco do cadeado): U aberto descendo até y≈48, encaixando dentro do corpo
const LOCK_SHACKLE = "M30 50 C 30 24, 70 24, 70 50";

// Easing por contexto
const EASE_SQUISHY: [number, number, number, number] = [0.6, -0.05, 0.4, 1.05];
const EASE_FIRM: [number, number, number, number] = [0.34, 1.4, 0.64, 1];

// Durações
const DURATION_GOOEY = 1.2;     // trechos gosmentos: mais fluidos
const DURATION_TO_LOCK = 1.6;   // entrada/saída do cadeado: mais peso
const LOCK_HOLD = 1.8;          // tempo parado no cadeado
const CYCLE_PAUSE = 1.2;        // respiro entre ciclos

export const LagrimaGradient = forwardRef<SVGSVGElement, Props>(function LagrimaGradient(
  { size = 200, spinning = false, morphing = false, className },
  ref,
) {
  const reduce = useReducedMotion();
  const animateMorph = morphing && !reduce;

  // Index "fluido" — flubber interpola entre shapes adjacentes
  const progress = useMotionValue(0);

  // Pré-computa interpoladores entre cada par adjacente
  const interpolators = useMemo(() => {
    return SHAPES.slice(0, -1).map((from, i) =>
      interpolate(from, SHAPES[i + 1], { maxSegmentLength: 2 }),
    );
  }, []);

  const path = useTransform(progress, (v) => {
    if (!animateMorph) return SHAPES[0];
    const clamped = Math.max(0, Math.min(v, SHAPES.length - 1.0001));
    const idx = Math.floor(clamped);
    const t = clamped - idx;
    return interpolators[idx](t);
  });

  // Filtro goo: intensidade vai de 0 (forma sólida) a 1 (líquido viscoso)
  const gooIntensity = useTransform(progress, (v) => {
    const clamped = Math.max(0, Math.min(v, SHAPES.length - 1));
    const idx = Math.floor(clamped);
    const t = clamped - idx;
    const weightAt = (i: number) =>
      i === 0 || i === LOCK_FRAME || i === SHAPES.length - 1 ? 0 : 1;
    const w0 = weightAt(idx);
    const w1 = weightAt(Math.min(idx + 1, SHAPES.length - 1));
    return w0 * (1 - t) + w1 * t;
  });

  // Estado do cadeado (shackle + keyhole)
  const [lockState, setLockState] = useState<"hidden" | "shackle" | "complete" | "closing">("hidden");

  // Filtro deviation animado: ZERO nos extremos (gota nítida, cadeado nítido),
  // sobe só nos frames gosmentos. Sem isso a ponta da gota fica recortada pelo threshold.
  const stdDeviation = useTransform(gooIntensity, (g) => (g * 6).toFixed(2));
  // Threshold do colorMatrix também precisa relaxar quando não há goo, senão corta bordas finas
  const gooMatrix = useTransform(gooIntensity, (g) => {
    // alpha multiplier sobe com goo (mais "metaball"), bias acompanha
    const a = 1 + g * 17; // 1 → 18
    const b = -(g * 7);   // 0 → -7
    return `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${a.toFixed(2)} ${b.toFixed(2)}`;
  });

  useEffect(() => {
    if (!animateMorph) return;

    let cancelled = false;

    const goTo = (target: number, duration: number, ease: [number, number, number, number]) =>
      animate(progress, target, { duration, ease }).finished;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms);
        return () => clearTimeout(id);
      });

    const runCycle = async () => {
      while (!cancelled) {
        // 0 → 1 → 2 → 3 (gota se transformando em gosma, depois plasma)
        for (let i = 0; i < LOCK_FRAME - 1; i++) {
          if (cancelled) return;
          await goTo(i + 1, DURATION_GOOEY, EASE_SQUISHY);
        }
        // 3 → 4 (plasma cristaliza no cadeado: easing firme com overshoot leve)
        if (cancelled) return;
        await goTo(LOCK_FRAME, DURATION_TO_LOCK, EASE_FIRM);

        // Coreografia do cadeado: shackle desenha → keyhole abre → hold
        if (cancelled) return;
        setLockState("shackle");
        await sleep(450);
        if (cancelled) return;
        setLockState("complete");
        await sleep(LOCK_HOLD * 1000);

        // Fecha cadeado: keyhole some, shackle some
        if (cancelled) return;
        setLockState("closing");
        await sleep(350);
        if (cancelled) return;
        setLockState("hidden");

        // 4 → 5 → 6 → 7 → 8 (volta a derreter pra gota)
        for (let i = LOCK_FRAME; i < SHAPES.length - 1; i++) {
          if (cancelled) return;
          const isExitFromLock = i === LOCK_FRAME;
          await goTo(
            i + 1,
            isExitFromLock ? DURATION_TO_LOCK : DURATION_GOOEY,
            isExitFromLock ? EASE_FIRM : EASE_SQUISHY,
          );
        }

        // Reset silencioso (frame 8 === frame 0)
        progress.set(0);
        await sleep(CYCLE_PAUSE * 1000);
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
        {/* Gradiente brand */}
        <linearGradient id="tearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fe7b02" />
          <stop offset="50%" stopColor="#f756a6" />
          <stop offset="100%" stopColor="#6f77fc" />
        </linearGradient>

        {/* Gradiente metalizado pro shackle (mais brilhante no topo) */}
        <linearGradient id="shackleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fec2a0" />
          <stop offset="40%" stopColor="#f756a6" />
          <stop offset="100%" stopColor="#6f77fc" />
        </linearGradient>

        {/* Filtro goo / metaball — feGaussianBlur + feColorMatrix com alta contraste de alpha.
            Quando gooIntensity = 0, o filtro vira praticamente passthrough (sem blur, sem threshold). */}
        <filter id="gooFilter" x="-30%" y="-30%" width="160%" height="160%">
          <motion.feGaussianBlur in="SourceGraphic" stdDeviation={stdDeviation} result="blur" />
          <motion.feColorMatrix
            in="blur"
            mode="matrix"
            values={gooMatrix}
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>

        {/* Mask pro keyhole — fundo branco (visível), keyhole preto (vão) */}
        <mask id="lockMask">
          <rect x="0" y="0" width="100" height="125" fill="white" />
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={
              lockState === "complete"
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              scale: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
              opacity: { duration: 0.2 },
            }}
            style={{ transformOrigin: "50px 78px" }}
          >
            {/* Círculo do buraco da chave */}
            <circle cx="50" cy="74" r="5" fill="black" />
            {/* Fenda vertical descendo */}
            <rect x="47.5" y="74" width="5" height="14" rx="1.5" fill="black" />
          </motion.g>
        </mask>
      </defs>

      {/* Forma principal (gota / gosma / corpo do cadeado) — com filtro goo aplicado nos frames intermediários */}
      <g filter="url(#gooFilter)">
        {animateMorph ? (
          <motion.path d={path} fill="url(#tearGrad)" mask="url(#lockMask)" />
        ) : (
          <path d={SHAPES[0]} fill="url(#tearGrad)" />
        )}
      </g>

      {/* Shackle do cadeado — fora do filtro goo (precisa parecer metal sólido) */}
      {animateMorph && (
        <motion.path
          d={LOCK_SHACKLE}
          fill="none"
          stroke="url(#shackleGrad)"
          strokeWidth="11"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            lockState === "shackle" || lockState === "complete"
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={
            lockState === "shackle" || lockState === "complete"
              ? {
                  pathLength: { duration: 0.55, ease: "easeOut" },
                  opacity: { duration: 0.18 },
                }
              : {
                  pathLength: { duration: 0.4, ease: "easeIn" },
                  opacity: { duration: 0.25, delay: 0.15 },
                }
          }
        />
      )}
    </motion.svg>
  );
});
