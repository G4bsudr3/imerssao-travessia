import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

      {/* Progress bar topo (auto-hide com chrome) */}
      <StageProgress current={currentSlide} visible={visible} />
    </div>
  );
}
