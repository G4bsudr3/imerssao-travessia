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

export function LockVisualSlide({ eyebrow, title, subtitle, state }: Props) {
  const Icon = state === "open" ? Unlock : Lock;
  const color = state === "open" ? "text-vermelho" : "text-emerald-500";
  const ring = state === "open" ? "ring-vermelho/30 bg-vermelho/5" : "ring-emerald-500/30 bg-emerald-500/5";

  return (
    <SlideShell>
      <div className="flex w-full max-w-5xl flex-col items-center gap-10 text-center">
        {eyebrow && (
          <motion.div initial="hidden" animate="show" variants={fade} className="eyebrow">
            {eyebrow}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: state === "open" ? -15 : 15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`flex h-56 w-56 items-center justify-center rounded-full ring-8 ${ring}`}
        >
          <Icon className={`h-28 w-28 ${color}`} strokeWidth={1.75} />
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
