import { useEffect, useMemo, useState } from "react";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EVENTS } from "@/events/registry";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Feedback = {
  id: string;
  topic: string;
  question: string;
  event_slug: string | null;
  edition_id: string | null;
  room_code: string | null;
  created_at: string;
};

type Edition = { id: string; title: string; event_slug: string; scheduled_at: string };

export default function AdminFeedback() {
  const [items, setItems] = useState<Feedback[]>([]);
  const [editions, setEditions] = useState<Edition[]>([]);
  const [filter, setFilter] = useState<string>("all"); // all | <event_slug> | edition:<id>

  useEffect(() => {
    (async () => {
      const [fb, ed] = await Promise.all([
        supabase.from("feedback_responses").select("*").order("created_at", { ascending: false }).limit(500),
        supabase.from("event_editions").select("id,title,event_slug,scheduled_at").order("scheduled_at", { ascending: false }),
      ]);
      setItems((fb.data ?? []) as Feedback[]);
      setEditions((ed.data ?? []) as Edition[]);
    })();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    if (filter.startsWith("edition:")) {
      const id = filter.slice("edition:".length);
      return items.filter((i) => i.edition_id === id);
    }
    return items.filter((i) => i.event_slug === filter);
  }, [items, filter]);

  const exportCsv = () => {
    const header = ["created_at", "event_slug", "edition_id", "room_code", "topic", "question"];
    const rows = filtered.map((i) =>
      header
        .map((k) => {
          const v = (i as unknown as Record<string, unknown>)[k];
          const s = v == null ? "" : String(v).replace(/"/g, '""');
          return `"${s}"`;
        })
        .join(","),
    );
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `feedback-${filter}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">feedback</p>
          <h1 className="font-display text-4xl">respostas</h1>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-72"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">todos os eventos</SelectItem>
              {Object.values(EVENTS).map((e) => (
                <SelectItem key={e.slug} value={e.slug}>{e.name} (todas edições)</SelectItem>
              ))}
              {editions.length > 0 && (
                <>
                  <SelectItem value="__separator" disabled>— edições —</SelectItem>
                  {editions.map((e) => (
                    <SelectItem key={e.id} value={`edition:${e.id}`}>
                      {e.title} · {new Date(e.scheduled_at).toLocaleDateString("pt-BR")}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportCsv} disabled={filtered.length === 0}>
            <Download className="mr-2 h-4 w-4" /> CSV
          </Button>
        </div>
      </header>

      <p className="text-sm opacity-60">{filtered.length} resposta(s)</p>

      <div className="space-y-3">
        {filtered.map((f) => (
          <article key={f.id} className="rounded-2xl border border-preto/10 bg-white/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs opacity-60">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-laranja/15 px-2 py-0.5 font-mono uppercase">{f.topic}</span>
                {f.event_slug && (
                  <span className="rounded-full bg-preto/5 px-2 py-0.5 font-mono uppercase">
                    {EVENTS[f.event_slug]?.name ?? f.event_slug}
                  </span>
                )}
                {f.room_code && <span className="font-mono">sala {f.room_code}</span>}
              </div>
              <time className="font-mono">{new Date(f.created_at).toLocaleString("pt-BR")}</time>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{f.question}</p>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-preto/15 p-8 text-center text-sm opacity-60">
            nenhum feedback nesse filtro.
          </p>
        )}
      </div>
    </div>
  );
}
