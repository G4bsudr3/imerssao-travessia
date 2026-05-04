import { motion } from "framer-motion";
import { Brain, Heart, HelpCircle, type LucideIcon } from "lucide-react";
import { SlideShell } from "./SlideShell";

export type StaticVariant =
  | "headline"
  | "two-line"
  | "act"
  | "stat"
  | "list"
  | "grid"
  | "comparison"
  | "timeline"
  | "naval"
  | "transition";

export type StaticProps = {
  variant: StaticVariant;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  lines?: string[];
  items?: Array<{ label?: string; sub?: string; strike?: boolean; accent?: boolean; empty?: boolean; icon?: "brain" | "heart" | "unknown" }>;
  comparison?: { left: { label: string; sub?: string }; right: { label: string; sub?: string } };
  timeline?: Array<{ year: string; label: string }>;
  stat?: { value: string; sub?: string; strike?: boolean };
  background?: "bege" | "naval" | "accent";
  align?: "center" | "start";
  asset?: React.ReactNode;
  href?: string;
  cta?: string;
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }),
};

// Tipografia cinética: cada palavra entra com leve delay e blur.
function Kinetic({ text, className, baseDelay = 0 }: { text: string; className?: string; baseDelay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.55,
            delay: baseDelay + i * 0.09,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ marginRight: "0.25em" }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

export function SlideStatic(props: StaticProps) {
  const bg = props.background ?? (props.variant === "naval" ? "naval" : "bege");
  return (
    <SlideShell background={bg} align={props.align ?? "center"}>
      {props.eyebrow && (
        <motion.div initial="hidden" animate="show" variants={fade} className="eyebrow mb-6">
          {props.eyebrow}
        </motion.div>
      )}
      {props.href ? (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-pointer transition-transform hover:scale-[1.01] focus:outline-none focus-visible:ring-4 focus-visible:ring-laranja/40 rounded-2xl"
        >
          {renderBody(props)}
          {props.cta && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={fade}
              custom={2}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-laranja px-8 py-4 font-display text-2xl text-preto shadow-[0_8px_32px_-8px_hsl(var(--laranja)/0.5)]"
            >
              {props.cta} →
            </motion.div>
          )}
        </a>
      ) : (
        renderBody(props)
      )}
      {props.asset && props.variant !== "act" && (
        <motion.div initial="hidden" animate="show" variants={fade} custom={3} className="mt-10 w-full max-w-4xl">
          {props.asset}
        </motion.div>
      )}
    </SlideShell>
  );
}

function renderBody(p: StaticProps) {
  switch (p.variant) {
    case "headline":
      return (
        <h1 className="font-display text-[clamp(4rem,12vw,8.4rem)] leading-[0.9]">
          <Kinetic text={p.title ?? ""} />
        </h1>
      );
    case "two-line":
      return (
        <div className="space-y-2">
          <h1 className="font-display text-[clamp(3.5rem,10vw,6.3rem)] leading-[0.9]">
            <Kinetic text={p.title ?? ""} />
          </h1>
          {p.subtitle && (
            <p className="font-display text-[clamp(2.5rem,7vw,4.2rem)] leading-[0.95] text-laranja">
              <Kinetic text={p.subtitle} baseDelay={(p.title?.split(" ").length ?? 0) * 0.09 + 0.1} />
            </p>
          )}
        </div>
      );
    case "act":
      return (
        <div className="space-y-8 text-center flex flex-col items-center">
          {p.asset && (
            <motion.div initial="hidden" animate="show" variants={fade} className="text-bege/90">
              {p.asset}
            </motion.div>
          )}
          <h1 className="font-display text-[clamp(5rem,15vw,9.8rem)] leading-none text-bege">
            <Kinetic text={p.title ?? ""} />
          </h1>
          {p.subtitle && (
            <p className="font-body text-3xl text-bege/55">
              <Kinetic text={p.subtitle} baseDelay={(p.title?.split(" ").length ?? 0) * 0.09 + 0.1} />
            </p>
          )}
        </div>
      );
    case "stat":
      return (
        <div className="space-y-6">
          {p.title && (
            <motion.p initial="hidden" animate="show" variants={fade} className="eyebrow">
              {p.title}
            </motion.p>
          )}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            custom={1}
            className={`font-display text-[clamp(7rem,22vw,14.0rem)] leading-none ${p.stat?.strike ? "strike-diagonal" : ""}`}
          >
            {p.stat?.value}
          </motion.div>
          {p.stat?.sub && (
            <motion.p initial="hidden" animate="show" variants={fade} custom={2} className="text-3xl opacity-70">
              {p.stat.sub}
            </motion.p>
          )}
        </div>
      );
    case "list":
      return (
        <ul className="space-y-6 text-left max-w-[1500px] mx-auto">
          {p.items?.map((it, i) => (
            <motion.li
              key={i}
              initial="hidden"
              animate="show"
              variants={fade}
              custom={i + 1}
              className={`font-display text-[clamp(2rem,5vw,3.15rem)] leading-tight ${it.strike ? "strike-diagonal" : ""} ${it.accent ? "text-laranja" : ""}`}
            >
              {it.label}
              {it.sub && <div className="font-body text-2xl opacity-70 mt-2">{it.sub}</div>}
            </motion.li>
          ))}
        </ul>
      );
    case "grid": {
      const n = p.items?.length ?? 0;
      const cols = n <= 3 ? "grid-cols-1 md:grid-cols-3" : n === 4 ? "grid-cols-2 md:grid-cols-4" : n === 5 ? "grid-cols-2 md:grid-cols-5" : "grid-cols-2 md:grid-cols-3";
      const iconMap: Record<string, LucideIcon> = { brain: Brain, heart: Heart, unknown: HelpCircle };
      return (
        <div className={`grid w-full max-w-[1500px] gap-[clamp(0.75rem,1.5vw,1.5rem)] ${cols}`}>
          {p.items?.map((it, i) => {
            const Icon = it.icon ? iconMap[it.icon] : null;
            return (
              <motion.div
                key={i}
                initial="hidden"
                animate="show"
                variants={fade}
                custom={i + 1}
                className={`rounded-2xl p-[clamp(1rem,2vw,2.25rem)] text-left flex flex-col justify-center ${
                  it.empty
                    ? "border-2 border-dashed border-preto/20 bg-transparent"
                    : it.accent
                    ? "border-2 border-preto/10 bg-laranja text-preto"
                    : "border-2 border-preto/10 bg-white/60"
                }`}
              >
                {it.empty ? (
                  <div className="flex items-center justify-center text-preto/25">
                    <HelpCircle className="h-10 w-10" strokeWidth={1.75} />
                  </div>
                ) : (
                  <>
                    {Icon && <Icon className="mb-3 h-9 w-9 text-laranja" strokeWidth={2} />}
                    <div className="font-display leading-tight text-[clamp(1.25rem,2.2vw,2rem)]">{it.label}</div>
                    {it.sub && <div className="mt-2 opacity-75 text-[clamp(0.875rem,1.1vw,1.15rem)]">{it.sub}</div>}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      );
    }
    case "comparison":
      return (
        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div initial="hidden" animate="show" variants={fade} custom={1} className="rounded-2xl bg-white/50 p-10 strike-diagonal">
            <div className="eyebrow mb-3">antes</div>
            <div className="font-display text-5xl">{p.comparison?.left.label}</div>
            {p.comparison?.left.sub && <div className="mt-3 opacity-60">{p.comparison.left.sub}</div>}
          </motion.div>
          <motion.div initial="hidden" animate="show" variants={fade} custom={2} className="rounded-2xl bg-laranja p-10">
            <div className="eyebrow mb-3">agora</div>
            <div className="font-display text-5xl text-preto">{p.comparison?.right.label}</div>
            {p.comparison?.right.sub && <div className="mt-3 text-preto/70">{p.comparison.right.sub}</div>}
          </motion.div>
        </div>
      );
    case "timeline":
      return (
        <div className="flex w-full max-w-6xl items-end justify-between gap-4">
          {p.timeline?.map((t, i) => (
            <motion.div key={i} initial="hidden" animate="show" variants={fade} custom={i + 1} className="flex flex-1 flex-col items-center">
              <div className="font-display text-5xl md:text-7xl">{t.year}</div>
              <div className="mt-2 h-1 w-full bg-preto/30" />
              <div className="mt-3 text-center text-sm opacity-70">{t.label}</div>
            </motion.div>
          ))}
        </div>
      );
    case "naval":
      return (
        <div className="max-w-5xl space-y-6 text-bege">
          {p.title && <motion.h2 initial="hidden" animate="show" variants={fade} className="font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-tight">{p.title}</motion.h2>}
          {p.subtitle && <motion.p initial="hidden" animate="show" variants={fade} custom={1} className="text-3xl opacity-75">— {p.subtitle}</motion.p>}
        </div>
      );
    case "transition":
      return (
        <div className="font-display text-[clamp(3rem,8vw,4.9rem)] leading-tight text-laranja">
          <Kinetic text={p.title ?? ""} />
        </div>
      );
    default:
      return null;
  }
}
