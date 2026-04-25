import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
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
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    const end = Date.now() + 4000;
    const tick = () => {
      confetti({ particleCount: 120, spread: 140, origin: { y: 0.6 }, colors: CONFETTI_PALETTE });
      if (Date.now() < end) requestAnimationFrame(tick);
    };
    tick();
  }, []);

  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-12">
        <LagrimaGradient size={280} spinning />
        <BalaoSerrado variant="accent" className="!text-7xl md:!text-9xl">vai lá e cria.</BalaoSerrado>
        <div className="eyebrow">obrigado, POA. — frattz</div>
      </div>
    </SlideShell>
  );
}
