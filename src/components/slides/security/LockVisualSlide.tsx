import { motion } from "framer-motion";
import { SlideShell } from "../SlideShell";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  state: "open" | "closed";
  background?: "bege" | "naval" | "accent";
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/** linhas de dado "vazando" quando o cadeado está aberto */
const LEAKS = ["cpf 123.***.**-09", "email: ana@…", "telefone +55 11 9…", "endereço: rua …", "cartão **** 4417"];

/**
 * Cadeado desenhado à mão (SVG) nas cores do evento.
 * - closed: arco travado, respiração verde, anel de varredura
 * - open: arco levanta e balança, glow vermelho e dados escapando
 */
function PadlockMark({ state, size = 300 }: { state: "open" | "closed"; size?: number }) {
  const isOpen = state === "open";
  const color = isOpen ? "hsl(var(--vermelho))" : "hsl(var(--laranja))";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* halo */}
      <motion.div
        className="absolute inset-[-12%] rounded-full"
        style={{
          background: `radial-gradient(circle, ${isOpen ? "hsl(var(--vermelho) / 0.4)" : "hsl(var(--laranja) / 0.4)"} 0%, transparent 68%)`,
          filter: "blur(30px)",
        }}
        animate={{ opacity: [0.45, 0.95, 0.45], scale: [0.97, 1.07, 0.97] }}
        transition={{ duration: isOpen ? 1.3 : 2.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* anéis de varredura */}
      {[0, 0.9].map((delay) => (
        <motion.div
          key={delay}
          className="absolute rounded-full border"
          style={{ width: size * 0.9, height: size * 0.9, borderColor: color, opacity: 0.5 }}
          animate={{ scale: [0.8, 1.25], opacity: [0.55, 0] }}
          transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      {/* dados escapando */}
      {isOpen &&
        LEAKS.map((txt, i) => (
          <motion.span
            key={txt}
            className="pointer-events-none absolute whitespace-nowrap font-mono text-[0.72rem] text-vermelho/70"
            style={{ left: "18%", top: "38%" }}
            initial={{ opacity: 0, x: -20, y: 0 }}
            animate={{
              opacity: [0, 0.9, 0],
              x: [-10, -size * (0.35 + (i % 3) * 0.12)],
              y: [0, -size * (0.25 + i * 0.12)],
            }}
            transition={{ duration: 2.6, delay: 1 + i * 0.45, repeat: Infinity, repeatDelay: 0.6, ease: "easeOut" }}
          >
            {txt}
          </motion.span>
        ))}

      {/* cadeado */}
      <motion.svg
        viewBox="0 0 120 150"
        style={{
          width: size * 0.62,
          filter: `drop-shadow(0 0 26px ${isOpen ? "hsl(var(--vermelho) / 0.55)" : "hsl(var(--laranja) / 0.6)"})`,
        }}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={
          isOpen
            ? { scale: 1, opacity: 1, rotate: [0, -3, 3, -2, 2, 0] }
            : { scale: [1, 1.03, 1], opacity: 1 }
        }
        transition={
          isOpen
            ? { duration: 1, ease: [0.22, 1, 0.36, 1], rotate: { duration: 0.7, delay: 0.9 } }
            : { scale: { duration: 2.6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.6 } }
        }
      >
        {/* arco */}
        <motion.path
          d="M32 62V44a28 28 0 0 1 56 0v18"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ rotate: 0, x: 0, y: 0 }}
          animate={isOpen ? { rotate: -26, x: 12, y: -6 } : { rotate: 0, x: 0, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "88px 62px" }}
        />
        {/* corpo */}
        <rect x="18" y="60" width="84" height="76" rx="16" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="6" />
        {/* fechadura */}
        <circle cx="60" cy="90" r="9" fill={color} />
        <motion.rect
          x="56"
          y="96"
          width="8"
          height="24"
          rx="4"
          fill={color}
          animate={isOpen ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
          transition={{ duration: 1.1, repeat: isOpen ? Infinity : 0 }}
        />
      </motion.svg>
    </div>
  );
}

export function LockVisualSlide({ eyebrow, title, subtitle, state, background = "naval" }: Props) {
  const isOpen = state === "open";
  return (
    <SlideShell background={background}>
      <div className="flex w-full max-w-6xl items-center justify-center gap-[clamp(2rem,6vw,5rem)]">
        <PadlockMark state={state} size={280} />

        <div className="max-w-2xl text-left">
          {eyebrow && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={fade}
              className={`eyebrow ${isOpen ? "text-vermelho" : ""}`}
            >
              {eyebrow}
            </motion.div>
          )}
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fade}
            custom={2}
            className="mt-5 font-display text-[clamp(2.6rem,6vw,4.4rem)] leading-[1.05]"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial="hidden"
              animate="show"
              variants={fade}
              custom={3}
              className="mt-6 text-[clamp(1.1rem,1.7vw,1.5rem)] opacity-70"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-8 h-[3px] origin-left ${isOpen ? "bg-vermelho/70" : "bg-laranja/70"}`}
          />
        </div>
      </div>
    </SlideShell>
  );
}
