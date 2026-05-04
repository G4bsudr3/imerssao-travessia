import { motion } from "framer-motion";
import { SlideShell } from "../SlideShell";

type Side = {
  label: string;
  sub?: string;
  bullets?: string[];
};

type Props = {
  eyebrow?: string;
  title?: string;
  left: Side;
  right: Side;
  leftTag?: string;
  rightTag?: string;
  rightAccent?: boolean;
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }),
};

export function ComparisonSlide({ eyebrow, title, left, right, leftTag = "lado A", rightTag = "lado B", rightAccent = false }: Props) {
  return (
    <SlideShell>
      <div className="w-full max-w-[1500px]">
        {eyebrow && (
          <motion.div initial="hidden" animate="show" variants={fade} className="eyebrow mb-3">
            {eyebrow}
          </motion.div>
        )}
        {title && (
          <motion.h1 initial="hidden" animate="show" variants={fade} custom={1} className="mb-10 font-display text-[clamp(2.5rem,6cqw,5rem)] leading-tight">
            {title}
          </motion.h1>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div initial="hidden" animate="show" variants={fade} custom={2} className="rounded-2xl border-2 border-preto/10 bg-white/70 p-10 text-left">
            <div className="eyebrow mb-3">{leftTag}</div>
            <div className="font-display text-4xl md:text-5xl leading-tight">{left.label}</div>
            {left.sub && <p className="mt-3 text-2xl opacity-70">{left.sub}</p>}
            {left.bullets && (
              <ul className="mt-6 space-y-3">
                {left.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-2xl opacity-85">
                    <span className="mt-3 h-2 w-2 rounded-full bg-preto/50 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            custom={3}
            className={`rounded-2xl p-10 text-left ${rightAccent ? "bg-laranja text-preto border-2 border-preto/10" : "border-2 border-preto/10 bg-white/70"}`}
          >
            <div className={`eyebrow mb-3 ${rightAccent ? "text-preto/70" : ""}`}>{rightTag}</div>
            <div className="font-display text-4xl md:text-5xl leading-tight">{right.label}</div>
            {right.sub && <p className={`mt-3 text-2xl ${rightAccent ? "text-preto/70" : "opacity-70"}`}>{right.sub}</p>}
            {right.bullets && (
              <ul className="mt-6 space-y-3">
                {right.bullets.map((b, i) => (
                  <li key={i} className={`flex items-start gap-3 text-2xl ${rightAccent ? "text-preto/85" : "opacity-85"}`}>
                    <span className={`mt-3 h-2 w-2 rounded-full flex-shrink-0 ${rightAccent ? "bg-preto/60" : "bg-preto/50"}`} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </SlideShell>
  );
}
