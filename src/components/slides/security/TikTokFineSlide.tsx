import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import { SlideShell } from "../SlideShell";

/** Logo do TikTok (nota musical com glitch ciano/magenta da marca). */
function TikTokLogo({ className }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className ?? ""}`} aria-label="TikTok">
      <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
        {/* sombra glitch ciano */}
        <path
          d="M34.6 6h-7.1v26.4a7.6 7.6 0 1 1-7.6-7.6c.4 0 .8 0 1.2.1v-7.4a15 15 0 0 0-1.2-.1 15 15 0 1 0 15 15V17.4a16.6 16.6 0 0 0 9.7 3.1v-7.3A9.9 9.9 0 0 1 34.6 6Z"
          fill="#25F4EE"
          transform="translate(-1.6,1.6)"
        />
        {/* sombra glitch magenta */}
        <path
          d="M34.6 6h-7.1v26.4a7.6 7.6 0 1 1-7.6-7.6c.4 0 .8 0 1.2.1v-7.4a15 15 0 0 0-1.2-.1 15 15 0 1 0 15 15V17.4a16.6 16.6 0 0 0 9.7 3.1v-7.3A9.9 9.9 0 0 1 34.6 6Z"
          fill="#FE2C55"
          transform="translate(1.6,-1.6)"
        />
        {/* nota principal */}
        <path
          d="M34.6 6h-7.1v26.4a7.6 7.6 0 1 1-7.6-7.6c.4 0 .8 0 1.2.1v-7.4a15 15 0 0 0-1.2-.1 15 15 0 1 0 15 15V17.4a16.6 16.6 0 0 0 9.7 3.1v-7.3A9.9 9.9 0 0 1 34.6 6Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

/** Selo "carimbo" da ANPD que estampa por cima. */
function AnpdSeal() {
  return (
    <motion.div
      initial={{ scale: 2.4, opacity: 0, rotate: -18 }}
      animate={{ scale: 1, opacity: 1, rotate: -9 }}
      transition={{ delay: 1.15, type: "spring", stiffness: 320, damping: 17 }}
      className="pointer-events-none absolute -right-[6%] -top-[14%] z-10 flex h-[clamp(6.5rem,13vw,11rem)] w-[clamp(6.5rem,13vw,11rem)] items-center justify-center rounded-full border-[3px] border-laranja/90"
      style={{ boxShadow: "0 0 0 4px rgba(0,0,0,0.25), inset 0 0 0 2px rgba(0,0,0,0.2)" }}
    >
      <div className="flex h-[82%] w-[82%] flex-col items-center justify-center rounded-full border-2 border-dashed border-laranja/70 text-center">
        <span className="font-display text-[clamp(1.1rem,2.2vw,1.9rem)] leading-none text-laranja">ANPD</span>
        <span className="mt-1 font-mono text-[clamp(0.5rem,0.8vw,0.7rem)] uppercase tracking-[0.18em] text-laranja/85">
          autuação · lgpd
        </span>
      </div>
    </motion.div>
  );
}

function useCountUp(target: number, start: boolean, duration = 1.6) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [start, target, duration]);
  return value;
}

const BULLETS = [
  "dados de crianças e adolescentes tratados sem base legal",
  "maior multa da história da ANPD",
  "ByteDance obrigada a plano de conformidade",
];

export function TikTokFineSlide() {
  // sequência: logo (0s) → selo (1.15s) → contador (1.9s) → bullets (2.9s+)
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 1900), // inicia contador
      window.setTimeout(() => setPhase(2), 2900), // bullets
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const amount = useCountUp(153.7, phase >= 1);
  const formatted = amount.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <SlideShell background="naval">
      <div className="flex h-full w-full max-w-[1500px] flex-col justify-center gap-[clamp(1rem,3vh,2.5rem)] py-[clamp(1rem,3vh,2.5rem)]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-2"
          >
            caso real · 25.08.2026
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-display leading-[1.05] text-[clamp(1.75rem,3.6vw,2.75rem)]"
          >
            a conta chegou. e foi grande.
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 items-center gap-[clamp(1rem,3vw,3rem)] md:grid-cols-[auto_1fr]">
          {/* card TikTok + selo */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
            transition={{ delay: 0.35, type: "spring", stiffness: 120, damping: 14 }}
            className="relative mx-auto flex w-full max-w-[420px] flex-col items-center gap-3 rounded-2xl border-2 border-bege/15 bg-bege/[0.05] p-[clamp(1.25rem,2.5vw,2.25rem)]"
          >
            <AnpdSeal />
            <TikTokLogo className="h-[clamp(4.5rem,9vw,7.5rem)] w-[clamp(4.5rem,9vw,7.5rem)] text-bege" />
            <div className="font-display text-[clamp(1.4rem,2.4vw,2.1rem)] leading-none">TikTok</div>
            <div className="font-mono text-[clamp(0.7rem,1vw,0.9rem)] uppercase tracking-[0.2em] opacity-60">
              ByteDance · processo administrativo
            </div>
          </motion.div>

          {/* valor + bullets */}
          <div className="text-left">
            <div className="eyebrow mb-1">multa aplicada</div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="font-display leading-none text-laranja text-[clamp(3rem,7.5vw,6.5rem)]"
            >
              R$ {formatted}
              <span className="ml-2 text-[0.45em] align-baseline">milhões</span>
            </motion.div>

            <ul className="mt-[clamp(1rem,2.5vh,1.75rem)] space-y-2">
              {BULLETS.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -18 }}
                  animate={phase >= 2 ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.22, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 text-[clamp(1.05rem,1.5vw,1.4rem)] opacity-90"
                >
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-laranja" />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>

            <motion.p
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 0.6 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-[clamp(1rem,2.5vh,1.75rem)] font-mono text-[clamp(0.75rem,1vw,0.95rem)] uppercase tracking-[0.15em]"
            >
              se deu pro TikTok, imagina pra você.
            </motion.p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
