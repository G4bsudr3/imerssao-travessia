import type { EventModule } from "../types";
import type { SlideEntry } from "../travessia/manifest";
import { bootcampCaldeiraEvent } from "../bootcamp-caldeira";

// Dia de VIBECODING do MBA na Faculdade Moinhos de Vento (Hospital Moinhos, POA).
// ATENÇÃO: placeholder de conteúdo. Por enquanto reaproveita o deck base (já escuro
// e no tema Moinhos) só pra o slug existir e renderizar bonito. O conteúdo específico
// de vibecoding (pensar por prompts, arquitetura antes do prompt, da ideia ao produto,
// build ao vivo) ainda vai ser montado — ver conversa. Capa/roteiro próprios.

const cover: SlideEntry = {
  key: "cover",
  kind: "special",
  component: "CoverSlide",
  props: {
    showLogo: false,
    labels: {
      eyebrow: "FACULDADE MOINHOS DE VENTO · MBA",
      title: "Vibecoding",
      sub: "da ideia ao produto com IA.",
    },
  },
};

export const moinhosVibecodingEvent: EventModule = {
  ...bootcampCaldeiraEvent,
  slug: "moinhos-vibecoding",
  name: "Vibecoding · Moinhos de Vento",
  themeClass: "theme-moinhos",
  manifest: [cover, ...bootcampCaldeiraEvent.manifest.slice(1)],
  scripts: {
    ...bootcampCaldeiraEvent.scripts,
    cover: `Boa noite! Que prazer estar aqui na Faculdade Moinhos de Vento com vocês. Essa parte é sobre vibecoding: como sair de uma ideia e chegar num produto no ar usando IA, rápido, mesmo sem ser dev. Bora construir.`,
  },
};

export default moinhosVibecodingEvent;
