import type { EventModule } from "../types";
import type { SlideEntry } from "../travessia/manifest";
import { bootcampCaldeiraEvent } from "../bootcamp-caldeira";

// Dia de CYBERSEGURANÇA do MBA na Faculdade Moinhos de Vento (Hospital Moinhos, POA).
// ONLINE, ~3h. Parte 1 teoria + Parte 2 prática ao vivo. Identidade Moinhos (navy + magenta).
// Traduz o deck (nasceu p/ devs) para PLATEIA CRUA e leiga, com foco em VIBECODING (não
// saúde): overrides de roteiro sem jargão, exemplos gerais de app, agenda própria (com a
// Parte 2), slide "dado sensível na IA", intervalo, timebox na prática e slide de materiais.
// Único gancho de saúde: 1 frase no cover reconhecendo a plateia (MBA da Moinhos).

const naval = (key: string, sp: Record<string, unknown>): SlideEntry => ({
  key, kind: "static", staticProps: { background: "naval", ...(sp as object) } as never,
});
const passoSlide = (key: string, eyebrow: string, faco: string, porque: string, prova: string): SlideEntry =>
  naval(key, { variant: "list", eyebrow, items: [
    { label: "o que eu faço", sub: faco },
    { label: "por que importa", sub: porque },
    { label: "como sei que deu certo", sub: prova, accent: true },
  ] });

const cover: SlideEntry = {
  key: "cover", kind: "special", component: "CoverSlide",
  props: { showLogo: false, labels: {
    eyebrow: "FACULDADE MOINHOS DE VENTO · MBA · ONLINE",
    title: "Cybersegurança", sub: "construir com IA sem vazar.",
  } },
};

// agenda própria (leiga + mostra a Parte 2)
const agendaMoinhos = naval("agenda", { variant: "grid", eyebrow: "AGENDA", items: [
  { label: "1. por quê", sub: "o risco que você não vê" },
  { label: "2. onde o dado mora", sub: "e como trancar" },
  { label: "3. IA & LGPD", sub: "com foco em dado sensível" },
  { label: "4. como se proteger", sub: "as ferramentas" },
  { label: "5. ao vivo", sub: "montando um sistema seguro", accent: true },
] });

// "dado sensível na IA" — a pergunta nº1 sobre usar IA com dado de usuário
const regraClinica = naval("regra_clinica", { variant: "two-line",
  title: "dado sensível na IA?",
  subtitle: "nunca em IA pública gratuita — anonimize ou use versão com contrato.",
});

// abertura participativa (callback ao dia 1) — planta a pergunta e o "mostra o teu" do fim
const aberturaDia1 = naval("abertura_dia1", { variant: "two-line",
  eyebrow: "de volta · dia 3 · e agora a gente TRANCA",
  title: "quem construiu um app no dia 1?",
  subtitle: "levanta a mão / manda no chat, e você sabe dizer se ele tá TRANCADO?",
});

const intervaloSlide = naval("intervalo", { variant: "act",
  eyebrow: "respira", title: "intervalo · 10 min", subtitle: "já voltamos — a melhor parte vem agora.",
});

// ── Parte 2 · prática ao vivo ──
const praticaIntro = naval("pratica_intro", { variant: "act",
  eyebrow: "parte 2 · mão na massa", title: "agora, ao vivo",
  subtitle: "você não precisa fazer isso — precisa saber que existe e o que perguntar.",
});
const conceitoStack = naval("conceito_stack", { variant: "grid", eyebrow: "os 2 personagens principais, sem jargão", title: "pensa numa empresa", items: [
  { label: "Supabase (banco)", sub: "o depósito: onde o dado do cliente mora" },
  { label: "edge function", sub: "a sala dos fundos: o código roda longe do público, com a chave guardada", accent: true },
] });
// camadas extras (proxy/WAF) rebaixadas a "só pra saber que existem" — não são build ao vivo (complexo/arriscado p/ leigo)
const camadasExtras = naval("camadas_extras", { variant: "list", eyebrow: "camadas a mais · bom saber que existem (o fornecedor cuida)", items: [
  { label: "a recepção na frente", sub: "um porteiro por onde todo pedido passa, barra quem tenta entrar pela porta dos fundos (nome técnico: proxy)" },
  { label: "a segurança na porta", sub: "trava ataque conhecido e enxurrada de tentativas (nome técnico: WAF + limite)" },
  { label: "o que você faz com isso", sub: "não precisa montar; só perguntar pro fornecedor: 'isso tá ligado?'", accent: true },
] });
// mão na massa da plateia — o pico participativo que enche o tempo e engaja (linha do dia 1)
const maoNaMassa = naval("mao_na_massa", { variant: "list", eyebrow: "sua vez · todo mundo audita o próprio app · ~15 min", items: [
  { label: "1. abra o app que você fez no dia 1", sub: "ou o exemplo que está no material, se não tiver um à mão" },
  { label: "2. cole o prompt de auditoria numa IA", sub: "ChatGPT ou Claude; o prompt está no material do aluno" },
  { label: "3. mande a PLANTA do banco, nunca o dado real", sub: "a estrutura das tabelas, não o cliente de verdade" },
  { label: "4. leia no chat o furo que a IA achou", sub: "eu comento os primeiros ao vivo; o furo de um é a aula de todos", accent: true },
] });
const mostraOTeu = naval("mostra_o_teu", { variant: "act",
  eyebrow: "ao vivo · coragem premiada",
  title: "mostra o teu",
  subtitle: "quem topa compartilhar a tela? a gente acha a porta aberta juntos, sem julgamento, é assim que se aprende.",
});
const praticaRoteiro = naval("pratica_roteiro", { variant: "list", eyebrow: "o que vou montar ao vivo · ~45 min", items: [
  { label: "1. banco com regra de acesso", sub: "cada um só vê o que é dele · o mais importante · 20 min" },
  { label: "2. uma função no servidor", sub: "a lógica com a chave escondida · 15 min" },
  { label: "3. análise de segurança", sub: "verificador do Supabase + auditar com IA · 10 min", accent: true },
  { label: "+ camadas a mais (só pra conhecer)", sub: "a recepção e a porta: existem, o fornecedor cuida" },
] });
const passo1 = passoSlide("passo1_rls", "ao vivo · passo 1 · o banco",
  "crio uma tabela de PEDIDOS e ligo a regra 'cada um só vê o que é dele'",
  "sem isso, qualquer um lê o registro de todo mundo",
  "tento ver o registro de OUTRO usuário e o sistema me barra");
const passo2 = passoSlide("passo2_edge", "ao vivo · passo 2 · a sala dos fundos",
  "crio uma função que roda no servidor, com a chave guardada lá",
  "a chave nunca aparece pro usuário",
  "abro o navegador e a chave não está visível em lugar nenhum");
const passo3 = passoSlide("passo3_proxy", "ao vivo · passo 3 · a recepção",
  "coloco a Cloudflare na frente; ela carimba cada pedido com um segredo",
  "só pedido carimbado é atendido",
  "tento entrar pela porta direta, sem carimbo, e tomo 'acesso negado'");
const praticaProva = naval("pratica_prova", { variant: "two-line",
  title: "acesso direto? 403.", subtitle: "essa tela feia é o app dizendo NÃO. só passa quem vem pela recepção.",
});
const passo4 = passoSlide("passo4_waf", "ao vivo · passo 4 · a porta",
  "ligo o WAF e um limite de tentativas por minuto",
  "barra ataque conhecido e enxurrada de pedidos",
  "se eu martelar de tentativas, ele me bloqueia");
const praticaAnalise = naval("pratica_analise", { variant: "list", eyebrow: "ao vivo · passo 5 · análise", items: [
  { label: "verificador do Supabase", sub: "acha falha em 2 min (deixei uma de propósito pra ele pegar)" },
  { label: "auditar com IA", sub: "colo a PLANTA do banco no Claude — nunca o dado real do usuário" },
  { label: "o que levar pro seu fornecedor", sub: "pergunte se ligou a regra de acesso, o proxy e o limite", accent: true },
] });
const materiaisSlide = naval("materiais", { variant: "act",
  eyebrow: "leve com você · material do aluno", title: "baixe e replique",
  subtitle: "3 guias + 9 fichas temáticas + códigos — tudo em PDF", href: "/materiais-moinhos.zip", cta: "baixar tudo (.zip)",
});

// slide de Q&A (dá dono ao tempo que sobra no slot de 3h)
const qaSlide = naval("qa", { variant: "act",
  eyebrow: "sua vez", title: "perguntas",
  subtitle: "manda no chat — temos tempo, respondo tudo com calma.",
});

// ── REPLACE de slides HERDADOS: corrige fato (Serasa/claims não-verificáveis) e traduz a TELA pra leigo ──
const lgpdBrasilFix: SlideEntry = {
  key: "lgpd_brasil_hoje", kind: "special", component: "ComparisonSlide",
  props: {
    background: "naval",
    eyebrow: "e no Brasil?", title: "a ANPD apertou o cerco — e o estrago não espera.",
    leftTag: "a fiscalização", rightTag: "a conta que chega", rightAccent: true,
    left: { label: "ANPD virou xerife", bullets: ["1ª multa em 2023 — e o patamar subiu", "agência de fato: autônoma e concursada", "foco declarado: IA, biometria e menores", "orientações mirando decisão automatizada"] },
    right: { label: "o que dói de verdade", sub: "vazamento não espera a ANPD pra te machucar.", bullets: ["+220 milhões de CPFs vazados no Brasil (2021)", "ação civil + dano moral coletivo", "reputação destruída em 1 print"] },
  },
};
const ferramentasFix: SlideEntry = {
  key: "ferramentas_principais", kind: "special", component: "ComparisonSlide",
  props: {
    background: "naval",
    eyebrow: "a mesma IA que ataca, defende", title: "pentest e descoberta de falha com IA",
    leftTag: "pentest autônomo", rightTag: "descoberta sobre-humana", rightAccent: true,
    left: { label: "o 'ladrão do bem'", bullets: ["uma IA que tenta invadir sozinha", "lê o código e acha o furo", "o que levava semanas → dias", "já existe e ficou barato"] },
    right: { label: "o teto do que a IA já faz", sub: "modelos de fronteira, ainda restritos.", bullets: ["acharam falhas de +20 anos em sistemas famosos", "brechas que passaram décadas despercebidas", "a barreira da segurança despencou"] },
  },
};
const rlsAbertoFix: SlideEntry = {
  key: "rls_aberto", kind: "special", component: "LockVisualSlide",
  props: {
    background: "naval",
    eyebrow: "o default perigoso", title: "regra de acesso desligada = porta aberta.",
    subtitle: "qualquer um com a 'chave de visitante' (visível no navegador) lê o banco inteiro.",
    state: "open",
  },
};
const checklistFix: SlideEntry = naval("checklist_segunda", { variant: "grid", eyebrow: "pra segunda de manhã · você faz / você pergunta", items: [
  { label: "você FAZ: liga o 2 fatores (MFA)", sub: "nas suas contas — senha forte e um teto de gasto na IA" },
  { label: "você FAZ: confere os arquivos", sub: "nenhuma pasta pública esquecida" },
  { label: "você PERGUNTA: a regra de acesso (RLS) tá ligada?", sub: "pro seu fornecedor ou time técnico" },
  { label: "você PERGUNTA: rodaram o verificador + auditoria com IA?", sub: "Security Advisor do Supabase, de graça", accent: true },
] });
const iaInjectionFix: SlideEntry = naval("ia_prompt_injection", { variant: "two-line",
  title: "colocou uma IA que conversa no app?",
  subtitle: "a IA lê o texto do usuário — e pode obedecer uma ordem escondida nele.",
});
const arqCamadasFix: SlideEntry = naval("arquitetura_camadas", { variant: "grid", eyebrow: "defesa em profundidade · 3 fronteiras", title: "a tela não confia · o servidor confere · o banco protege", items: [
  { label: "a tela (o que você vê)", sub: "tudo aqui é público — nunca confie no que vem dela" },
  { label: "o servidor (a sala dos fundos)", sub: "confere QUEM está pedindo antes de fazer" },
  { label: "o banco (o cofre)", sub: "a regra de acesso é a rede final — nem a IA passa", accent: true },
] });

// mais telas herdadas em dev-speak traduzidas pra leigo (a fala já foi; faltava a TELA)
const tresPilaresFix: SlideEntry = naval("tres_pilares", { variant: "grid", eyebrow: "as 3 peças do banco · e como cada uma fura", items: [
  { label: "as tabelas", sub: "onde o dado mora — risco: ficarem abertas pra todos" },
  { label: "funções no servidor", sub: "a lógica dos fundos — risco: não conferir quem chamou" },
  { label: "funções do banco", sub: "risco: rodarem com poder demais", accent: true },
] });
const codigoVsFix: SlideEntry = {
  key: "codigo_vs_supabase", kind: "special", component: "ComparisonSlide",
  props: {
    background: "naval",
    eyebrow: "onde mora cada coisa", title: "o código vs o banco",
    leftTag: "no código", rightTag: "no banco",
    left: { label: "o que o app faz", bullets: ["conferir o que o usuário digita", "guardar as chaves no servidor (nunca na tela)", "limitar tentativas", "não registrar dado sensível nos logs"] },
    right: { label: "as regras de acesso", bullets: ["quem vê o quê (a regra de acesso)", "quem entra (o login)", "cópia de segurança (backup)", "ambiente de ensaio"] },
  },
};
const naoSoLovableFix: SlideEntry = naval("nao_so_lovable", { variant: "list", eyebrow: "o Lovable ajuda muito · mas não faz tudo", items: [
  { label: "peça pra própria IA revisar", sub: "o Claude/GPT lê o que foi construído e acha furo" },
  { label: "guarde o histórico (com desfazer)", sub: "toda mudança registrada, dá pra voltar no tempo" },
  { label: "a chave-mestra NUNCA na tela", sub: "só a 'chave de visitante' fica no navegador" },
  { label: "rode o verificador toda semana", sub: "o Security Advisor do Supabase é de graça", accent: true },
] });
const lgpdViraCodigoFix: SlideEntry = naval("lgpd_vira_codigo", { variant: "grid", eyebrow: "cada direito vira um botão no app", items: [
  { label: "apagar a conta", sub: "um botão que apaga tudo" },
  { label: "portabilidade", sub: "um botão que baixa os dados num arquivo" },
  { label: "minimização", sub: "não guardar dado onde não precisa" },
  { label: "consentimento", sub: "registrar o que a pessoa aceitou, com data" },
  { label: "incidente", sub: "um alarme pra avisar a ANPD no prazo", accent: true },
] });
const kitDiaFix: SlideEntry = naval("kit_dia_a_dia", { variant: "grid", eyebrow: "seu kit do dia a dia · grátis ou barato", items: [
  { label: "verificador do Supabase", sub: "acha regra de acesso aberta em 2 min" },
  { label: "varredura do Lovable", sub: "o próprio Lovable aponta os riscos do app" },
  { label: "auditar com IA", sub: "cola a planta do banco no Claude/GPT e pede os furos", accent: true },
  { label: "ferramentas de dev", sub: "caçam senha esquecida no código — seu fornecedor conhece" },
] });
const setupRobustoFix: SlideEntry = naval("setup_robusto", { variant: "grid", eyebrow: "4 'seguros' que valem ouro quando cresce", items: [
  { label: "voltar no tempo", sub: "desfazer um estrago no banco" },
  { label: "ambiente de ensaio", sub: "testar antes de ir pro ar" },
  { label: "2 fatores + acessos", sub: "verificação dupla; cada um só o acesso que precisa" },
  { label: "alarme", sub: "saber do problema antes do cliente", accent: true },
] });

// últimas telas herdadas em jargão traduzidas pra leigo (a fala já traduz; faltava a tela)
const tresCamadasFix: SlideEntry = naval("tres_camadas", { variant: "grid", eyebrow: "três camadas de risco", items: [
  { label: "o banco", sub: "as regras de quem vê o quê — o maior risco" },
  { label: "o código", sub: "as chaves e senhas do sistema, que não podem vazar" },
  { label: "a governança", sub: "LGPD, quem tem acesso, cópia de segurança" },
] });
const piiFix: SlideEntry = naval("lgpd_pii_escondida", { variant: "grid", eyebrow: "você coleta mais do que pensa", title: "dado pessoal que passa batido", items: [
  { label: "endereço de internet (IP)", sub: "todo acesso registra, mesmo sem cadastro" },
  { label: "localização", sub: "aquele popup de 'permitir localização'" },
  { label: "o aparelho", sub: "modelo do celular, identificador de anúncio" },
  { label: "e-mail + nome", sub: "óbvio — mas continua sendo dado pessoal" },
] });
const quandoMigrarFix: SlideEntry = naval("quando_migrar", { variant: "list", eyebrow: "sinais de que é hora de profissionalizar", items: [
  { label: "o sistema fica lento com muito dado" },
  { label: "você precisa de cópia de segurança séria" },
  { label: "o time cresce e precisa de papéis/acessos" },
  { label: "você trata dado regulado ou sensível" },
  { label: "um cliente grande exige garantia de disponibilidade (SLA)" },
] });
const storagePublicoFix: SlideEntry = naval("storage_publico", { variant: "list", eyebrow: "o outro cadeado esquecido · arquivos", items: [
  { label: "pasta pública = arquivo aberto na URL", sub: "quem tem o link baixa — nota fiscal, documento, foto" },
  { label: "os arquivos têm regra PRÓPRIA", sub: "não herdam a regra das tabelas — configure à parte" },
  { label: "regra: pasta privada + link que expira", sub: "acesso temporário, sem link eterno" },
  { label: "confere hoje: alguma pasta pública sem querer?", sub: "é o vazamento mais bobo — e o mais comum", accent: true },
] });
const authConfigFix: SlideEntry = naval("auth_config", { variant: "list", eyebrow: "os cadeados do login que ficam abertos", items: [
  { label: "confirmação de e-mail desligada", sub: "cria conta com o e-mail de outra pessoa e já entra" },
  { label: "senha fraca liberada", sub: "sem um mínimo decente, '123456' passa" },
  { label: "proteção de senha já vazada (vem desligada)", sub: "barra senha que já vazou por aí — é 1 clique", accent: true },
  { label: "cadastro aberto sem precisar", sub: "não é self-service? feche o cadastro" },
] });
const lovableCloudFix: SlideEntry = {
  key: "lovable_cloud_vs_supabase", kind: "special", component: "ComparisonSlide",
  props: {
    background: "naval",
    eyebrow: "duas formas de ter o 'fundo' do app", title: "o pronto vs. o controle total",
    leftTag: "o pronto (Lovable Cloud)", rightTag: "o próprio (Supabase)", rightAccent: true,
    left: { label: "liga e usa · zero config", bullets: ["já vem tudo ligado", "login, banco, arquivos, funções", "ótimo até uma produção média", "sem mexer em nada técnico"] },
    right: { label: "controle total", bullets: ["painel completo", "cópia de segurança + ambiente de ensaio", "ajuste fino quando cresce", "vale quando o dado aumenta"] },
  },
};

const historiaRealFix: SlideEntry = naval("historia_real", { variant: "list", eyebrow: "como vaza na vida real", items: [
  { label: "sexta: você lança no grupo do WhatsApp" },
  { label: "sábado: 200 cadastros, com CPF e tudo" },
  { label: "domingo: alguém abre as ferramentas do navegador" },
  { label: "segunda: a tabela inteira tá num fórum", accent: true },
] });
const vitrineFix: SlideEntry = {
  key: "vitrine_deposito", kind: "special", component: "ComparisonSlide",
  props: {
    background: "naval",
    eyebrow: "a analogia que importa", title: "o Lovable é a vitrine. o Supabase é o depósito.",
    leftTag: "Lovable", rightTag: "Supabase", rightAccent: true,
    left: { label: "a vitrine", sub: "o que o usuário vê e clica.", bullets: ["as telas", "os botões", "o visual do app"] },
    right: { label: "o depósito", sub: "onde o dado mora e as regras vivem.", bullets: ["o banco de dados", "o login", "as funções do servidor", "os arquivos"] },
  },
};
const basesLegaisFix: SlideEntry = naval("lgpd_bases_legais", { variant: "grid", eyebrow: "10 justificativas na lei · 3 que importam num serviço online", title: "qual base legal cobre cada dado?", items: [
  { label: "execução de contrato", sub: "o dado é necessário pra entregar o serviço", accent: true },
  { label: "legítimo interesse", sub: "uso esperado: segurança, antifraude" },
  { label: "consentimento", sub: "o extra e opcional: marketing, cookies" },
] });

const PRATICA = [intervaloSlide, praticaIntro, conceitoStack, praticaRoteiro, passo1, passo2, praticaAnalise, camadasExtras, maoNaMassa, mostraOTeu, qaSlide];
const REPLACE: Record<string, SlideEntry> = {
  agenda: agendaMoinhos,
  lgpd_brasil_hoje: lgpdBrasilFix,
  ferramentas_principais: ferramentasFix,
  rls_aberto: rlsAbertoFix,
  checklist_segunda: checklistFix,
  ia_prompt_injection: iaInjectionFix,
  arquitetura_camadas: arqCamadasFix,
  tres_pilares: tresPilaresFix,
  codigo_vs_supabase: codigoVsFix,
  nao_so_lovable: naoSoLovableFix,
  lgpd_vira_codigo: lgpdViraCodigoFix,
  kit_dia_a_dia: kitDiaFix,
  setup_robusto: setupRobustoFix,
  tres_camadas: tresCamadasFix,
  lgpd_pii_escondida: piiFix,
  quando_migrar: quandoMigrarFix,
  storage_publico: storagePublicoFix,
  auth_config: authConfigFix,
  lovable_cloud_vs_supabase: lovableCloudFix,
  historia_real: historiaRealFix,
  vitrine_deposito: vitrineFix,
  lgpd_bases_legais: basesLegaisFix,
};
const EXTRAS: { before: string; slide: SlideEntry }[] = [
  { before: "ato_1_porque", slide: aberturaDia1 },
  { before: "ato_3_lgpd", slide: regraClinica },
];

// cortes p/ enxugar (check fable): resumo/transição que repetem e a lista de direitos duplicada.
// lgpd_basico + lgpd_quanto_custa: a consequência (multa/print) já é contada em casos_reais→brasil_hoje.
// lgpd_vira_codigo: direitos_titular já fecha com "cada direito vira um botão" (não re-listar).
const REMOVE = new Set(["lgpd_basico", "lgpd_quanto_custa", "lgpd_vira_codigo"]);

const base0: SlideEntry[] = [cover, ...bootcampCaldeiraEvent.manifest.slice(1)];
const base: SlideEntry[] = [];
for (const s of base0) {
  if (REMOVE.has(s.key)) continue;
  for (const ex of EXTRAS) if (ex.before === s.key) base.push(ex.slide);
  base.push(REPLACE[s.key] ?? s);
}
const at = base.findIndex((s) => s.key === "confianca");
const withPratica: SlideEntry[] = at >= 0 ? [...base.slice(0, at), ...PRATICA, ...base.slice(at)] : [...base, ...PRATICA];
const viaIdx = withPratica.findIndex((s) => s.key === "vai_la_proteja");
// encerramento da jornada dos 3 encontros (dia 3 = ultima aula: fecha vibecoding + design + seguranca)
const jornada3 = naval("jornada_3_encontros", { variant: "grid", eyebrow: "e assim fecha a jornada · 3 encontros · do zero ao pronto", items: [
  { label: "dia 1 · vibecoding", sub: "você aprendeu a CONSTRUIR: da ideia ao app, conversando com a IA" },
  { label: "dia 2 · design e produto", sub: "aprendeu a ENCANTAR: do 'monstro' ao MAP, com a Fernanda" },
  { label: "dia 3 · segurança", sub: "aprendeu a PROTEGER: construir rápido sem deixar a porta aberta", accent: true },
] });
const manifest: SlideEntry[] = viaIdx >= 0
  ? [...withPratica.slice(0, viaIdx), jornada3, materiaisSlide, ...withPratica.slice(viaIdx)]
  : [...withPratica, jornada3, materiaisSlide];

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
    boundaries, openerIndices,
  },
  scripts: {
    ...bootcampCaldeiraEvent.scripts,
    cover: `Fala, pessoal! Que bom ter vocês aqui, mesmo online. Um gancho rápido: vocês vêm da saúde, uma área que lida com dado sensível o tempo todo — então segurança de dados fala direto com o dia de vocês. Mas o que eu vou mostrar serve pra QUALQUER app que você construir. Combinando: dúvida, joga no chat que eu respondo nos intervalos e no fim. E como esse é o nosso ÚLTIMO encontro dos três, no fim eu ainda fecho a jornada inteira com vocês. Essa parte é sobre como construir rápido com IA sem deixar a porta dos fundos aberta. Primeiro a teoria, o porquê e os riscos; na parte 2 eu monto um sistema seguro AO VIVO, na tela. Bora.`,
    about: `Rapidinho sobre mim: eu ajudo pessoas e times a construir com IA de forma segura. Só pra alinhar uma palavra: vibecoding é construir um aplicativo conversando com a IA, sem precisar saber programar — provavelmente o que vocês estão vendo nesse MBA. Meu objetivo não é acabar com isso, é fazer dar certo com segurança. Me acha no @gabreda, e a empresa é a @sobreai.`,
    agenda: `Esse é o mapa. Um: por quê — o risco que você não vê. Dois: onde o dado mora, e como trancar. Três: IA e LGPD, com foco em dado sensível. Quatro: como se proteger. E cinco, depois de um intervalo: eu monto um sistema seguro AO VIVO, na tela. Dúvida, joga no chat que eu respondo nos intervalos e no fim.`,
    historia_real: `Olha como vaza na vida real. Sexta o app entra no ar. Sábado já tem duzentos cadastros. Domingo alguém curioso abre as ferramentas do navegador e percebe que dá pra puxar a base inteira. Segunda de manhã, a lista com nome, telefone e o que cada pessoa comprou ou cadastrou tá circulando por aí. Não precisou de hacker: precisou de uma regra de acesso que faltou — daqui a pouco você vê o nome técnico dela.`,
    tres_camadas: `O risco mora em três lugares. No banco: as regras de quem pode ver o quê. No código: as senhas e chaves do sistema, que não podem vazar. E na governança: a LGPD, quem tem acesso, backup. A maioria só pensa no terceiro quando já virou problema. A gente começa pelo banco, que é onde o estrago é maior.`,
    ato_2_supabase: `Segundo bloco: onde o dado vive. O Supabase é o "fundo" do app, o lugar onde o dado fica guardado de verdade.`,
    ato_3_codigo: `Ainda no "onde o dado mora": a gente sai do banco e sobe pro código. Proteger o banco é essencial, mas não é o fim da história, tem cadeado no código também.`,
    tres_pilares: `No banco tem três peças, e cada uma tem um jeito clássico de furar. As tabelas, onde o dado mora — risco: ficarem abertas pra todo mundo. As funções que rodam no servidor — risco: não conferir quem está pedindo. E funções dentro do próprio banco, que às vezes têm poder demais. Hoje eu foco na primeira, que é a mais comum e a mais perigosa.`,
    lovable_cloud_vs_supabase: `Antes do risco, uma escolha que vocês vão ouvir: tem duas formas de ter o "fundo" do app. Uma é o plano pronto, que já vem tudo ligado e funciona sem configurar nada — ótimo pra começar. A outra é a versão com controle total, pra quando cresce e tem um time técnico. Regra simples: comece no pronto, migre quando precisar.`,
    rls_aberto: `E aqui o perigo do padrão. Quando essa regra de acesso está desligada, é porta aberta. Existe uma "chave de visitante" pendurada na vitrine — no código que qualquer um vê no navegador. Se o depósito não tem regra, essa chave de visitante abre as suas tabelas inteiras. É o vazamento mais comum de app feito com IA.`,
    exemplo_ruim: `Olha o padrão errado — não precisa saber programar. Essa regra (o nome técnico é "policy") diz "todos veem": libera o dado pra qualquer um, logado ou não. Funciona? Funciona. Pro atacante também. É a porta aberta.`,
    exemplo_bom: `E esse é o jeito certo, quase igual, mas salva a sua pele: a regra diz "só te mostro a linha se ela for SUA". Comparou, bateu, passou; não bateu, não vê. É uma linha de diferença entre vazar tudo e proteger tudo.`,
    storage_publico: `E tem um segundo cadeado que quase todo mundo esquece: os arquivos. Se a "pasta" fica pública, qualquer um com o link baixa o arquivo, o documento que a pessoa subiu. A regra de ouro: pasta privada e um link temporário que vence sozinho — tipo link com validade: passou o prazo, não abre mais.`,
    auth_config: `E fechando o Supabase, a parte de login e cadastro — o que chamam de Auth. Três coisas que eu vejo abertas direto: confirmação de e-mail desligada (aí qualquer um cria conta com o e-mail dos outros), senha fraca liberada, e a proteção contra senha já vazada, que vem desligada e é um clique pra ligar. E se o app não precisa de cadastro aberto, feche. São checkboxes, não código — mas é por aí que a conta vaza.`,
    codigo_vs_supabase: `Vale separar onde cada coisa mora. No código: conferir o que o usuário digitou, guardar as senhas do sistema no servidor (nunca na tela), limitar tentativas, e não registrar dado sensível nos logs. No banco: as regras de acesso, quem entra, backup. Cada camada faz a sua parte.`,
    nao_so_lovable: `O Lovable ajuda muito, mas não faz tudo por você. Quatro coisas: peça pra própria IA revisar o que foi construído; guarde o histórico do que mudou, com botão de desfazer; a chave-mestra do sistema NUNCA vai pra parte pública do app; e rode o verificador de segurança do Supabase toda semana — é de graça.`,
    ia_prompt_injection: `Se o seu app tem um assistente de IA — e no vibecoding isso é quase automático — presta atenção. É como alguém entregar na recepção um bilhete falsificado, assinado "pelo diretor", e o atendente obedecer, porque a instrução e a conversa chegam no mesmo balcão. Com IA é igual. É o risco número 1 da lista mundial de segurança de IA. E a defesa cabe numa frase: a IA do seu app nunca pode ter mais poder do que a pessoa que fala com ela.`,
    regra_clinica: `E aqui uma pergunta que sempre aparece: "posso jogar os dados dos meus usuários no ChatGPT?". Resposta curta: dado que identifica a pessoa (ou dado sensível) NÃO entra em IA pública gratuita — ou você anonimiza, tira o que identifica, ou usa uma versão com contrato de dados, a corporativa. E repara: naquele lab que eu vou mostrar, o que eu colo na IA é a PLANTA do banco, a estrutura — nunca o dado real. Guarda essa regra, é a mais prática de todas.`,
    lgpd_dado_sensivel: `Uma coisa que muita gente não sabe: nem todo dado é igual. Tem o dado pessoal comum — nome, e-mail, CPF. E tem o dado SENSÍVEL, com regra muito mais dura: saúde, biometria, opinião política, origem racial. Vazou dado sensível, o estrago e a multa são muito maiores. E atenção: pra dado sensível NÃO vale "legítimo interesse" — precisa de consentimento específico, ou de uma hipótese bem pontual prevista na lei.`,
    lgpd_pii_escondida: `E olha a pegadinha: você coleta muito mais dado pessoal do que imagina. O endereço de internet de quem acessa, o modelo do aparelho, a localização daquele popup de "permitir", e o óbvio, nome e e-mail. Tudo isso identifica uma pessoa. Você já é responsável por esses dados e talvez nem tenha percebido.`,
    lgpd_bases_legais: `A lei tem dez justificativas pra tratar um dado. Num serviço online, três importam. Execução de contrato: o dado é necessário pra entregar o serviço. Legítimo interesse: usos esperados, como segurança e antifraude. E consentimento: o extra, o opcional. Repara: consentimento é a ÚLTIMA da fila, não a primeira — e, pra dado sensível, quase sempre precisa dele mesmo.`,
    lgpd_exemplos_base: `Vamos aterrissar. Criar uma conta pra usar o app? Execução de contrato. Processar um pedido? Contrato. Antifraude e segurança? Legítimo interesse. Mandar newsletter e promoção? Aí sim, consentimento. E usar os dados dos clientes pra treinar uma IA? Precisa de base específica ou anonimizar. Percebe? Consentimento é a exceção, não a regra.`,
    lgpd_casos_reais: `Olha os números reais, e é gente grande. A Meta levou uma multa de um bilhão e duzentos milhões de euros, por mandar dado de europeu pros Estados Unidos sem base. A Amazon, setecentos e quarenta e seis milhões, por publicidade sem consentimento. O TikTok, trezentos e quarenta e cinco, por dado de criança mal protegido. E aqui no Brasil, a primeira multa da ANPD foi na Telekall, por vender uma lista de WhatsApp. Multa de todo tamanho — e a régua só sobe.`,
    direitos_titular: `A LGPD dá uma lista de direitos ao titular, e eu destaco os que viram um botão no app: acessar os dados, corrigir, exportar, apagar a conta e revogar o consentimento. E tem mais um, esse é o artigo 20: a pessoa pode pedir a revisão de uma decisão que a IA tomou sobre ela. Cada um vira um botão ou uma tela no seu sistema.`,
    lgpd_vira_codigo: `E na prática, cada direito vira um botão. Apagar a conta = um botão que apaga tudo. Portabilidade = um botão que baixa os dados num arquivo. Minimização = não registrar dado onde não precisa. Consentimento = guardar quando e o que a pessoa aceitou, com data. E incidente = um alarme pra avisar a ANPD e as pessoas no prazo. Quase tudo é simples de fazer.`,
    ferramentas_principais: `Olha o que já existe. Tem uma IA da AWS que funciona como um "ladrão do bem": ela tenta invadir o seu sistema sozinha e te conta por onde entrou — o que antes levava semanas de um especialista. E tem uma da Anthropic, dona do Claude, tão forte que achou falhas de mais de vinte anos em sistemas famosos. A mesma IA que ataca também defende, e ficou barata.`,
    ferramentas_gancho: `Pra dar dimensão: um teste de invasão profissional — isso tem nome, chama pentest — que custava uns cinquenta mil reais e um mês, hoje cabe num fim de semana e em algumas centenas de dólares. A barreira caiu no chão.`,
    kit_dia_a_dia: `E pro dia a dia, o que dá pra usar de graça: o verificador de segurança do Supabase, a varredura do próprio Lovable, e colar a "planta" do seu banco no Claude ou GPT pedindo os furos. Existem outras ferramentas que caçam senha esquecida no código — mas essas são de dev; o seu fornecedor conhece.`,
    prompt_auditoria: `E é esse o prompt que tá na tela. Não precisa copiar daí — ele vai no material que eu te entrego. A ideia é simples: você entrega pra IA a "planta" do seu banco e pede pra ela achar os furos. Dá pra fazer hoje à noite, de graça.`,
    setup_robusto: `Quando o sistema cresce, quatro "seguros" que valem ouro. Um botão de voltar no tempo, pra desfazer um estrago. Um ambiente de ensaio, pra testar antes de ir pro ar. Uma segunda chave na porta, a verificação em duas etapas. E um alarme que te avisa do problema antes do cliente. Guarda esse slide pra quando tiver um time técnico do lado.`,
    quando_migrar: `E como saber a hora de profissionalizar? Lembra que dá pra começar no plano simples e migrar? Os sinais: o sistema fica lento com muito dado, você precisa de backup sério, o time cresce, ou você trata dado regulado ou sensível.`,
    arquitetura_camadas: `Deixa eu amarrar num desenho mental que você leva pra vida. Três fronteiras: a tela nunca confia — tudo ali é público. A "sala dos fundos", o servidor, confere quem está pedindo antes de fazer. E o banco é a rede final, com a regra de acesso — nem a IA passa. A tela não confia, o servidor confere, o banco protege. Se sair só com essa frase, já valeu.`,
    checklist_segunda: `Antes do intervalo, duas listas. O que VOCÊ faz amanhã, sem depender de ninguém: liga a verificação em duas etapas nas suas contas, senha forte, um teto de gasto na conta de IA, e dá uma olhada nos arquivos — nenhuma pasta pública esquecida. E o que você PERGUNTA pro seu fornecedor: a regra de acesso está ligada? rodaram o verificador de segurança? auditaram com IA? Você não precisa fazer — precisa saber cobrar.`,
    ato_4_arquitetura: `Penúltimo bloco: arquitetura. Como sair do "funciona" e chegar no "escala sem dor". Depois desse bloco vem o intervalo e a melhor parte: a prática ao vivo.`,
    lgpd_brasil_hoje: `E no Brasil, hoje? A multa ainda é tímida, mas o estrago não espera. A ANPD ainda está amadurecendo — primeira multa só em 2023, e vem endurecendo desde então, de olho justamente em IA e decisão automatizada. Só que o que dói de verdade não espera a ANPD: um vazamento grande vira ação civil, dano moral coletivo, e a sua reputação destruída num único print. Aqui no Brasil já teve vazamento de mais de duzentos e vinte milhões de CPFs de uma vez. A conta chega por vários caminhos.`,
    qa: `Fechamos a parte planejada — agora é com vocês. Manda as perguntas no chat que eu respondo com calma, uma por uma. Temos tempo de sobra, então não segura dúvida: o que ficou solto, o "no meu caso funciona assim?", o "como eu peço isso pro meu fornecedor?". Bora.`,
    confianca: `E eu quero fechar com a ideia mais importante. O cliente contrata pela funcionalidade — pelo que o sistema faz. Mas ele FICA pela confiança. Um vazamento não quebra só um banco de dados; quebra a relação. Segurança não é custo: é o que sustenta tudo que você construiu.`,
    jornada_3_encontros: `E deixa eu fechar puxando o filme pra trás, porque hoje não é só o fim da aula, é o fim da nossa jornada juntos, foram três encontros. No primeiro, o vibecoding, vocês aprenderam a CONSTRUIR: saíram do zero e botaram um app no ar conversando com a IA. No segundo, com a Fernanda, aprenderam a ENCANTAR: pegar aquele "monstro" que o Lovable cospe e transformar num produto que dá gosto de usar. E hoje, no terceiro, vocês aprenderam a PROTEGER: construir rápido sem deixar a porta dos fundos aberta. Construir, encantar, proteger. Vocês chegaram sem nunca ter criado um software, e olha onde vocês estão.`,
    vai_la_proteja: `Então é isso, pessoal, e agora é o abraço de despedida de verdade. Vocês entraram nesses três dias sem nunca ter criado um software, e saem sabendo criar, encantar e proteger. Isso não é pouco: é uma habilidade nova que vocês levam pra vida e pro negócio de vocês. Vai lá, constrói, e constrói com segurança. Um agradecimento gigante à Faculdade Moinhos de Vento pela parceria, à Fernanda pela travessia do design, e a cada um de vocês pela energia e pela confiança esses dias. Foi uma honra dividir isso com vocês. Bora pro mundo. Um abraço!`,
    intervalo: `Bora fazer um intervalo de 10 minutos. Estica as pernas, pega uma água. Eu volto no horário combinado e a gente parte pra melhor parte: montar o sistema ao vivo.`,
    pratica_intro: `Teoria dada, e agora a parte que eu mais gosto, em DUAS mãos. Primeiro EU monto um sistema seguro do zero, aqui na tela, pra você ver como é. Depois é a SUA vez: você vai auditar o app que você mesmo construiu no dia 1. Na minha parte, relaxa, você não precisa saber fazer, precisa entender o que tá rolando e que pergunta levar pro seu fornecedor. Se aparecer um nome novo, o próximo slide apresenta cada peça.`,
    abertura_dia1: `Antes de tudo, uma pergunta, e eu quero mão levantada e um "eu" no chat: quem aqui construiu alguma coisa no dia 1, lá no Lovable? ... Isso, um monte de gente. Agora a pergunta que vale o dia de hoje: você sabe dizer se esse app que você fez tá TRANCADO, ou se tá com a porta dos fundos aberta pra qualquer um? ... Pois é, quase ninguém sabe, e tá tudo bem, é exatamente isso que a gente resolve hoje. No dia 1 vocês aprenderam a CONSTRUIR; hoje vocês aprendem a não deixar vazar. E no fim, quem topar, a gente abre o app de vocês e acha a porta aberta juntos, ao vivo.`,
    mao_na_massa: `Agora inverte o jogo: quem vai achar a porta aberta é VOCÊ. Todo mundo abre o app que fez no dia 1, e quem não tiver um à mão usa o exemplo que tá no material. Abre o ChatGPT ou o Claude do lado e cola aquele prompt de auditoria, o mesmo que eu acabei de usar. Uma regra de ouro, e eu vou repetir sempre: você manda a PLANTA do banco, a estrutura das tabelas, NUNCA o dado real do seu cliente. A IA te devolve os furos. Vai lendo e jogando no chat o que ela achou, que eu leio os primeiros em voz alta e a gente comenta. Aqui não tem erro feio: o furo de um é a aula de todos.`,
    mostra_o_teu: `E agora a parte que eu mais gosto, e que pede um pouquinho de coragem: quem topa compartilhar a tela e mostrar o app que construiu? A gente olha juntos, com carinho, e acha onde pode estar a porta aberta. Sem julgamento nenhum, pelo contrário: quem se voluntariar sai daqui com o app mais seguro, e a sala inteira aprende no exemplo real. [pegar 2 ou 3 · pra cada um: abrir, olhar as tabelas, perguntar "a regra de acesso tá ligada?", rodar o verificador se der tempo] Então, quem vai ser o primeiro corajoso?`,
    conceito_stack: `Deixa eu apresentar os dois personagens principais, e olha que não é analogia nova: lembra do DEPÓSITO lá da teoria? Agora eu vou construir a segurança dele. O Supabase é o depósito, onde o dado do cliente mora. E a função no servidor é a sala dos fundos, onde o trabalho acontece longe do público e a chave fica guardada. No fim eu ainda comento umas camadas a mais que ficam na frente de tudo, mas essas duas são o coração. Guarda a imagem, que agora vai fazer sentido na tela.`,
    camadas_extras: `E pra fechar, duas camadas que ficam na frente de tudo, e aqui eu só quero que você saiba que EXISTEM, não precisa fazer nada com elas hoje. A primeira é a recepção: um porteiro na frente do app por onde todo pedido passa, que barra quem tenta entrar pela porta dos fundos. A segunda é a segurança na porta, que trava ataque conhecido e enxurrada de tentativas. O nome técnico é proxy e WAF, mas o que importa pra você é: são proteções extras, e a pergunta pro seu fornecedor é 'isso tá ligado?'. Se sobrar tempo eu mostro rapidinho na tela.`,
    pratica_roteiro: `Esse é o roteiro, com tempo por passo pra não passarmos do horário, e já aviso que deixei parte pronta, tipo programa de culinária: o bolo já tá quase no forno. Banco, uns vinte minutos, que é o principal; função, quinze; análise, dez. E no fim eu comento rapidinho as camadas a mais, a recepção e a porta, só pra vocês saberem que existem, sem construir. Se um passo estourar o tempo, eu mostro o print e sigo, a gente não trava. A cada passo eu volto aqui e resumo.`,
    passo1_rls: `Passo 1, o banco, e esse é o coração do dia inteiro, então cola aqui comigo. Primeiro eu deixo a regra de acesso DESLIGADA, que é provavelmente como o app de vocês tá agora. Antes de eu clicar, chuta no chat: assim, desligado, você acha que eu consigo ver o pedido de OUTRA pessoa? Manda S ou N. ... Olha só: consigo, tá tudo aberto, eu leio a tabela inteira. Agora eu colo UMA linha, a regra "cada um só vê o que é dele", e salvo. Mesma tela, tento de novo ver o pedido do outro... e agora o sistema me barra. Essa uma linha é a diferença entre vazar tudo e proteger tudo. Se você levar só isso pra casa, o dia já valeu.`,
    passo2_edge: `Passo 2, a sala dos fundos. Crio uma função que roda no servidor, com a chave guardada lá dentro. Por que importa: a chave nunca aparece pro usuário. Como sei que deu certo: abro o navegador e a chave não está visível em lugar nenhum. Enquanto ela processa, eu explico o fluxo — e já deixei um resultado pronto pra não ter tela parada.`,
    passo3_proxy: `Passo 3, a recepção. Coloco a Cloudflare na frente, e ela carimba cada pedido com um segredo que só ela conhece. Por que importa: só pedido carimbado é atendido. Como sei que deu certo: se eu tentar a porta direta, sem carimbo, tomo "acesso negado".`,
    pratica_prova: `E olha a prova. Primeiro mostro funcionando, pela recepção. Agora eu tento entrar pela porta dos fundos direto... e o sistema responde 403, acesso negado. Essa tela feia é o app dizendo NÃO. Só passa quem vem pela recepção, com o carimbo certo.`,
    passo4_waf: `Passo 4, a segurança na porta. Ligo o WAF e um limite de tentativas por minuto. Por que importa: barra ataque conhecido e enxurrada de pedidos. Como sei que deu certo: se eu martelar de tentativas, ele me bloqueia.`,
    pratica_analise: `E o último passo, fechando: análise. Rodo o verificador do Supabase, que acha falha em dois minutos — e olha, eu deixei uma falha de propósito pra vocês verem ele pegando. Depois colo a PLANTA do banco no Claude e peço os furos — nunca o dado real do usuário. Isso qualquer um de vocês faz. E o que levar pra casa: você não precisa configurar isso — precisa saber perguntar pro seu fornecedor se ele fez.`,
    materiais: `E tá tudo aqui pra vocês levarem: três guias — o de estudo, o passo a passo do lab e um leia-me com a trilha —, os códigos prontos e NOVE fichas temáticas, uma por assunto (Supabase, Lovable, Cloudflare, proxy, LGPD, auditoria com IA, SLA, segurança de IA e um glossário). Tudo em PDF, com a cara da SobreAI, inclusive o prompt de auditoria pra colar na IA. Eu já mando o link no chat — estuda, refaz com as suas chaves, e me chama quando construir o seu.`,
  },
};

export default moinhosCyberEvent;
