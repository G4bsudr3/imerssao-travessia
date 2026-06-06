import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { X } from "lucide-react";
import { LagrimaGradient } from "@/components/brand/LagrimaGradient";
import { BalaoSerrado } from "@/components/brand/BalaoSerrado";
import { CONFETTI_PALETTE } from "@/lib/colors";
import { SlideShell } from "./SlideShell";

const INSTAGRAM_URL = "https://instagram.com/gabreda";
const WHATSAPP_URL = "https://wa.me/5511945853553";

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
        <div className="eyebrow">obrigado, alphaville. — travessia</div>
      </div>

      <ContactQRs />
    </SlideShell>
  );
}

function ContactQRs() {
  const [expanded, setExpanded] = useState(false);
  const feedbackUrl =
    typeof window !== "undefined" ? `${window.location.origin}/feedback` : "/feedback";

  const qrs = [
    { label: "instagram", sublabel: "@gabreda", url: INSTAGRAM_URL },
    { label: "whatsapp", sublabel: "11 94585-3553", url: WHATSAPP_URL },
    { label: "feedback", sublabel: "me conta o que ficou", url: feedbackUrl },
  ];

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setExpanded(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="group absolute bottom-8 right-8 z-30 flex flex-col items-end gap-2"
        aria-label="abrir QR codes de contato"
      >
        <div className="hidden flex-col items-end text-right md:flex">
          <span className="font-mono text-[10px] uppercase tracking-widest text-preto/60">
            ficou alguma dúvida?
          </span>
          <span className="font-display text-xl leading-tight text-preto">manda pra mim →</span>
        </div>
        <div className="rounded-xl border-2 border-preto/15 bg-white p-2 shadow-[0_6px_24px_-8px_hsl(var(--preto)/0.35)] transition-transform group-hover:scale-105 group-hover:border-preto/40">
          <QRCodeSVG value={feedbackUrl} size={88} bgColor="#ffffff" fgColor="#090909" level="M" />
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
              className="relative flex flex-col items-center gap-8 rounded-3xl bg-bege p-12"
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
              <div className="eyebrow">vamos seguir conversando</div>
              <div className="font-display text-4xl leading-tight text-preto md:text-5xl">
                escolhe seu canal.
              </div>
              <div className="flex flex-col items-stretch gap-6 md:flex-row md:gap-8">
                {qrs.map((q) => (
                  <div
                    key={q.label}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-preto/10 bg-white/60 p-5"
                  >
                    <div className="font-display text-2xl leading-none text-preto">{q.label}</div>
                    <div className="rounded-xl bg-white p-4 shadow-[0_10px_40px_-12px_hsl(var(--preto)/0.4)]">
                      <QRCodeSVG
                        value={q.url}
                        size={220}
                        bgColor="#ffffff"
                        fgColor="#090909"
                        level="M"
                      />
                    </div>
                    <a
                      href={q.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] uppercase tracking-widest text-preto/60 transition-colors hover:text-laranja"
                    >
                      {q.sublabel}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
