// Registry de eventos — agora 100% data-driven.
// Cada evento publicado em `public.events` (DB) usa o manifesto da Travessia
// como template padrão. Customizações específicas de slides ainda vivem em código
// (em src/events/<slug>/), mas isso é opcional — você cria o evento no /admin
// e ele já roda com o template default.

import type { EventModule, EventContacts } from "./types";
import { travessiaEvent } from "./travessia";

/** Eventos com código-side overrides (manifesto, atos, etc). */
const CODE_OVERRIDES: Record<string, EventModule> = {
  [travessiaEvent.slug]: travessiaEvent,
};

export type EventRow = {
  slug: string;
  name: string;
  description: string | null;
  theme: { themeClass?: string } | null;
  contacts: EventContacts | null;
  is_published: boolean;
};

/** Constrói um EventModule a partir de um registro do banco. Usa o template default da Travessia. */
export function buildEventModuleFromRow(row: EventRow): EventModule {
  const override = CODE_OVERRIDES[row.slug];
  if (override) {
    // mescla metadata do DB com manifesto do código
    return {
      ...override,
      name: row.name || override.name,
      themeClass: row.theme?.themeClass ?? override.themeClass,
      contacts: { ...override.contacts, ...(row.contacts ?? {}) },
    };
  }
  // Novo evento: usa manifesto/atos da Travessia como base, só troca nome/tema/contatos.
  return {
    ...travessiaEvent,
    slug: row.slug,
    name: row.name,
    themeClass: row.theme?.themeClass ?? travessiaEvent.themeClass,
    contacts: row.contacts ?? {},
  };
}

/** Fallback síncrono usado em legados — só conhece eventos do código. Prefira loadEventFromDb. */
export function getEvent(slug: string | undefined): EventModule | null {
  if (!slug) return null;
  return CODE_OVERRIDES[slug] ?? null;
}

export const CODE_EVENT_SLUGS = Object.keys(CODE_OVERRIDES);
