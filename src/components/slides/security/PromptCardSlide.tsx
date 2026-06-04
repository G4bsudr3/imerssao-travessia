import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { SlideShell } from "../SlideShell";

type Prompt = {
  label: string;
  body: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  prompts: Prompt[];
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }),
};

export function PromptCardSlide({ eyebrow, title, subtitle, prompts }: Props) {
  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = async (text: string, i: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(i);
      window.setTimeout(() => setCopied((c) => (c === i ? null : c)), 2000);
    } catch {
      // clipboard pode falhar sem https/permissão — ignora silenciosamente
    }
  };

  // grid se adapta à quantidade: 1 prompt vira um card largo e centrado,
  // 2 ou 3+ usam colunas como antes.
  const cols =
    prompts.length === 1
      ? "grid-cols-1 max-w-3xl mx-auto"
      : prompts.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <SlideShell>
      <div className="w-full max-w-6xl">
        {eyebrow && (
          <motion.div initial="hidden" animate="show" variants={fade} className="eyebrow mb-3">
            {eyebrow}
          </motion.div>
        )}
        <motion.h1 initial="hidden" animate="show" variants={fade} custom={1} className="font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-tight">
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p initial="hidden" animate="show" variants={fade} custom={2} className="mt-3 mb-8 text-2xl opacity-70">
            {subtitle}
          </motion.p>
        )}

        <div className={`grid grid-cols-1 gap-5 ${cols}`}>
          {prompts.map((p, i) => (
            <motion.div
              key={i}
              initial="hidden"
              animate="show"
              variants={fade}
              custom={i + 3}
              className="relative rounded-2xl border-2 border-laranja/30 bg-white p-6 text-left shadow-[0_8px_32px_-8px_hsl(var(--preto)/0.18)]"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="eyebrow text-laranja">prompt {i + 1}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(p.body, i)}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-preto/10 bg-bege/60 px-3 py-1.5 text-sm font-medium text-preto/70 transition-colors hover:bg-laranja hover:text-preto focus:outline-none focus-visible:ring-2 focus-visible:ring-laranja/50"
                  aria-label="copiar prompt"
                >
                  {copied === i ? (
                    <>
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                      copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" strokeWidth={2} />
                      copiar
                    </>
                  )}
                </button>
              </div>
              <div className="mb-3 font-display text-2xl leading-tight">{p.label}</div>
              <p className="font-mono text-sm leading-relaxed text-preto/70 whitespace-pre-wrap">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}