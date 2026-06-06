import { useEffect, useMemo, useState } from "react";
import { Calendar as ShadCalendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EVENT_SLUGS, EVENTS } from "@/events/registry";

type Edition = {
  id: string;
  event_slug: string;
  title: string;
  scheduled_at: string;
  duration_minutes: number;
  location: string | null;
  audience: string | null;
  room_code: string | null;
  status: string;
  notes: string | null;
};

const STATUSES = ["scheduled", "live", "done", "canceled"] as const;

export default function AdminAgenda() {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState<Date>(new Date());
  const [editing, setEditing] = useState<Edition | null>(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("event_editions")
      .select("*")
      .order("scheduled_at", { ascending: true });
    setEditions((data ?? []) as Edition[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const datesWithEvent = useMemo(
    () => editions.map((e) => new Date(e.scheduled_at)),
    [editions],
  );

  const handleSaved = async () => {
    setOpen(false);
    setEditing(null);
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("apagar essa edição?")) return;
    await supabase.from("event_editions").delete().eq("id", id);
    await load();
  };

  return (
    <div className="space-y-8 p-8">
      <header className="flex items-center justify-between">
        <div>
          <p className="eyebrow">agenda</p>
          <h1 className="font-display text-4xl">palestras agendadas</h1>
        </div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setEditing(null); }}>
          <DialogTrigger asChild>
            <Button className="btn-laranja !h-11 !w-auto !text-base px-5">
              <Plus className="mr-1 h-4 w-4" /> nova edição
            </Button>
          </DialogTrigger>
          <EditionDialog edition={editing} onSaved={handleSaved} onCancel={() => { setOpen(false); setEditing(null); }} />
        </Dialog>
      </header>

      <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
        <div className="rounded-2xl border border-preto/10 bg-white/60 p-3">
          <ShadCalendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            modifiers={{ event: datesWithEvent }}
            modifiersClassNames={{ event: "bg-laranja/20 text-preto font-display rounded-full" }}
            className="pointer-events-auto"
          />
        </div>

        <div className="space-y-3">
          {loading ? (
            <p className="text-sm opacity-60">carregando…</p>
          ) : editions.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-preto/15 p-8 text-center text-sm opacity-60">
              nenhuma edição ainda. clica em "nova edição".
            </p>
          ) : (
            editions.map((e) => (
              <article
                key={e.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-preto/10 bg-white/60 p-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-preto/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest">
                      {EVENTS[e.event_slug]?.name ?? e.event_slug}
                    </span>
                    <span className="rounded-full bg-laranja/15 px-2 py-0.5 font-mono text-[10px] uppercase">
                      {e.status}
                    </span>
                  </div>
                  <p className="mt-1 font-display text-xl leading-tight">{e.title}</p>
                  <p className="text-xs opacity-60">
                    {new Date(e.scheduled_at).toLocaleString("pt-BR")} · {e.duration_minutes}min
                    {e.location ? ` · ${e.location}` : ""}
                    {e.room_code ? ` · sala ${e.room_code}` : ""}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => { setEditing(e); setOpen(true); }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(e.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function EditionDialog({
  edition,
  onSaved,
  onCancel,
}: {
  edition: Edition | null;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    event_slug: edition?.event_slug ?? EVENT_SLUGS[0] ?? "",
    title: edition?.title ?? "",
    scheduled_at: edition?.scheduled_at
      ? toLocalInput(new Date(edition.scheduled_at))
      : toLocalInput(new Date()),
    duration_minutes: edition?.duration_minutes ?? 120,
    location: edition?.location ?? "",
    audience: edition?.audience ?? "",
    room_code: edition?.room_code ?? "",
    status: edition?.status ?? "scheduled",
    notes: edition?.notes ?? "",
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!form.title.trim() || !form.event_slug || !form.scheduled_at) return;
    setSaving(true);
    const payload = {
      event_slug: form.event_slug,
      title: form.title.trim(),
      scheduled_at: new Date(form.scheduled_at).toISOString(),
      duration_minutes: Number(form.duration_minutes) || 120,
      location: form.location.trim() || null,
      audience: form.audience.trim() || null,
      room_code: form.room_code.trim() || null,
      status: form.status,
      notes: form.notes.trim() || null,
    };
    if (edition) {
      await supabase.from("event_editions").update(payload).eq("id", edition.id);
    } else {
      await supabase.from("event_editions").insert(payload);
    }
    setSaving(false);
    onSaved();
  };

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>{edition ? "editar edição" : "nova edição"}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <Field label="template">
          <Select value={form.event_slug} onValueChange={(v) => setForm({ ...form, event_slug: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {EVENT_SLUGS.map((s) => (
                <SelectItem key={s} value={s}>{EVENTS[s].name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="título">
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="ex: Travessia Alphaville · turma 2" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="quando">
            <Input
              type="datetime-local"
              value={form.scheduled_at}
              onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })}
            />
          </Field>
          <Field label="duração (min)">
            <Input type="number" value={form.duration_minutes}
              onChange={(e) => setForm({ ...form, duration_minutes: Number(e.target.value) })} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="local">
            <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Alphaville" />
          </Field>
          <Field label="público">
            <Input value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} placeholder="empresários" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="código da sala">
            <Input value={form.room_code} onChange={(e) => setForm({ ...form, room_code: e.target.value.toUpperCase() })} placeholder="opcional" maxLength={6} />
          </Field>
          <Field label="status">
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field label="notas">
          <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} />
        </Field>
      </div>
      <DialogFooter>
        <Button variant="ghost" onClick={onCancel}>cancelar</Button>
        <Button onClick={save} disabled={saving || !form.title.trim()} className="btn-laranja !h-10 !w-auto !text-base px-5">
          {saving ? "salvando…" : "salvar"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs uppercase tracking-wider opacity-70">{label}</Label>
      {children}
    </div>
  );
}

function toLocalInput(d: Date) {
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 16);
}
