import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { SlideShell } from "../SlideShell";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  language?: "sql" | "ts" | "js";
  code: string;
  status: "danger" | "safe";
  caption?: string;
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } }),
};

// Tokenizer leve pra SQL/TS — sem dependências externas
function tokenize(code: string, lang: "sql" | "ts" | "js") {
  const sqlKeywords = /\b(CREATE|POLICY|ON|FOR|USING|WITH|CHECK|TO|AS|SELECT|INSERT|UPDATE|DELETE|ALTER|TABLE|ENABLE|DISABLE|ROW|LEVEL|SECURITY|AUTHENTICATED|FROM|WHERE|TRUE|FALSE|NULL|IS|NOT|AND|OR)\b/gi;
  const tsKeywords = /\b(const|let|var|function|return|if|else|await|async|import|export|from|new|throw|true|false|null|undefined)\b/g;

  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(--[^\n]*)/g, '<span class="text-zinc-500 italic">$1</span>')
    .replace(/(\/\/[^\n]*)/g, '<span class="text-zinc-500 italic">$1</span>')
    .replace(/('[^']*'|"[^"]*"|`[^`]*`)/g, '<span class="text-emerald-300">$1</span>')
    .replace(/\b(auth\.uid\(\)|auth\.role\(\)|auth\.jwt\(\))/g, '<span class="text-amber-300 font-semibold">$1</span>');

  if (lang === "sql") html = html.replace(sqlKeywords, '<span class="text-rose-300 font-semibold">$1</span>');
  else html = html.replace(tsKeywords, '<span class="text-rose-300 font-semibold">$1</span>');

  return html;
}

export function CodeBlockSlide({ eyebrow, title, subtitle, language = "sql", code, status, caption }: Props) {
  const isDanger = status === "danger";
  const Icon = isDanger ? ShieldAlert : ShieldCheck;
  const accent = isDanger ? "text-vermelho" : "text-emerald-500";
  const ring = isDanger ? "ring-vermelho/40" : "ring-emerald-500/40";
  const badgeBg = isDanger ? "bg-vermelho text-white" : "bg-emerald-500 text-white";
  const badgeLabel = isDanger ? "❌ inseguro" : "✅ seguro";

  return (
    <SlideShell>
      <div className="w-full max-w-[1500px]">
        {eyebrow && (
          <motion.div initial="hidden" animate="show" variants={fade} className="eyebrow mb-3">
            {eyebrow}
          </motion.div>
        )}
        <motion.div initial="hidden" animate="show" variants={fade} custom={1} className="mb-2 flex items-center gap-4">
          <Icon className={`h-12 w-12 ${accent}`} strokeWidth={2} />
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight">{title}</h1>
        </motion.div>
        {subtitle && (
          <motion.p initial="hidden" animate="show" variants={fade} custom={2} className="mb-8 text-2xl opacity-70">
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial="hidden"
          animate="show"
          variants={fade}
          custom={3}
          className={`relative overflow-hidden rounded-2xl bg-zinc-900 ring-4 ${ring} shadow-[0_20px_60px_-16px_hsl(var(--preto)/0.32)]`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/60" />
              <span className="h-3 w-3 rounded-full bg-amber-400/60" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
              <span className="ml-3 font-mono text-sm uppercase tracking-widest text-white/50">
                {language}
              </span>
            </div>
            <span className={`rounded-full px-3 py-1 font-mono text-sm uppercase tracking-wider ${badgeBg}`}>
              {badgeLabel}
            </span>
          </div>
          <pre className="overflow-x-auto p-8 text-left">
            <TypewriterCode code={code} language={language} />
          </pre>
        </motion.div>

        {caption && (
          <motion.p initial="hidden" animate="show" variants={fade} custom={4} className="mt-6 text-center text-2xl opacity-60">
            {caption}
          </motion.p>
        )}
      </div>
    </SlideShell>
  );
}

/**
 * Typewriter de código sem vazamento de HTML:
 * tokeniza o código completo uma vez, mede o layout final e revela
 * progressivamente via clip-path. O cursor é posicionado em cima do
 * último caractere visível.
 *
 * Respeita prefers-reduced-motion (mostra direto, sem animação).
 */
function TypewriterCode({ code, language }: { code: string; language: "sql" | "ts" | "js" }) {
  const html = useMemo(() => tokenize(code, language), [code, language]);
  const [progress, setProgress] = useState(0); // 0..1
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    setReduce(r);
    if (r) {
      setProgress(1);
      return;
    }
    setProgress(0);
    const total = code.length;
    if (total === 0) {
      setProgress(1);
      return;
    }
    let i = 0;
    let timer: number;
    const tick = () => {
      i = Math.min(i + 1, total);
      setProgress(i / total);
      if (i < total) {
        const ch = code[i - 1];
        const delay = ch === "\n" ? 40 : ch === " " ? 10 : 18;
        timer = window.setTimeout(tick, delay);
      }
    };
    timer = window.setTimeout(tick, 350);
    return () => window.clearTimeout(timer);
  }, [code]);

  const done = progress >= 1;
  // Trecho de texto puro já "digitado" — usado pra posicionar o cursor sobreposto.
  const visibleChars = Math.round(progress * code.length);
  const typedText = code.slice(0, visibleChars);

  return (
    <code className="relative block font-mono text-2xl leading-relaxed text-zinc-100">
      {/* Camada 1: HTML tokenizado, revelado via clip-path. Markup nunca quebra. */}
      <span
        className="block whitespace-pre"
        style={{
          clipPath: reduce ? "none" : `inset(0 ${(1 - progress) * 100}% 0 0)`,
          transition: "clip-path 60ms linear",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {/* Camada 2: texto puro transparente que empurra o cursor pro fim do trecho.
          Como a fonte é monoespaçada e usamos whitespace-pre, o alinhamento bate
          com a camada 1. */}
      {!reduce && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 block whitespace-pre text-transparent"
        >
          {typedText}
          <span
            className={`inline-block w-[0.6ch] -mb-[2px] ml-[1px] bg-emerald-300 align-text-bottom ${done ? "animate-pulse" : ""}`}
            style={{ height: "1.1em" }}
          />
        </span>
      )}
    </code>
  );
}
