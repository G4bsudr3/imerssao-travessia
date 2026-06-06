// Registro central de eventos. Pra adicionar um evento novo:
// 1. Copie a pasta src/events/travessia para src/events/<novo-slug>/
// 2. Ajuste src/events/<novo-slug>/index.ts (slug, name, contacts, acts, themeClass)
// 3. Edite src/events/<novo-slug>/manifest.tsx com seus slides
// 4. Importe e adicione abaixo
import type { EventModule } from "./types";
import { travessiaEvent } from "./travessia";

export const EVENTS: Record<string, EventModule> = {
  [travessiaEvent.slug]: travessiaEvent,
};

export const EVENT_SLUGS = Object.keys(EVENTS);

export function getEvent(slug: string | undefined): EventModule | null {
  if (!slug) return null;
  return EVENTS[slug] ?? null;
}
