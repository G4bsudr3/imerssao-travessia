import { createContext, useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { EventModule, ActMeta } from "@/events/types";
import { getEvent } from "@/events/registry";

type EventContextValue = {
  event: EventModule;
  /** ato (1..N) do slide informado */
  actForSlide: (idx: number) => ActMeta;
  /** true se o slide é o opener de algum ato */
  isActOpener: (idx: number) => boolean;
  /** URL absoluta pra um path relativo ao evento (ex: "join/ABCD" → "https://.../travessia/join/ABCD") */
  resolveUrl: (relativePath: string) => string;
};

const EventContext = createContext<EventContextValue | null>(null);

export function EventProvider({ event, children }: { event: EventModule; children: React.ReactNode }) {
  // Aplica themeClass no <html> enquanto o evento estiver montado
  useEffect(() => {
    if (!event.themeClass) return;
    const root = document.documentElement;
    root.classList.add(event.themeClass);
    return () => root.classList.remove(event.themeClass!);
  }, [event.themeClass]);

  const value = useMemo<EventContextValue>(() => {
    const actForSlide = (idx: number): ActMeta => {
      const { boundaries, metas } = event.acts;
      for (let i = 0; i < boundaries.length; i++) {
        if (idx <= boundaries[i]) return metas[i + 1];
      }
      return metas[boundaries.length] ?? metas[1];
    };
    const isActOpener = (idx: number) => event.acts.openerIndices.includes(idx);
    const resolveUrl = (relativePath: string) => {
      if (/^https?:\/\//.test(relativePath)) return relativePath;
      const base = typeof window !== "undefined" ? window.location.origin : "";
      const clean = relativePath.replace(/^\/+/, "");
      return `${base}/${event.slug}/${clean}`;
    };
    return { event, actForSlide, isActOpener, resolveUrl };
  }, [event]);

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

/** Hook seguro: precisa estar dentro de <EventProvider>. */
export function useEvent(): EventContextValue {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvent precisa estar dentro de <EventProvider>");
  return ctx;
}

/** Lê o slug do evento da URL (param :eventSlug) e devolve o módulo. Null se não existir. */
export function useEventFromRoute(): EventModule | null {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  return getEvent(eventSlug);
}
