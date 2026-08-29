import { motion } from "framer-motion";
import { Flag } from "lucide-react";
import { SlideShell } from "../SlideShell";
import { BrandLogo, type Brand } from "../BrandLogo";

const CASOS: { logo?: Brand; nome: string; valor: string; motivo: string; destaque?: boolean }[] = [
  {
    logo: "meta",
    nome: "Meta",
    valor: "€ 1,2 bi",
    motivo: "transferiu dados de europeus pros EUA sem base legal (DPC · GDPR, 2023)",
  },
  {
    logo: "amazon",
    nome: "Amazon",
    valor: "€ 746 mi",
    motivo: "publicidade direcionada sem consentimento válido (CNPD · GDPR, 2021)",
  },
  {
    logo: "tiktok",
    nome: "TikTok",
    valor: "€ 530 mi",
    motivo: "enviou dados de europeus para a China sem garantias (DPC · GDPR, 2025)",
  },
  {
    nome: "Telekall",
    valor: "R$ 14,4 mil",
    motivo: "1ª multa LGPD do Brasil · empresa pequena, vazou nome e telefone",
    destaque: true,
  },
];

export default function CasosReaisSlide() {
  return (
    <SlideShell background="naval" className="items-center justify-center">
      <p className="eyebrow mb-4">casos reais · multas</p>
      <h2 className="font-display text-5xl md:text-6xl mb-12">quando a proteção falha</h2>

      <div className="w-full max-w-[1300px] flex flex-col gap-4">
        {CASOS.map((c, i) => (
          <motion.div
            key={c.nome}
            className={`flex items-center gap-7 border rounded-2xl px-8 py-5 ${
              c.destaque ? "border-laranja/60 bg-laranja/[0.07]" : "border-bege/12 bg-bege/[0.03]"
            }`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.3, duration: 0.5, ease: "easeOut" }}
          >
            <div className="shrink-0 h-16 w-16 rounded-xl border border-bege/15 bg-bege/5 flex items-center justify-center">
              {c.logo ? (
                <BrandLogo brand={c.logo} className="h-9 w-9 text-bege" />
              ) : (
                <Flag className="h-8 w-8 text-laranja" />
              )}
            </div>
            <p className="w-40 shrink-0 font-display text-3xl text-bege">{c.nome}</p>
            <p className={`w-48 shrink-0 font-mono text-2xl font-bold ${c.destaque ? "text-laranja" : "text-bege/80"}`}>
              {c.valor}
            </p>
            <p className="text-bege/55 text-lg leading-snug">{c.motivo}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-10 text-laranja/90 text-xl font-mono"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0 }}
      >
        a ANPD não multa só gigante.
      </motion.p>
    </SlideShell>
  );
}
