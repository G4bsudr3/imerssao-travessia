import type { EventModule } from "../types";
import type { SlideEntry } from "../travessia/manifest";
import { travessiaEvent } from "../travessia";
import { scripts } from "./scripts";

// Bootcamp presencial em parceria com o Instituto Caldeira (Porto Alegre · sex & sáb).
// MESMO deck da Travessia (= o conteúdo do /chora-lovable). Trocamos a CAPA pelas infos
// do evento (capa animada da Chora, sem "empresário de software", com subtítulo que já
// sinaliza o tema segurança), aplicamos a identidade do Caldeira (tema verde neon + preto)
// e adicionamos roteiro de teleprompter próprio (tecla T). Atos/estrutura vêm da Travessia.

const cover: SlideEntry = {
  key: "cover",
  kind: "special",
  component: "CoverSlide",
  props: {
    showLogo: true,
    labels: {
      eyebrow: "BOOTCAMP · INSTITUTO CALDEIRA · PORTO ALEGRE · SEX & SÁB",
      title: "",
      sub: "segurança no vibecoding — construa sem vazar.",
    },
  },
};

export const bootcampCaldeiraEvent: EventModule = {
  ...travessiaEvent,
  slug: "bootcamp-caldeira",
  name: "Bootcamp · Instituto Caldeira",
  themeClass: "theme-caldeira",
  contacts: { ...travessiaEvent.contacts },
  manifest: [cover, ...travessiaEvent.manifest.slice(1)],
  scripts,
};

export default bootcampCaldeiraEvent;
