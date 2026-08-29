import { motion } from "framer-motion";
import { SlideShell } from "../SlideShell";
import { BrandLogo } from "../BrandLogo";

const AWS = [
  "pentest autônomo e contínuo, on-demand",
  "achou XSS em 6 min nos testes da própria AWS",
  "cobrança por hora de tarefa (~US$ 50/h)",
  "já está GA — qualquer conta AWS usa",
];

const MYTHOS = [
  "acha zero-days de 17+ anos no kernel",
  "explorou OpenBSD, FreeBSD e FFmpeg sozinho",
  "PentestGPT nível 97% de precisão",
  "via API — roda no seu CI",
];

export default function FerramentasShowdownSlide() {
  return (
    <SlideShell background="naval" className="items-center justify-center">
      <p className="eyebrow mb-4">ferramentas · 2026 mudou o jogo</p>
      <h2 className="font-display text-5xl md:text-6xl mb-12">o arsenal disponível hoje</h2>

      <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-8 w-full max-w-[1500px]">
        {/* AWS */}
        <motion.div
          className="border border-bege/15 bg-bege/[0.04] rounded-3xl p-10"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-5 mb-8">
            <div className="h-20 w-20 rounded-2xl border border-bege/15 bg-bege/5 flex items-center justify-center">
              <BrandLogo brand="aws" className="h-12 w-12 text-bege" />
            </div>
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.25em] text-bege/45">aws security agent</p>
              <p className="font-display text-3xl text-bege">pentest contínuo</p>
            </div>
          </div>
          <ul className="space-y-4">
            {AWS.map((b, i) => (
              <motion.li
                key={b}
                className="text-xl text-bege/80 flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + i * 0.2 }}
              >
                <span className="text-laranja">→</span> {b}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* VS */}
        <motion.div
          className="self-center h-24 w-24 shrink-0 rounded-full bg-naval border-2 border-laranja flex items-center justify-center font-display text-3xl text-laranja"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 13 }}
        >
          vs
        </motion.div>
        {/* Mythos */}
        <motion.div
          className="border border-laranja/40 bg-laranja/[0.05] rounded-3xl p-10"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-5 mb-8">
            <div className="h-20 w-20 rounded-2xl border border-laranja/40 bg-laranja/10 flex items-center justify-center">
              <BrandLogo brand="anthropic" className="h-11 w-11 text-laranja" />
            </div>
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.25em] text-laranja/70">claude mythos</p>
              <p className="font-display text-3xl text-bege">caça a zero-days</p>
            </div>
          </div>
          <ul className="space-y-4">
            {MYTHOS.map((b, i) => (
              <motion.li
                key={b}
                className="text-xl text-bege/85 flex gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + i * 0.2 }}
              >
                <span className="text-laranja">→</span> {b}
              </motion.li>
            ))}
          </ul>
        </motion.div>

      </div>

      <motion.p
        className="mt-12 text-2xl text-bege/60 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1 }}
      >
        a mesma IA que ataca também defende. <span className="text-laranja">e ela está disponível pra você hoje.</span>
      </motion.p>
    </SlideShell>
  );
}
