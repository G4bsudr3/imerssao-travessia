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
      <div className="flex h-full w-full max-w-[1500px] flex-col justify-center gap-[clamp(1rem,2.5vh,2rem)] py-[clamp(1rem,3vh,2.5rem)]">
        <div>
          {eyebrow && (
            <motion.div initial="hidden" animate="show" variants={fade} className="eyebrow mb-2">
              {eyebrow}
            </motion.div>
          )}
          {title && (
            <motion.h1 initial="hidden" animate="show" variants={fade} custom={1} className="font-display leading-[1.05] text-[clamp(1.75rem,3.6vw,2.75rem)]">
              {title}
            </motion.h1>
          )}
        </div>

        <div className="grid grid-cols-1 gap-[clamp(0.75rem,1.5vw,1.5rem)] md:grid-cols-2">
          <motion.div initial="hidden" animate="show" variants={fade} custom={2} className="rounded-2xl border-2 border-preto/10 bg-white/70 p-[clamp(1rem,2vw,2.25rem)] text-left">
            <div className="eyebrow mb-2">{leftTag}</div>
            <div className="font-display leading-tight text-[clamp(1.5rem,2.6vw,2.5rem)]">{left.label}</div>
            {left.sub && <p className="mt-2 opacity-70 text-[clamp(1rem,1.4vw,1.35rem)]">{left.sub}</p>}
            {left.bullets && (
              <ul className="mt-4 space-y-2">
                {left.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 opacity-85 text-[clamp(0.95rem,1.35vw,1.3rem)]">
                    <span className="mt-2 h-2 w-2 rounded-full bg-preto/50 flex-shrink-0" />
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
            className={`rounded-2xl p-[clamp(1rem,2vw,2.25rem)] text-left ${rightAccent ? "bg-laranja text-preto border-2 border-preto/10" : "border-2 border-preto/10 bg-white/70"}`}
          >
            <div className={`eyebrow mb-2 ${rightAccent ? "text-preto/70" : ""}`}>{rightTag}</div>
            <div className="font-display leading-tight text-[clamp(1.5rem,2.6vw,2.5rem)]">{right.label}</div>
            {right.sub && <p className={`mt-2 text-[clamp(1rem,1.4vw,1.35rem)] ${rightAccent ? "text-preto/70" : "opacity-70"}`}>{right.sub}</p>}
            {right.bullets && (
              <ul className="mt-4 space-y-2">
                {right.bullets.map((b, i) => (
                  <li key={i} className={`flex items-start gap-3 text-[clamp(0.95rem,1.35vw,1.3rem)] ${rightAccent ? "text-preto/85" : "opacity-85"}`}>
                    <span className={`mt-2 h-2 w-2 rounded-full flex-shrink-0 ${rightAccent ? "bg-preto/60" : "bg-preto/50"}`} />
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
