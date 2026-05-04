import { motion } from "framer-motion";
import { LagrimaGradient } from "@/components/brand/LagrimaGradient";
import { ChoraLogo } from "@/components/brand/ChoraLogo";
import { SlideShell } from "./SlideShell";

type Variant = "intro" | "build" | "final";

export function CoverSlide({ variant = "intro" }: { variant?: Variant }) {
  const labels: Record<Variant, { eyebrow: string; title: string; sub: string }> = {
    intro: {
      eyebrow: "ALPHAVILE · 06.06.2026 · IMERSÃO TRAVESSIA",
      title: "TRAVESSIA",
      sub: "do vibe coder ao empresário de software.",
    },
    build: { eyebrow: "parte 2 · agora", title: "vamos construir.", sub: "ao vivo. com vocês." },
    final: { eyebrow: "fim · começo", title: "vai lá e cria.", sub: "" },
  };
  const l = labels[variant];
  return (
    <SlideShell background="naval">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-8"
      >
        <LagrimaGradient size={120} morphing />
        <div className="eyebrow">{l.eyebrow}</div>
        {variant === "intro" ? (
          <ChoraLogo className="text-[clamp(5rem,16vw,16rem)] whitespace-nowrap" />
        ) : (
          <h1 className="font-display text-[clamp(4rem,12vw,12rem)] leading-none text-bege">{l.title}</h1>
        )}
        {l.sub && <p className="text-3xl opacity-70 text-bege">{l.sub}</p>}
        {variant === "intro" && (
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-bege/60 whitespace-pre-line">
            {"\n"}
          </p>
        )}
      </motion.div>
    </SlideShell>
  );
}
