import type { EventModule } from "../types";
import { slideManifest, TOTAL_SLIDES } from "./manifest";

// AULAS do curso "Cybersegurança e LGPD no VibeCoding"
const AULAS = {
  1: { number: 1, name: "o risco invisível", subtitle: "como apps de IA vazam dados" },
  2: { number: 2, name: "supabase & RLS", subtitle: "onde mora 80% do risco" },
  3: { number: 3, name: "RLS na prática", subtitle: "o jeito certo de configurar" },
  4: { number: 4, name: "código + governança", subtitle: "além do banco" },
  5: { number: 5, name: "LGPD sem juridiquês", subtitle: "o que é e o que muda" },
  6: { number: 6, name: "base legal", subtitle: "o coração da lei" },
  7: { number: 7, name: "transparência & papéis", subtitle: "controlador × operador" },
  8: { number: 8, name: "quanto custa ignorar", subtitle: "casos reais e multas" },
  9: { number: 9, name: "LGPD vira código", subtitle: "direitos do titular" },
  10: { number: 10, name: "arsenal & arquitetura", subtitle: "ferramentas e próximos passos" },
} as const;

// Último índice (0-based) de cada aula, em ordem.
// cover(0)+agenda(1) entram na faixa da aula 1.
const BOUNDARIES = [6, 11, 15, 18, 23, 31, 36, 41, 46, TOTAL_SLIDES - 1];
// Índices dos divisores "aula N" (slides de abertura de cada aula).
const OPENERS = [2, 7, 12, 16, 19, 24, 32, 37, 42, 47];

// Curso gravado: sem fases ao vivo nem loops de iteração.
const noLivePhase = () => null;
const noIteration = () => false;

export const cybersecLgpdEvent: EventModule = {
  slug: "cybersecurity-online-leo-pereira",
  name: "Cybersegurança e LGPD no VibeCoding",
  sectionLabel: "aula",
  contacts: {
    instagram: { url: "https://instagram.com/gabreda", label: "@gabreda" },
    whatsapp: { url: "https://wa.me/5511945853553", label: "11 94585-3553" },
    feedback: { path: "feedback", label: "me conta o que achou" },
  },
  manifest: slideManifest,
  totalSlides: TOTAL_SLIDES,
  acts: {
    metas: AULAS,
    boundaries: BOUNDARIES,
    openerIndices: OPENERS,
  },
  isLivePhaseSlide: noLivePhase,
  isIterationSlide: noIteration,
};

export default cybersecLgpdEvent;
