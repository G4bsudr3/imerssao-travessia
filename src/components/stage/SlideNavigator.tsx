import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEvent } from "@/contexts/EventContext";
import type { SlideEntry } from "@/events/travessia/manifest";

type Props = {
  open: boolean;
  current: number;
  onSelect: (idx: number) => void;
  onClose: () => void;
};

function titleOf(entry: SlideEntry, idx: number): string {
  if (entry.kind === "static") return entry.staticProps.title ?? entry.staticProps.eyebrow ?? entry.key;
  if ("props" in entry && entry.props && "title" in entry.props) return String(entry.props.title);
  return entry.key.replace(/_/g, " ");
}

/** Navegador de slides (tecla G): lista lateral pra pular direto pra qualquer slide. */
export function SlideNavigator({ open, current, onSelect, onClose }: Props) {
  const { event, actForSlide } = useEvent();
  const listRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("");

  const items = useMemo(
    () =>
      event.manifest.map((e, idx) => ({
        idx,
        key: e.key ?? String(idx),
        title: titleOf(e, idx),
        act: actForSlide(idx).number,
      })),
    [event.manifest, actForSlide],
  );

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.title.toLowerCase().includes(q) || i.key.includes(q));
  }, [items, filter]);

  // Scroll pro slide atual ao abrir
  useEffect(() => {
    if (!open) return;
    setFilter("");
    requestAnimationFrame(() => {
      listRef.current
        ?.querySelector(`[data-idx="${current}"]`)
        ?.scrollIntoView({ block: "center" });
    });
  }, [open, current]);

  // Navegação por teclado dentro do painel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); }
      if (e.key === "Enter" && filtered.length > 0) {
        onSelect(filtered[0].idx);
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, filtered, onSelect, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-[380px] flex-col border-l border-white/10 bg-black/90 text-white backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
              ir para slide · {items.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white/80"
              aria-label="fechar navegador (G ou Esc)"
            >
              G · fechar
            </button>
          </div>

          <div className="border-b border-white/10 px-5 py-3">
            <input
              autoFocus
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="filtrar…"
              className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 font-mono text-sm text-white placeholder:text-white/30 focus:border-laranja focus:outline-none"
            />
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto px-2 py-2">
            {filtered.map((item) => {
              const active = item.idx === current;
              return (
                <button
                  key={item.key}
                  data-idx={item.idx}
                  type="button"
                  onClick={() => { onSelect(item.idx); onClose(); }}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                    active ? "bg-laranja/15 text-laranja" : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className={`w-10 shrink-0 font-mono text-[11px] ${active ? "text-laranja" : "text-white/30 group-hover:text-white/50"}`}>
                    {String(item.idx + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm leading-snug">
                    {item.title}
                  </span>
                  <span className="shrink-0 font-mono text-[9px] uppercase tracking-widest text-white/25">
                    ato {item.act}
                  </span>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="px-3 py-6 text-center font-mono text-xs text-white/35">
                nenhum slide encontrado
              </p>
            )}
          </div>

          <div className="border-t border-white/10 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            ↑ filtre · Enter abre o 1º · Esc fecha
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
