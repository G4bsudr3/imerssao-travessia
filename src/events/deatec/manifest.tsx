// Manifest dos slides — Workshop ACATE/DEATEC POLO OESTE · 24.06.2026 · 8h às 9h
// "Segurança em IA & Automação" — IA, automação e LGPD na prática.
// Deck escuro (identidade DEATEC: preto + verde-limão), mapeado no cronograma de 1h.
// Slides de PRÁTICA usam fundo accent (verde) pra sinalizar o "mão na massa".
import type { SlideEntry } from "../travessia/manifest";

const TOTAL_BLOCOS = 5;

/** Divisor de bloco — fundo naval (preto), com o horário no eyebrow. */
function bloco(n: number, horario: string, title: string, subtitle: string): SlideEntry {
  return {
    key: `bloco_${n}`,
    kind: "static",
    staticProps: {
      variant: "act",
      eyebrow: `${horario} · bloco ${n} de ${TOTAL_BLOCOS}`,
      title,
      subtitle,
      background: "naval",
    },
  };
}

/** Marcador de PRÁTICA — slide verde (accent), impossível de não ver. */
function pratica(key: string, title: string): SlideEntry {
  return {
    key,
    kind: "static",
    staticProps: { variant: "headline", title, background: "accent" },
  };
}

export const slideManifest: SlideEntry[] = [
  // ─── ABERTURA ───
  {
    key: "cover",
    kind: "static",
    staticProps: {
      variant: "act",
      eyebrow: "DEATEC POLO OESTE · 24.06 · 8H ÀS 9H",
      title: "Segurança em IA & Automação",
      subtitle: "IA, automação e LGPD na prática.",
      background: "naval",
    },
  },
  {
    key: "agenda",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "agenda · 1 hora",
      background: "naval",
      items: [
        { label: "abertura & contexto", sub: "08:00 — panorama de ameaças em 2026" },
        { label: "segurança em IA & LGPD", sub: "08:10 — riscos, conformidade, prompt injection" },
        { label: "automação inteligente · prática", sub: "08:30 — Supabase + Cloudflare ao vivo", accent: true },
        { label: "auditando com IA", sub: "08:45 — AWS Security Agent e por conta própria" },
        { label: "encerramento & Q&A", sub: "08:50 — perguntas" },
      ],
    },
  },

  // ─── BLOCO 1 · 08:00–08:10 · ABERTURA E CONTEXTUALIZAÇÃO ───
  bloco(1, "08:00 – 08:10", "abertura", "por que segurança deixou de ser opcional."),
  {
    key: "panorama_2026",
    kind: "static",
    staticProps: {
      variant: "stat",
      title: "o panorama em 2026",
      stat: { value: "IA é alvo e arma", sub: "atacantes usam IA — e atacam a IA que você usa." },
      background: "naval",
    },
  },
  {
    key: "porque_agora",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "o que mudou",
      background: "naval",
      items: [
        { label: "automação virou agente", sub: "saímos do 'se isso, então aquilo' pra agentes que decidem" },
        { label: "a superfície de ataque explodiu", sub: "cada integração e prompt é uma porta nova" },
        { label: "o dado roda mais lugares", sub: "treino, inferência, logs, terceiros" },
        { label: "segurança deixou de ser opcional", sub: "agora é pré-requisito, não enfeite", accent: true },
      ],
    },
  },
  {
    key: "seguranca_opcional",
    kind: "static",
    staticProps: { variant: "transition", title: "segurança deixou de ser opcional." },
  },

  // ─── BLOCO 2 · 08:10–08:30 · SEGURANÇA EM IA E CONFORMIDADE ───
  bloco(2, "08:10 – 08:30", "segurança em IA", "riscos & conformidade."),
  {
    key: "riscos_ia",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "os riscos que importam",
      background: "naval",
      items: [
        { label: "viés", sub: "dado enviesado vira decisão injusta — e responsabilização" },
        { label: "envenenamento de dados", sub: "manipular o treino pra corromper o modelo" },
        { label: "ataques adversariais", sub: "input desenhado pra enganar a inferência" },
        { label: "prompt injection", sub: "instrução maliciosa sequestra o agente", accent: true },
      ],
    },
  },
  {
    key: "prompt_injection",
    kind: "static",
    staticProps: {
      variant: "two-line",
      title: "prompt injection",
      subtitle: "a 'SQL injection' da era dos agentes.",
      background: "naval",
    },
  },
  {
    key: "lgpd_interface",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "interface com a LGPD",
      background: "naval",
      items: [
        { label: "bases legais", sub: "qual base cobre treino e inferência com dado pessoal" },
        { label: "explicabilidade", sub: "art. 20 — o titular pode contestar decisão automatizada" },
        { label: "dados sensíveis no treino", sub: "saúde e biometria têm regime reforçado" },
        { label: "minimização", sub: "não treine nem infira com o que você não precisa", accent: true },
      ],
    },
  },
  {
    key: "ia_e_tratamento",
    kind: "static",
    staticProps: {
      variant: "naval",
      title: "treinar e inferir com dado pessoal é tratamento.",
      subtitle: "se a IA toca o dado, a LGPD entra junto — sem exceção.",
    },
  },

  // ─── BLOCO 3 · 08:30–08:45 · AUTOMAÇÃO INTELIGENTE (PRÁTICA) ───
  bloco(3, "08:30 – 08:45", "automação inteligente", "segurança + automação, ao vivo."),
  pratica("pratica_automacao", "prática · ao vivo"),
  {
    key: "arquitetura_demo",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "o que vamos montar na prática",
      background: "naval",
      items: [
        { label: "Supabase", sub: "banco PostgreSQL + auth + edge functions" },
        { label: "Cloudflare na frente", sub: "proxy com WAF, cache e rate limit protegendo a origem" },
        { label: "a automação", sub: "edge function + webhook ligando os serviços" },
        { label: "segurança junto", sub: "RLS no banco, secret na edge, origem escondida atrás do proxy", accent: true },
      ],
    },
  },
  {
    key: "stack_pre",
    kind: "static",
    staticProps: {
      variant: "naval",
      title: "stack pré-montada.",
      subtitle: "pra caber em 15 minutos — o foco é ver a segurança e a automação juntas, funcionando.",
    },
  },

  // ─── BLOCO 4 · 08:45–08:50 · AUDITANDO COM IA ───
  bloco(4, "08:45 – 08:50", "auditando com IA", "a mesma IA que ataca, defende."),
  {
    key: "ferramentas_aud",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "auditoria de IA · 2026",
      background: "naval",
      items: [
        { label: "AWS Security Agent", sub: "pentest autônomo multi-agente que lê seu código-fonte" },
        { label: "Anthropic · descoberta (preview)", sub: "achou centenas de vulnerabilidades inéditas sozinha" },
        { label: "Security Advisor · Semgrep · gitleaks", sub: "o básico bem feito, de graça" },
        { label: "Claude / GPT", sub: "audite seu RLS e schema com um prompt", accent: true },
      ],
    },
  },
  {
    key: "auditar_diy",
    kind: "static",
    staticProps: { variant: "transition", title: "dá pra auditar por conta própria. hoje. de graça." },
  },

  // ─── BLOCO 5 · 08:50–09:00 · ENCERRAMENTO & Q&A ───
  bloco(5, "08:50 – 09:00", "encerramento", "o que levar — e perguntas."),
  {
    key: "takeaways",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "3 coisas pra levar",
      background: "naval",
      items: [
        { label: "se a IA toca o dado, a LGPD entra junto" },
        { label: "automação segura: proxy na frente, secret no servidor, RLS no banco" },
        { label: "audite com IA antes que auditem por você", accent: true },
      ],
    },
  },
  {
    key: "qa",
    kind: "static",
    staticProps: {
      variant: "two-line",
      title: "perguntas?",
      subtitle: "bora trocar ideia.",
      background: "naval",
    },
  },
  {
    key: "encerramento_final",
    kind: "static",
    staticProps: {
      variant: "act",
      eyebrow: "obrigado! · @gabreda",
      title: "vai lá e cria",
      subtitle: "rápido, bonito — e seguro.",
      background: "naval",
    },
  },
];

export const TOTAL_SLIDES = slideManifest.length;
