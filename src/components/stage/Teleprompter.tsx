import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  script?: string;
  label: string;
  title?: string;
  onClose: () => void;
};

/**
 * Teleprompter do apresentador — painel lateral com o roteiro de fala do slide atual.
 * Liga/desliga com a tecla T (atalho não exibido na tela). Pensado pra gravação:
 * fica num painel à direita que você pode deixar fora do enquadramento ou desligar no take.
 */
export function Teleprompter({ open, script, label, title, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Volta o scroll pro topo ao trocar de slide.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [script]);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-[40vw] flex-col border-l border-white/10 bg-black/85 text-white backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
              teleprompter · {label}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white/80"
              aria-label="fechar teleprompter (T)"
            >
              T · fechar
            </button>
          </div>

          {title && (
            <div className="px-6 pt-5 font-display text-2xl leading-tight text-laranja">
              {title}
            </div>
          )}

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-6 py-5"
          >
            {script ? (
              <p className="whitespace-pre-line text-[clamp(1.4rem,2.2vw,2rem)] font-light leading-relaxed text-white/90">
                {script}
              </p>
            ) : (
              <p className="font-mono text-sm text-white/40">
                (sem roteiro para este slide)
              </p>
            )}
          </div>

          <div className="border-t border-white/10 px-6 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            ← → muda o slide · T liga/desliga
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
