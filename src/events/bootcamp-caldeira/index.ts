import type { EventModule } from "../types";
import { slideManifest, TOTAL_SLIDES } from "./manifest";
import { scripts } from "./scripts";

// BLOCOS do bootcamp (mesmo cronograma de 1h do workshop DEATEC)
const BLOCOS = {
  1: { number: 1, name: "abertura", subtitle: "panorama de ameaças em 2026" },
  2: { number: 2, name: "segurança em IA", subtitle: "riscos & conformidade" },
  3: { number: 3, name: "automação inteligente", subtitle: "prática · ao vivo" },
  4: { number: 4, name: "auditando com IA", subtitle: "ferramentas e DIY" },
  5: { number: 5, name: "encerramento", subtitle: "takeaways & Q&A" },
} as const;

// Openers = índices dos divisores "bloco_N". Boundaries = último índice de cada bloco.
// Computados do manifest pra nunca dessincronizar.
const OPENERS = slideManifest
  .map((s, i) => (/^bloco_\d+$/.test(s.key) ? i : -1))
  .filter((i) => i >= 0);
const BOUNDARIES = OPENERS.slice(1)
  .map((i) => i - 1)
  .concat(TOTAL_SLIDES - 1);

// Bootcamp: sem fases ao vivo embutidas nem loops de iteração.
const noLivePhase = () => null;
const noIteration = () => false;

export const bootcampCaldeiraEvent: EventModule = {
  slug: "bootcamp-caldeira",
  name: "Segurança em IA & Automação · Bootcamp Caldeira",
  sectionLabel: "bloco",
  themeClass: "theme-caldeira",
  contacts: {
    instagram: { url: "https://instagram.com/gabreda", label: "@gabreda" },
    whatsapp: { url: "https://wa.me/5511945853553", label: "11 94585-3553" },
    feedback: { path: "feedback", label: "me conta o que achou" },
  },
  manifest: slideManifest,
  totalSlides: TOTAL_SLIDES,
  acts: {
    metas: BLOCOS,
    boundaries: BOUNDARIES,
    openerIndices: OPENERS,
  },
  scripts,
  isLivePhaseSlide: noLivePhase,
  isIterationSlide: noIteration,
};

export default bootcampCaldeiraEvent;
