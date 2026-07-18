import type { EventModule } from "../types";
import type { SlideEntry } from "../travessia/manifest";
import { bootcampCaldeiraEvent } from "../bootcamp-caldeira";

// Dia de CYBERSEGURANÇA do MBA na Faculdade Moinhos de Vento (Hospital Moinhos, POA).
// Reaproveita o deck de segurança do bootcamp Caldeira (RLS, Storage, Auth, prompt
// injection, LGPD, arquitetura), com a identidade visual Moinhos (navy + magenta,
// Raleway) e capa/roteiro próprios.

const cover: SlideEntry = {
  key: "cover",
  kind: "special",
  component: "CoverSlide",
  props: {
    showLogo: false,
    labels: {
      eyebrow: "FACULDADE MOINHOS DE VENTO · MBA",
      title: "Cybersegurança",
      sub: "construir com IA sem vazar.",
    },
  },
};

export const moinhosCyberEvent: EventModule = {
  ...bootcampCaldeiraEvent,
  slug: "moinhos-cyberseguranca",
  name: "Cybersegurança · Moinhos de Vento",
  themeClass: "theme-moinhos",
  manifest: [cover, ...bootcampCaldeiraEvent.manifest.slice(1)],
  scripts: {
    ...bootcampCaldeiraEvent.scripts,
    cover: `Boa noite! Que prazer estar aqui na Faculdade Moinhos de Vento com vocês. Essa parte é sobre segurança: como construir rápido com IA sem deixar a porta dos fundos aberta. Nada de papo genérico de "usa senha forte" — a gente vai no risco real de quem constrói app com IA hoje, e principalmente em como blindar. Bora.`,
  },
};

export default moinhosCyberEvent;
