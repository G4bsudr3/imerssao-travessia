import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  spinning?: boolean;
  className?: string;
};

// Lágrima estilizada com gradient brand. forwardRef pra funcionar dentro de motion/AnimatePresence sem warning.
export const LagrimaGradient = forwardRef<SVGSVGElement, Props>(function LagrimaGradient(
  { size = 200, spinning = false, className },
  ref,
) {
  return (
    <svg
      ref={ref}
      width={size}
      height={size * 1.25}
      viewBox="0 0 100 125"
      className={cn(spinning && "animate-tear-spin", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="tearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fe7b02" />
          <stop offset="50%" stopColor="#f756a6" />
          <stop offset="100%" stopColor="#6f77fc" />
        </linearGradient>
      </defs>
      <path
        d="M50 5 C 50 5, 12 55, 12 80 a 38 38 0 0 0 76 0 C 88 55, 50 5, 50 5 Z"
        fill="url(#tearGrad)"
      />
    </svg>
  );
});
