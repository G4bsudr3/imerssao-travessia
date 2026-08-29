import type { EventModule } from "../types";
import { slideManifest, TOTAL_SLIDES, isLivePhaseSlide, isIterationSlide } from "./manifest";

// ACTS da Travessia
const ACTS = {
  1: { number: 1, name: "por quê", subtitle: "o risco que você não vê" },
  2: { number: 2, name: "supabase", subtitle: "RLS, edge, RPC" },
  3: { number: 3, name: "código + governança", subtitle: "LGPD + ferramentas" },
  4: { number: 4, name: "arquitetura", subtitle: "escalar sem dor" },
} as const;

// Índices calculados a partir do manifest — nunca quebram ao inserir slides
const idx = (key: string) => {
  const i = slideManifest.findIndex((s) => s.key === key);
  if (i < 0) throw new Error(`slide "${key}" não encontrado no manifest travessia`);
  return i;
};
// Slides de abertura (os "act" slides)
const OPENERS = [idx("ato_1_porque"), idx("ato_2_supabase"), idx("ato_3_codigo"), idx("ato_4_arquitetura")];
// Último índice (0-based) de cada ato
const BOUNDARIES = [...OPENERS.slice(1).map((i) => i - 1), TOTAL_SLIDES - 1];

export const travessiaEvent: EventModule = {
  slug: "travessia",
  name: "Imersão TRAVESSIA",
  // themeClass: "theme-travessia", // opcional — Travessia já é o default em index.css
  contacts: {
    instagram: { url: "https://instagram.com/gabreda", label: "@gabreda" },
    whatsapp: { url: "https://wa.me/5511945853553", label: "11 94585-3553" },
    feedback: { path: "feedback", label: "/feedback ou dúvidas" },
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
