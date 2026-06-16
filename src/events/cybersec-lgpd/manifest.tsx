// Manifest dos slides — Curso "Cybersegurança e LGPD no VibeCoding"
// Mesma estrutura visual da Travessia, reorganizada em 10 AULAS gravadas (5-10 min cada).
// Cada aula abre com um divisor "aula N" (variant act) e segue com slides de conteúdo + recap.
import type { SlideEntry } from "../travessia/manifest";
import { SupabaseIcon } from "@/components/brand/SupabaseIcon";
import { AUDIT_PROMPT } from "@/lib/audit-prompt";

const TOTAL_AULAS = 10;

/** Divisor de aula — mesmo visual dos "atos" da Travessia (variant act, fundo naval). */
function aula(
  n: number,
  title: string,
  subtitle: string,
  asset?: React.ReactNode,
): SlideEntry {
  return {
    key: `aula_${n}`,
    kind: "static",
    staticProps: {
      variant: "act",
      eyebrow: `aula ${n} de ${TOTAL_AULAS}`,
      title,
      subtitle,
      background: "naval",
      ...(asset ? { asset } : {}),
    },
  };
}

/** Recap de fim de aula — lista curta com o que levar. */
function recap(n: number, items: Array<{ label: string; sub?: string; accent?: boolean }>): SlideEntry {
  return {
    key: `aula${n}_recap`,
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: `aula ${n} · o que levar`,
      items,
    },
  };
}

export const slideManifest: SlideEntry[] = [
  // ─── ABERTURA ───
  {
    key: "cover",
    kind: "static",
    staticProps: {
      variant: "act",
      eyebrow: "curso online · em 10 aulas",
      title: "Cybersegurança e LGPD no VibeCoding",
      subtitle: "do protótipo ao SaaS seguro — sem juridiquês.",
      background: "naval",
    },
  },
  {
    key: "agenda",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "o que você vai aprender · 10 aulas",
      items: [
        { label: "1. o risco invisível", sub: "como apps de IA vazam dados" },
        { label: "2. supabase & RLS", sub: "onde mora 80% do risco" },
        { label: "3. RLS na prática", sub: "o jeito certo de configurar" },
        { label: "4. código & governança", sub: "além do banco" },
        { label: "5. LGPD sem juridiquês", sub: "o que é e o que muda" },
        { label: "6. base legal", sub: "o coração da lei" },
        { label: "7. transparência & papéis", sub: "controlador × operador" },
        { label: "8. quanto custa ignorar", sub: "casos reais e multas" },
        { label: "9. LGPD vira código", sub: "direitos do titular" },
        { label: "10. arsenal & arquitetura", sub: "ferramentas e próximos passos" },
      ],
    },
  },

  // ─── AULA 1 · O RISCO QUE VOCÊ NÃO VÊ ───
  aula(1, "o risco invisível", "construir rápido sem deixar buracos."),
  {
    key: "vibe_coding_oque",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "vibe coding · o que é",
      title: "você descreve, a IA constrói",
      items: [
        { label: "linguagem natural", sub: "você fala o que quer, em português" },
        { label: "Lovable, Cursor, v0", sub: "a IA escreve o código por você" },
        { label: "velocidade absurda", sub: "um app em produção num fim de semana" },
        { label: "o risco vem junto", sub: "a IA otimiza pra funcionar, não pra ser seguro", accent: true },
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
    key: "porque_acontece",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "por que a IA deixa a porta aberta",
      items: [
        { label: "o default é permissivo", sub: "funcionar primeiro, travar depois" },
        { label: "você pediu a feature, não a trava", sub: "a IA entrega exatamente o que foi pedido" },
        { label: "ninguém revisa o que a IA gerou", sub: "o código parece pronto — e ninguém olha o RLS" },
        { label: "segurança é invisível até vazar", sub: "tudo funciona igual, com ou sem o cadeado", accent: true },
      ],
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
  recap(1, [
    { label: "vibe coding é rápido — e perigoso por padrão" },
    { label: "a maioria dos apps de IA vaza pelo banco" },
    { label: "o risco mora em 3 camadas: banco, código, governança", accent: true },
  ]),

  // ─── AULA 2 · SUPABASE: VITRINE × DEPÓSITO + RLS ───
  aula(2, "supabase", "onde mora 80% do risco.", <SupabaseIcon size={120} className="text-[#3ECF8E]" />),
  {
    key: "supabase_oque",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "supabase · o backend que vem pronto",
      title: "tudo que seu app precisa por trás",
      items: [
        { label: "banco PostgreSQL", sub: "onde seus dados moram" },
        { label: "auth", sub: "login, sessão, usuários" },
        { label: "storage", sub: "arquivos e imagens" },
        { label: "edge functions", sub: "código server-side sob demanda" },
      ],
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
    key: "anon_vs_service",
    kind: "special",
    component: "ComparisonSlide",
    props: {
      eyebrow: "as duas chaves do supabase",
      title: "anon key × service_role",
      leftTag: "anon key",
      rightTag: "service_role",
      rightAccent: true,
      left: {
        label: "pública · vai pro front",
        sub: "qualquer visitante enxerga ela no navegador.",
        bullets: ["respeita o RLS", "é por isso que o RLS precisa estar certo", "tá no bundle do seu site"],
      },
      right: {
        label: "secreta · NUNCA no front",
        sub: "ignora o RLS — acesso total ao banco.",
        bullets: ["só em edge functions / servidor", "vazou? entregaram o banco inteiro", "guarde como senha de cofre"],
      },
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
  recap(2, [
    { label: "Supabase é o depósito: é lá que o dado e as regras vivem" },
    { label: "a anon key é pública e respeita o RLS — o service_role ignora tudo" },
    { label: "RLS desativado = banco aberto pra qualquer um", accent: true },
  ]),

  // ─── AULA 3 · CONFIGURANDO RLS DIREITO ───
  aula(3, "RLS na prática", "o jeito certo de configurar."),
  {
    key: "rls_como_ativar",
    kind: "special",
    component: "CodeBlockSlide",
    props: {
      eyebrow: "o primeiro passo · sempre",
      title: "ativar o RLS na tabela",
      language: "sql",
      status: "safe",
      code: `ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
-- a partir daqui, NINGUÉM lê nada
-- até você criar uma policy que libere`,
      caption: "ativar o RLS sem policy = tabela trancada pra todo mundo. é o ponto de partida seguro.",
    },
  },
  {
    key: "policy_anatomia",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "anatomia de uma policy",
      title: "as 4 peças que toda regra tem",
      items: [
        { label: "FOR", sub: "qual ação: SELECT, INSERT, UPDATE, DELETE" },
        { label: "TO", sub: "qual papel: authenticated, anon" },
        { label: "USING", sub: "quais linhas ele pode ver/mexer" },
        { label: "WITH CHECK", sub: "o que ele pode gravar", accent: true },
      ],
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
    key: "insert_check",
    kind: "special",
    component: "CodeBlockSlide",
    props: {
      eyebrow: "o erro que quase todo mundo esquece",
      title: "no INSERT, trave com WITH CHECK",
      language: "sql",
      status: "safe",
      code: `CREATE POLICY "criar_meu_pedido"
ON pedidos
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());
-- sem isso, eu gravo um pedido no SEU nome`,
      caption: "USING controla o que ele lê. WITH CHECK controla o que ele grava. INSERT precisa do CHECK.",
    },
  },
  {
    key: "teste_rls",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "como testar se o RLS tá de pé",
      items: [
        { label: "pegue a anon key (tá no seu front mesmo)" },
        { label: "tente ler a tabela direto, sem login", sub: "curl, Postman ou o próprio painel" },
        { label: "deslogado, você não pode ver nada de ninguém" },
        { label: "rode o Security Advisor do Supabase", sub: "ele aponta tabela sem RLS em 2 minutos", accent: true },
      ],
    },
  },
  recap(3, [
    { label: "ative o RLS primeiro — depois libere com policies" },
    { label: "USING controla leitura; WITH CHECK controla escrita" },
    { label: "teste com a anon key deslogado: não pode ver nada alheio", accent: true },
  ]),

  // ─── AULA 4 · ALÉM DO BANCO: CÓDIGO & GOVERNANÇA ───
  aula(4, "código + governança", "saindo do banco."),
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
    key: "secrets_front_edge",
    kind: "special",
    component: "ComparisonSlide",
    props: {
      eyebrow: "o vazamento mais bobo · e mais comum",
      title: "onde guardar uma chave de API",
      leftTag: "❌ no front",
      rightTag: "✅ na edge / .env",
      rightAccent: true,
      left: {
        label: "chave no código do cliente",
        sub: "vai pro navegador no bundle.",
        bullets: ["qualquer um abre o DevTools e lê", "Stripe, OpenAI, e-mail… todas expostas", "rodam na sua conta — na sua fatura"],
      },
      right: {
        label: "chave só no servidor",
        sub: "o front chama a edge, a edge usa a chave.",
        bullets: ["secret em variável de ambiente", "nunca chega ao navegador", "o cliente nem vê que ela existe"],
      },
    },
  },
  {
    key: "edge_valida_jwt",
    kind: "special",
    component: "CodeBlockSlide",
    props: {
      eyebrow: "edge function · a primeira linha de defesa",
      title: "sempre valide quem está chamando",
      language: "ts",
      status: "safe",
      code: `const { data: { user } } = await supabase.auth.getUser(jwt);
if (!user) {
  return new Response("não autorizado", { status: 401 });
}
// só passa daqui quem está logado de verdade`,
      caption: "edge function exposta sem checar o usuário é um endpoint público. valide o JWT sempre.",
    },
  },
  {
    key: "validacao_input",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "nunca confie no que chega do cliente",
      items: [
        { label: "valide tipo, tamanho e formato", sub: "use zod ou schema no server" },
        { label: "o front pode ser burlado", sub: "DevTools, curl, request forjado" },
        { label: "valor de preço, role, user_id: cheque no server", sub: "nunca aceite o que o client mandou de boa", accent: true },
      ],
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
    key: "logs_pii",
    kind: "static",
    staticProps: {
      variant: "transition",
      title: "log não é lixeira de dado pessoal.",
    },
  },
  recap(4, [
    { label: "secret só no servidor — nunca no bundle do front" },
    { label: "edge function valida o usuário antes de qualquer coisa" },
    { label: "valide todo input no server e não logue PII", accent: true },
  ]),

  // ─── AULA 5 · LGPD SEM JURIDIQUÊS ───
  aula(5, "LGPD", "a parte que assusta — sem juridiquês."),
  {
    key: "lgpd_porque_voce",
    kind: "static",
    staticProps: {
      variant: "naval",
      title: "\"é só um MVP de fim de semana, a LGPD não é comigo.\"",
      subtitle: "tratou dado de um único brasileiro? já está sob a lei. sem exceção de tamanho.",
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
    key: "lgpd_glossario",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "4 palavras que você vai ouvir o curso todo",
      items: [
        { label: "titular", sub: "a pessoa dona do dado (seu usuário)" },
        { label: "tratamento", sub: "qualquer uso: coletar, guardar, mostrar, apagar" },
        { label: "dado pessoal", sub: "tudo que identifica alguém" },
        { label: "ANPD", sub: "a autoridade que fiscaliza e multa", accent: true },
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
  recap(5, [
    { label: "tratou dado de brasileiro? a LGPD vale — até no MVP" },
    { label: "dado sensível tem regime reforçado (saúde, biometria, etc.)" },
    { label: "você coleta mais PII do que imagina (IP, device, localização)", accent: true },
  ]),

  // ─── AULA 6 · BASE LEGAL: O CORAÇÃO DA LGPD ───
  aula(6, "base legal", "o coração da LGPD."),
  {
    key: "lgpd_mito",
    kind: "static",
    staticProps: { variant: "transition", title: "LGPD não é só pedir consentimento." },
  },
  {
    key: "lgpd_10_bases",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "art. 7 · existem 10 bases legais",
      title: "consentimento é só uma delas",
      items: [
        { label: "consentimento" },
        { label: "execução de contrato" },
        { label: "obrigação legal" },
        { label: "legítimo interesse" },
        { label: "proteção da vida" },
        { label: "tutela da saúde" },
        { label: "exercício de direitos" },
        { label: "política pública" },
        { label: "estudo/pesquisa" },
        { label: "proteção ao crédito", accent: true },
      ],
    },
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
  recap(6, [
    { label: "existem 10 bases legais — consentimento é só uma" },
    { label: "no SaaS, a maioria do dado é execução de contrato" },
    { label: "o teste: 'sem esse dado, ainda entrego o serviço?'", accent: true },
  ]),

  // ─── AULA 7 · TRANSPARÊNCIA, CONTROLADOR & OPERADOR ───
  aula(7, "transparência & papéis", "controlador × operador."),
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
    key: "politica_privacidade",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "o mínimo que sua política precisa ter",
      items: [
        { label: "quais dados você coleta", sub: "e de onde vêm" },
        { label: "pra quê, e com qual base legal", sub: "a finalidade de cada tratamento" },
        { label: "com quem você compartilha", sub: "Supabase, Stripe, analytics…" },
        { label: "como exercer os direitos + contato do encarregado", sub: "um canal de verdade pro titular", accent: true },
      ],
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
  recap(7, [
    { label: "não pedir consentimento não te deixa esconder nada" },
    { label: "transparência é sempre obrigatória — política clara" },
    { label: "você costuma ser operador; vira controlador se usar o dado pra si", accent: true },
  ]),

  // ─── AULA 8 · QUANTO CUSTA IGNORAR ───
  aula(8, "quanto custa ignorar", "casos reais — e vira manchete."),
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
      title: "a multa ainda é tímida. o estrago, não.",
      leftTag: "fiscalização hoje",
      rightTag: "a conta que chega",
      rightAccent: true,
      left: {
        label: "ANPD ainda amadurecendo",
        bullets: ["1ª multa só em 2023 (R$ 14.400)", "já puniu falta de encarregado e de atender direitos", "endureceu a partir de 2024"],
      },
      right: {
        label: "o que dói de verdade",
        sub: "vazamento não espera a ANPD pra te machucar.",
        bullets: ["Serasa: +220 milhões de CPFs vazados (2021)", "ação civil + dano moral coletivo", "reputação destruída em 1 print"],
      },
    },
  },
  {
    key: "anpd_sancoes",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "o que a ANPD pode aplicar",
      title: "não é só multa",
      items: [
        { label: "advertência", sub: "com prazo pra corrigir" },
        { label: "multa", sub: "até 2% do faturamento · teto R$ 50mi por infração" },
        { label: "bloqueio / eliminação", sub: "do dado tratado de forma irregular" },
        { label: "publicização", sub: "a infração vira pública — o tombo de imagem", accent: true },
      ],
    },
  },
  recap(8, [
    { label: "multas no mundo chegam a € 1,2 bi (Meta, 2023)" },
    { label: "no Brasil a multa é menor, mas a sanção vai além dela" },
    { label: "o vazamento te machuca antes da ANPD: reputação e ação civil", accent: true },
  ]),

  // ─── AULA 9 · LGPD VIRA CÓDIGO + DIREITOS DO TITULAR ───
  aula(9, "LGPD vira código", "direitos do titular no Supabase."),
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
      eyebrow: "art. 18 · 6 direitos que viram código",
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
    key: "delete_conta_code",
    kind: "special",
    component: "CodeBlockSlide",
    props: {
      eyebrow: "o direito de exclusão · em código",
      title: "\"apaga minha conta\" precisa funcionar de verdade",
      language: "ts",
      status: "safe",
      code: `// edge function: apaga o titular e os dados dele
await supabase.from('pedidos').delete().eq('user_id', user.id);
await supabase.from('perfis').delete().eq('user_id', user.id);
await supabase.auth.admin.deleteUser(user.id);
// some de tudo — não só "desativa"`,
      caption: "excluir é apagar mesmo. \"marcar como inativo\" e guardar o dado não cumpre o direito.",
    },
  },
  {
    key: "incidente_plano",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "vazou · o que fazer (antes de acontecer)",
      items: [
        { label: "detectar e conter", sub: "logs e alertas que avisam rápido" },
        { label: "avaliar o risco", sub: "quem foi afetado e qual dado" },
        { label: "comunicar a ANPD e os titulares", sub: "em prazo razoável — quanto antes, melhor" },
        { label: "registrar tudo", sub: "o que houve, o que você fez", accent: true },
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
  recap(9, [
    { label: "cada direito do titular vira um endpoint no seu app" },
    { label: "excluir é apagar de verdade, não 'marcar inativo'" },
    { label: "tenha um plano de incidente antes de precisar dele", accent: true },
  ]),

  // ─── AULA 10 · ARSENAL, ARQUITETURA & PRÓXIMOS PASSOS ───
  aula(10, "arsenal & arquitetura", "ferramentas e próximos passos."),
  {
    key: "ferramentas_principais",
    kind: "special",
    component: "ComparisonSlide",
    props: {
      eyebrow: "a artilharia pesada · 2026",
      title: "pentest e descoberta de vulnerabilidade com IA",
      leftTag: "AWS Security Agent",
      rightTag: "Anthropic Mythos",
      rightAccent: true,
      left: {
        label: "pentest autônomo · já disponível (GA)",
        bullets: ["multi-agente: explora, valida e prioriza", "lê seu código-fonte (multicloud, serve p/ Supabase)", "pentest de semanas → 1-2 dias", "~US$ 50/hora · ~US$ 400 num app pequeno"],
      },
      right: {
        label: "descoberta sobre-humana · ainda em preview",
        sub: "da Anthropic (criadora do Claude) — não da AWS.",
        bullets: ["271 vulnerabilidades no Firefox de uma vez", "bug de 27 anos no OpenBSD", "RCE de 17 anos no FreeBSD", "gated: o teto do que IA já faz por AppSec"],
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
        { label: "Security Advisor", sub: "Supabase · acha RLS aberto em 2 min" },
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
        { label: "MFA + papéis", sub: "todo mundo com 2FA, role mínima" },
        { label: "observability", sub: "logs + alertas no Sentry/Logflare" },
      ],
    },
  },
  {
    key: "checklist_lancamento",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "antes de apertar o deploy",
      title: "checklist de lançamento",
      items: [
        { label: "RLS ativo em toda tabela", sub: "Security Advisor verde" },
        { label: "nenhum secret no front", sub: "só anon key no client" },
        { label: "política de privacidade no ar", sub: "base legal definida" },
        { label: "exclusão de conta funciona", sub: "direito do titular atendido" },
        { label: "MFA + backup ligados", sub: "Lovable, Supabase, GitHub" },
      ],
    },
  },
  {
    key: "checklist_segunda",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "ações pra colocar em prática hoje",
      items: [
        { label: "ativar RLS em tudo", sub: "comece pelas tabelas com user_id" },
        { label: "rodar Security Advisor", sub: "Supabase · grátis · 2 minutos" },
        { label: "auditar o RLS com IA", sub: "cole o schema no Claude/GPT" },
        { label: "MFA em tudo", sub: "Lovable, Supabase, GitHub" },
      ],
    },
  },
  {
    key: "curso_proximos",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "você terminou o curso · e agora?",
      items: [
        { label: "rode o checklist no seu app ainda hoje" },
        { label: "audite seu RLS com o prompt da aula 10" },
        { label: "transforme cada direito do titular num endpoint" },
        { label: "segurança não é um estado — é hábito", accent: true },
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
