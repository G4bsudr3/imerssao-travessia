import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import { SlideShell } from "../SlideShell";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  state: "open" | "closed";
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } }),
};

/**
 * Lágrima-cofre: reusa a forma da gota do brand, mas com tratamento de "segurança".
 * - state="open": gradient avermelhado + Unlock + rachadura sutil
 * - state="closed": gradient brand original + Lock
 */
function LagrimaCofre({ state, size = 280 }: { state: "open" | "closed"; size?: number }) {
  const Icon = state === "open" ? Unlock : Lock;
  const gradId = state === "open" ? "tearGradOpen" : "tearGradClosed";

  return (
    <div className="relative" style={{ width: size, height: size * 1.25 }}>
      <svg
        width={size}
        height={size * 1.25}
        viewBox="0 0 100 125"
        className="absolute inset-0 drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
        aria-hidden
      >
        <defs>
          <linearGradient id="tearGradClosed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fe7b02" />
            <stop offset="50%" stopColor="#f756a6" />
            <stop offset="100%" stopColor="#6f77fc" />
          </linearGradient>
          <linearGradient id="tearGradOpen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fe7b02" />
            <stop offset="55%" stopColor="#e23a3a" />
            <stop offset="100%" stopColor="#7a1212" />
          </linearGradient>
        </defs>
        <path
          d="M50 5 C 50 5, 12 55, 12 80 a 38 38 0 0 0 76 0 C 88 55, 50 5, 50 5 Z"
          fill={`url(#${gradId})`}
        />
        {state === "open" && (
          // rachadura sutil reforçando o "está aberto"
          <path
            d="M50 18 L 46 42 L 54 56 L 47 78"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </svg>

      {/* cadeado centralizado dentro da gota (deslocado pro centro visual da lágrima, ~70% da altura) */}
      <div
        className="absolute inset-x-0 flex items-center justify-center"
        style={{ top: "55%", transform: "translateY(-50%)" }}
      >
        <Icon
          className="text-bege drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
          style={{ width: size * 0.42, height: size * 0.42 }}
          strokeWidth={1.75}
        />
      </div>
    </div>
  );
}

export function LockVisualSlide({ eyebrow, title, subtitle, state }: Props) {
  return (
    <SlideShell>
      <div className="flex w-full max-w-5xl flex-col items-center gap-10 text-center">
        {eyebrow && (
          <motion.div initial="hidden" animate="show" variants={fade} className="eyebrow">
            {eyebrow}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: state === "open" ? -8 : 8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <LagrimaCofre state={state} size={260} />
        </motion.div>

        <motion.h1 initial="hidden" animate="show" variants={fade} custom={2} className="font-display text-[clamp(3rem,8vw,7rem)] leading-tight">
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p initial="hidden" animate="show" variants={fade} custom={3} className="text-2xl opacity-70 max-w-3xl">
            {subtitle}
          </motion.p>
        )}
      </div>
    </SlideShell>
  );
}
