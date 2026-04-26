import { motion } from "framer-motion";
import { SlideShell } from "../SlideShell";

export type RiskRow = {
  level: "high" | "medium" | "low";
  risk: string;
  impact: string;
  fix: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  rows: RiskRow[];
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }),
};

function dotColor(level: RiskRow["level"]) {
  if (level === "high") return "bg-vermelho";
  if (level === "medium") return "bg-amber-400";
  return "bg-emerald-500";
}

export function RiskTableSlide({ eyebrow, title, rows }: Props) {
  return (
    <SlideShell>
      <div className="w-full max-w-[1500px]">
        {eyebrow && (
          <motion.div initial="hidden" animate="show" variants={fade} className="eyebrow mb-3">
            {eyebrow}
          </motion.div>
        )}
        <motion.h1 initial="hidden" animate="show" variants={fade} custom={1} className="mb-10 font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight">
          {title}
        </motion.h1>

        <div className="overflow-hidden rounded-2xl border-2 border-preto/10 bg-white/70">
          <div className="grid grid-cols-[auto_1fr_1fr_1.2fr] gap-6 border-b-2 border-preto/10 px-8 py-4">
            <span className="eyebrow w-3" />
            <span className="eyebrow">risco</span>
            <span className="eyebrow">impacto</span>
            <span className="eyebrow">mitigação</span>
          </div>
          {rows.map((r, i) => (
            <motion.div
              key={i}
              initial="hidden"
              animate="show"
              variants={fade}
              custom={i + 2}
              className="grid grid-cols-[auto_1fr_1fr_1.2fr] items-start gap-6 border-b border-preto/5 px-8 py-7 last:border-b-0"
            >
              <span className={`mt-2 h-3 w-3 rounded-full ${dotColor(r.level)}`} />
              <span className="font-body text-2xl font-semibold leading-snug">{r.risk}</span>
              <span className="text-2xl leading-snug opacity-80">{r.impact}</span>
              <span className="font-display text-2xl leading-snug text-laranja">{r.fix}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
