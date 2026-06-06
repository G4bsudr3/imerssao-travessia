import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Presentation } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type EventRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  is_published: boolean;
};

export default function AdminTemplates() {
  const [list, setList] = useState<EventRow[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("events")
        .select("id,slug,name,description,is_published")
        .order("created_at", { ascending: false });
      setList((data ?? []) as EventRow[]);
    })();
  }, []);

  return (
    <div className="space-y-6 p-8">
      <header>
        <p className="eyebrow">templates</p>
        <h1 className="font-display text-4xl">apresentações disponíveis</h1>
        <p className="mt-1 text-sm opacity-60">
          cada template é um evento publicado. crie ou edite em{" "}
          <Link to="/admin/eventos" className="underline">eventos</Link>.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((e) => (
          <article key={e.id} className="rounded-2xl border border-preto/10 bg-white/60 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow">/{e.slug}</p>
                <p className="font-display text-2xl leading-tight">{e.name}</p>
                {e.description && <p className="mt-1 text-sm opacity-70">{e.description}</p>}
              </div>
              {!e.is_published && (
                <span className="rounded-full bg-preto/10 px-2 py-0.5 font-mono text-[10px] uppercase text-preto/60">
                  rascunho
                </span>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <Link
                to={`/${e.slug}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-preto px-4 py-2 text-sm text-bege transition hover:bg-laranja hover:text-preto"
              >
                <Presentation className="h-4 w-4" /> apresentar
              </Link>
              <a
                href={`/${e.slug}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-preto/15 px-3 py-2 text-sm opacity-70 hover:opacity-100"
              >
                <ExternalLink className="h-4 w-4" /> /{e.slug}
              </a>
            </div>
          </article>
        ))}
        {list.length === 0 && (
          <p className="col-span-full rounded-2xl border border-dashed border-preto/15 p-8 text-center text-sm opacity-60">
            nenhum template ainda.
          </p>
        )}
      </div>
    </div>
  );
}
