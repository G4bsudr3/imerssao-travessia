import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  spinning?: boolean;
  /** Quando true, faz o morph contínuo gota → plasma → cadeado → plasma → gota. */
  morphing?: boolean;
  className?: string;
};

/**
 * Quatro shapes com a MESMA estrutura de comandos (M + 6 C + Z) pra permitir
 * interpolação suave de string entre eles via framer-motion.
 * viewBox: 100x125
 */
// 1) Gota (lágrima brand)
const SHAPE_TEAR =
  "M50 5 C 60 18, 88 50, 88 80 C 88 100, 70 118, 50 118 C 30 118, 12 100, 12 80 C 12 50, 40 18, 50 5 C 50 5, 50 5, 50 5 Z";

// 2) Plasma / blob orgânico assimétrico
const SHAPE_PLASMA =
  "M50 12 C 78 14, 92 38, 88 62 C 96 80, 78 108, 56 112 C 32 118, 8 96, 14 72 C 4 52, 22 22, 44 14 C 46 12, 48 12, 50 12 Z";

// 3) Cadeado estilizado: arco superior + corpo (mesmo número de comandos)
const SHAPE_LOCK =
  "M50 18 C 66 18, 72 30, 70 46 C 84 50, 86 60, 86 78 C 86 100, 70 112, 50 112 C 30 112, 14 100, 14 78 C 14 60, 16 50, 30 46 C 28 30, 34 18, 50 18 Z";

// 4) Plasma alternativo (asymmetria espelhada) pra dar variedade no caminho de volta
const SHAPE_PLASMA_2 =
  "M50 10 C 28 14, 10 36, 16 60 C 6 80, 26 110, 50 110 C 74 112, 96 90, 88 66 C 96 44, 78 18, 56 12 C 54 10, 52 10, 50 10 Z";

const MORPH_KEYFRAMES = [
  SHAPE_TEAR,
  SHAPE_PLASMA,
  SHAPE_LOCK,
  SHAPE_PLASMA_2,
  SHAPE_TEAR,
];

export const LagrimaGradient = forwardRef<SVGSVGElement, Props>(function LagrimaGradient(
  { size = 200, spinning = false, morphing = false, className },
  ref,
) {
  const reduce = useReducedMotion();
  const animate = morphing && !reduce;

  return (
    <svg
      ref={ref}
      width={size}
      height={size * 1.25}
      viewBox="0 0 100 125"
      className={cn(spinning && !morphing && "animate-tear-spin", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="tearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fe7b02" />
          <stop offset="50%" stopColor="#f756a6" />
          <stop offset="100%" stopColor="#6f77fc" />
        </linearGradient>
      </defs>
      {animate ? (
        <motion.path
          fill="url(#tearGrad)"
          initial={{ d: SHAPE_TEAR }}
          animate={{ d: MORPH_KEYFRAMES }}
          transition={{
            duration: 8,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ) : (
        <path d={SHAPE_TEAR} fill="url(#tearGrad)" />
      )}
    </svg>
  );
});
