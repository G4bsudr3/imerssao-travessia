import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { LagrimaGradient } from "@/components/brand/LagrimaGradient";
import { BalaoSerrado } from "@/components/brand/BalaoSerrado";
import { CONFETTI_PALETTE } from "@/lib/colors";
import { SlideShell } from "./SlideShell";

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
  const [phase, setPhase] = useState<"build" | "protect">("build");

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    const end = Date.now() + 4000;
    const tick = () => {
      confetti({ particleCount: 120, spread: 140, origin: { y: 0.6 }, colors: CONFETTI_PALETTE });
      if (Date.now() < end) requestAnimationFrame(tick);
    };
    tick();

    // Após ~2.4s, "protege" entra atropelando "constrói"
    const t = setTimeout(() => setPhase("protect"), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-12">
        <LagrimaGradient size={280} spinning morphing={phase === "protect"} />

        {/* "vai lá e [constrói|protege]" — segunda palavra é substituída com animação de atropelo */}
        <BalaoSerrado variant="accent" className="!text-7xl md:!text-9xl">
          <span className="inline-flex items-baseline gap-[0.35em] whitespace-nowrap">
            <span>vai lá e</span>
            <span
              className="relative inline-block overflow-hidden align-baseline"
              style={{ minWidth: "5.2em", height: "1.05em" }}
              aria-live="polite"
            >
              {/* "constrói" sai sendo empurrada pra esquerda + fade */}
              <motion.span
                className="absolute inset-0 flex items-baseline"
                initial={{ x: 0, opacity: 1 }}
                animate={
                  phase === "protect"
                    ? { x: "-110%", opacity: 0, filter: "blur(6px)" }
                    : { x: 0, opacity: 1, filter: "blur(0px)" }
                }
                transition={{ duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
              >
                constrói.
              </motion.span>

              {/* "protege" entra de fora atropelando, com leve overshoot */}
              <motion.span
                className="absolute inset-0 flex items-baseline text-laranja"
                initial={{ x: "110%", opacity: 0, filter: "blur(6px)" }}
                animate={
                  phase === "protect"
                    ? { x: 0, opacity: 1, filter: "blur(0px)" }
                    : { x: "110%", opacity: 0, filter: "blur(6px)" }
                }
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                  delay: phase === "protect" ? 0.08 : 0,
                }}
              >
                protege.
              </motion.span>
            </span>
          </span>
        </BalaoSerrado>

        <div className="eyebrow">obrigado, POA. — frattz</div>
      </div>
    </SlideShell>
  );
}
