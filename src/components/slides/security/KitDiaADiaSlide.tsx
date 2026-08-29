import { motion } from "framer-motion";
import { SlideShell } from "../SlideShell";
import { BrandLogo, type Brand } from "../BrandLogo";

const KIT: { logos: Brand[]; titulo: string; desc: string }[] = [
  { logos: ["supabase"], titulo: "Security Advisor", desc: "do Supabase, toda semana" },
  { logos: ["lovable"], titulo: "Security Scan", desc: "no Lovable, antes de publicar" },
  { logos: ["gitguardian"], titulo: "GitGuardian · gitleaks", desc: "secrets vazados no repo" },
  { logos: ["semgrep", "github"], titulo: "Semgrep + Dependabot", desc: "código e dependências" },
  { logos: ["anthropic", "openai"], titulo: "Claude / GPT", desc: "audite seu código com IA" },
];

export default function KitDiaADiaSlide() {
  return (
    <SlideShell background="naval" className="items-center justify-center">
      <p className="eyebrow mb-4">começa segunda · 15 min</p>
      <h2 className="font-display text-5xl md:text-6xl mb-14">o kit do dia a dia</h2>

      <div className="grid grid-cols-5 gap-5 w-full max-w-[1600px]">
        {KIT.map((k, i) => (
          <motion.div
            key={k.titulo}
            className="border border-bege/12 bg-bege/[0.04] rounded-2xl p-7 flex flex-col items-center text-center gap-5"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.2, type: "spring", stiffness: 170, damping: 15 }}
          >
            <div className="flex items-center justify-center gap-3 h-16">
              {k.logos.map((b) => (
                <div
                  key={b}
                  className="h-14 w-14 rounded-xl border border-bege/15 bg-bege/5 flex items-center justify-center"
                >
                  <BrandLogo brand={b} className="h-8 w-8 text-bege" />
                </div>
              ))}
            </div>
            <p className="font-display text-2xl text-bege leading-tight">{k.titulo}</p>
            <p className="text-bege/50 text-base leading-snug">{k.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-14 font-mono text-sm uppercase tracking-[0.3em] text-laranja"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        tudo gratuito ou quase
      </motion.p>
    </SlideShell>
  );
}
