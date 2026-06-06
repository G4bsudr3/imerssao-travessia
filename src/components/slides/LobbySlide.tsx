// Tela de abertura — sem QR/join, só boas-vindas.
import { motion } from "framer-motion";
import { useEvent } from "@/contexts/EventContext";

export function LobbySlide() {
  const { event } = useEvent();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-bege px-12 text-preto">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="eyebrow mb-6"
      >
        bem-vindos
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="max-w-5xl text-center font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95]"
      >
        {event.name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
        className="mt-6 text-lg opacity-70"
      >
        relaxe — vamos começar em breve
      </motion.p>
    </div>
  );
}
