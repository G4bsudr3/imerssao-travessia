import type { ComponentType } from "react";
import type { SlideEntry } from "./travessia/manifest";
import type { Phase } from "@/contexts/RoomContext";

export type ActMeta = { number: number; name: string; subtitle: string };

export type EventContacts = {
  /** ex: "https://instagram.com/gabreda" — se ausente, esconde o QR */
  instagram?: { url: string; label: string };
  whatsapp?: { url: string; label: string };
  /** path interno (relativo ao slug do evento) ou URL absoluta — default: feedback do próprio evento */
  feedback?: { path: string; label?: string };
};

export type EventActs = {
  /** ACTS por número (1..N) */
  metas: Record<number, ActMeta>;
  /** índice (0-based) do ÚLTIMO slide de cada ato, em ordem */
  boundaries: number[];
  /** índices dos slides de abertura de cada ato (pra animação) */
  openerIndices: number[];
};

export type EventModule = {
  slug: string;
  name: string;
  /** className aplicada no <html> para overrides de CSS (tokens, fundo etc). opcional. */
  themeClass?: string;
  contacts: EventContacts;
  manifest: SlideEntry[];
  /** = manifest.length, cacheado pra clareza */
  totalSlides: number;
  acts: EventActs;
  isLivePhaseSlide: (key: string) => Phase | null;
  isIterationSlide: (key: string) => boolean;
};

export type EventModuleLoader = () => EventModule;
