import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { X } from "lucide-react";
import { LagrimaGradient } from "@/components/brand/LagrimaGradient";
import { BalaoSerrado } from "@/components/brand/BalaoSerrado";
import { CONFETTI_PALETTE } from "@/lib/colors";
import { SlideShell } from "./SlideShell";

export function CelebrationSlide({ message = "deu certo." }: { message?: string }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    const end = Date.now() + 2500;
    const tick = () => {
      confetti({ particleCount: 80, spread: 100, origin: { y: 0.6 }, colors: CONFETTI_PALETTE });
      if (Date.now() < end) requestAnimationFrame(tick);
    };
    tick();
  }, []);

  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-10">
        <LagrimaGradient size={220} spinning />
        <BalaoSerrado variant="accent">{message}</BalaoSerrado>
      </div>
    </SlideShell>
  );
}

export function FinalSlide() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    const end = Date.now() + 4000;
    const tick = () => {
      confetti({ particleCount: 120, spread: 140, origin: { y: 0.6 }, colors: CONFETTI_PALETTE });
      if (Date.now() < end) requestAnimationFrame(tick);
    };
    tick();
  }, []);

  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-12">
        <LagrimaGradient size={280} spinning />
        <BalaoSerrado variant="accent" className="!text-7xl md:!text-9xl">
          vai lá e protege.
        </BalaoSerrado>
        <div className="eyebrow">obrigado, POA. — chŏra</div>
      </div>

      <FeedbackQR />
    </SlideShell>
  );
}

function FeedbackQR() {
  const [expanded, setExpanded] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/feedback` : "/feedback";

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setExpanded(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="group absolute bottom-8 right-8 z-30 flex flex-col items-end gap-2"
        aria-label="abrir QR de feedback"
      >
        <div className="hidden flex-col items-end text-right md:flex">
          <span className="font-mono text-[10px] uppercase tracking-widest text-preto/60">
            ficou alguma dúvida?
          </span>
          <span className="font-display text-xl leading-tight text-preto">manda pra mim →</span>
        </div>
        <div className="rounded-xl border-2 border-preto/15 bg-white p-2 shadow-[0_6px_24px_-8px_hsl(var(--preto)/0.35)] transition-transform group-hover:scale-105 group-hover:border-preto/40">
          <QRCodeSVG value={url} size={88} bgColor="#ffffff" fgColor="#090909" level="M" />
        </div>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-preto/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          >
            <motion.div
              className="relative flex flex-col items-center gap-6 rounded-3xl bg-bege p-12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-preto bg-white text-preto shadow-lg transition-transform hover:scale-110"
                aria-label="fechar"
              >
                <X className="h-6 w-6" strokeWidth={2.5} />
              </button>
              <div className="eyebrow">feedback · sem login</div>
              <div className="font-display text-5xl leading-tight text-preto">
                me conta o que ficou.
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_-12px_hsl(var(--preto)/0.4)]">
                <QRCodeSVG value={url} size={420} bgColor="#ffffff" fgColor="#090909" level="M" />
              </div>
              <div className="font-mono text-sm uppercase tracking-widest text-preto/60">
                {url.replace(/^https?:\/\//, "")}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
