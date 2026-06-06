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

      <SocialQR
        url={INSTAGRAM_URL}
        label="instagram"
        sublabel="@gabreda"
        align="left"
        positionClass="bottom-40 left-8"
        delay={1.0}
      />
      <SocialQR
        url={WHATSAPP_URL}
        label="whatsapp"
        sublabel="11 94585-3553"
        align="left"
        positionClass="bottom-8 left-8"
        delay={1.1}
      />
      <FeedbackQR />
    </SlideShell>
  );
}

function SocialQR({
  url,
  label,
  sublabel,
  align,
  positionClass,
  delay,
}: {
  url: string;
  label: string;
  sublabel: string;
  align: "left" | "right";
  positionClass: string;
  delay: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setExpanded(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6 }}
        className={`group absolute z-30 flex flex-col gap-2 ${positionClass} ${
          align === "left" ? "items-start" : "items-end"
        }`}
        aria-label={`abrir QR de ${label}`}
      >
        <div
          className={`hidden flex-col ${align === "left" ? "items-start text-left" : "items-end text-right"} md:flex`}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-preto/60">{sublabel}</span>
          <span className="font-display text-xl leading-tight text-preto">
            {align === "left" ? `← ${label}` : `${label} →`}
          </span>
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
              <div className="eyebrow">{label}</div>
              <div className="font-display text-5xl leading-tight text-preto">{label}.</div>
              <div className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_-12px_hsl(var(--preto)/0.4)]">
                <QRCodeSVG value={url} size={320} bgColor="#ffffff" fgColor="#090909" level="M" />
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm uppercase tracking-widest text-preto/60 transition-colors hover:text-laranja"
              >
                {url.replace(/^https?:\/\//, "")}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
