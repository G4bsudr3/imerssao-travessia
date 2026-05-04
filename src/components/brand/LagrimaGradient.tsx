import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  spinning?: boolean;
  morphing?: boolean;
  className?: string;
};

/**
 * Marker TRAVESSIA — losango neon com glow.
 * Mantém a API antiga (size/spinning/morphing) pra compatibilidade.
 */
export const LagrimaGradient = forwardRef<SVGSVGElement, Props>(function LagrimaGradient(
  { size = 200, spinning = false, morphing = false, className },
  ref,
) {
  const reduce = useReducedMotion();
  const animateRot = (spinning || morphing) && !reduce;

  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn(className)}
      aria-hidden
      animate={animateRot ? { rotate: 360 } : undefined}
      transition={animateRot ? { duration: 14, repeat: Infinity, ease: "linear" } : undefined}
      style={{ transformOrigin: "50% 50%" }}
    >
      <defs>
        <linearGradient id="travGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1aff5e" />
          <stop offset="100%" stopColor="#7dff9c" />
        </linearGradient>
        <filter id="travGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#travGlow)">
        {/* Losango */}
        <path
          d="M50 8 L88 50 L50 92 L12 50 Z"
          fill="none"
          stroke="url(#travGrad)"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        {/* Centro */}
        <circle cx="50" cy="50" r="6" fill="url(#travGrad)" />
      </g>
    </motion.svg>
  );
});
