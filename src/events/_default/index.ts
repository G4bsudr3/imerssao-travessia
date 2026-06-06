import type { EventModule } from "../types";
import { slideManifest, TOTAL_SLIDES, isLivePhaseSlide, isIterationSlide } from "./manifest";

// Atos do template de exemplo (genéricos).
const ACTS = {
  1: { number: 1, name: "tópico um", subtitle: "exemplo" },
  2: { number: 2, name: "tópico dois", subtitle: "exemplo" },
} as const;

// índices: cover(0) intro(1) agenda(2) ato_1(3) pontos_1(4) stat(5) ato_2(6) lista(7) fechamento(8)
const BOUNDARIES = [5, TOTAL_SLIDES - 1];
const OPENERS = [3, 6];

/** Evento PLACEHOLDER clonado por todo evento novo do /admin. Não é a Travessia. */
export const defaultEvent: EventModule = {
  slug: "_default",
  name: "Evento de Exemplo",
  contacts: {
    instagram: { url: "https://instagram.com/seu_instagram", label: "@seu_instagram" },
    feedback: { path: "feedback", label: "deixe seu feedback" },
  },
  manifest: slideManifest,
  totalSlides: TOTAL_SLIDES,
  acts: {
    metas: ACTS,
    boundaries: BOUNDARIES,
    openerIndices: OPENERS,
  },
  isLivePhaseSlide,
  isIterationSlide,
};

export default defaultEvent;