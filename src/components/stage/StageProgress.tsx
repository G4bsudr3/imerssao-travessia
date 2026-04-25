import { motion } from "framer-motion";
import { TOTAL_SLIDES } from "@/slides/slideManifest";
import { actForSlide, ACTS } from "@/lib/acts";

type Props = {
  current: number;
  visible: boolean;
};

// Barra de progresso fina no topo. Mostra progresso global + marcações dos atos.
export function StageProgress({ current, visible }: Props) {
  const pct = ((current + 1) / TOTAL_SLIDES) * 100;
  const act = actForSlide(current);
  const meta = ACTS[act];

  // posições dos atos (em %)
  const markers = [1, 8, 26, 52].map((i) => (i / TOTAL_SLIDES) * 100);

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
          {String(current + 1).padStart(2, "0")} / {TOTAL_SLIDES}
        </span>
      </div>
    </div>
  );
}
