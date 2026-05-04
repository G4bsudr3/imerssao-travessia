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
 * Cadeado animado nas cores do evento TRAVESSIA (verde neon laranja).
 * - closed: cadeado pulsando suavemente, glow verde estável
 * - open: cadeado destrancado, leve shake + glow intermitente vermelho
 */
function PadlockMark({ state, size = 320 }: { state: "open" | "closed"; size?: number }) {
  const Icon = state === "open" ? Unlock : Lock;
  const isOpen = state === "open";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Halo / glow de fundo */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: isOpen
            ? "radial-gradient(circle, hsl(var(--vermelho) / 0.45) 0%, transparent 65%)"
            : "radial-gradient(circle, hsl(var(--laranja) / 0.55) 0%, transparent 65%)",
          filter: "blur(28px)",
        }}
        animate={
          isOpen
            ? { opacity: [0.4, 0.9, 0.4], scale: [0.95, 1.08, 0.95] }
            : { opacity: [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }
        }
        transition={{ duration: isOpen ? 1.2 : 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Anel pulsante */}
      <motion.div
        className="absolute rounded-full border-2"
        style={{
          width: size * 0.86,
          height: size * 0.86,
          borderColor: isOpen ? "hsl(var(--vermelho) / 0.55)" : "hsl(var(--laranja) / 0.7)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.9, 0, 0.9] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />

      {/* Cadeado */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: isOpen ? -10 : 10 }}
        animate={
          isOpen
            ? { scale: 1, opacity: 1, rotate: [0, -4, 4, -3, 3, 0] }
            : { scale: [1, 1.04, 1], opacity: 1, rotate: 0 }
        }
        transition={
          isOpen
            ? { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
            : { scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.6 } }
        }
        className="relative"
        style={{
          filter: isOpen
            ? "drop-shadow(0 0 24px hsl(var(--vermelho) / 0.6))"
            : "drop-shadow(0 0 28px hsl(var(--laranja) / 0.7))",
        }}
      >
        <Icon
          style={{
            width: size * 0.55,
            height: size * 0.55,
            color: isOpen ? "hsl(var(--vermelho))" : "hsl(var(--laranja))",
          }}
          strokeWidth={1.75}
        />
      </motion.div>
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

        <PadlockMark state={state} size={300} />

        <motion.h1 initial="hidden" animate="show" variants={fade} custom={2} className="font-display text-[clamp(3rem,8vw,4.9rem)] leading-tight">
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

