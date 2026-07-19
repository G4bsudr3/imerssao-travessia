import { motion } from "framer-motion";
import { LagrimaGradient } from "@/components/brand/LagrimaGradient";
import { ChoraLogo } from "@/components/brand/ChoraLogo";
import { SlideShell } from "./SlideShell";

type Variant = "intro" | "build" | "final";

type Labels = { eyebrow: string; title: string; sub: string };

export function CoverSlide({
  variant = "intro",
  labels: labelsProp,
  showLogo,
  logoSrc,
  logoAlt,
}: {
  variant?: Variant;
  /** override do texto — usado por eventos que reaproveitam o deck (ex.: bootcamp) */
  labels?: Labels;
  /** exibir o ChoraLogo no lugar do título em texto (default: só no intro) */
  showLogo?: boolean;
  /** logo de terceiro (ex.: Lovable) exibida abaixo do título — usado no dia de vibecoding */
  logoSrc?: string;
  logoAlt?: string;
}) {
  const defaults: Record<Variant, Labels> = {
    intro: {
      eyebrow: "ALPHAVILE · 06.06.2026 · IMERSÃO TRAVESSIA",
      title: "TRAVESSIA",
      sub: "do vibe coder ao empresário de software.",
    },
    build: { eyebrow: "parte 2 · agora", title: "vamos construir.", sub: "ao vivo. com vocês." },
    final: { eyebrow: "fim · começo", title: "vai lá e cria.", sub: "" },
  };
  const l = labelsProp ?? defaults[variant];
  const withLogo = showLogo ?? variant === "intro";
  return (
    <SlideShell background="naval">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-8"
      >

        <div className="eyebrow">{l.eyebrow}</div>
        {withLogo ? (
          <ChoraLogo className="text-[clamp(5rem,16vw,11.2rem)] whitespace-nowrap" />
        ) : (
          <h1 className="font-display text-[clamp(4rem,12vw,8.4rem)] leading-none text-bege">{l.title}</h1>
        )}
        {logoSrc && (
          <img
            src={logoSrc}
            alt={logoAlt ?? "logo"}
            className="h-[clamp(3rem,9vw,6.5rem)] w-auto drop-shadow-[0_0_44px_rgba(255,110,60,0.4)]"
          />
        )}
        {l.sub && <p className="text-3xl opacity-70 text-bege">{l.sub}</p>}
        {variant === "intro" && !labelsProp && (
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-bege/60 whitespace-pre-line">
            {"\n"}
          </p>
        )}
      </motion.div>
    </SlideShell>
  );
}
