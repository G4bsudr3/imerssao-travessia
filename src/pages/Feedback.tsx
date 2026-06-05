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
type ContactType = "whatsapp" | "instagram";

export default function Feedback() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState<TopicId | null>(null);
  const [question, setQuestion] = useState("");
  const [contactType, setContactType] = useState<ContactType | null>(null);
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("me diz teu nome ali em cima");
      return;
    }
    if (!topic) {
      setError("escolhe um tema");
      return;
    }
    const trimmed = question.trim();
    if (!trimmed) {
      setError("escreve sua dúvida");
      return;
    }
    if (trimmed.length > 1000) {
      setError("máximo 1000 caracteres na dúvida");
      return;
    }
    if (!contactType || !contact.trim()) {
      setError("me diz onde te respondo (WhatsApp ou Instagram)");
      return;
    }

    setSubmitting(true);
    setError(null);

    // A tabela tem topic + question. Empacotamos nome e contato no início da dúvida.
    const contactLabel = contactType === "whatsapp" ? "WhatsApp" : "Instagram";
    const payload = `[${name.trim()} · ${contactLabel}: ${contact.trim()}]\n\n${trimmed}`;

    const { error: dbError } = await supabase.from("feedback_responses").insert({
      topic,
      question: payload,
    });
    setSubmitting(false);
    if (dbError) {
      setError("não rolou enviar. tenta de novo?");
      return;
    }
    setDone(true);
  };

  const contactPlaceholder = contactType === "whatsapp" ? "(11) 99999-9999" : "@seu_usuario";

  const kicker = "font-mono-caps text-sm text-preto/80";

  return (
    <div className="min-h-screen bg-bege px-6 py-10 text-preto md:px-10">
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
              <h2 className="font-display text-4xl">recebi, {name.trim() || "você"}.</h2>
              <p className="mt-3 text-xl text-preto/75">vou ler e te responder. obrigado de verdade.</p>

              {/* Piada de callback: agora coletou nome + contato → base legal é consentimento. */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-7 rounded-2xl border-2 border-dashed border-preto/30 bg-bege p-5 text-left"
              >
                <div className="eyebrow mb-2">ah, e antes que você pergunte…</div>
                <p className="text-lg leading-snug text-preto/90">
                  reparou que agora eu pedi seu <strong>nome</strong> e seu <strong>contato</strong>? como não é
                  necessário pro evento e você <strong>topou me dar</strong>, a base aqui muda. 😏
                </p>
                <p className="mt-4 font-mono text-sm font-bold uppercase tracking-wider text-preto">
                  base legal: <span className="text-azul">consentimento</span>
                </p>
                <p className="mt-2 text-base leading-snug text-preto/70">
                  uso só pra te responder essa dúvida. sem spam, sem repassar pra ninguém. (viu? transparência. 😉)
                </p>
              </motion.div>

              <p className="mt-7 font-mono text-xs uppercase tracking-widest text-preto/50">— travessia</p>
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
                <legend className="eyebrow mb-2">como te chamo?</legend>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  placeholder="teu nome"
                  className="w-full rounded-xl border-2 border-preto/15 bg-white/80 p-4 text-lg outline-none transition-colors placeholder:opacity-40 focus:border-preto"
                />
              </fieldset>

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
                        <div className="font-display text-2xl leading-tight">{t.label}</div>
                        <div className="mt-1 text-sm text-preto/70">{t.sub}</div>
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
                  placeholder="escreve do teu jeito."
                  className="w-full resize-none rounded-xl border-2 border-preto/15 bg-white/80 p-4 text-lg leading-snug outline-none transition-colors placeholder:opacity-40 focus:border-preto"
                />
                <div className="flex justify-end font-mono text-xs opacity-50">
                  {question.length}/1000
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-3">
                <legend className="eyebrow mb-2">onde te respondo?</legend>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { id: "whatsapp", label: "WhatsApp" },
                    { id: "instagram", label: "Instagram" },
                  ] as const).map((c) => {
                    const active = contactType === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => { setContactType(c.id); setContact(""); }}
                        className={`rounded-xl border-2 p-4 text-center font-display text-2xl transition-all ${
                          active
                            ? "border-preto bg-laranja shadow-[0_4px_0_0_hsl(var(--preto))]"
                            : "border-preto/15 bg-white/70 hover:border-preto/40"
                        }`}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
                {contactType && (
                  <motion.input
                    key={contactType}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    maxLength={80}
                    inputMode={contactType === "whatsapp" ? "tel" : "text"}
                    placeholder={contactPlaceholder}
                    className="w-full rounded-xl border-2 border-preto/15 bg-white/80 p-4 text-lg outline-none transition-colors placeholder:opacity-40 focus:border-preto"
                  />
                )}
              </fieldset>

              {error && (
                <div className="rounded-lg border-2 border-vermelho/40 bg-vermelho/10 p-3 text-sm text-vermelho">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl border-2 border-preto bg-preto px-6 py-4 font-display text-2xl text-bege transition-all disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:bg-laranja enabled:hover:text-preto enabled:active:translate-y-[2px]"
              >
                {submitting ? "enviando…" : "mandar pro Breda"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}