import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LagrimaGradient } from "@/components/brand/LagrimaGradient";

const TOPICS = [
  { id: "seguranca", label: "segurança", sub: "RLS, edge, secrets, auth" },
  { id: "arquitetura", label: "arquitetura", sub: "escalar sem dor" },
  { id: "lgpd", label: "LGPD", sub: "dados, consentimento, direitos" },
  { id: "governanca", label: "governança", sub: "papéis, acessos, MFA" },
] as const;

type TopicId = typeof TOPICS[number]["id"];

export default function Feedback() {
  const [topic, setTopic] = useState<TopicId | null>(null);
  const [question, setQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    const trimmed = question.trim();
    if (!trimmed) {
      setError("escreve sua dúvida ali em cima");
      return;
    }
    if (trimmed.length > 1000) {
      setError("máximo 1000 caracteres");
      return;
    }
    setSubmitting(true);
    setError(null);
    const { error: dbError } = await supabase.from("feedback_responses").insert({
      topic,
      question: trimmed,
    });
    setSubmitting(false);
    if (dbError) {
      setError("não rolou enviar. tenta de novo?");
      return;
    }
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-bege px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <header className="flex items-center gap-3">
          <LagrimaGradient size={36} />
          <div>
            <div className="eyebrow">travessia · feedback</div>
            <h1 className="font-display text-3xl leading-tight">o que ficou pulsando aí?</h1>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border-2 border-preto/10 bg-white/80 p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-laranja">
                <Check className="h-7 w-7 text-preto" strokeWidth={3} />
              </div>
              <h2 className="font-display text-3xl">recebi.</h2>
              <p className="mt-2 text-lg opacity-70">vou ler todas. obrigado de verdade.</p>

              {/* Piada de callback: o próprio form tratou os dados sem consentimento — e tá certo. */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 rounded-xl border-2 border-dashed border-preto/25 bg-bege/70 p-4 text-left"
              >
                <div className="eyebrow mb-1">ah, e antes que você pergunte…</div>
                <p className="text-sm leading-snug text-preto/80">
                  reparou que eu coletei sua dúvida e <strong>não pedi seu consentimento</strong>? tá tudo dentro da lei. 😏
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-wider text-laranja">
                  base legal: legítimo interesse
                </p>
                <p className="mt-1 text-xs leading-snug text-preto/55">
                  coletei só o necessário pra melhorar a talk — e nem seu nome eu peguei. 😉
                </p>
              </motion.div>

              <p className="mt-6 font-mono text-xs uppercase tracking-widest opacity-50">— travessia</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-7"
            >
              <fieldset className="flex flex-col gap-3">
                <legend className="eyebrow mb-2">tua principal preocupação</legend>
                <div className="grid grid-cols-2 gap-3">
                  {TOPICS.map((t) => {
                    const active = topic === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTopic(t.id)}
                        className={`rounded-xl border-2 p-4 text-left transition-all ${
                          active
                            ? "border-preto bg-laranja shadow-[0_4px_0_0_hsl(var(--preto))]"
                            : "border-preto/15 bg-white/70 hover:border-preto/40"
                        }`}
                      >
                        <div className="font-display text-xl leading-tight">{t.label}</div>
                        <div className="mt-1 text-xs opacity-70">{t.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-3">
                <legend className="eyebrow mb-2">tua principal dúvida</legend>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  maxLength={1000}
                  rows={5}
                  placeholder="escreve do teu jeito. pode ser bruta."
                  className="w-full resize-none rounded-xl border-2 border-preto/15 bg-white/80 p-4 text-lg leading-snug outline-none transition-colors placeholder:opacity-40 focus:border-preto"
                />
                <div className="flex justify-end font-mono text-xs opacity-50">
                  {question.length}/1000
                </div>
              </fieldset>

              {error && (
                <div className="rounded-lg border-2 border-vermelho/40 bg-vermelho/10 p-3 text-sm text-vermelho">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!topic || submitting}
                className="rounded-xl border-2 border-preto bg-preto px-6 py-4 font-display text-2xl text-bege transition-all disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:bg-laranja enabled:hover:text-preto enabled:active:translate-y-[2px]"
              >
                {submitting ? "enviando…" : "mandar pra travessia"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}