import type { EventModule } from "../types";
import type { SlideEntry } from "../travessia/manifest";
import { travessiaEvent } from "../travessia";
import { scripts } from "./scripts";

// Bootcamp presencial em parceria com o Instituto Caldeira (Porto Alegre · sex & sáb).
// MESMO deck da Travessia (= o conteúdo do /chora-lovable). Diferenças do bootcamp:
//  - capa animada da Chora com as infos do evento (sem "empresário de software");
//  - identidade do Caldeira (tema verde neon + preto);
//  - roteiro de teleprompter próprio (tecla T);
//  - 1 slide extra: o Marco Legal da IA (PL 2338), fechando o arco de LGPD/IA.
// O deck da Travessia em si NÃO é alterado — o slide extra e os índices vivem só aqui.

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

// Slide extra (só no bootcamp): o Marco Legal da IA — amarra com o art. 20 da LGPD.
const marcoLegalIA: SlideEntry = {
  key: "marco_legal_ia",
  kind: "static",
  staticProps: {
    variant: "list",
    eyebrow: "o que vem aí · Marco Legal da IA (PL 2338)",
    background: "naval",
    items: [
      { label: "aprovado no Senado, em votação final na Câmara", sub: "previsão de fechar em 2026" },
      { label: "segue o modelo do EU AI Act", sub: "classifica a IA por nível de risco" },
      { label: "direito a explicação e contestação", sub: "reforça o art. 20 da LGPD que a gente viu" },
      { label: "cria o SIA · multa até R$ 50 mi", sub: "governança nacional de IA — sai do papel já já", accent: true },
    ],
  },
};

// deck = capa do evento + resto da Travessia, com o Marco Legal inserido antes de
// "ferramentas_intro" (fim do arco de LGPD). Índices dos atos recalculados +1 dali pra frente.
const base: SlideEntry[] = [cover, ...travessiaEvent.manifest.slice(1)];
const insertAt = base.findIndex((s) => s.key === "ferramentas_intro");
const manifest: SlideEntry[] =
  insertAt >= 0
    ? [...base.slice(0, insertAt), marcoLegalIA, ...base.slice(insertAt)]
    : [...base, marcoLegalIA];
const bump = (arr: number[]) => arr.map((i) => (insertAt >= 0 && i >= insertAt ? i + 1 : i));

export const bootcampCaldeiraEvent: EventModule = {
  ...travessiaEvent,
  slug: "bootcamp-caldeira",
  name: "Bootcamp · Instituto Caldeira",
  themeClass: "theme-caldeira",
  contacts: { ...travessiaEvent.contacts },
  manifest,
  totalSlides: manifest.length,
  acts: {
    metas: travessiaEvent.acts.metas,
    boundaries: bump(travessiaEvent.acts.boundaries),
    openerIndices: bump(travessiaEvent.acts.openerIndices),
  },
  scripts,
};

export default bootcampCaldeiraEvent;
