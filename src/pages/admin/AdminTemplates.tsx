import { Link } from "react-router-dom";
import { ExternalLink, Presentation } from "lucide-react";
import { EVENTS } from "@/events/registry";

export default function AdminTemplates() {
  const list = Object.values(EVENTS);
  return (
    <div className="space-y-6 p-8">
      <header>
        <p className="eyebrow">templates</p>
        <h1 className="font-display text-4xl">apresentações disponíveis</h1>
        <p className="mt-1 text-sm opacity-60">
          cada template vive em <code className="font-mono">src/events/&lt;slug&gt;/</code>. Pra criar um novo, duplique a pasta da Travessia e ajuste.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((e) => (
          <article key={e.slug} className="rounded-2xl border border-preto/10 bg-white/60 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow">{e.slug}</p>
                <p className="font-display text-2xl leading-tight">{e.name}</p>
              </div>
              <span className="rounded-full bg-laranja/15 px-2 py-0.5 font-mono text-[10px] uppercase">
                {e.totalSlides} slides
              </span>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <Detail label="atos" value={Object.keys(e.acts.metas).length} />
              <Detail label="tema" value={e.themeClass ?? "default"} />
              <Detail label="instagram" value={e.contacts.instagram?.label ?? "—"} />
              <Detail label="whatsapp" value={e.contacts.whatsapp?.label ?? "—"} />
            </dl>

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
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="opacity-50">{label}</dt>
      <dd className="font-mono">{value}</dd>
    </div>
  );
}
