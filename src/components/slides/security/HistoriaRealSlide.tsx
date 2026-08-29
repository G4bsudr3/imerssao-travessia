import { motion } from "framer-motion";
import { MessageCircle, Users, Terminal, Globe } from "lucide-react";
import { SlideShell } from "../SlideShell";

const STEPS = [
  { icon: MessageCircle, dia: "sexta", texto: "você lança no grupo do zap", danger: false },
  { icon: Users, dia: "sábado", texto: "200 cadastros, com CPF e tudo", danger: false },
  { icon: Terminal, dia: "domingo", texto: "alguém abre o DevTools", danger: false },
  { icon: Globe, dia: "segunda", texto: "a tabela inteira tá num fórum", danger: true },
];

export default function HistoriaRealSlide() {
  return (
    <SlideShell background="naval" className="items-center justify-center">
      <p className="eyebrow mb-10">como vaza na vida real</p>

      <div className="flex items-stretch gap-4 w-full max-w-[1500px]">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.dia}
            className="flex-1 flex flex-col items-center text-center gap-5"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.55, duration: 0.45, ease: "easeOut" }}
          >
            <motion.div
              className={`h-20 w-20 rounded-2xl border flex items-center justify-center ${
                s.danger ? "border-red-500/60 bg-red-500/10" : "border-bege/15 bg-bege/5"
              }`}
              animate={
                s.danger
                  ? { x: [0, -6, 6, -4, 4, 0], transition: { delay: 0.5 + i * 0.55 + 0.4, duration: 0.5 } }
                  : undefined
              }
            >
              <s.icon className={`h-9 w-9 ${s.danger ? "text-red-400" : "text-bege/70"}`} />
            </motion.div>
            <p className={`font-mono text-sm uppercase tracking-[0.3em] ${s.danger ? "text-red-400" : "text-bege/45"}`}>
              {s.dia}
            </p>
            <p className={`text-xl md:text-2xl leading-snug ${s.danger ? "text-red-300 font-semibold" : "text-bege/85"}`}>
              {s.texto}
            </p>
          </motion.div>
        ))}
      </div>

      {/* linha do tempo */}
      <div className="relative w-full max-w-[1500px] mt-12 h-px bg-bege/10">
        <motion.div
          className="absolute inset-y-0 left-0 bg-laranja h-px"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 2.2, ease: "linear" }}
        />
      </div>

      <motion.p
        className="mt-10 text-bege/40 text-lg font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0 }}
      >
        nenhum hacker avançado envolvido. só uma policy faltando.
      </motion.p>
    </SlideShell>
  );
}
