import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { SlideShell } from "../SlideShell";

type Item = { label: string; sub?: string; accent?: boolean };

type Props = {
  eyebrow?: string;
  title?: string;
  items: Item[];
  background?: "bege" | "naval" | "accent";
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } }),
};

/**
 * Checklist de configurações de Auth — cada linha mostra um toggle que
 * liga (verde) com delay escalonado, como se estivéssemos corrigindo ao vivo.
 */
export function AuthChecklistSlide({ eyebrow, title, items, background = "naval" }: Props) {
  const dark = background !== "bege";
  return (
    <SlideShell background={background}>
      <div className="flex h-full w-full max-w-[1300px] flex-col justify-center gap-[clamp(1rem,2.5vh,2rem)] py-[clamp(1rem,3vh,2.5rem)]">
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

        <ul className="space-y-[clamp(0.6rem,1.6vh,1.1rem)]">
          {items.map((it, i) => (
            <motion.li
              key={i}
              initial="hidden"
              animate="show"
              variants={fade}
              custom={2 + i}
              className={`relative flex items-center gap-[clamp(0.9rem,1.8vw,1.6rem)] rounded-2xl px-[clamp(1rem,2vw,1.75rem)] py-[clamp(0.75rem,1.8vh,1.25rem)] ${
                it.accent
                  ? "bg-laranja text-preto"
                  : dark
                  ? "border-2 border-bege/15 bg-bege/[0.05]"
                  : "border-2 border-preto/10 bg-white/70"
              }`}
            >
              {/* toggle que liga */}
              <motion.div
                initial={{ backgroundColor: "hsl(0 72% 51% / 0.25)" }}
                animate={{ backgroundColor: it.accent ? "hsl(var(--preto))" : "hsl(var(--laranja))" }}
                transition={{ delay: 0.9 + i * 0.45, duration: 0.35 }}
                className="relative h-[clamp(1.6rem,2.6vw,2.2rem)] w-[clamp(2.9rem,4.6vw,3.9rem)] flex-shrink-0 rounded-full"
              >
                <motion.div
                  initial={{ x: "12%" }}
                  animate={{ x: "115%" }}
                  transition={{ delay: 0.9 + i * 0.45, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute top-1/2 h-[clamp(1.15rem,1.9vw,1.6rem)] w-[clamp(1.15rem,1.9vw,1.6rem)] -translate-y-1/2 rounded-full ${it.accent ? "bg-laranja" : "bg-preto"}`}
                />
              </motion.div>

              <div className="min-w-0 flex-1 text-left">
                <div className="font-display leading-tight text-[clamp(1.25rem,2.3vw,1.9rem)] [overflow-wrap:anywhere]">{it.label}</div>
                {it.sub && (
                  <div className={`mt-1 text-[clamp(1rem,1.35vw,1.25rem)] ${it.accent ? "text-preto/70" : "opacity-70"}`}>{it.sub}</div>
                )}
              </div>

              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 0.5 }}
                transition={{ delay: 0.9 + i * 0.45, duration: 0.3 }}
                className="absolute right-[clamp(1rem,2vw,1.75rem)]"
              >
                <ShieldAlert className="h-[clamp(1.5rem,2.4vw,2rem)] w-[clamp(1.5rem,2.4vw,2rem)] text-red-500" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.45, duration: 0.3 }}
              >
                <ShieldCheck className={`h-[clamp(1.5rem,2.4vw,2rem)] w-[clamp(1.5rem,2.4vw,2rem)] flex-shrink-0 ${it.accent ? "text-preto" : "text-laranja"}`} />
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </SlideShell>
  );
}

export default AuthChecklistSlide;
