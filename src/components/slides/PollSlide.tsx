import { motion } from "framer-motion";

type PollProps = {
  eyebrow?: string;
  question?: string;
  options?: Array<{ value: string; label: string; sub?: string; accent?: boolean }>;
};

export function PollSlide({ eyebrow = "enquete", question, options = [] }: PollProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-bege px-12 text-preto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-6">
        {eyebrow}
      </motion.div>
      {question && (
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mb-12 max-w-5xl text-center font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight"
        >
          {question}
        </motion.h2>
      )}
      {options.length > 0 && (
        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {options.map((o, i) => (
            <motion.div
              key={o.value}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className={`rounded-2xl border-2 p-6 ${o.accent ? "border-laranja bg-laranja/10" : "border-preto/15 bg-white/60"}`}
            >
              <div className="font-display text-2xl leading-tight">{o.label}</div>
              {o.sub && <div className="mt-1 text-sm opacity-70">{o.sub}</div>}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
