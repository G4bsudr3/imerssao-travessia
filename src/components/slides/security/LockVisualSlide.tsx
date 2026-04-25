import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import { SlideShell } from "../SlideShell";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  state: "open" | "closed";
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } }),
};

/**
 * Lágrima-cofre: reusa a forma da gota do brand, mas com tratamento de "segurança".
 * - state="closed": gota inteira, gradient brand, Lock no centro
 * - state="open": gota parte ao meio com rachadura jagged, metades se afastam,
 *   cacos voam, gradient avermelhado, Unlock revelado
 */

// Path completo da lágrima (referência)
const TEAR_FULL = "M50 5 C 50 5, 12 55, 12 80 a 38 38 0 0 0 76 0 C 88 55, 50 5, 50 5 Z";
// Metade esquerda recortada por linha de fratura jagged no eixo central
const TEAR_LEFT = "M50 5 C 50 5, 12 55, 12 80 a 38 38 0 0 0 38 38 L 47 102 L 53 86 L 46 70 L 52 54 L 47 38 L 51 22 Z";
// Metade direita (espelho)
const TEAR_RIGHT = "M50 5 C 50 5, 88 55, 88 80 a 38 38 0 0 1 -38 38 L 47 102 L 53 86 L 46 70 L 52 54 L 47 38 L 51 22 Z";

function LagrimaCofre({ state, size = 280 }: { state: "open" | "closed"; size?: number }) {
  const Icon = state === "open" ? Unlock : Lock;
  const isOpen = state === "open";
  const gradId = isOpen ? "tearGradOpen" : "tearGradClosed";

  return (
    <div className="relative" style={{ width: size, height: size * 1.25 }}>
      <svg
        width={size}
        height={size * 1.25}
        viewBox="0 0 100 125"
        className="absolute inset-0 drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient id="tearGradClosed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fe7b02" />
            <stop offset="50%" stopColor="#f756a6" />
            <stop offset="100%" stopColor="#6f77fc" />
          </linearGradient>
          <linearGradient id="tearGradOpen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fe7b02" />
            <stop offset="55%" stopColor="#e23a3a" />
            <stop offset="100%" stopColor="#7a1212" />
          </linearGradient>
          {/* sombra interna nas bordas da fratura */}
          <linearGradient id="crackShadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="50%" stopColor="rgba(0,0,0,0.55)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>

        {isOpen ? (
          <>
            {/* fundo escuro revelado pela rachadura */}
            <motion.path
              d={TEAR_FULL}
              fill="url(#crackShadow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.3 }}
            />

            {/* metade esquerda — shake e depois se afasta + rotaciona */}
            <motion.path
              d={TEAR_LEFT}
              fill={`url(#${gradId})`}
              initial={{ x: 0, rotate: 0 }}
              animate={{
                x: [0, -0.6, 0.6, -0.4, 0.4, 0, -4],
                rotate: [0, -0.5, 0.5, -0.4, 0.3, 0, -6],
              }}
              transition={{
                duration: 0.95,
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: "50px 80px" }}
            />

            {/* metade direita */}
            <motion.path
              d={TEAR_RIGHT}
              fill={`url(#${gradId})`}
              initial={{ x: 0, rotate: 0 }}
              animate={{
                x: [0, 0.6, -0.6, 0.4, -0.4, 0, 4],
                rotate: [0, 0.5, -0.5, 0.4, -0.3, 0, 6],
              }}
              transition={{
                duration: 0.95,
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: "50px 80px" }}
            />

            {/* cacos voando */}
            {[
              { d: "M48 30 L 52 28 L 50 34 Z", x: -18, y: -22, r: -45 },
              { d: "M50 60 L 54 58 L 51 64 Z", x: 22, y: -10, r: 60 },
              { d: "M49 90 L 53 88 L 50 95 Z", x: -14, y: 18, r: -30 },
              { d: "M51 45 L 54 44 L 52 49 Z", x: 16, y: -28, r: 80 },
            ].map((c, i) => (
              <motion.path
                key={i}
                d={c.d}
                fill={`url(#${gradId})`}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{ x: c.x, y: c.y, rotate: c.r, opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
              />
            ))}
          </>
        ) : (
          <path d={TEAR_FULL} fill={`url(#${gradId})`} />
        )}
      </svg>

      {/* cadeado centralizado dentro da gota */}
      <motion.div
        className="absolute inset-x-0 flex items-center justify-center"
        style={{ top: "55%", transform: "translateY(-50%)" }}
        initial={{ scale: isOpen ? 0.6 : 1, opacity: isOpen ? 0 : 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: isOpen ? 0.7 : 0, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Icon
          className="text-bege drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          style={{ width: size * 0.42, height: size * 0.42 }}
          strokeWidth={1.75}
        />
      </motion.div>
    </div>
  );
}

export function LockVisualSlide({ eyebrow, title, subtitle, state }: Props) {
  return (
    <SlideShell>
      <div className="flex w-full max-w-5xl flex-col items-center gap-10 text-center">
        {eyebrow && (
          <motion.div initial="hidden" animate="show" variants={fade} className="eyebrow">
            {eyebrow}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: state === "open" ? -8 : 8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <LagrimaCofre state={state} size={260} />
        </motion.div>

        <motion.h1 initial="hidden" animate="show" variants={fade} custom={2} className="font-display text-[clamp(3rem,8vw,7rem)] leading-tight">
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p initial="hidden" animate="show" variants={fade} custom={3} className="text-2xl opacity-70 max-w-3xl">
            {subtitle}
          </motion.p>
        )}
      </div>
    </SlideShell>
  );
}
