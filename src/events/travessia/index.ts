import type { EventModule } from "../types";
import { slideManifest, TOTAL_SLIDES, isLivePhaseSlide, isIterationSlide } from "./manifest";

// ACTS da Travessia
const ACTS = {
  1: { number: 1, name: "por quê", subtitle: "o risco que você não vê" },
  2: { number: 2, name: "supabase", subtitle: "RLS, edge, RPC" },
  3: { number: 3, name: "código + governança", subtitle: "LGPD + ferramentas" },
  4: { number: 4, name: "arquitetura", subtitle: "escalar sem dor" },
} as const;

// Último índice (0-based) de cada ato
// Ato 1: 0-7 · Ato 2: 8-15 · Ato 3: 16-47 · Ato 4: 48-fim
const BOUNDARIES = [7, 15, 47, TOTAL_SLIDES - 1];
// Slides de abertura (os "act" slides)
const OPENERS = [1, 8, 16, 48];

export const travessiaEvent: EventModule = {
  slug: "travessia",
  name: "Imersão TRAVESSIA",
  // themeClass: "theme-travessia", // opcional — Travessia já é o default em index.css
  contacts: {
    instagram: { url: "https://instagram.com/gabreda", label: "@gabreda" },
    whatsapp: { url: "https://wa.me/5511945853553", label: "11 94585-3553" },
    feedback: { path: "feedback", label: "me conta o que ficou" },
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

export default travessiaEvent;
