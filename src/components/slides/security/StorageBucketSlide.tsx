import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Image, FileLock2, Link2, Globe, Timer, Check } from "lucide-react";
import { SlideShell } from "../SlideShell";

type Item = { label: string; sub?: string; accent?: boolean };

type Props = {
  eyebrow?: string;
  title?: string;
  /** rótulo do conceito — default "bucket" (use "pasta" em decks menos técnicos) */
  bucketLabel?: string;
  items?: Item[];
  background?: "bege" | "naval" | "accent";
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } }),
};

const FILES = [
  { name: "nota_fiscal.pdf", Icon: FileText },
  { name: "rg_frente.jpg", Icon: Image },
  { name: "contrato.docx", Icon: FileLock2 },
];

/** Bucket desenhado em SVG: tampa + corpo, nas cores do tema. */
function Bucket({ locked }: { locked: boolean }) {
  return (
    <svg viewBox="0 0 200 170" className="w-full max-w-[220px]" aria-hidden>
      {/* tampa */}
      <motion.rect
        x="30" y="18" width="140" height="26" rx="10"
        className={locked ? "fill-laranja" : "fill-red-500"}
        animate={locked ? { y: 0 } : { y: [-4, -10, -4], rotate: [-2, -5, -2] }}
        transition={locked ? { duration: 0.4 } : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "100px", originY: "31px" }}
      />
      {/* corpo */}
      <path
        d="M38 52 h124 l-12 100 a12 12 0 0 1 -12 10 h-76 a12 12 0 0 1 -12 -10 z"
        className={locked ? "fill-laranja/15 stroke-laranja" : "fill-red-500/10 stroke-red-500"}
        strokeWidth="4"
      />
      {/* furos / detalhe */}
      <line x1="60" y1="80" x2="66" y2="140" className={locked ? "stroke-laranja/50" : "stroke-red-500/40"} strokeWidth="4" strokeLinecap="round" />
      <line x1="140" y1="80" x2="134" y2="140" className={locked ? "stroke-laranja/50" : "stroke-red-500/40"} strokeWidth="4" strokeLinecap="round" />
      {/* cadeado no centro quando privado */}
      {locked && (
        <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.4 }}>
          <rect x="82" y="92" width="36" height="30" rx="7" className="fill-laranja" />
          <path d="M88 92 v-8 a12 12 0 0 1 24 0 v8" fill="none" className="stroke-laranja" strokeWidth="6" />
          <circle cx="100" cy="106" r="4.5" className="fill-preto" />
          <rect x="98.4" y="107" width="3.2" height="9" rx="1.6" className="fill-preto" />
        </motion.g>
      )}
    </svg>
  );
}

/** Countdown da URL assinada — reinicia ao chegar em 0. */
function useCountdown(from = 60) {
  const [s, setS] = useState(from);
  useEffect(() => {
    const id = setInterval(() => setS((v) => (v <= 1 ? from : v - 1)), 1000);
    return () => clearInterval(id);
  }, [from]);
  return s;
}

export function StorageBucketSlide({ eyebrow, title, bucketLabel = "bucket", items = [], background = "naval" }: Props) {
  const secs = useCountdown(60);
  const dark = background !== "bege";
  const card = dark ? "border-2 border-bege/15 bg-bege/[0.05]" : "border-2 border-preto/10 bg-white/70";

  return (
    <SlideShell background={background}>
      <div className="flex h-full w-full max-w-[1500px] flex-col justify-center gap-[clamp(0.9rem,2.2vh,1.8rem)] py-[clamp(1rem,3vh,2.5rem)]">
        <div>
          {eyebrow && (
            <motion.div initial="hidden" animate="show" variants={fade} className="eyebrow mb-2">
              {eyebrow}
            </motion.div>
          )}
          {title && (
            <motion.h1 initial="hidden" animate="show" variants={fade} custom={1} className="font-display leading-[1.05] text-[clamp(1.75rem,3.6vw,2.75rem)]">
              {title}
            </motion.h1>
          )}
        </div>

        <div className="grid grid-cols-1 gap-[clamp(0.75rem,1.5vw,1.5rem)] md:grid-cols-2">
          {/* público — vazando */}
          <motion.div initial="hidden" animate="show" variants={fade} custom={2} className={`relative overflow-hidden rounded-2xl p-[clamp(1rem,2vw,2rem)] text-left ${card}`}>
            <div className="eyebrow mb-3 flex items-center gap-2 text-red-500">
              <Globe className="h-5 w-5" /> {bucketLabel} público
            </div>
            <div className="flex items-center gap-6">
              <div className="relative flex-shrink-0">
                <Bucket locked={false} />
                {/* arquivos vazando */}
                {FILES.map((f, i) => (
                  <motion.div
                    key={f.name}
                    className="absolute left-1/2 top-6 flex items-center gap-2 rounded-lg border border-red-500/40 bg-preto/80 px-3 py-1.5 font-mono text-sm text-red-400 whitespace-nowrap"
                    initial={{ opacity: 0, x: "-50%", y: 0 }}
                    animate={{ opacity: [0, 1, 1, 0], x: ["-50%", `${20 + i * 26}%`], y: [-10, -110 - i * 24] }}
                    transition={{ duration: 3.2, repeat: Infinity, delay: i * 1.05, ease: "easeOut" }}
                  >
                    <f.Icon className="h-4 w-4" /> {f.name}
                  </motion.div>
                ))}
              </div>
              <div className="min-w-0 space-y-3">
                <p className="font-display text-[clamp(1.3rem,2.2vw,1.9rem)] leading-tight">quem tem o link, baixa.</p>
                <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 font-mono text-[clamp(0.8rem,1.1vw,1rem)] text-red-400 break-all">
                  <Link2 className="h-4 w-4 flex-shrink-0" />
                  /storage/v1/object/public/{bucketLabel}/rg_frente.jpg
                </div>
                <p className="opacity-70 text-[clamp(1rem,1.3vw,1.25rem)]">URL pública e eterna — indexável, copiável, sem dono.</p>
              </div>
            </div>
          </motion.div>

          {/* privado — URL assinada */}
          <motion.div initial="hidden" animate="show" variants={fade} custom={3} className="rounded-2xl border-2 border-laranja/40 bg-laranja/[0.06] p-[clamp(1rem,2vw,2rem)] text-left">
            <div className="eyebrow mb-3 flex items-center gap-2 text-laranja">
              <FileLock2 className="h-5 w-5" /> {bucketLabel} privado + URL assinada
            </div>
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <Bucket locked />
              </div>
              <div className="min-w-0 space-y-3">
                <p className="font-display text-[clamp(1.3rem,2.2vw,1.9rem)] leading-tight">acesso temporário, que expira.</p>
                <div className="flex items-center gap-2 rounded-lg bg-laranja/10 border border-laranja/30 px-3 py-2 font-mono text-[clamp(0.8rem,1.1vw,1rem)] text-laranja break-all">
                  <Timer className="h-4 w-4 flex-shrink-0" />
                  ?token=… · expira em {String(Math.floor(secs / 60))}:{String(secs % 60).padStart(2, "0")}
                </div>
                <p className="opacity-70 text-[clamp(1rem,1.3vw,1.25rem)]">passou o prazo, o link morre. sem link eterno circulando.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* checklist */}
        {items.length > 0 && (
          <ul className="grid grid-cols-1 gap-[clamp(0.5rem,1.2vh,0.9rem)] md:grid-cols-2">
            {items.map((it, i) => (
              <motion.li
                key={i}
                initial="hidden"
                animate="show"
                variants={fade}
                custom={4 + i}
                className={`flex items-start gap-3 rounded-xl px-4 py-3 text-left ${
                  it.accent ? "bg-laranja text-preto" : dark ? "bg-bege/[0.05] border border-bege/10" : "bg-white/60 border border-preto/10"
                }`}
              >
                <span className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${it.accent ? "bg-preto text-laranja" : "bg-laranja text-preto"}`}>
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[clamp(1.05rem,1.6vw,1.4rem)] leading-tight [overflow-wrap:anywhere]">{it.label}</span>
                  {it.sub && <span className={`mt-1 block text-[clamp(0.95rem,1.2vw,1.15rem)] ${it.accent ? "text-preto/70" : "opacity-70"}`}>{it.sub}</span>}
                </span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </SlideShell>
  );
}

export default StorageBucketSlide;
