// Manifest dos slides — Bootcamp em parceria com o Instituto Caldeira · Porto Alegre
// "Segurança em IA & Automação" — IA, automação e LGPD na prática.
// Mesmo conteúdo do workshop DEATEC; identidade visual do Instituto Caldeira
// (preto + verde elétrico #00e846). Arco: bloco 2 mostra o ATAQUE ao vivo
// (prompt injection); bloco 3 CONSTRÓI seguro ao vivo (automação de posts no
// Supabase). Slides verdes (accent) = "ao vivo / tela compartilhada".
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

/** Marcador de momento AO VIVO — slide verde (accent), sinaliza "vou compartilhar a tela". */
function aoVivo(key: string, title: string): SlideEntry {
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
      eyebrow: "BOOTCAMP PRESENCIAL · INSTITUTO CALDEIRA · PORTO ALEGRE · SEX & SÁB",
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
        { label: "segurança em IA & LGPD", sub: "08:10 — riscos, prompt injection ao vivo e LGPD", accent: true },
        { label: "automação inteligente", sub: "08:30 — automação no Supabase, ao vivo", accent: true },
        { label: "auditando com IA", sub: "08:45 — AWS Security Agent e por conta própria" },
        { label: "encerramento & Q&A", sub: "08:50 — perguntas" },
      ],
    },
  },
  {
    key: "online_intro",
    kind: "static",
    staticProps: {
      variant: "two-line",
      title: "é presencial e na prática.",
      subtitle: "pode perguntar a qualquer momento — eu paro pra responder.",
      background: "naval",
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
        { label: "o dado circula em mais lugares", sub: "treino, inferência, logs, terceiros" },
        { label: "quem constrói com IA é o novo alvo", sub: "e o atacante também usa IA pra te achar primeiro", accent: true },
      ],
    },
  },
  {
    key: "seguranca_opcional",
    kind: "static",
    staticProps: { variant: "transition", title: "segurança deixou de ser opcional." },
  },

  // ─── BLOCO 2 · 08:10–08:30 · SEGURANÇA EM IA E CONFORMIDADE ───
  // (riscos → demo ao vivo de prompt injection → conformidade/LGPD)
  bloco(2, "08:10 – 08:30", "segurança em IA", "os riscos — e o ataque ao vivo."),
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
    key: "vibecoding_contexto",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "no vibecoding · Lovable + Supabase",
      background: "naval",
      items: [
        { label: "você pluga um agente de IA no app", sub: "chat, copiloto ou automação gerados no Lovable" },
        { label: "o agente lê e escreve no Supabase", sub: "via edge function ou RPC" },
        { label: "o prompt do usuário chega junto com o dado", sub: "instrução e conteúdo se misturam no mesmo texto" },
        { label: "agente com permissão demais = escalonamento", sub: "a injeção vira acesso indevido ao banco", accent: true },
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
    key: "injection_exemplo",
    kind: "special",
    component: "CodeBlockSlide",
    props: {
      eyebrow: "o padrão vulnerável · por baixo do CRM",
      title: "a única trava é uma frase no prompt",
      language: "ts",
      status: "danger",
      background: "naval",
      code: `// assistente do CRM (estilo vibecoding), com ferramentas de verdade
const tools = [getCustomers, updateUserRole];

// a ÚNICA proteção contra escalonamento é esta linha:
const system = "Você é assistente de vendas. Não altere papéis de usuários.";
const r = await openai.chat({ model, messages, tools });

// quando o modelo decide chamar a ferramenta, o backend executa:
function updateUserRole({ email, role }) {
  // ...sem checar se QUEM pediu é admin   <-- a falha
  db.users.find(u => u.email === email).role = role;
}`,
      caption: "a autorização virou uma frase no prompt. o prompt injection passa por cima — e a tool roda sem checar quem chamou.",
    },
  },
  {
    key: "injection_tecnicas",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "as técnicas que furam a guarda",
      background: "naval",
      items: [
        { label: "bloco de sistema falso", sub: "finge um [SISTEMA] com uma diretiva — a IA trata como instrução legítima" },
        { label: "autoridade genérica", sub: "\"manutenção autorizada\", \"solicitação aprovada\" — sem citar ninguém real" },
        { label: "delimiter injection", sub: "forja \"--- nova instrução de sistema ---\" pra sair de dado e virar comando" },
        { label: "a raiz: a IA não separa instrução de conteúdo", sub: "tudo é texto — e ela obedece quem parecer mais 'autoridade'", accent: true },
      ],
    },
  },
  aoVivo("aovivo_injection", "ataque ao vivo"),
  {
    key: "injection_mitigar",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "como blindar",
      background: "naval",
      items: [
        { label: "autorização no código, não no prompt", sub: "a ação sensível confere o papel real de quem chamou — nunca confia no modelo", accent: true },
        { label: "menor privilégio", sub: "o agente nem deveria ter a ferramenta de mudar papéis" },
        { label: "input do usuário é dado não-confiável", sub: "texto nunca vira instrução/ação sem validação no servidor" },
        { label: "RLS no banco como rede final", sub: "mesmo que a injeção passe, o dado alheio não vaza" },
      ],
    },
  },
  {
    key: "lgpd_interface",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "o outro lado · interface com a LGPD",
      background: "naval",
      items: [
        { label: "bases legais", sub: "qual base cobre treino e inferência com dado pessoal" },
        { label: "explicabilidade", sub: "art. 20 — o titular pode contestar decisão automatizada" },
        { label: "dados sensíveis no treino", sub: "saúde e biometria têm regime reforçado" },
        { label: "minimização", sub: "não treine nem infira com o que você não precisa", accent: true },
      ],
    },
  },
  // ─── BLOCO 3 · 08:30–08:45 · AUTOMAÇÃO INTELIGENTE (PRÁTICA) ───
  // demo: edge function única que gera posts pra mídia social com IA (GET no navegador)
  bloco(3, "08:30 – 08:45", "automação inteligente", "construir seguro — ao vivo."),
  {
    key: "arquitetura_demo",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "o que vamos construir ao vivo",
      background: "naval",
      items: [
        { label: "uma Edge Function no Supabase", sub: "uma função só, sem app — automação pura, chamada no navegador" },
        { label: "a IA gera o post", sub: "legenda + imagem no seu estilo, cores e referências" },
        { label: "você aprova ou descarta", sub: "o aprovado vira contexto do próximo — memória do estilo" },
        { label: "Cloudflare na frente", sub: "rate limit e WAF protegendo o endpoint e seus créditos de IA" },
        { label: "segurança junto", sub: "a chave da IA só na edge, bucket privado com URL assinada", accent: true },
      ],
    },
  },
  {
    key: "stack_pre",
    kind: "static",
    staticProps: {
      variant: "naval",
      title: "a mesma stack que você vibecoda é a que você protege.",
      subtitle: "stack pré-montada pra caber no tempo — o foco é ver segurança e automação juntas, funcionando.",
    },
  },
  aoVivo("aovivo_automacao", "demo ao vivo"),

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
      eyebrow: "o que levar pra casa",
      background: "naval",
      items: [
        { label: "se a IA toca o dado, a LGPD entra junto" },
        { label: "agente de IA com menor privilégio — o RLS vale até pra ele" },
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
      eyebrow: "obrigado! · me acha em @gabreda",
      title: "vai lá e cria",
      subtitle: "rápido, bonito — e seguro.",
      background: "naval",
    },
  },
  {
    key: "materiais",
    kind: "static",
    staticProps: {
      variant: "act",
      eyebrow: "leve com você · materiais do bootcamp",
      title: "baixe e replique",
      subtitle: "edge functions, worker, lab e handbook de estudo",
      background: "naval",
      href: "/materiais-deatec.zip",
      cta: "baixar tudo (.zip)",
    },
  },
];

export const TOTAL_SLIDES = slideManifest.length;
