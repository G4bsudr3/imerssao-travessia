// Registry de eventos.
// A ESTRUTURA da apresentação é sempre a mesma — a da Travessia. O que muda por
// evento é só o PRIMEIRO slide (a capa, com as infos do evento) e os metadados
// (nome, tema, contatos). Todos os demais slides são IDÊNTICOS aos da Travessia.
// A Travessia em si tem override de código e fica intacta.

import type { EventModule, EventContacts } from "./types";
import type { SlideEntry } from "./travessia/manifest";
import { travessiaEvent } from "./travessia";
import { cybersecLgpdEvent } from "./cybersec-lgpd";
import { deatecEvent } from "./deatec";

/** Eventos com override de código (deck/atos próprios). */
const CODE_OVERRIDES: Record<string, EventModule> = {
  [travessiaEvent.slug]: travessiaEvent,
  [cybersecLgpdEvent.slug]: cybersecLgpdEvent,
  [deatecEvent.slug]: deatecEvent,
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
 * Capa do evento — é o ÚNICO slide que muda em relação à Travessia.
 * Usa o nome (e a descrição) do evento cadastrado no /admin.
 */
function makeEventCover(row: EventRow): SlideEntry {
  return {
    key: "cover",
    kind: "static",
    staticProps: {
      variant: "act",
      eyebrow: "evento",
      title: row.name,
      subtitle: row.description ?? "personalize esta capa com as infos do evento",
      background: "naval",
    },
  };
}

/**
 * Constrói um EventModule a partir de um registro do banco.
 * - Travessia (override de código): usa o deck real, só mescla metadados.
 * - Qualquer outro evento: MESMO deck da Travessia, trocando só a capa (slide 0).
 */
export function buildEventModuleFromRow(row: EventRow): EventModule {
  const override = CODE_OVERRIDES[row.slug];
  if (override) {
    // mescla metadata do DB com o deck do código (não altera o deck real)
    return {
      ...override,
      name: row.name || override.name,
      themeClass: row.theme?.themeClass ?? override.themeClass,
      contacts: { ...override.contacts, ...(row.contacts ?? {}) },
    };
  }
  // Estrutura idêntica à Travessia; só a capa (índice 0) vira a capa do evento.
  // totalSlides/acts/isLivePhaseSlide/isIterationSlide são herdados via spread —
  // a contagem não muda (só substituímos o slide 0).
  return {
    ...travessiaEvent,
    slug: row.slug,
    name: row.name,
    themeClass: row.theme?.themeClass ?? travessiaEvent.themeClass,
    contacts: row.contacts ?? {},
    manifest: [makeEventCover(row), ...travessiaEvent.manifest.slice(1)],
  };
}

/** Fallback síncrono usado em legados — só conhece eventos do código. Prefira loadEventFromDb. */
export function getEvent(slug: string | undefined): EventModule | null {
  if (!slug) return null;
  return CODE_OVERRIDES[slug] ?? null;
}

export const CODE_EVENT_SLUGS = Object.keys(CODE_OVERRIDES);
