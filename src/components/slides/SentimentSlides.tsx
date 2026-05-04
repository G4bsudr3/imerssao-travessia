import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRoom } from "@/contexts/RoomContext";
import { supabase } from "@/integrations/supabase/client";
import { SlideShell } from "./SlideShell";
import { Button } from "@/components/ui/button";

const SLIDE_KEY = "sentiment";

type Analysis = {
  overall: string;
  gauge: number;
  themes: { label: string; weight: number }[];
  quotes: string[];
};

const ANALYSIS_CACHE = new Map<string, Analysis>();

export function SentimentQuestion() {
  return (
    <SlideShell>
      <div className="space-y-6">
        <p className="eyebrow">em uma palavra ou frase curta</p>
        <h1 className="font-display text-[clamp(3rem,8cqw,8rem)] leading-tight">
          o que é <span className="text-laranja">sucesso</span> <br /> na vida pra ti?
        </h1>
        <p className="text-xl opacity-60">responde no celular. sem julgamento.</p>
      </div>
    </SlideShell>
  );
}

export function SentimentCards() {
  const { room, isPresenter } = useRoom();
  const [responses, setResponses] = useState<{ id: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!room) return;
    const load = async () => {
      const { data } = await supabase
        .from("text_responses")
        .select("id, content")
        .eq("room_id", room.id)
        .eq("slide_key", SLIDE_KEY)
        .order("created_at", { ascending: true });
      if (data) setResponses(data);
    };
    load();
    const ch = supabase
      .channel(`sentiment-${room.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "text_responses", filter: `room_id=eq.${room.id}` }, (p) => {
        const row = p.new as { id: string; slide_key: string; content: string };
        if (row.slide_key === SLIDE_KEY) setResponses((r) => [...r, { id: row.id, content: row.content }]);
      })
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [room]);

  const analyze = async () => {
    if (!room || responses.length === 0) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-sentiment", {
        body: { responses: responses.map((r) => r.content) },
      });
      if (error) throw error;
      ANALYSIS_CACHE.set(room.id, data as Analysis);
    } catch (e) {
      console.error("analyze failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SlideShell align="start">
      <div className="flex w-full items-end justify-between mb-6">
        <div>
          <p className="eyebrow">recebendo</p>
          <h2 className="font-display text-6xl">{responses.length} {responses.length === 1 ? "resposta" : "respostas"}</h2>
        </div>
        {isPresenter && (
          <Button onClick={analyze} disabled={loading || responses.length === 0} size="lg" className="bg-laranja text-preto hover:bg-laranja/90">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> analisando…</> : "analisar agora"}
          </Button>
        )}
      </div>
      <div className="grid w-full grid-cols-2 gap-3 overflow-y-auto md:grid-cols-4 lg:grid-cols-5">
        <AnimatePresence>
          {responses.map((r) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="rounded-xl bg-white p-4 text-sm shadow-[0_8px_32px_-8px_hsl(var(--preto)/0.18)]"
            >
              {r.content}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SlideShell>
  );
}

export function SentimentAnalysis() {
  const { room } = useRoom();
  const a = room ? ANALYSIS_CACHE.get(room.id) : null;

  if (!a) {
    return (
      <SlideShell>
        <p className="eyebrow">aguardando análise</p>
        <p className="mt-4 text-xl opacity-60">volta pro slide anterior e clica "analisar agora".</p>
      </SlideShell>
    );
  }

  return (
    <SlideShell align="start">
      <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center gap-3">
          <p className="eyebrow">sentimento geral</p>
          <div className="relative h-64 w-32 overflow-hidden rounded-full border-2 border-preto/15 bg-white">
            <motion.div initial={{ height: 0 }} animate={{ height: `${a.gauge}%` }} transition={{ duration: 1, ease: "easeOut" }} className="absolute bottom-0 left-0 right-0 gradient-tear" />
          </div>
          <p className="font-display text-4xl capitalize">{a.overall}</p>
        </div>
        <div>
          <p className="eyebrow mb-4">temas dominantes</p>
          <ul className="space-y-3">
            {a.themes.map((t, i) => (
              <li key={i}>
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-3xl md:text-4xl">{t.label}</span>
                  <span className="font-mono text-sm opacity-50">{t.weight}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-preto/10">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${t.weight}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className="h-full bg-laranja" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideShell>
  );
}

export function SentimentQuotes() {
  const { room } = useRoom();
  const a = room ? ANALYSIS_CACHE.get(room.id) : null;
  return (
    <SlideShell>
      <div className="space-y-8">
        <p className="eyebrow">o que mais marcou</p>
        <div className="space-y-6">
          {(a?.quotes ?? []).map((q, i) => (
            <motion.blockquote key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="font-display text-4xl md:text-6xl leading-tight">
              "{q}"
            </motion.blockquote>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
