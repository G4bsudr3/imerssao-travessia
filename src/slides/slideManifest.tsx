// Manifest dos slides — apresentação chŏra
// "Segurança, Infra e Governança no Lovable" · 4 atos · ~30 min
import type { StaticProps } from "@/components/slides/SlideStatic";
import type { Phase } from "@/contexts/RoomContext";
import type { RiskRow } from "@/components/slides/security/RiskTableSlide";
import { SupabaseIcon } from "@/components/brand/SupabaseIcon";

type CodeBlockProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  language?: "sql" | "ts" | "js";
  code: string;
  status: "danger" | "safe";
  caption?: string;
};

type RiskTableProps = { eyebrow?: string; title: string; rows: RiskRow[] };

type ComparisonProps = {
  eyebrow?: string;
  title?: string;
  left: { label: string; sub?: string; bullets?: string[] };
  right: { label: string; sub?: string; bullets?: string[] };
  leftTag?: string;
  rightTag?: string;
  rightAccent?: boolean;
};

type PromptCardProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  prompts: Array<{ label: string; body: string }>;
};

type LockVisualProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  state: "open" | "closed";
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
  | { key: string; kind: "special"; component: "CoverSlide" | "LobbySlide" | "FinalSlide" | "BrainstormActive" | "BrainstormSettled" }
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
      eyebrow: "agenda · 30 min",
      items: [
        { label: "1. por quê", sub: "o risco que você não vê" },
        { label: "2. supabase", sub: "RLS, edge, RPC" },
        { label: "3. código + LGPD", sub: "auditoria e conformidade" },
        { label: "4. arquitetura", sub: "escalar sem dor" },
      ],
    },
  },
  {
    key: "realidade",
    kind: "static",
    staticProps: {
      variant: "stat",
      title: "a maioria das apps Lovable em produção",
      stat: { value: "tem RLS aberto", sub: "o cadeado do banco está destrancado." },
    },
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
  {
    key: "quiz_resposta",
    kind: "static",
    staticProps: {
      variant: "two-line",
      eyebrow: "resposta",
      title: "C é a segura.",
      subtitle: "user_id = auth.uid() · cada um vê só o que é dele.",
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
  {
    key: "lgpd_basico",
    kind: "special",
    component: "ComparisonSlide",
    props: {
      eyebrow: "LGPD · lei geral de proteção de dados",
      title: "se você guarda dado de brasileiro, vale pra você.",
      leftTag: "o que muda",
      rightTag: "o que custa",
      left: {
        label: "consentimento + base legal",
        bullets: ["informar o que coleta", "deixar revogar", "guardar só o necessário", "responder pedidos do titular"],
      },
      right: {
        label: "até 2% do faturamento",
        sub: "com teto de R$ 50 milhões por infração.",
        bullets: ["multa da ANPD", "danos reputacionais", "ações coletivas"],
      },
    },
  },
  {
    key: "direitos_titular",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "5 direitos do titular",
      items: [
        { label: "acessar", sub: "ver tudo que você tem dele" },
        { label: "corrigir", sub: "atualizar dado errado" },
        { label: "portar", sub: "exportar pra outro serviço" },
        { label: "revogar", sub: "tirar consentimento" },
        { label: "excluir", sub: "apagar conta + dados" },
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
        { level: "low", risk: "dev solo", impact: "tudo na sua mão = ponto único de falha", fix: "convidar 1 backup com acesso owner" },
        { level: "medium", risk: "time misto", impact: "estagiário com service_role", fix: "papéis Supabase: Owner / Admin / Developer / Read-only" },
        { level: "high", risk: "sem MFA no admin", impact: "credencial vazada = banco vazado", fix: "ativar MFA em todas contas Supabase + GitHub" },
      ],
    },
  },
  {
    key: "buracos_comuns",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "os buracos mais comuns",
      items: [
        { label: "RLS desativado", sub: "tabela exposta via anon key" },
        { label: "service_role no front", sub: "credencial admin no client" },
        { label: "edge sem validar JWT", sub: "função privilegiada aberta" },
        { label: "sem MFA no admin", sub: "uma senha vazada = banco vazado" },
        { label: "logs com PII", sub: "dado sensível em texto puro" },
      ],
    },
  },

  // ─── ATO 4 · ARQUITETURA + CHECKLIST (32-39) ───
  {
    key: "ato_4_arquitetura",
    kind: "static",
    staticProps: { variant: "act", eyebrow: "ato 4", title: "arquitetura", subtitle: "escalar sem reaprender doendo", background: "naval" },
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
      eyebrow: "5 configs que mudam a maturidade",
      items: [
        { label: "PITR", sub: "point-in-time recovery · volta no tempo" },
        { label: "branching", sub: "ambiente de staging por PR" },
        { label: "MFA + papéis", sub: "todo mundo com 2FA, role mínima" },
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
        { label: "MFA em tudo", sub: "Lovable, Supabase, GitHub" },
      ],
    },
  },
  {
    key: "recap",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "o que fica",
      items: [
        { label: "1. RLS é o cadeado", sub: "ative em tudo, sempre por user_id" },
        { label: "2. valide JWT na edge", sub: "front mente · servidor confere" },
        { label: "3. LGPD é projeto, não favor", sub: "consentimento + 5 direitos" },
        { label: "4. governança escala antes do código", sub: "MFA, papéis, backup" },
      ],
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
