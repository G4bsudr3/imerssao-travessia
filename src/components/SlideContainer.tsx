import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { X } from "lucide-react";
import { useSwipeable } from "@/hooks/useSwipeable";
import { useRoom } from "@/contexts/RoomContext";
import { useChromeVisibility } from "@/contexts/ChromeVisibilityContext";
import { useEvent } from "@/contexts/EventContext";
import { SlideErrorBoundary } from "./SlideErrorBoundary";
import type { SlideEntry } from "@/events/travessia/manifest";
import { StageProgress } from "./stage/StageProgress";
import { preloadSlideAssets } from "@/lib/preload-assets";
import { SlideStatic } from "./slides/SlideStatic";
import { CoverSlide } from "./slides/CoverSlide";
import { LobbySlide } from "./slides/LobbySlide";
import { PulseCheckSlide } from "./slides/PulseCheckSlide";
import { BrainstormQuestion, BrainstormActive, BrainstormSettled } from "./slides/BrainstormSlides";
import { PollSlide } from "./slides/PollSlide";
import { FinalSlide } from "./slides/CelebrationSlides";
import { CodeBlockSlide } from "./slides/security/CodeBlockSlide";
import { RiskTableSlide } from "./slides/security/RiskTableSlide";
import { ComparisonSlide } from "./slides/security/ComparisonSlide";
import { PromptCardSlide } from "./slides/security/PromptCardSlide";
import { LockVisualSlide } from "./slides/security/LockVisualSlide";
import { LagrimaGradient } from "./brand/LagrimaGradient";
import type { EventContacts } from "@/events/types";

/** Slide é "escuro" (fundo naval/preto)? Nesses casos não exibimos o watermark. */
function isDarkSlide(manifest: SlideEntry[], idx: number): boolean {
  const e = manifest[idx];
  if (!e) return false;
  if (e.kind === "static") return e.staticProps.background === "naval";
  return false;
}

function renderSlide(manifest: SlideEntry[], idx: number) {
  const e = manifest[idx];
  if (!e) return null;
  if (e.kind === "static") return <SlideStatic {...e.staticProps} />;

  switch (e.component) {
    case "CoverSlide":
      return <CoverSlide variant="intro" />;
    case "LobbySlide": return <LobbySlide />;
    case "FinalSlide": return <FinalSlide />;
    case "PulseCheckSlide": return <PulseCheckSlide {...(e.props ?? {})} />;
    case "PollSlide": return <PollSlide {...(e.props ?? {})} />;
    case "BrainstormQuestion": {
      const p = e.props ?? { slideKey: "brainstorm", question: "" };
      return <BrainstormQuestion slideKey={p.slideKey} question={p.question} />;
    }
    case "BrainstormActive": return <BrainstormActive slideKey="brainstorm" />;
    case "BrainstormSettled": return <BrainstormSettled slideKey="brainstorm" />;
    case "CodeBlockSlide": return <CodeBlockSlide {...e.props} />;
    case "RiskTableSlide": return <RiskTableSlide {...e.props} />;
    case "ComparisonSlide": return <ComparisonSlide {...e.props} />;
    case "PromptCardSlide": return <PromptCardSlide {...e.props} />;
    case "LockVisualSlide": return <LockVisualSlide {...e.props} />;
    default: {
      const _exhaustive: never = e;
      void _exhaustive;
      return <div className="p-8 font-mono">slide TODO</div>;
    }
  }
}

export function SlideContainer() {
  const { currentSlide, setSlide, isPresenter } = useRoom();
  const { visible } = useChromeVisibility();
  const currentSlideRef = useRef(currentSlide);

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  // Preload de todas as imagens dos slides assim que a stage monta.
  useEffect(() => { preloadSlideAssets(); }, []);

  const go = useCallback((delta: 1 | -1) => {
    if (!isPresenter) return;
    const target = Math.min(Math.max(currentSlideRef.current + delta, 0), TOTAL_SLIDES - 1);
    currentSlideRef.current = target;
    setSlide(target);
  }, [isPresenter, setSlide]);

  const next = useCallback(() => go(1), [go]);
  const prev = useCallback(() => go(-1), [go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isPresenter) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
      else if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
      }
      else if (e.key === "Escape" && document.fullscreenElement) document.exitFullscreen?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresenter, next, prev]);

  const swipe = useSwipeable({ onSwipeLeft: next, onSwipeRight: prev });
  const entry = slideManifest[currentSlide];

  return (
    <div {...swipe} className="relative h-screen w-screen overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={entry?.key ?? currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <SlideErrorBoundary slideKey={entry?.key ?? String(currentSlide)}>
            {renderSlide(currentSlide)}
          </SlideErrorBoundary>
        </motion.div>
      </AnimatePresence>


      {entry?.key === "vai_la_proteja" && <FinalFeedbackQR />}

      {/* Progress bar topo (auto-hide com chrome) */}
      <StageProgress current={currentSlide} visible={visible} />
    </div>
  );
}

function FinalFeedbackQR() {
  const [expanded, setExpanded] = useState(false);
  const feedbackUrl =
    typeof window !== "undefined" ? `${window.location.origin}/feedback` : "/feedback";
  const qrs = [
    { label: "instagram", sublabel: "@gabreda", url: "https://instagram.com/gabreda" },
    { label: "whatsapp", sublabel: "11 94585-3553", url: "https://wa.me/5511945853553" },
    { label: "feedback", sublabel: "me conta o que ficou", url: feedbackUrl },
  ];


  return (
    <>
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="absolute bottom-8 right-8 z-40 flex flex-col items-end gap-2 transition-transform hover:scale-105"
        aria-label="abrir QR codes de contato"
      >
        <div className="hidden flex-col items-end text-right md:flex">
          <span className="font-mono text-[10px] uppercase tracking-widest text-preto/60">ficou alguma dúvida?</span>
          <span className="font-display text-xl leading-tight text-preto">manda pra mim →</span>
        </div>
        <div className="rounded-xl border-2 border-preto/15 bg-white p-2 shadow-[0_6px_24px_-8px_hsl(var(--preto)/0.35)]">
          <QRCodeSVG value={feedbackUrl} size={88} bgColor="#ffffff" fgColor="#090909" level="M" />
        </div>
      </button>

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
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-preto bg-white text-preto shadow-lg"
                aria-label="fechar"
              >
                <X className="h-6 w-6" strokeWidth={2.5} />
              </button>
              <div className="eyebrow">vamos seguir conversando</div>
              <div className="font-display text-4xl leading-tight text-preto md:text-5xl">escolhe seu canal.</div>
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
