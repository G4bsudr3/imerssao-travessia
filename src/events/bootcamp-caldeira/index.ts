import type { EventModule } from "../types";
import type { SlideEntry } from "../travessia/manifest";
import { travessiaEvent } from "../travessia";
import { scripts } from "./scripts";

// Bootcamp presencial em parceria com o Instituto Caldeira (Porto Alegre · sex & sáb).
// Base = deck da Travessia (= conteúdo do /chora-lovable). O bootcamp acrescenta:
//  - capa animada com o nome do evento (título em texto, sem o logo TRAVESSIA);
//  - identidade do Caldeira (tema verde neon + preto) — deck 100% ESCURO (ver toDark);
//  - roteiro de teleprompter próprio (tecla T);
//  - slides extras: Storage público (Act 2), segurança de IA/prompt injection (Act 3),
//    e diagrama de fronteiras de confiança (Act 4).
//  - remove do deck (só aqui) o slide "controlador × operador" (granularidade demais).
// O deck da Travessia NÃO é alterado — extras, remoções, tema e índices vivem só aqui.

const cover: SlideEntry = {
  key: "cover",
  kind: "special",
  component: "CoverSlide",
  props: {
    showLogo: false,
    labels: {
      eyebrow: "INSTITUTO CALDEIRA · PORTO ALEGRE · SEX & SÁB",
      title: "Bootcamp Caldeira",
      sub: "segurança no vibecoding — construa sem vazar.",
    },
  },
};

// ── slides extras do bootcamp ──
const aboutSlide: SlideEntry = {
  key: "about",
  kind: "special",
  component: "AboutSlide",
  props: {
    photo: "/gabriel-breda.jpg",
    eyebrow: "quem tá no palco",
    name: "Gabriel Breda Sudre",
    accent: "Breda",
    tagline:
      "Ajudo pessoas e times a construir com IA de forma segura e bem estruturada. Meu objetivo não é acabar com o vibecoding, e sim viabilizá-lo de um jeito realmente seguro.",
    handles: [{ at: "@gabreda" }, { at: "@sobreai" }],
  },
};
const storagePublico: SlideEntry = {
  key: "storage_publico",
  kind: "static",
  staticProps: {
    variant: "list",
    eyebrow: "o outro cadeado esquecido · Storage",
    background: "naval",
    items: [
      { label: "bucket público = arquivo aberto na URL", sub: "quem tem o link baixa — nota fiscal, RG, contrato" },
      { label: "o Storage tem RLS PRÓPRIO", sub: "não herda a policy da tabela — configure à parte" },
      { label: "regra: bucket privado + URL assinada", sub: "acesso temporário, que expira — sem link eterno" },
      { label: "confere hoje: algum bucket público sem querer?", sub: "é o vazamento mais bobo — e o mais comum", accent: true },
    ],
  },
};
const authConfig: SlideEntry = {
  key: "auth_config",
  kind: "static",
  staticProps: {
    variant: "list",
    eyebrow: "os checkboxes que ficam abertos · Auth",
    background: "naval",
    items: [
      { label: "confirmação de e-mail desligada", sub: "cria conta com e-mail de terceiro e já entra" },
      { label: "política de senha fraca", sub: "sem mínimo decente, \"123456\" passa liso" },
      { label: "leaked-password protection", sub: "o Supabase barra senha já vazada — ligue (vem off)", accent: true },
      { label: "signup aberto sem precisar", sub: "não é self-service? trave o cadastro" },
    ],
  },
};
const iaPromptInjection: SlideEntry = {
  key: "ia_prompt_injection",
  kind: "static",
  staticProps: {
    variant: "two-line",
    title: "colocou um agente de IA no app?",
    subtitle: "prompt injection é a 'SQL injection' da era dos agentes.",
    background: "naval",
  },
};
const arquiteturaCamadas: SlideEntry = {
  key: "arquitetura_camadas",
  kind: "static",
  staticProps: {
    variant: "grid",
    eyebrow: "defesa em profundidade · 3 fronteiras de confiança",
    title: "front não confia · edge valida · banco protege",
    items: [
      { label: "front (Lovable)", sub: "tudo aqui é público e manipulável — nunca confie" },
      { label: "edge function", sub: "valida o input e AUTORIZA: checa QUEM chamou" },
      { label: "banco (Supabase)", sub: "RLS como rede final — nem a IA passa", accent: true },
    ],
  },
};

// Agenda do bootcamp — reflete o conteúdo real (Storage no Act 2, IA no Act 3).
const bootcampAgenda: SlideEntry = {
  key: "agenda",
  kind: "static",
  staticProps: {
    variant: "grid",
    eyebrow: "AGENDA",
    background: "naval",
    items: [
      { label: "1. por quê", sub: "o risco que você não vê" },
      { label: "2. supabase", sub: "RLS, Storage, edge, RPC" },
      { label: "3. código + governança", sub: "segurança de IA, LGPD e ferramentas" },
      { label: "4. arquitetura", sub: "escalar com segurança" },
    ],
  },
};
// Slides do deck da Travessia trocados por uma versão do bootcamp.
const REPLACE: Record<string, SlideEntry> = { agenda: bootcampAgenda };

// Movido pra abrir o bloco Supabase (era do Act 4). Cópia do slide da Travessia.
const lovableCloudVsSupabase: SlideEntry = {
  key: "lovable_cloud_vs_supabase",
  kind: "special",
  component: "ComparisonSlide",
  props: {
    eyebrow: "duas formas de ter backend",
    title: "Lovable Cloud vs Supabase próprio",
    leftTag: "Lovable Cloud",
    rightTag: "Supabase próprio",
    rightAccent: true,
    left: {
      label: "default · zero setup",
      bullets: ["liga e usa", "auth, db, storage, edge", "ótimo até produção média", "sem acesso ao dashboard cru"],
    },
    right: {
      label: "controle total",
      bullets: ["dashboard completo", "branching · backups · point-in-time", "config fina (pooling, índices)", "vale quando dados crescem"],
    },
  },
};

// Onde cada extra entra (antes da chave-âncora). Ordem do array = ordem de inserção.
const EXTRAS: { before: string; slide: SlideEntry }[] = [
  { before: "ato_1_porque", slide: aboutSlide },             // "sobre mim" logo após a capa
  { before: "tres_pilares", slide: lovableCloudVsSupabase }, // Act 2, depois do vitrine vs depósito
  { before: "ato_3_codigo", slide: storagePublico },        // fecha o Act 2 (Supabase)
  { before: "ato_3_codigo", slide: authConfig },             // config de Auth (Act 2)
  { before: "ato_3_lgpd", slide: iaPromptInjection },        // Act 3, antes da LGPD
  { before: "quando_migrar", slide: arquiteturaCamadas },    // abre o Act 4
];

// Slides do deck da Travessia que NÃO entram no bootcamp (granularidade demais).
const REMOVE = new Set([
  "lgpd_controlador_operador",
  "lgpd_mito",
  "lgpd_multa_recorde",
  "lgpd_linha_tempo",
  "lgpd_aws_q",
  "lgpd_aws_a",
  "lgpd_frase_efeito",
  "governanca_acessos",
  "realidade",
  "policy_faltando",
  "top_riscos_rls",
  "lgpd_cyber",
  "lovable_cloud_vs_supabase",
]);

// Força o slide pro modo ESCURO (identidade Caldeira: preto + verde neon).
// Estáticos → background "naval"; especiais que aceitam fundo → props.background "naval".
// CoverSlide já é escuro por dentro; não mexe.
const SPECIAL_WITH_BG = new Set(["CodeBlockSlide", "ComparisonSlide", "RiskTableSlide", "PromptCardSlide", "LockVisualSlide"]);
function toDark(s: SlideEntry): SlideEntry {
  if (s.kind === "static") {
    return { ...s, staticProps: { ...s.staticProps, background: "naval" } };
  }
  if (s.kind === "special" && SPECIAL_WITH_BG.has(s.component)) {
    const props = { ...((s as { props?: Record<string, unknown> }).props ?? {}), background: "naval" };
    return { ...s, props } as SlideEntry;
  }
  return s;
}

const base: SlideEntry[] = [cover, ...travessiaEvent.manifest.slice(1)].filter((s) => !REMOVE.has(s.key));
const withExtras: SlideEntry[] = [];
for (const s of base) {
  for (const ex of EXTRAS) if (ex.before === s.key) withExtras.push(ex.slide);
  withExtras.push(REPLACE[s.key] ?? s);
}
const manifest: SlideEntry[] = withExtras.map(toDark);

// Atos recalculados a partir das CHAVES dos openers (não dependem de índice fixo).
const OPENER_KEYS = ["ato_1_porque", "ato_2_supabase", "ato_3_codigo", "ato_4_arquitetura"];
const openerIndices = OPENER_KEYS.map((k) => manifest.findIndex((s) => s.key === k));
const boundaries = openerIndices.slice(1).map((i) => i - 1).concat(manifest.length - 1);

export const bootcampCaldeiraEvent: EventModule = {
  ...travessiaEvent,
  slug: "bootcamp-caldeira",
  name: "Bootcamp Caldeira",
  themeClass: "theme-caldeira",
  contacts: { ...travessiaEvent.contacts },
  manifest,
  totalSlides: manifest.length,
  acts: {
    metas: travessiaEvent.acts.metas,
    boundaries,
    openerIndices,
  },
  scripts,
};

export default bootcampCaldeiraEvent;
