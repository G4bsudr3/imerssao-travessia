import { motion, AnimatePresence } from "framer-motion";
import { type ActMeta } from "@/lib/acts";

type Props = {
  act: ActMeta | null;
  onDone: () => void;
};

// Overlay cinematográfico exibido ao entrar em um novo ato.
// Cobre tela inteira com nome do ato em tipografia grande, sai em ~1.6s total.
export function ActTransition({ act, onDone }: Props) {
  return (
    <AnimatePresence
      onExitComplete={onDone}
    >
      {act && (
        <motion.div
          key={`act-${act.number}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-0 z-[60] flex flex-col items-center justify-center bg-preto text-bege"
        >
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-sm uppercase tracking-[0.4em] text-laranja"
          >
            ato {act.number}
          </motion.div>
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display text-[clamp(4rem,14vw,12rem)] leading-none"
          >
            {act.name}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.32 }}
            className="mt-6 font-body text-xl opacity-60"
          >
            {act.subtitle}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
