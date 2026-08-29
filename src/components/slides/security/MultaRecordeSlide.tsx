import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { SlideShell } from "../SlideShell";
import { BrandLogo } from "../BrandLogo";

/** Maior multa por vazamento: Meta/Facebook, € 1,2 bi (GDPR, 2023). */
export default function MultaRecordeSlide() {
  const [started, setStarted] = useState(false);
  const value = useMotionValue(0);
  const display = useTransform(value, (v) => v.toFixed(1).replace(".", ","));

  useEffect(() => {
    const t = setTimeout(() => {
      setStarted(true);
      animate(value, 1.2, { duration: 2.2, ease: "easeOut" });
    }, 900);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <SlideShell background="naval" className="items-center justify-center text-center">
      <p className="eyebrow mb-10">a maior multa da história por vazamento</p>

      <motion.div
        className="flex items-center gap-8 mb-6"
        initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 160, damping: 14 }}
      >
        <div className="h-28 w-28 rounded-3xl border border-bege/15 bg-bege/5 flex items-center justify-center">
          <BrandLogo brand="meta" className="h-16 w-16 text-bege" />
        </div>
        <p className="font-display text-4xl text-bege/70">Meta · 2023</p>
      </motion.div>

      <motion.div
        className="flex items-baseline gap-4"
        animate={
          started
            ? { scale: [1, 1.06, 1], transition: { delay: 3.1, duration: 0.4 } }
            : undefined
        }
      >
        <span className="font-display text-[10rem] md:text-[13rem] leading-none text-laranja">€</span>
        <motion.span className="font-display text-[10rem] md:text-[13rem] leading-none text-laranja tabular-nums">
          {display}
        </motion.span>
        <span className="font-display text-5xl md:text-6xl text-bege/60">bi</span>
      </motion.div>

      <motion.p
        className="mt-8 text-2xl text-bege/70 max-w-[900px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.4 }}
      >
        transferiu dados de europeus pros EUA sem base legal.
      </motion.p>
      <motion.p
        className="mt-4 font-mono text-sm uppercase tracking-[0.3em] text-bege/35"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
      >
        GDPR — a irmã europeia da LGPD
      </motion.p>
    </SlideShell>
  );
}
