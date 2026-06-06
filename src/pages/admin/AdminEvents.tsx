import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Plus, Presentation, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

type EventRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  is_published: boolean;
  theme: Record<string, unknown> | null;
  contacts: Record<string, unknown> | null;
  created_at: string;
};

type FormState = {
  slug: string;
  name: string;
  description: string;
  themeClass: string;
  instagramUrl: string;
  instagramLabel: string;
  whatsappUrl: string;
  whatsappLabel: string;
  is_published: boolean;
};

const EMPTY: FormState = {
  slug: "",
  name: "",
  description: "",
  themeClass: "",
  instagramUrl: "",
  instagramLabel: "",
  whatsappUrl: "",
  whatsappLabel: "",
  is_published: true,
};

function rowToForm(r: EventRow): FormState {
  const theme = (r.theme as { themeClass?: string } | null) ?? {};
  const contacts = (r.contacts as {
    instagram?: { url: string; label: string };
    whatsapp?: { url: string; label: string };
  } | null) ?? {};
  return {
    slug: r.slug,
    name: r.name,
    description: r.description ?? "",
    themeClass: theme.themeClass ?? "",
    instagramUrl: contacts.instagram?.url ?? "",
    instagramLabel: contacts.instagram?.label ?? "",
    whatsappUrl: contacts.whatsapp?.url ?? "",
    whatsappLabel: contacts.whatsapp?.label ?? "",
    is_published: r.is_published,
  };
}

export default function AdminEvents() {
  const [items, setItems] = useState<EventRow[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<EventRow | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });
    setItems((data ?? []) as EventRow[]);
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };

  const openEdit = (r: EventRow) => {
    setEditing(r);
    setForm(rowToForm(r));
    setOpen(true);
  };

  const save = async () => {
    const slug = form.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    if (!slug || !form.name.trim()) {
      toast({ title: "slug e nome são obrigatórios", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const theme: Record<string, string> = {};
      if (form.themeClass.trim()) theme.themeClass = form.themeClass.trim();

      const contacts: Record<string, { url: string; label: string }> = {};
      if (form.instagramUrl.trim()) {
        contacts.instagram = { url: form.instagramUrl.trim(), label: form.instagramLabel.trim() || form.instagramUrl };
      }
      if (form.whatsappUrl.trim()) {
        contacts.whatsapp = { url: form.whatsappUrl.trim(), label: form.whatsappLabel.trim() || form.whatsappUrl };
      }

      const payload = {
        slug,
        name: form.name.trim(),
        description: form.description.trim() || null,
        theme,
        contacts,
        is_published: form.is_published,
      };

      const { error } = editing
        ? await supabase.from("events").update(payload).eq("id", editing.id)
        : await supabase.from("events").insert(payload);

      if (error) throw error;
      toast({ title: editing ? "evento atualizado" : "evento criado" });
      setOpen(false);
      await load();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "erro ao salvar";
      toast({ title: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (r: EventRow) => {
    if (!confirm(`excluir evento "${r.name}"? feedbacks ligados a ele permanecem no banco.`)) return;
    const { error } = await supabase.from("events").delete().eq("id", r.id);
    if (error) {
      toast({ title: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "evento excluído" });
    load();
  };

  return (
    <div className="space-y-6 p-8">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">eventos</p>
          <h1 className="font-display text-4xl">templates de apresentação</h1>
          <p className="mt-1 text-sm opacity-60">
            cada evento ganha uma rota <code className="font-mono">/&lt;slug&gt;</code> rodando o
            template padrão. depois é só pedir pra IA ajustar os slides.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" /> novo evento
        </Button>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((e) => (
          <article key={e.id} className="rounded-2xl border border-preto/10 bg-white/60 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">/{e.slug}</p>
                <p className="font-display text-2xl leading-tight">{e.name}</p>
                {e.description && <p className="mt-1 text-sm opacity-70">{e.description}</p>}
              </div>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase ${
                  e.is_published ? "bg-laranja/15 text-preto" : "bg-preto/10 text-preto/60"
                }`}
              >
                {e.is_published ? "publicado" : "rascunho"}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
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
                <ExternalLink className="h-4 w-4" />
              </a>
              <Button variant="outline" size="sm" onClick={() => openEdit(e)}>
                editar
              </Button>
              <Button variant="ghost" size="sm" onClick={() => remove(e)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </article>
        ))}
        {items.length === 0 && (
          <p className="col-span-full rounded-2xl border border-dashed border-preto/15 p-8 text-center text-sm opacity-60">
            nenhum evento ainda. crie o primeiro.
          </p>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "editar evento" : "novo evento"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>slug (URL)</Label>
                <Input
                  value={form.slug}
                  disabled={!!editing}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="meu-evento"
                />
              </div>
              <div>
                <Label>nome</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Imersão XYZ"
                />
              </div>
            </div>
            <div>
              <Label>descrição</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
              />
            </div>
            <div>
              <Label>theme class (opcional)</Label>
              <Input
                value={form.themeClass}
                onChange={(e) => setForm({ ...form, themeClass: e.target.value })}
                placeholder="theme-meu-evento"
              />
              <p className="mt-1 text-xs opacity-60">
                aplicada no <code>{"<html>"}</code>. depois peça à IA pra criar overrides em
                index.css.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>instagram URL</Label>
                <Input
                  value={form.instagramUrl}
                  onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                  placeholder="https://instagram.com/…"
                />
              </div>
              <div>
                <Label>instagram label</Label>
                <Input
                  value={form.instagramLabel}
                  onChange={(e) => setForm({ ...form, instagramLabel: e.target.value })}
                  placeholder="@handle"
                />
              </div>
              <div>
                <Label>whatsapp URL</Label>
                <Input
                  value={form.whatsappUrl}
                  onChange={(e) => setForm({ ...form, whatsappUrl: e.target.value })}
                  placeholder="https://wa.me/55…"
                />
              </div>
              <div>
                <Label>whatsapp label</Label>
                <Input
                  value={form.whatsappLabel}
                  onChange={(e) => setForm({ ...form, whatsappLabel: e.target.value })}
                  placeholder="11 9…"
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-preto/10 p-3">
              <div>
                <p className="text-sm font-medium">publicado</p>
                <p className="text-xs opacity-60">se desligado, só admin acessa a rota</p>
              </div>
              <Switch
                checked={form.is_published}
                onCheckedChange={(v) => setForm({ ...form, is_published: v })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>cancelar</Button>
            <Button onClick={save} disabled={saving}>
              {saving ? "salvando…" : editing ? "salvar" : "criar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
