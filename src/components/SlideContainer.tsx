import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { X } from "lucide-react";
import { useSwipeable } from "@/hooks/useSwipeable";
import { useRoom } from "@/contexts/RoomContext";
import { useChromeVisibility } from "@/contexts/ChromeVisibilityContext";
import { SlideErrorBoundary } from "./SlideErrorBoundary";
import { slideManifest, TOTAL_SLIDES } from "@/slides/slideManifest";
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

/** Slide é "escuro" (fundo naval/preto)? Nesses casos não exibimos o watermark. */
function isDarkSlide(idx: number): boolean {
  const e = slideManifest[idx];
  if (!e) return false;
  if (e.kind === "static") return e.staticProps.background === "naval";
  return false;
}

function renderSlide(idx: number) {
  const e = slideManifest[idx];
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

const INSTAGRAM_LOGO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="#090909" stroke-width="1.8"/><rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#090909" stroke-width="1.5"/><circle cx="12" cy="12" r="3.3" fill="none" stroke="#090909" stroke-width="1.5"/><circle cx="17.2" cy="6.8" r="1" fill="#090909"/></svg>`
  );

const WHATSAPP_LOGO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#090909" d="M17.5 6.5A7.6 7.6 0 0 0 12 4a7.5 7.5 0 0 0-6.4 11.3L4.5 20l4.8-1.1A7.5 7.5 0 0 0 12 19.6h0a7.5 7.5 0 0 0 5.5-13.1Zm-5.5 11.6h0a6.2 6.2 0 0 1-3.2-.9l-.2-.1-2.8.7.7-2.7-.2-.3a6.2 6.2 0 1 1 5.7 3.3Zm3.5-4.6c-.2-.1-1.1-.5-1.3-.6s-.3-.1-.4.1-.5.6-.6.7-.2.1-.4 0a5.1 5.1 0 0 1-2.5-2.2c-.2-.3.2-.3.5-1a.4.4 0 0 0 0-.4l-.6-1.4c-.2-.4-.3-.3-.4-.3h-.4a.7.7 0 0 0-.5.2 2 2 0 0 0-.6 1.5 3.5 3.5 0 0 0 .7 1.9 8 8 0 0 0 3.1 2.7c1.8.7 1.8.5 2.2.4a1.8 1.8 0 0 0 1.2-.8 1.4 1.4 0 0 0 .1-.8c0-.1-.2-.2-.3-.3Z"/></svg>`
  );

function FinalFeedbackQR() {
  const [expanded, setExpanded] = useState(false);
  const feedbackUrl =
    typeof window !== "undefined" ? `${window.location.origin}/feedback` : "/feedback";
  const qrs = [
    { label: "instagram", sublabel: "@gabreda", url: "https://instagram.com/gabreda", logo: INSTAGRAM_LOGO },
    { label: "whatsapp", sublabel: "11 94585-3553", url: "https://wa.me/5511945853553", logo: WHATSAPP_LOGO },
    { label: "feedback", sublabel: "me conta o que ficou", url: feedbackUrl, logo: null as string | null },
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
                        level="H"
                        imageSettings={
                          q.logo
                            ? { src: q.logo, height: 44, width: 44, excavate: true }
                            : undefined
                        }
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
