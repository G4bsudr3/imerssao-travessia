// Manifest dos slides — Imersão TRAVESSIA
// "Do vibe coder ao empresário de software" · 4 atos
import type { StaticProps } from "@/components/slides/SlideStatic";
import type { Phase } from "@/contexts/RoomContext";
import type { RiskRow } from "@/components/slides/security/RiskTableSlide";
import { SupabaseIcon } from "@/components/brand/SupabaseIcon";
import { AUDIT_PROMPT } from "@/lib/audit-prompt";

type CodeBlockProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  language?: "sql" | "ts" | "js";
  code: string;
  status: "danger" | "safe";
  caption?: string;
  /** fundo do slide — default "bege" (claro). use "naval" em decks escuros. */
  background?: "bege" | "naval" | "accent";
};

type RiskTableProps = { eyebrow?: string; title: string; rows: RiskRow[]; background?: "bege" | "naval" | "accent" };

type ComparisonProps = {
  eyebrow?: string;
  title?: string;
  left: { label: string; sub?: string; bullets?: string[] };
  right: { label: string; sub?: string; bullets?: string[] };
  leftTag?: string;
  rightTag?: string;
  rightAccent?: boolean;
  background?: "bege" | "naval" | "accent";
};

type PromptCardProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  prompts: Array<{ label: string; body: string }>;
  background?: "bege" | "naval" | "accent";
};

type LockVisualProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  state: "open" | "closed";
  background?: "bege" | "naval" | "accent";
};

type PulseProps = { eyebrow?: string; question?: string; hint?: string };
type PollProps = {
  eyebrow?: string;
  question?: string;
  options?: Array<{ value: string; label: string; sub?: string; accent?: boolean }>;
};
type BrainstormProps = { slideKey: string; question: string };

export type SlideEntry =
  | { key: string; kind: "static"; staticProps: StaticProps }
  | { key: string; kind: "special"; component: "CoverSlide"; props?: { labels?: { eyebrow: string; title: string; sub: string }; showLogo?: boolean; logoSrc?: string; logoAlt?: string } }
  | { key: string; kind: "special"; component: "EraSlide"; props: { eyebrow?: string; image?: string; image2?: string; kicker?: string; kickerAccent?: string; lines?: string[] } }
  | { key: string; kind: "special"; component: "AboutSlide"; props: { photo?: string; eyebrow?: string; name: string; accent?: string; tagline: string; handles?: { at: string; label?: string }[] } }
  | { key: string; kind: "special"; component: "LobbySlide" | "FinalSlide" | "BrainstormActive" | "BrainstormSettled" }
  | { key: string; kind: "special"; component: "PulseCheckSlide"; props?: PulseProps }
  | { key: string; kind: "special"; component: "PollSlide"; props?: PollProps }
  | { key: string; kind: "special"; component: "BrainstormQuestion"; props?: BrainstormProps }
  | { key: string; kind: "special"; component: "CodeBlockSlide"; props: CodeBlockProps }
  | { key: string; kind: "special"; component: "RiskTableSlide"; props: RiskTableProps }
  | { key: string; kind: "special"; component: "ComparisonSlide"; props: ComparisonProps }
  | { key: string; kind: "special"; component: "PromptCardSlide"; props: PromptCardProps }
  | { key: string; kind: "special"; component: "LockVisualSlide"; props: LockVisualProps };

export const slideManifest: SlideEntry[] = [
  // ─── ATO 1 · POR QUÊ (0-7) ───
  { key: "cover", kind: "special", component: "CoverSlide" },
  {
    key: "ato_1_porque",
    kind: "static",
    staticProps: { variant: "act", eyebrow: "ato 1", title: "por quê", subtitle: "construir rápido sem deixar buracos", background: "naval" },
  },
  {
    key: "agenda",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "AGENDA",
      items: [
        { label: "1. por quê", sub: "o risco que você não vê" },
        { label: "2. supabase", sub: "RLS, edge, RPC" },
        { label: "3. código + governança", sub: "LGPD + ferramentas" },
        { label: "4. arquitetura", sub: "escalar sem dor" },
      ],
    },
  },

  {
    key: "realidade",
    kind: "static",
    staticProps: {
      variant: "stat",
      title: "a maioria das apps geradas com IA em produção",
      stat: { value: "tem RLS aberto", sub: "o cadeado do banco está destrancado." },
    },
  },
  {
    key: "historia_real",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "como vaza na vida real",
      items: [
        { label: "sexta: você lança no grupo do zap" },
        { label: "sábado: 200 cadastros, com CPF e tudo" },
        { label: "domingo: alguém abre o DevTools" },
        { label: "segunda: a tabela inteira tá num fórum", accent: true },
      ],
    },
  },
  {
    key: "policy_faltando",
    kind: "static",
    staticProps: { variant: "transition", title: "isso é uma policy faltando." },
  },
  {
    key: "tres_camadas",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "três camadas de risco",
      items: [
        { label: "banco", sub: "RLS · edge · RPC" },
        { label: "código", sub: "secrets · validação · logs" },
        { label: "governança", sub: "LGPD · acessos · backup" },
      ],
    },
  },
  {
    key: "ponte_supabase",
    kind: "static",
    staticProps: { variant: "transition", title: "começamos pelo banco." },
  },


  // ─── ATO 2 · SUPABASE (8-22) ───
  {
    key: "ato_2_supabase",
    kind: "static",
    staticProps: {
      variant: "act",
      eyebrow: "ato 2",
      title: "supabase",
      subtitle: "onde mora 80% do risco",
      background: "naval",
      asset: <SupabaseIcon size={140} className="text-[#3ECF8E]" />,
    },
  },
  {
    key: "vitrine_deposito",
    kind: "special",
    component: "ComparisonSlide",
    props: {
      eyebrow: "a analogia que importa",
      title: "Lovable é a vitrine. Supabase é o depósito.",
      leftTag: "Lovable",
      rightTag: "Supabase",
      left: { label: "vitrine", sub: "o que o usuário vê e clica.", bullets: ["UI", "estado de tela", "fluxos do front"] },
      right: { label: "depósito", sub: "onde o dado mora e as regras vivem.", bullets: ["banco PostgreSQL", "auth", "edge functions", "storage"] },
    },
  },
  {
    key: "tres_pilares",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "três pilares do supabase",
      items: [
        { label: "tabelas", sub: "onde o dado mora. risco: RLS aberto." },
        { label: "edge functions", sub: "lógica server. risco: não validar JWT." },
        { label: "RPC", sub: "funções no banco. risco: SECURITY DEFINER cego." },
      ],
    },
  },
  {
    key: "o_que_e_rls",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "RLS · row level security",
      title: "regra que define quem vê qual linha",
      items: [
        { label: "SELECT", sub: "quem pode ver" },
        { label: "INSERT", sub: "quem pode criar" },
        { label: "UPDATE", sub: "quem pode editar" },
        { label: "DELETE", sub: "quem pode apagar" },
      ],
    },
  },
  {
    key: "rls_aberto",
    kind: "special",
    component: "LockVisualSlide",
    props: {
      eyebrow: "default perigoso",
      title: "RLS desativado = porta aberta.",
      subtitle: "qualquer um com a anon key (que tá no front) lê o banco inteiro.",
      state: "open",
    },
  },
  {
    key: "top_riscos_rls",
    kind: "special",
    component: "RiskTableSlide",
    props: {
      eyebrow: "os 4 erros mais comuns",
      title: "RLS mal configurado",
      rows: [
        { level: "high", risk: "RLS desativado na tabela", impact: "qualquer pessoa lê tudo via anon key", fix: "ativar RLS em todas as tabelas" },
        { level: "high", risk: "política SELECT = TRUE", impact: "público vê dado privado", fix: "filtrar por user_id ou auth.uid() IS NOT NULL" },
        { level: "medium", risk: "INSERT sem validar user_id", impact: "usuário grava como se fosse outro", fix: "WITH CHECK (user_id = auth.uid())" },
        { level: "medium", risk: "UPDATE/DELETE sem dono", impact: "edita/apaga dado alheio", fix: "USING (user_id = auth.uid())" },
      ],
    },
  },
  {
    key: "exemplo_ruim",
    kind: "special",
    component: "CodeBlockSlide",
    props: {
      eyebrow: "exemplo real",
      title: "isso aqui é uma porta aberta",
      language: "sql",
      status: "danger",
      code: `CREATE POLICY "todos_veem"
ON pedidos
FOR SELECT
USING (true);
-- USING (true) = qualquer um, autenticado ou não, vê tudo`,
      caption: "achou bonito porque \"funciona\". funciona pra atacante também.",
    },
  },
  {
    key: "exemplo_bom",
    kind: "special",
    component: "CodeBlockSlide",
    props: {
      eyebrow: "o jeito certo",
      title: "cada usuário só vê o que é dele",
      language: "sql",
      status: "safe",
      code: `CREATE POLICY "ver_meus_pedidos"
ON pedidos
FOR SELECT
TO authenticated
USING (user_id = auth.uid());`,
      caption: "auth.uid() é o ID do usuário logado. comparou? só passa o que bate.",
    },
  },
  // ─── ATO 3 · CÓDIGO + LGPD + GOVERNANÇA ───
  {
    key: "ato_3_codigo",
    kind: "static",
    staticProps: { variant: "act", eyebrow: "ato 3", title: "código + governança", subtitle: "saindo do banco", background: "naval" },
  },
  {
    key: "codigo_vs_supabase",
    kind: "special",
    component: "ComparisonSlide",
    props: {
      eyebrow: "onde mora cada coisa",
      title: "código vs supabase",
      leftTag: "no código (Lovable)",
      rightTag: "no banco (Supabase)",
      left: {
        label: "front + edge",
        bullets: ["validação de input", "secrets via .env (nunca no client)", "rate limit nas edge", "logs sem dado sensível"],
      },
      right: {
        label: "regras de acesso",
        bullets: ["RLS por tabela", "RPC com SECURITY DEFINER", "auth + sessão", "backup + branching"],
      },
    },
  },
  {
    key: "nao_so_lovable",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "o Lovable ajuda muito · mas não é tudo",
      items: [
        { label: "audita você mesmo com IA", sub: "Claude/GPT lê seu código melhor que você" },
        { label: "GitHub é sua rede de segurança", sub: "histórico, rollback, code review" },
        { label: "service_role NUNCA no front", sub: "só anon key vai pro client" },
        { label: "Security Advisor do Supabase", sub: "roda toda semana. é grátis." },
      ],
    },
  },
  // ─── DIVISOR · LGPD ───
  {
    key: "ato_3_lgpd",
    kind: "static",
    staticProps: {
      variant: "act",
      eyebrow: "a lei",
      title: "LGPD",
      subtitle: "a parte que assusta — sem juridiquês.",
      background: "naval",
    },
  },
  {
    key: "lgpd_o_que_e",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "LGPD · o que é",
      title: "a lei que diz como você pode tratar dado de pessoa",
      items: [
        { label: "Lei 13.709/2018", sub: "a lei geral de proteção de dados do Brasil" },
        { label: "inspirada no GDPR", sub: "o padrão europeu que virou referência mundial" },
        { label: "criou a ANPD", sub: "a autoridade que fiscaliza, orienta e multa" },
        { label: "vale pra você", sub: "tratou dado de brasileiro? está sob a LGPD — até o MVP" },
      ],
    },
  },
  {
    key: "lgpd_linha_tempo",
    kind: "static",
    staticProps: {
      variant: "timeline",
      eyebrow: "LGPD · quando nasceu",
      timeline: [
        { year: "2018", label: "sancionada (Lei 13.709)" },
        { year: "2020", label: "entra em vigor" },
        { year: "2021", label: "sanções passam a valer" },
      ],
    },
  },
  {
    key: "lgpd_dado_sensivel",
    kind: "special",
    component: "ComparisonSlide",
    props: {
      eyebrow: "nem todo dado é igual",
      title: "dado pessoal × dado sensível",
      leftTag: "dado pessoal",
      rightTag: "dado sensível",
      rightAccent: true,
      left: {
        label: "identifica a pessoa",
        bullets: ["nome, e-mail, telefone", "CPF, endereço", "IP, cookie, geolocalização", "qualquer ID que ligue ao indivíduo"],
      },
      right: {
        label: "regime reforçado",
        sub: "vazou? o estrago e a multa são muito maiores.",
        bullets: ["saúde e dados genéticos", "biometria (face, digital)", "raça, religião, política", "orientação sexual"],
      },
    },
  },
  {
    key: "lgpd_pii_escondida",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "você coleta mais do que pensa",
      title: "PII escondida no seu SaaS",
      items: [
        { label: "IP + user agent", sub: "todo request loga, mesmo sem cadastro" },
        { label: "geolocalização", sub: "o popup de 'permitir localização'" },
        { label: "device ID", sub: "analytics, push, fingerprint" },
        { label: "e-mail + nome", sub: "óbvio — mas continua sendo PII" },
      ],
    },
  },
  {
    key: "lgpd_mito",
    kind: "static",
    staticProps: { variant: "transition", title: "LGPD não é só pedir consentimento." },
  },
  {
    key: "lgpd_bases_legais",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "10 bases legais · 3 que importam no SaaS",
      title: "qual base legal cobre cada dado?",
      items: [
        { label: "execução de contrato", sub: "o dado é necessário pra entregar o serviço", accent: true },
        { label: "legítimo interesse", sub: "uso esperado: segurança, antifraude, logs" },
        { label: "consentimento", sub: "o extra e opcional: marketing, cookies" },
      ],
    },
  },
  {
    key: "lgpd_teste_contrato",
    kind: "static",
    staticProps: {
      variant: "naval",
      title: "\"se eu parar de tratar esse dado, ainda consigo prestar o serviço?\"",
      subtitle: "se a resposta é não, a base é execução de contrato — sem consentimento.",
    },
  },
  {
    key: "lgpd_exemplos_base",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "na prática · qual base usar",
      items: [
        { label: "e-mail + senha", sub: "execução de contrato" },
        { label: "CPF na nota fiscal", sub: "execução de contrato" },
        { label: "endereço de entrega", sub: "execução de contrato" },
        { label: "logs · IP · antifraude", sub: "legítimo interesse" },
        { label: "newsletter / marketing", sub: "consentimento" },
        { label: "compartilhar com parceiro", sub: "consentimento", accent: true },
      ],
    },
  },

  {
    key: "lgpd_aws_q",
    kind: "static",
    staticProps: {
      variant: "naval",
      title: "quem aí acha que a AWS precisa do seu consentimento pra guardar o e-mail do seu login?",
    },
  },
  {
    key: "lgpd_aws_a",
    kind: "static",
    staticProps: {
      variant: "two-line",
      title: "se precisasse,",
      subtitle: "a internet não funcionaria.",
    },
  },
  {
    key: "lgpd_frase_efeito",
    kind: "static",
    staticProps: { variant: "transition", title: "a LGPD não exige consentimento. exige base legal válida." },
  },
  {
    key: "lgpd_onde_mora_risco",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "onde mora o risco de verdade",
      items: [
        { label: "usar a base pra marketing não relacionado" },
        { label: "compartilhar com parceiro comercial" },
        { label: "treinar IA própria com dado do cliente" },
        { label: "qualquer uso que o usuário não espera", accent: true },
      ],
    },
  },
  {
    key: "lgpd_transparencia",
    kind: "special",
    component: "ComparisonSlide",
    props: {
      eyebrow: "não precisar de consentimento ≠ poder esconder",
      title: "transparência é obrigatória — sempre.",
      leftTag: "❌ o erro",
      rightTag: "✅ o certo",
      rightAccent: true,
      left: {
        label: "esconder o tratamento",
        sub: "\"não preciso de consentimento, então nem aviso.\"",
      },
      right: {
        label: "informar com clareza",
        sub: "\"aviso na política — mas não preciso pedir aceite.\"",
        bullets: ["base legal: execução de contrato", "política de privacidade clara", "direitos do titular garantidos"],
      },
    },
  },
  {
    key: "lgpd_controlador_operador",
    kind: "special",
    component: "ComparisonSlide",
    props: {
      eyebrow: "o tema que todo SaaS confunde",
      title: "controlador × operador",
      leftTag: "controlador",
      rightTag: "operador (geralmente você)",
      rightAccent: true,
      left: {
        label: "decide o porquê e o como",
        bullets: ["ex: a escola que cadastra os alunos", "define a finalidade do tratamento", "responde pelo tratamento"],
      },
      right: {
        label: "trata em nome do controlador",
        sub: "seu SaaS processando o dado do cliente.",
        bullets: ["segue as instruções dele", "MAS vira controlador se usar pra analytics/IA próprios", "pode ser os dois ao mesmo tempo"],
      },
    },
  },
  {
    key: "lgpd_basico",
    kind: "special",
    component: "ComparisonSlide",
    props: {
      eyebrow: "LGPD · por que levar a sério",
      title: "se você guarda dado de brasileiro, vale pra você.",
      leftTag: "o que muda na sua app",
      rightTag: "o que acontece se ignorar",
      left: {
        label: "base legal + transparência",
        bullets: ["escolher a base legal certa", "informar o que coleta e por quê", "responder pedidos do titular"],
      },
      right: {
        label: "consequência prática",
        sub: "multa da ANPD pode chegar a 2% do faturamento (teto R$ 50mi por infração).",
        bullets: ["bloqueio de tratamento pela ANPD", "dano moral coletivo via MP", "vira capa de jornal num print"],
      },
    },
  },

  // ─── LGPD · casos reais de quem se ferrou ───
  {
    key: "lgpd_quanto_custa",
    kind: "static",
    staticProps: { variant: "transition", title: "ignorar isso tem preço. e vira manchete." },
  },
  {
    key: "lgpd_multa_recorde",
    kind: "static",
    staticProps: {
      variant: "stat",
      title: "a maior multa de proteção de dados da história",
      stat: { value: "€ 1,2 bi", sub: "Meta, 2023 — por mandar dados de europeus pros EUA." },
    },
  },
  {
    key: "lgpd_casos_reais",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "casos reais · o que custou",
      items: [
        { label: "Meta — € 1,2 bilhão", sub: "transferiu dados de europeus sem base legal (2023)" },
        { label: "Amazon — € 746 milhões", sub: "publicidade sem consentimento válido" },
        { label: "TikTok — € 345 milhões", sub: "dados de crianças mal protegidos" },
        { label: "Telekall (BR) — R$ 14.400", sub: "vendeu lista de WhatsApp · 1ª multa da ANPD (2023)", accent: true },
      ],
    },
  },

  {
    key: "lgpd_brasil_hoje",
    kind: "special",
    component: "ComparisonSlide",
    props: {
      eyebrow: "e no Brasil?",
      title: "a ANPD apertou o cerco — e o estrago não espera.",
      leftTag: "fiscalização em 2026",
      rightTag: "a conta que chega",
      rightAccent: true,
      left: {
        label: "ANPD virou xerife",
        bullets: ["1ª multa em 2023 — e o patamar subiu", "agência de fato: autônoma e concursada", "Mapa 2026-27: +75 ações de fiscalização", "alvos: IA generativa, biometria e menores"],
      },
      right: {
        label: "o que dói de verdade",
        sub: "vazamento não espera a ANPD pra te machucar.",
        bullets: ["Serasa: +220 milhões de CPFs vazados (2021)", "ação civil + dano moral coletivo", "reputação destruída em 1 print"],
      },
    },
  },

  {
    key: "lgpd_cyber",
    kind: "static",
    staticProps: {
      variant: "two-line",
      title: "LGPD é governança de dados.",
      subtitle: "sem cybersecurity, não existe na prática.",
    },
  },
  {
    key: "direitos_titular",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "art. 18 e 20 · direitos que viram código",
      items: [
        { label: "acessar", sub: "ver tudo que você tem dele" },
        { label: "corrigir", sub: "atualizar dado errado" },
        { label: "portar", sub: "exportar pra outro serviço" },
        { label: "revogar", sub: "tirar consentimento" },
        { label: "excluir", sub: "apagar conta + dados" },
        { label: "revisar decisão automatizada", sub: "contestar o que a IA decidiu sobre ele", accent: true },
      ],
    },
  },

  {
    key: "lgpd_vira_codigo",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "como a LGPD vira código no Supabase",
      items: [
        { label: "exclusão", sub: "edge function que apaga conta + dados" },
        { label: "portabilidade", sub: "endpoint de export (JSON/CSV)" },
        { label: "minimização", sub: "não logar PII · views mascaradas" },
        { label: "consentimento", sub: "tabela consents: timestamp + versão" },
        { label: "incidente", sub: "alerta → avisar ANPD e titulares" },
      ],
    },
  },
  {
    key: "governanca_acessos",
    kind: "special",
    component: "RiskTableSlide",
    props: {
      eyebrow: "governança · quem acessa o quê",
      title: "matriz mínima de papéis",
      rows: [
        { level: "low", risk: "vendedor (SDR)", impact: "vê só os leads dele, edita pipeline próprio", fix: "RLS por owner_id + papel 'sales'" },
        { level: "medium", risk: "gerente comercial", impact: "vê o time todo, exporta relatórios", fix: "papel 'manager' com read em tudo, write no time" },
        { level: "medium", risk: "marketing", impact: "precisa de e-mail e tag, não de CPF nem deal value", fix: "view mascarada + papel 'marketing' read-only" },
        { level: "high", risk: "você (o builder)", impact: "service_role no .env = bypass total da RLS", fix: "MFA + service_role só em edge, nunca no client" },
      ],
    },
  },

  // ─── DIVISOR · FERRAMENTAS & DICAS ───
  {
    key: "ferramentas_intro",
    kind: "static",
    staticProps: {
      variant: "act",
      eyebrow: "ferramentas & dicas",
      title: "o arsenal",
      subtitle: "a mesma IA que ataca, defende.",
      background: "naval",
    },
  },
  {
    key: "ferramentas_principais",
    kind: "special",
    component: "ComparisonSlide",
    props: {
      eyebrow: "a artilharia pesada · 2026",
      title: "pentest e descoberta de vulnerabilidade com IA",
      leftTag: "AWS Security Agent",
      rightTag: "Claude Mythos",
      rightAccent: true,
      left: {
        label: "pentest autônomo · já disponível (GA)",
        bullets: ["multi-agente: explora, valida e prioriza", "lê seu código-fonte (multicloud, serve p/ Supabase)", "pentest de semanas → 1-2 dias", "~US$ 50/hora · ~US$ 400 num app pequeno"],
      },
      right: {
        label: "descoberta sobre-humana · ainda em preview",
        sub: "da Anthropic (criadora do Claude) — não da AWS.",
        bullets: ["milhares de zero-days em vários sistemas", "bug de 27 anos no OpenBSD", "RCE de 17 anos no FreeBSD (CVE-2026-4747)", "gated/preview: o teto do que a IA já faz por AppSec"],
      },
    },
  },
  {
    key: "ferramentas_gancho",
    kind: "static",
    staticProps: {
      variant: "stat",
      title: "pentest de nível enterprise",
      stat: { value: "US$ 400", sub: "o que custava R$ 50 mil e 1 mês agora cabe num fim de semana." },
    },
  },
  {
    key: "kit_dia_a_dia",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "seu kit do dia a dia · grátis ou barato",
      items: [
        { label: "Security Advisor", sub: "Supabase · acha RLS aberto e testa policies (RLS testing)" },
        { label: "Lovable Security Scan", sub: "Lovable 2.0 · varre o app e aponta riscos" },
        { label: "GitGuardian / gitleaks", sub: "caça secret vazado no Git" },
        { label: "Semgrep + Dependabot", sub: "SAST no código + alerta de dependência vulnerável" },
        { label: "Claude / GPT", sub: "audita seu RLS e schema com um prompt" },
      ],
    },
  },

  {
    key: "prompt_auditoria",
    kind: "special",
    component: "PromptCardSlide",
    props: {
      eyebrow: "comece agora · sem custo",
      title: "audite seu RLS com IA",
      subtitle: "cole no Claude ou GPT junto com seu schema e suas policies",
      prompts: [
        {
          label: "prompt de auditoria",
          body: AUDIT_PROMPT,
        },
      ],
    },
  },

  // ─── ATO 4 · ARQUITETURA + CHECKLIST (32-39) ───
  {
    key: "ato_4_arquitetura",
    kind: "static",
    staticProps: { variant: "act", eyebrow: "ato 4", title: "arquitetura", subtitle: "escalar sem dor", background: "naval" },
  },
  {
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
  },
  {
    key: "quando_migrar",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "sinais de que é hora de profissionalizar",
      items: [
        { label: "queries lentas com mais de 10k linhas" },
        { label: "precisa de backup point-in-time" },
        { label: "time crescendo · precisa de papéis" },
        { label: "dados regulados (saúde, financeiro)" },
        { label: "SLA com cliente enterprise" },
      ],
    },
  },
  {
    key: "setup_robusto",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "4 configs que mudam a maturidade",
      items: [
        { label: "PITR", sub: "point-in-time recovery · volta no tempo" },
        { label: "branching", sub: "ambiente de staging por PR" },
        { label: "MFA + papéis", sub: "todo mundo com 2FA/passkey, role mínima" },
        { label: "observability", sub: "logs + alertas no Sentry/Logflare" },
      ],
    },
  },
  {
    key: "checklist_segunda",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "ações pra segunda de manhã",
      items: [
        { label: "ativar RLS em tudo", sub: "comece pelas tabelas com user_id" },
        { label: "rodar Security Advisor", sub: "Supabase · grátis · 2 minutos" },
        { label: "auditar o RLS com IA", sub: "cole o schema no Claude/GPT" },
        { label: "MFA em tudo", sub: "Lovable, Supabase, GitHub" },
      ],
    },
  },
  {
    key: "confianca",
    kind: "static",
    staticProps: {
      variant: "naval",
      title: "o cliente compra a funcionalidade.",
      subtitle: "mas fica pela confiança.",
    },
  },
  {
    key: "vai_la_proteja",
    kind: "static",
    staticProps: {
      variant: "two-line",
      title: "vai lá",
      subtitle: "e protege.",
    },
  },
];

export const TOTAL_SLIDES = slideManifest.length;

// Slides onde o palco vira o "construindo ao vivo" e o mobile mostra timer/força
export const isLivePhaseSlide = (key: string): Phase | null => {
  if (key === "live_pensando") return "pensando";
  if (key === "live_gerando") return "gerando";
  if (key.startsWith("live_iterando")) return "iterando";
  if (key === "live_publicando") return "publicando";
  return null;
};

export const isIterationSlide = (key: string): boolean => key.startsWith("iteration_loop");