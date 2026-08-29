import { motion } from "framer-motion";
import { ShieldCheck, Wrench, Search, Mic } from "lucide-react";
import { SlideShell } from "./SlideShell";

type Handle = { at: string; label?: string };
type Highlight = { icon: "shield" | "wrench" | "search" | "mic"; value: string; label: string };
type Props = {
  photo?: string;
  eyebrow?: string;
  name: string;
  /** palavra do nome pra destacar em verde (ex.: "Breda") */
  accent?: string;
  tagline: string;
  handles?: Handle[];
  highlights?: Highlight[];
};

const ICONS = { shield: ShieldCheck, wrench: Wrench, search: Search, mic: Mic } as const;

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

export function AboutSlide({ photo, eyebrow, name, accent, tagline, handles = [], highlights = [] }: Props) {
  return (
    <SlideShell background="naval" align="center">
      <div className="flex w-full max-w-[1400px] flex-col items-center gap-[clamp(1.5rem,4vw,4rem)] text-center md:flex-row md:text-left">
        {photo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative shrink-0"
          >
            {/* anel pulsante atrás da foto */}
            <motion.div
              className="absolute -inset-3 rounded-[2rem] border-2 border-laranja/40"
              animate={{ opacity: [0.25, 0.7, 0.25], scale: [1, 1.04, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* cantoneiras */}
            {["-top-4 -left-4 border-t-2 border-l-2", "-top-4 -right-4 border-t-2 border-r-2", "-bottom-4 -left-4 border-b-2 border-l-2", "-bottom-4 -right-4 border-b-2 border-r-2"].map((pos, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.12 }}
                className={`absolute ${pos} h-6 w-6 border-laranja`}
              />
            ))}
            {/* linha de scan */}
            <div className="absolute -inset-1 overflow-hidden rounded-[1.75rem]">
              <motion.div
                className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-laranja/25 to-transparent"
                animate={{ top: ["-15%", "110%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
              />
            </div>
            <img
              src={photo}
              alt={name}
              className="h-[clamp(11rem,26vw,20rem)] w-[clamp(11rem,26vw,20rem)] rounded-3xl object-cover ring-4 ring-laranja/40 shadow-[0_20px_60px_-16px_hsl(var(--laranja)/0.45)]"
            />
          </motion.div>
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

          {highlights.length > 0 && (
            <div className="grid max-w-3xl grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
              {highlights.map((h, i) => {
                const Icon = ICONS[h.icon];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.14, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3 rounded-xl border border-laranja/25 bg-laranja/[0.06] px-4 py-3 text-left"
                  >
                    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-laranja/15 text-laranja">
                      <Icon className="h-5 w-5" />
                      <motion.span
                        className="absolute inset-0 rounded-lg border border-laranja/50"
                        animate={{ opacity: [0, 0.8, 0], scale: [1, 1.35, 1.6] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[clamp(0.95rem,1.4vw,1.2rem)] leading-tight text-laranja">
                        {h.value}
                      </span>
                      <span className="block text-[clamp(0.7rem,0.95vw,0.85rem)] leading-snug opacity-65">
                        {h.label}
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </div>
          )}

          {handles.length > 0 && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={fade}
              custom={3 + highlights.length * 0.5}
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
