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
  background?: "bege" | "naval" | "accent";
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

export function RiskTableSlide({ eyebrow, title, rows, background }: Props) {
  const dark = background === "naval";
  const shell = dark ? "border-bege/15 bg-bege/[0.05]" : "border-preto/10 bg-white/70";
  const headBorder = dark ? "border-bege/15" : "border-preto/10";
  const rowBorder = dark ? "border-bege/10" : "border-preto/5";
  return (
    <SlideShell background={background}>
      <div className="flex h-full w-full max-w-[1500px] flex-col justify-center gap-[clamp(1rem,2.5vh,2rem)] py-[clamp(1rem,3vh,2.5rem)]">
        <div>
          {eyebrow && (
            <motion.div initial="hidden" animate="show" variants={fade} className="eyebrow mb-2">
              {eyebrow}
            </motion.div>
          )}
          <motion.h1 initial="hidden" animate="show" variants={fade} custom={1} className="font-display leading-[1.05] text-[clamp(1.75rem,3.6vw,2.75rem)]">
            {title}
          </motion.h1>
        </div>

        <div className={`overflow-hidden rounded-2xl border-2 ${shell}`}>
          <div className={`grid grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] gap-5 border-b-2 px-6 py-3 ${headBorder}`}>
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
              className={`grid grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] items-start gap-5 border-b px-6 py-[clamp(0.75rem,1.8vh,1.4rem)] last:border-b-0 ${rowBorder}`}
            >
              <span className={`mt-2 h-3 w-3 shrink-0 rounded-full ${dotColor(r.level)}`} />
              <span className="font-body font-semibold leading-snug break-words text-[clamp(1.05rem,1.55vw,1.35rem)]">{r.risk}</span>
              <span className="leading-snug opacity-80 break-words text-[clamp(1.05rem,1.55vw,1.35rem)]">{r.impact}</span>
              <span className="font-display leading-snug break-words text-laranja text-[clamp(1.05rem,1.55vw,1.35rem)]">{r.fix}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
