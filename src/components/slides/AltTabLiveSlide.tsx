import { motion } from "framer-motion";
import type { Phase } from "@/contexts/RoomContext";

const LABELS: Record<Exclude<Phase, "idle">, string> = {
  pensando: "pensando",
  gerando: "gerando",
  iterando: "iterando",
  publicando: "publicando",
};

export function AltTabLiveSlide({ phase }: { phase: Exclude<Phase, "idle"> }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-preto px-12 text-bege">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-6 text-bege/70">
        alt+tab · ao vivo
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="font-display text-[clamp(3rem,8vw,6rem)] leading-tight"
      >
        {LABELS[phase]}…
      </motion.h2>
    </div>
  );
}
