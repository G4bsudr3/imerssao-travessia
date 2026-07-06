import type { EventModule } from "../types";
import type { SlideEntry } from "../travessia/manifest";
import { travessiaEvent } from "../travessia";

// Bootcamp presencial em parceria com o Instituto Caldeira (Porto Alegre · sex & sáb).
// MESMO deck da Travessia (= o conteúdo do /chora-lovable). Só trocamos a CAPA pelas
// infos do evento (sem "empresário de software") e aplicamos a identidade do Caldeira
// (tema verde neon + preto). Todo o resto — atos, fases ao vivo, iteração — vem da Travessia.

const cover: SlideEntry = {
  key: "cover",
  kind: "static",
  staticProps: {
    variant: "act",
    eyebrow: "BOOTCAMP PRESENCIAL · EM PARCERIA COM O INSTITUTO CALDEIRA",
    title: "Bootcamp Lovable",
    subtitle: "Porto Alegre · sexta & sábado",
    background: "naval",
  },
};

export const bootcampCaldeiraEvent: EventModule = {
  ...travessiaEvent,
  slug: "bootcamp-caldeira",
  name: "Bootcamp Lovable · Instituto Caldeira",
  themeClass: "theme-caldeira",
  contacts: { ...travessiaEvent.contacts },
  manifest: [cover, ...travessiaEvent.manifest.slice(1)],
};

export default bootcampCaldeiraEvent;
