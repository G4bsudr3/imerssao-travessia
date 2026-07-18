import type { EventModule } from "../types";
import type { SlideEntry } from "../travessia/manifest";
import { bootcampCaldeiraEvent } from "../bootcamp-caldeira";

// Dia de CYBERSEGURANÇA do MBA na Faculdade Moinhos de Vento (Hospital Moinhos, POA).
// Formato: ONLINE, ~3h. Parte 1 = teoria (deck do bootcamp: RLS, Storage, Auth, prompt
// injection, LGPD, arquitetura). Parte 2 = PRÁTICA ao vivo (montar projeto Supabase +
// edge function + proxy/WAF na Cloudflare + análise de segurança), com slides que
// explicam cada peça sem jargão (plateia não-técnica). Identidade Moinhos (navy + magenta).

const cover: SlideEntry = {
  key: "cover",
  kind: "special",
  component: "CoverSlide",
  props: {
    showLogo: false,
    labels: {
      eyebrow: "FACULDADE MOINHOS DE VENTO · MBA · ONLINE",
      title: "Cybersegurança",
      sub: "construir com IA sem vazar.",
    },
  },
};

// ── Parte 2 · prática ao vivo ──
const praticaIntro: SlideEntry = {
  key: "pratica_intro",
  kind: "static",
  staticProps: {
    variant: "act",
    eyebrow: "parte 2 · mão na massa",
    title: "agora, ao vivo",
    subtitle: "montando um projeto seguro do zero, na tela.",
    background: "naval",
  },
};
const conceitoStack: SlideEntry = {
  key: "conceito_stack",
  kind: "static",
  staticProps: {
    variant: "grid",
    eyebrow: "os personagens, sem jargão",
    title: "o que é cada peça",
    background: "naval",
    items: [
      { label: "Supabase (banco)", sub: "o arquivo do hospital: onde o dado mora" },
      { label: "edge function", sub: "a sala dos fundos: seu código roda longe do público, com a chave guardada" },
      { label: "Cloudflare (proxy)", sub: "a recepção: todo pedido passa por ela antes de entrar" },
      { label: "WAF + rate limit", sub: "a segurança na porta: barra ataque e controla o fluxo", accent: true },
    ],
  },
};
const praticaRoteiro: SlideEntry = {
  key: "pratica_roteiro",
  kind: "static",
  staticProps: {
    variant: "list",
    eyebrow: "o que vou montar ao vivo",
    background: "naval",
    items: [
      { label: "1. projeto Supabase + tabela com RLS", sub: "do 'cadeado aberto' pro 'cada um só vê o que é dele'" },
      { label: "2. uma edge function", sub: "a lógica no servidor, com a chave escondida" },
      { label: "3. Cloudflare na frente (proxy)", sub: "esconde a origem e exige um segredo que só ela conhece" },
      { label: "4. WAF + rate limit", sub: "trava abuso e flood logo na porta" },
      { label: "5. análise de segurança", sub: "Security Advisor + auditar o RLS com IA", accent: true },
    ],
  },
};
const aovivoBuild: SlideEntry = {
  key: "aovivo_build",
  kind: "static",
  staticProps: { variant: "headline", title: "ao vivo · tela compartilhada", background: "accent" },
};
const praticaProva: SlideEntry = {
  key: "pratica_prova",
  kind: "static",
  staticProps: {
    variant: "two-line",
    title: "acesso direto? 403.",
    subtitle: "só passa quem vem pela recepção — o proxy.",
    background: "naval",
  },
};
const praticaAnalise: SlideEntry = {
  key: "pratica_analise",
  kind: "static",
  staticProps: {
    variant: "list",
    eyebrow: "fechando: análise de segurança",
    background: "naval",
    items: [
      { label: "Security Advisor do Supabase", sub: "acha RLS aberto e policy fraca em 2 min, de graça" },
      { label: "auditar o RLS com IA", sub: "cola schema + policies no Claude/GPT e pede os furos" },
      { label: "conferir os cadeados", sub: "bucket privado, secret no servidor, WAF ligado", accent: true },
    ],
  },
};

const PRATICA = [praticaIntro, conceitoStack, praticaRoteiro, aovivoBuild, praticaProva, praticaAnalise];

// insere a Parte 2 (prática) antes do fecho (confianca → vai_la_proteja)
const base: SlideEntry[] = [cover, ...bootcampCaldeiraEvent.manifest.slice(1)];
const at = base.findIndex((s) => s.key === "confianca");
const manifest: SlideEntry[] = at >= 0 ? [...base.slice(0, at), ...PRATICA, ...base.slice(at)] : [...base, ...PRATICA];

// atos recalculados por chave; a prática é um 5º ato.
const OPENER_KEYS = ["ato_1_porque", "ato_2_supabase", "ato_3_codigo", "ato_4_arquitetura", "pratica_intro"];
const openerIndices = OPENER_KEYS.map((k) => manifest.findIndex((s) => s.key === k)).filter((i) => i >= 0);
const boundaries = openerIndices.slice(1).map((i) => i - 1).concat(manifest.length - 1);

export const moinhosCyberEvent: EventModule = {
  ...bootcampCaldeiraEvent,
  slug: "moinhos-cyberseguranca",
  name: "Cybersegurança · Moinhos de Vento",
  themeClass: "theme-moinhos",
  manifest,
  totalSlides: manifest.length,
  acts: {
    metas: { ...bootcampCaldeiraEvent.acts.metas, 5: { number: 5, name: "prática", subtitle: "config ao vivo" } },
    boundaries,
    openerIndices,
  },
  scripts: {
    ...bootcampCaldeiraEvent.scripts,
    cover: `Fala, pessoal! Que bom ter vocês aqui, mesmo online. Combinando rápido: dúvida, joga no chat que eu paro pra responder. Essa parte é sobre segurança — como construir rápido com IA sem deixar a porta dos fundos aberta. O formato de hoje: primeiro a teoria, o porquê e os riscos; e na parte 2 eu monto um projeto seguro AO VIVO, na frente de vocês, com Supabase e Cloudflare. Bora.`,
    pratica_intro: `Beleza, teoria dada. Agora é a parte que eu mais gosto: mão na massa. Vou compartilhar a tela e montar um projeto seguro do zero, ao vivo. E se em algum momento aparecer um nome que você nunca ouviu, relaxa — os próximos slides explicam cada peça sem jargão antes de eu abrir a tela.`,
    conceito_stack: `Deixa eu apresentar os personagens, porque provavelmente você nunca ouviu alguns desses nomes, e tá tudo bem. Pensa num hospital: o Supabase é o arquivo, onde o dado do paciente mora. A edge function é a sala dos fundos, onde o procedimento acontece longe do público e a chave fica guardada. O Cloudflare é a recepção: todo mundo passa por ela antes de entrar. E o WAF é a segurança na porta, que barra quem não devia e controla o fluxo. Guarda essa imagem, que agora vai fazer sentido na prática.`,
    pratica_roteiro: `Esse é o roteiro do que eu vou montar na frente de vocês, nessa ordem. Um: projeto no Supabase com uma tabela e RLS, saindo do "cadeado aberto" pro "cada um só vê o que é dele". Dois: uma edge function, com a chave escondida no servidor. Três: coloco o Cloudflare na frente como proxy, que esconde a origem e exige um segredo que só ele conhece. Quatro: ligo o WAF e o rate limit pra travar abuso. E cinco: fecho rodando uma análise de segurança. Cinco passos, tudo ao vivo.`,
    aovivo_build: `Bora pra tela. [Compartilha a tela e vai narrando cada passo do roteiro enquanto configura no Supabase e na Cloudflare. Fala o que está clicando e por quê.]`,
    pratica_prova: `E esse é o momento que prova tudo: se alguém tentar abrir a função direto, sem passar pela recepção, toma 403 — acesso negado. Só funciona quando o pedido vem pelo proxy, com o segredo certo. A origem fica escondida e protegida.`,
    pratica_analise: `E pra fechar com chave de ouro: análise de segurança. Rodo o Security Advisor do Supabase, que acha RLS aberto e policy fraca em dois minutos, de graça. Depois colo o schema e as policies no Claude e peço pra ele achar os furos. E confiro os cadeados: bucket privado, secret no servidor, WAF ligado. Isso qualquer um de vocês faz hoje, sem ser especialista.`,
  },
};

export default moinhosCyberEvent;
