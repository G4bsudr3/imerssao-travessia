import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRoom } from "@/contexts/RoomContext";
import { supabase } from "@/integrations/supabase/client";
import { SlideShell } from "./SlideShell";

const SLIDE_KEY = "poll_brief";

type Option = {
  value: string;
  label: string;
  sub?: string;
  accent?: boolean;
};

type Props = {
  eyebrow?: string;
  question?: string;
  options?: Option[];
};

const DEFAULT_OPTIONS: Option[] = [
  { value: "sim", label: "bora codar", accent: true },
  { value: "ajustar", label: "ajustar" },
];

export function PollSlide({
  eyebrow,
  question = "o brief tá bom?",
  options = DEFAULT_OPTIONS,
}: Props = {}) {
  const { room } = useRoom();
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(options.map((o) => [o.value, 0])),
  );

  useEffect(() => {
    if (!room) return;
    const load = async () => {
      const { data } = await supabase
        .from("text_responses")
        .select("content")
        .eq("room_id", room.id)
        .eq("slide_key", SLIDE_KEY);
      if (data) {
        const c: Record<string, number> = Object.fromEntries(options.map((o) => [o.value, 0]));
        data.forEach((d) => {
          if (c[d.content as string] !== undefined) c[d.content as string]++;
        });
        setCounts(c);
      }
    };
    load();
    const ch = supabase
      .channel(`poll-${room.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "text_responses", filter: `room_id=eq.${room.id}` }, (p) => {
        const row = p.new as { slide_key: string; content: string };
        if (row.slide_key === SLIDE_KEY) {
          setCounts((c) => (c[row.content] !== undefined ? { ...c, [row.content]: c[row.content] + 1 } : c));
        }
      })
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [room, options]);

  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  const cols = options.length === 2 ? "grid-cols-2" : options.length === 3 ? "grid-cols-3" : "grid-cols-2";

  return (
    <SlideShell>
      <div className="w-full max-w-6xl space-y-10">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-tight">{question}</h1>
        <div className={`grid gap-6 ${cols}`}>
          {options.map((o) => (
            <Bar key={o.value} label={o.label} sub={o.sub} count={counts[o.value] ?? 0} pct={((counts[o.value] ?? 0) / total) * 100} accent={o.accent} />
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function Bar({ label, sub, count, pct, accent = false }: { label: string; sub?: string; count: number; pct: number; accent?: boolean }) {
  return (
    <div className={`relative h-64 overflow-hidden rounded-3xl border-2 border-preto/15 bg-white text-left`}>
      <motion.div animate={{ height: `${pct}%` }} transition={{ type: "spring", stiffness: 70, damping: 18 }} className={`absolute bottom-0 left-0 right-0 ${accent ? "bg-laranja" : "gradient-tear"}`} />
      <div className="relative flex h-full flex-col justify-end p-6">
        <p className="font-display text-4xl md:text-5xl leading-tight">{label}</p>
        {sub && <p className="mt-1 font-mono text-xs opacity-70">{sub}</p>}
        <p className="eyebrow mt-2">{count} {count === 1 ? "voto" : "votos"}</p>
      </div>
    </div>
  );
}
