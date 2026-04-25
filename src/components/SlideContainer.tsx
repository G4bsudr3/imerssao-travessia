import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipeable } from "@/hooks/useSwipeable";
import { useRoom, type Phase } from "@/contexts/RoomContext";
import { useChromeVisibility } from "@/contexts/ChromeVisibilityContext";
import { SlideErrorBoundary } from "./SlideErrorBoundary";
import { slideManifest, TOTAL_SLIDES } from "@/slides/slideManifest";
import { StageProgress } from "./stage/StageProgress";
import { PresentationTimer } from "./stage/PresentationTimer";
import { preloadSlideAssets } from "@/lib/preload-assets";
import { PersistentSessionQR } from "./stage/PersistentSessionQR";
import { SlideStatic } from "./slides/SlideStatic";
import { CoverSlide } from "./slides/CoverSlide";
import { LobbySlide } from "./slides/LobbySlide";
import { PulseCheckSlide } from "./slides/PulseCheckSlide";
import { SentimentQuestion, SentimentCards, SentimentAnalysis, SentimentQuotes } from "./slides/SentimentSlides";
import { BrainstormQuestion, BrainstormActive, BrainstormSettled } from "./slides/BrainstormSlides";
import { VotingActive, VotingWinner } from "./slides/VotingSlides";
import { AltTabLiveSlide } from "./slides/AltTabLiveSlide";
import { IterationLoopSlide } from "./slides/IterationLoopSlide";
import { PollSlide } from "./slides/PollSlide";
import { PublishUrl, PublishQr } from "./slides/PublishSlides";
import { CelebrationSlide, FinalSlide } from "./slides/CelebrationSlides";
import { OiSlide, BuildIntro, AbrindoClaude, AbrindoLovable, PublishPrompt, IterPronta } from "./slides/MiscSpecialSlides";
import {
  NoComecoSlide,
  NoMeioSlide,
  OposicaoIntroSlide,
  QuadroOposicaoClarezaSlide,
  HojeSlideRich,
  ProvaSocialSlide,
  SucessoMedidaErradaSlide,
  SucessoMedidaCertaSlide,
  NavalCorpoMenteSlide,
  NavalIteracoesSlide,
  NavalVibeCodingSlide,
  IAComprimeSlide,
  DesignXSharpSlide,
  UmEPoucoSlide,
  MegazordVisualSlide,
  LovableNumbersSlide,
  LovableUsadoPorSlide,
  LovableUneTimesSlide,
  RegraDoJogoMVPSlide,
  FramePIROSlide,
} from "./slides/NarrativeSlides";
import {
  BH1900Slide,
  VieramCarrosSlide,
  EncurtouCaminhoSlide,
  MatouProfissoesSlide,
  ProfissoesSurgiramSlide,
  VieramAvioesSlide,
  AviaoNaoMatouSlide,
  EncurtouMaisSlide,
  TrabalhoMudaSlide,
  IAFazendoSlide,
  NadaNovoSlide,
  MaisFacilSlide,
  HumanoSeOcuparSlide,
  RiscoCharreteSlide,
  EAgoraIASlide,
} from "./slides/MundoMudouSlides";

function renderSlide(idx: number) {
  const e = slideManifest[idx];
  if (!e) return null;
  if (e.kind === "static") return <SlideStatic {...e.staticProps} />;

  switch (e.component) {
    case "CoverSlide":
      return <CoverSlide variant={e.key === "vai_la_e_cria" ? "final" : e.key === "build_intro" ? "build" : "intro"} />;
    case "LobbySlide": return <LobbySlide />;
    case "PulseCheckSlide": return <PulseCheckSlide />;
    case "SentimentQuestion": return <SentimentQuestion />;
    case "SentimentCards": return <SentimentCards />;
    case "SentimentAnalysis": return <SentimentAnalysis />;
    case "SentimentQuotes": return <SentimentQuotes />;
    case "OiSlide": return <OiSlide />;
    case "NoComecoSlide": return <NoComecoSlide />;
    case "NoMeioSlide": return <NoMeioSlide />;
    case "OposicaoIntroSlide": return <OposicaoIntroSlide />;
    case "QuadroOposicaoClarezaSlide": return <QuadroOposicaoClarezaSlide />;
    case "HojeSlideRich": return <HojeSlideRich />;
    case "ProvaSocialSlide": return <ProvaSocialSlide />;
    case "SucessoMedidaErradaSlide": return <SucessoMedidaErradaSlide />;
    case "SucessoMedidaCertaSlide": return <SucessoMedidaCertaSlide />;
    case "NavalCorpoMenteSlide": return <NavalCorpoMenteSlide />;
    case "NavalIteracoesSlide": return <NavalIteracoesSlide />;
    case "NavalVibeCodingSlide": return <NavalVibeCodingSlide />;
    case "IAComprimeSlide": return <IAComprimeSlide />;
    case "DesignXSharpSlide": return <DesignXSharpSlide />;
    case "UmEPoucoSlide": return <UmEPoucoSlide />;
    case "MegazordVisualSlide": return <MegazordVisualSlide />;
    case "LovableNumbersSlide": return <LovableNumbersSlide />;
    case "LovableUsadoPorSlide": return <LovableUsadoPorSlide />;
    case "LovableUneTimesSlide": return <LovableUneTimesSlide />;
    case "RegraDoJogoMVPSlide": return <RegraDoJogoMVPSlide />;
    case "FramePIROSlide": return <FramePIROSlide />;
    case "BuildIntro": return <BuildIntro />;
    case "BrainstormQuestion": return <BrainstormQuestion slideKey="brainstorm" question="qual problema do dia a dia você quer resolver?" />;
    case "BrainstormActive": return <BrainstormActive slideKey="brainstorm" />;
    case "BrainstormSettled": return <BrainstormSettled slideKey="brainstorm" />;
    case "VotingActive": return <VotingActive />;
    case "VotingWinner": return <VotingWinner />;
    case "AbrindoClaude": return <AbrindoClaude />;
    case "AltTabLiveSlide": {
      const phase = (e.props?.phase as Phase) ?? "pensando";
      return <AltTabLiveSlide phase={phase as Exclude<Phase, "idle">} />;
    }
    case "PollSlide": return <PollSlide />;
    case "AbrindoLovable": return <AbrindoLovable />;
    case "PrimeiraVersao": return <IterPronta count={1} />;
    case "IterationLoopSlide": return <IterationLoopSlide />;
    case "PublishPrompt": return <PublishPrompt />;
    case "PublishUrl": return <PublishUrl />;
    case "PublishQr": return <PublishQr />;
    case "CelebrationSlide": return <CelebrationSlide message="tá no ar." />;
    case "FinalSlide": return <FinalSlide />;
    case "BH1900Slide": return <BH1900Slide />;
    case "VieramCarrosSlide": return <VieramCarrosSlide />;
    case "EncurtouCaminhoSlide": return <EncurtouCaminhoSlide />;
    case "MatouProfissoesSlide": return <MatouProfissoesSlide />;
    case "ProfissoesSurgiramSlide": return <ProfissoesSurgiramSlide />;
    case "VieramAvioesSlide": return <VieramAvioesSlide />;
    case "AviaoNaoMatouSlide": return <AviaoNaoMatouSlide />;
    case "EncurtouMaisSlide": return <EncurtouMaisSlide />;
    case "TrabalhoMudaSlide": return <TrabalhoMudaSlide />;
    case "IAFazendoSlide": return <IAFazendoSlide />;
    case "NadaNovoSlide": return <NadaNovoSlide />;
    case "MaisFacilSlide": return <MaisFacilSlide />;
    case "HumanoSeOcuparSlide": return <HumanoSeOcuparSlide />;
    case "RiscoCharreteSlide": return <RiscoCharreteSlide />;
    case "EAgoraIASlide": return <EAgoraIASlide />;
    default: return <div className="p-8 font-mono">slide TODO: {e.component}</div>;
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

      {/* Cronômetro regressivo 70min — canto superior esquerdo */}
      <PresentationTimer visible={visible} />

      {/* QR persistente da sessão — canto inferior direito.
          Esconde no Lobby (já tem QR gigante lá). */}
      {entry?.key !== "lobby" && <PersistentSessionQR visible={visible} />}

      {/* Slide key debug removido — sobrepunha conteúdo dos slides */}
    </div>
  );
}
