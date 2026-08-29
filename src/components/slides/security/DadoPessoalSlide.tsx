import { motion } from "framer-motion";
import { User, Fingerprint, Wifi, MapPin, Smartphone, ArrowRight } from "lucide-react";
import { SlideShell } from "../SlideShell";

/**
 * LGPD Art. 5º: dado pessoal é informação relacionada a pessoa natural
 * IDENTIFICADA (direto) ou IDENTIFICÁVEL (indireto, por combinação).
 */
export default function DadoPessoalSlide() {
  return (
    <SlideShell background="naval" className="items-center justify-center">
      <p className="eyebrow mb-4">LGPD · art. 5º</p>
      <h2 className="font-display text-5xl md:text-6xl mb-14 text-center">
        dado pessoal: <span className="text-laranja">identifica</span> ou torna{" "}
        <span className="text-laranja">identificável</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[1400px]">
        {/* identificada — direto */}
        <motion.div
          className="border border-bege/12 bg-bege/[0.04] rounded-2xl p-9"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-full bg-laranja/15 border border-laranja/40 flex items-center justify-center">
              <User className="h-7 w-7 text-laranja" />
            </div>
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.25em] text-laranja">identificada</p>
              <p className="text-bege/50">o dado aponta a pessoa sozinho</p>
            </div>
          </div>
          <ul className="space-y-3 text-xl text-bege/85">
            {["nome completo", "CPF · RG", "e-mail pessoal", "nº de celular"].map((d, i) => (
              <motion.li
                key={d}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.15 }}
              >
                <ArrowRight className="h-4 w-4 text-laranja shrink-0" /> {d}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* identificável — combinação */}
        <motion.div
          className="border border-bege/12 bg-bege/[0.04] rounded-2xl p-9"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-full bg-bege/10 border border-bege/25 flex items-center justify-center">
              <Fingerprint className="h-7 w-7 text-bege" />
            </div>
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.25em] text-bege">identificável</p>
              <p className="text-bege/50">sozinho não diz nada — combinado, identifica</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            {[
              { icon: Wifi, label: "IP" },
              { icon: Smartphone, label: "device id" },
              { icon: MapPin, label: "geolocalização" },
            ].map((c, i) => (
              <motion.span
                key={c.label}
                className="flex items-center gap-2 border border-bege/20 rounded-full px-4 py-2 font-mono text-sm text-bege/80"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 + i * 0.25, type: "spring", stiffness: 220 }}
              >
                <c.icon className="h-4 w-4" /> {c.label}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="flex items-center gap-3 text-xl text-bege/85"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
          >
            <ArrowRight className="h-4 w-4 text-laranja shrink-0" />
            IP + horário + endereço do cadastro = <span className="text-laranja font-semibold">a pessoa</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.p
        className="mt-12 text-bege/40 text-lg font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3 }}
      >
        os dois casos são dado pessoal. as duas tabelas precisam de cadeado.
      </motion.p>
    </SlideShell>
  );
}
