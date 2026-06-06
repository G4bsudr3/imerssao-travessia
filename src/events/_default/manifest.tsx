// Manifesto PLACEHOLDER — base de TODO evento novo criado no /admin.
// É genérico de propósito: troque os textos (ou peça pra IA) pra montar sua palestra.
// NÃO é a Travessia — ela tem o próprio manifesto em ../travessia/manifest.tsx (não mexa por aqui).
import type { SlideEntry } from "../travessia/manifest";

export type { SlideEntry };

export const slideManifest: SlideEntry[] = [
  {
    key: "cover",
    kind: "static",
    staticProps: {
      variant: "act",
      eyebrow: "template de exemplo",
      title: "Seu Evento Aqui",
      subtitle: "duplique, edite os textos e apresente",
      background: "naval",
    },
  },
  {
    key: "intro",
    kind: "static",
    staticProps: { variant: "transition", title: "isto é um modelo — personalize o conteúdo." },
  },
  {
    key: "agenda",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "agenda · exemplo",
      items: [
        { label: "1. abertura", sub: "quebre o gelo" },
        { label: "2. conteúdo", sub: "seu tema central" },
        { label: "3. prática", sub: "exemplos reais" },
        { label: "4. fechamento", sub: "seu call to action" },
      ],
    },
  },
  {
    key: "ato_1",
    kind: "static",
    staticProps: { variant: "act", eyebrow: "ato 1", title: "primeiro tópico", subtitle: "troque pelo seu assunto", background: "naval" },
  },
  {
    key: "pontos_1",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "três ideias de exemplo",
      items: [
        { label: "ideia um", sub: "explique em uma linha" },
        { label: "ideia dois", sub: "explique em uma linha" },
        { label: "ideia três", sub: "explique em uma linha" },
      ],
    },
  },
  {
    key: "stat_exemplo",
    kind: "static",
    staticProps: {
      variant: "stat",
      title: "um número que impressiona",
      stat: { value: "100%", sub: "substitua por um dado real do seu tema" },
    },
  },
  {
    key: "ato_2",
    kind: "static",
    staticProps: { variant: "act", eyebrow: "ato 2", title: "segundo tópico", subtitle: "troque pelo seu assunto", background: "naval" },
  },
  {
    key: "lista_exemplo",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "pontos principais",
      items: [
        { label: "ponto de exemplo um" },
        { label: "ponto de exemplo dois" },
        { label: "ponto de exemplo três" },
        { label: "o ponto mais importante", accent: true },
      ],
    },
  },
  {
    key: "fechamento",
    kind: "static",
    staticProps: { variant: "two-line", title: "obrigado.", subtitle: "seu call to action aqui." },
  },
];

export const TOTAL_SLIDES = slideManifest.length;

// O template de exemplo não tem fases ao vivo nem iterações.
export const isLivePhaseSlide = (_key: string) => null;
export const isIterationSlide = (_key: string) => false;