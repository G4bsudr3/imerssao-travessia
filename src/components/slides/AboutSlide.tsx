import { motion } from "framer-motion";
import { SlideShell } from "./SlideShell";

type Handle = { at: string; label?: string };
type Props = {
  photo?: string;
  eyebrow?: string;
  name: string;
  /** palavra do nome pra destacar em verde (ex.: "Breda") */
  accent?: string;
  tagline: string;
  handles?: Handle[];
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }),
};

function renderName(name: string, accent?: string) {
  if (!accent) return name;
  const parts = name.split(new RegExp(`(${accent})`, "i"));
  return parts.map((p, i) =>
    p.toLowerCase() === accent.toLowerCase() ? (
      <span key={i} className="text-laranja">{p}</span>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

export function AboutSlide({ photo, eyebrow, name, accent, tagline, handles = [] }: Props) {
  return (
    <SlideShell background="naval" align="center">
      <div className="flex w-full max-w-[1400px] flex-col items-center gap-[clamp(1.5rem,4vw,4rem)] text-center md:flex-row md:text-left">
        {photo && (
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            src={photo}
            alt={name}
            className="h-[clamp(11rem,26vw,20rem)] w-[clamp(11rem,26vw,20rem)] shrink-0 rounded-3xl object-cover ring-4 ring-laranja/40 shadow-[0_20px_60px_-16px_hsl(var(--laranja)/0.45)]"
          />
        )}
        <div className="min-w-0 space-y-[clamp(0.75rem,1.6vh,1.4rem)]">
          {eyebrow && (
            <motion.div initial="hidden" animate="show" variants={fade} className="eyebrow">
              {eyebrow}
            </motion.div>
          )}
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fade}
            custom={1}
            className="font-display leading-[0.95] text-[clamp(2.75rem,7vw,5.5rem)] break-words"
          >
            {renderName(name, accent)}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fade}
            custom={2}
            className="max-w-2xl text-[clamp(1.15rem,1.9vw,1.75rem)] leading-snug opacity-80"
          >
            {tagline}
          </motion.p>
          {handles.length > 0 && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={fade}
              custom={3}
              className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 pt-2 md:justify-start"
            >
              {handles.map((h, i) => (
                <span key={i} className="font-mono-caps text-laranja text-[clamp(0.95rem,1.2vw,1.25rem)]">
                  {h.at}
                  {h.label ? <span className="text-bege opacity-45"> · {h.label}</span> : null}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </SlideShell>
  );
}
