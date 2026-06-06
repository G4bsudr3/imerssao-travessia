// Registry de eventos — 100% data-driven.
// Cada evento publicado em `public.events` (DB) clona o TEMPLATE DE EXEMPLO (_default)
// como base. A Travessia é a única exceção: tem override de código com o deck real.
// Customizações de slides por evento vivem em código (src/events/<slug>/) — opcional:
// crie um módulo com manifesto próprio e registre em CODE_OVERRIDES.

import type { EventModule, EventContacts } from "./types";
import { travessiaEvent } from "./travessia";
import { defaultEvent } from "./_default";

/** Eventos com override de código (manifesto próprio, atos, etc). */
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

/**
 * Constrói um EventModule a partir de um registro do banco.
 * - Se houver override de código (ex: Travessia), usa o deck real e só mescla metadados.
 * - Caso contrário, clona o TEMPLATE DE EXEMPLO (_default) — slides placeholder, NÃO a Travessia.
 */
export function buildEventModuleFromRow(row: EventRow): EventModule {
  const override = CODE_OVERRIDES[row.slug];
  if (override) {
    // mescla metadata do DB com o manifesto do código (não altera o deck real)
    return {
      ...override,
      name: row.name || override.name,
      themeClass: row.theme?.themeClass ?? override.themeClass,
      contacts: { ...override.contacts, ...(row.contacts ?? {}) },
    };
  }
  // Novo evento: clona o template de exemplo (placeholder). Os slides vêm do _default.
  // Contatos do DB sobrescrevem os placeholders quando preenchidos no /admin.
  return {
    ...defaultEvent,
    slug: row.slug,
    name: row.name,
    themeClass: row.theme?.themeClass ?? defaultEvent.themeClass,
    contacts: { ...defaultEvent.contacts, ...(row.contacts ?? {}) },
  };
}

/** Fallback síncrono usado em legados — só conhece eventos do código. Prefira loadEventFromDb. */
export function getEvent(slug: string | undefined): EventModule | null {
  if (!slug) return null;
  return CODE_OVERRIDES[slug] ?? null;
}

export const CODE_EVENT_SLUGS = Object.keys(CODE_OVERRIDES);