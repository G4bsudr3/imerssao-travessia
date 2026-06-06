import { motion } from "framer-motion";
import { useEvent } from "@/contexts/EventContext";

type Props = {
  current: number;
  visible: boolean;
};

// Barra de progresso fina no topo. Mostra progresso global + marcações dos atos.
export function StageProgress({ current, visible }: Props) {
  const { event, actForSlide } = useEvent();
  const total = event.totalSlides;
  const pct = ((current + 1) / total) * 100;
  const meta = actForSlide(current);

  // posições dos atos (em %) — usa o opener de cada ato como marcador
  const markers = event.acts.openerIndices.map((i) => (i / total) * 100);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 chrome-fade ${
        visible ? "chrome-visible" : "chrome-hidden"
      }`}
    >
      <div className="relative h-[3px] w-full bg-preto/10">
        <motion.div
          className="absolute inset-y-0 left-0 bg-laranja"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {markers.map((m, i) => (
          <div
            key={i}
            className="absolute top-0 h-[3px] w-px bg-preto/40"
            style={{ left: `${m}%` }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between px-4 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-preto/60">
        <span>
          ato {meta.number} · {meta.name}
        </span>
        <span>
          {String(current + 1).padStart(2, "0")} / {total}
        </span>
      </div>
    </div>
  );
}
