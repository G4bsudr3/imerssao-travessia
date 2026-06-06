import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar as CalIcon, LayoutGrid, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Metrics = {
  events: number;
  editions: number;
  feedbacks: number;
  upcoming: Array<{ id: string; title: string; event_slug: string; scheduled_at: string }>;
};

export default function AdminDashboard() {
  const [m, setM] = useState<Metrics | null>(null);

  useEffect(() => {
    (async () => {
      const [events, editions, feedbacks, upcoming] = await Promise.all([
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("event_editions").select("id", { count: "exact", head: true }),
        supabase.from("feedback_responses").select("id", { count: "exact", head: true }),
        supabase
          .from("event_editions")
          .select("id,title,event_slug,scheduled_at")
          .gte("scheduled_at", new Date().toISOString())
          .order("scheduled_at", { ascending: true })
          .limit(5),
      ]);
      setM({
        events: events.count ?? 0,
        editions: editions.count ?? 0,
        feedbacks: feedbacks.count ?? 0,
        upcoming: upcoming.data ?? [],
      });
    })();
  }, []);

  return (
    <div className="space-y-8 p-8">
      <header>
        <p className="eyebrow">visão geral</p>
        <h1 className="font-display text-4xl">o palco</h1>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Stat label="eventos" value={m?.events ?? "—"} icon={LayoutGrid} />
        <Stat label="edições" value={m?.editions ?? "—"} icon={CalIcon} />
        <Stat label="feedbacks" value={m?.feedbacks ?? "—"} icon={MessageSquare} />
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-2xl">próximas palestras</h2>
        {m && m.upcoming.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-preto/15 p-8 text-center text-sm opacity-60">
            nenhuma agendada.{" "}
            <Link to="/admin/agenda" className="underline">criar agora</Link>
          </div>
        ) : (
          <ul className="divide-y divide-preto/5 overflow-hidden rounded-2xl border border-preto/10 bg-white/60">
            {m?.upcoming.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-display text-lg">{e.title}</p>
                  <p className="text-xs opacity-60">/{e.event_slug}</p>
                </div>
                <p className="font-mono text-sm">{new Date(e.scheduled_at).toLocaleString("pt-BR")}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: number | string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-2xl border border-preto/10 bg-white/60 p-5">
      <div className="flex items-center justify-between">
        <p className="eyebrow">{label}</p>
        <Icon className="h-4 w-4 opacity-50" />
      </div>
      <p className="mt-2 font-display text-4xl">{value}</p>
    </div>
  );
}
