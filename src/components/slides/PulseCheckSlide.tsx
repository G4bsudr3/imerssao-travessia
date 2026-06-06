import { motion } from "framer-motion";

type PulseProps = { eyebrow?: string; question?: string; hint?: string };

export function PulseCheckSlide({
  eyebrow = "pulse check",
  question = "como você está agora?",
  hint,
}: PulseProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-bege px-12 text-preto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-6">
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="max-w-5xl text-center font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight"
      >
        {question}
      </motion.h2>
      {hint && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="mt-6 max-w-2xl text-center text-lg opacity-70"
        >
          {hint}
        </motion.p>
      )}
    </div>
  );
}
