import { useEffect } from "react";
import { motion } from "framer-motion";
import { LagrimaGradient } from "@/components/brand/LagrimaGradient";
import { SlideShell } from "./SlideShell";
import { EqualizerForce } from "@/components/stage/EqualizerForce";
import { useRoom, type Phase } from "@/contexts/RoomContext";

const PHASE_COPY: Record<Exclude<Phase, "idle">, { eyebrow: string; title: string }> = {
  pensando: { eyebrow: "no claude", title: "pensando." },
  gerando: { eyebrow: "no lovable", title: "construindo." },
  iterando: { eyebrow: "no lovable", title: "iterando." },
  publicando: { eyebrow: "publish", title: "subindo no ar." },
};

export function AltTabLiveSlide({ phase }: { phase: Exclude<Phase, "idle"> }) {
  const { room, isPresenter, setPhase } = useRoom();

  useEffect(() => {
    if (isPresenter && room && room.current_phase !== phase) {
      setPhase(phase);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, isPresenter, room?.id]);

  const copy = PHASE_COPY[phase];
  const force = room?.force_count ?? 0;

  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-12">
        <LagrimaGradient size={120} spinning className="animate-tear-spin-fast" />
        <div className="space-y-4 text-center">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="font-display text-[clamp(5rem,16vw,10.5rem)] leading-none">
            {copy.title}
          </h1>
          <p className="text-2xl opacity-50">tô no outro app. já volto.</p>
        </div>

        {/* Equalizer reativo ao ritmo de ⚡ — visceral, sem números */}
        <div className="flex flex-col items-center gap-3">
          <EqualizerForce force={force} width={420} height={90} bars={32} />
          <motion.p
            key={force}
            initial={{ scale: 1.15, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-xs uppercase tracking-widest opacity-60"
          >
            ⚡ {force} forças da plateia
          </motion.p>
        </div>
      </div>
    </SlideShell>
  );
}
