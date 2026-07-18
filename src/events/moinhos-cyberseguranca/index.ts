import type { EventModule } from "../types";
import type { SlideEntry } from "../travessia/manifest";
import { bootcampCaldeiraEvent } from "../bootcamp-caldeira";

// Dia de CYBERSEGURANÇA do MBA na Faculdade Moinhos de Vento (Hospital Moinhos, POA).
// Formato: ONLINE, ~3h. Parte 1 = teoria; Parte 2 = prática ao vivo (Supabase + edge +
// proxy/WAF Cloudflare + análise). Identidade Moinhos (navy + magenta).
// Este arquivo TRADUZ o deck (que nasceu p/ devs no Caldeira) para PLATEIA CRUA de saúde:
// os scripts abaixo sobrescrevem os herdados, tirando jargão, corrigindo coerência
// (online, sem "Caldeira", art. 20, ref. da Meta) e ancorando na realidade de saúde.

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

// ── Parte 2 · prática ao vivo (com marcadores por passo) ──
const naval = (key: string, sp: Record<string, unknown>): SlideEntry => ({
  key,
  kind: "static",
  staticProps: { background: "naval", ...(sp as object) } as never,
});
const passo = (key: string, eyebrow: string, faco: string, porque: string, prova: string): SlideEntry =>
  naval(key, {
    variant: "list",
    eyebrow,
    items: [
      { label: "o que eu faço", sub: faco },
      { label: "por que importa", sub: porque },
      { label: "como sei que deu certo", sub: prova, accent: true },
    ],
  });

const praticaIntro = naval("pratica_intro", {
  variant: "act",
  eyebrow: "parte 2 · mão na massa",
  title: "agora, ao vivo",
  subtitle: "você não precisa fazer isso — precisa saber que existe e o que perguntar.",
});
const conceitoStack = naval("conceito_stack", {
  variant: "grid",
  eyebrow: "os personagens, sem jargão",
  title: "pensa num hospital",
  items: [
    { label: "Supabase (banco)", sub: "o arquivo: onde o dado do paciente mora" },
    { label: "edge function", sub: "a sala dos fundos: o código roda longe do público, com a chave guardada" },
    { label: "Cloudflare (proxy)", sub: "a recepção: todo pedido passa por ela antes de entrar" },
    { label: "WAF + limite", sub: "a segurança na porta: barra quem não devia e controla o fluxo", accent: true },
  ],
});
const praticaRoteiro = naval("pratica_roteiro", {
  variant: "list",
  eyebrow: "o que vou montar ao vivo",
  items: [
    { label: "1. banco com regra de acesso", sub: "do 'cadeado aberto' pro 'cada um só vê o que é dele'" },
    { label: "2. uma função no servidor", sub: "a lógica com a chave escondida" },
    { label: "3. a recepção na frente (Cloudflare)", sub: "carimba cada pedido com um segredo" },
    { label: "4. segurança na porta (WAF + limite)", sub: "trava ataque e enxurrada de pedidos" },
    { label: "5. análise de segurança", sub: "verificador do Supabase + auditar com IA", accent: true },
  ],
});
const passo1 = passo("passo1_rls", "ao vivo · passo 1 · o banco",
  "crio uma tabela e ligo a regra 'cada um só vê o que é dele'",
  "sem isso, qualquer um lê tudo",
  "tento ver o dado de outra pessoa e o sistema me barra");
const passo2 = passo("passo2_edge", "ao vivo · passo 2 · a sala dos fundos",
  "crio uma função que roda no servidor, com a chave guardada lá",
  "a chave nunca aparece pro usuário",
  "abro o navegador e a chave não está visível em lugar nenhum");
const passo3 = passo("passo3_proxy", "ao vivo · passo 3 · a recepção",
  "coloco a Cloudflare na frente; ela carimba cada pedido com um segredo",
  "só pedido carimbado é atendido",
  "tento entrar pela porta direta, sem carimbo, e tomo 'acesso negado'");
const praticaProva = naval("pratica_prova", {
  variant: "two-line",
  title: "acesso direto? 403.",
  subtitle: "essa tela feia é o app dizendo NÃO. só passa quem vem pela recepção.",
});
const passo4 = passo("passo4_waf", "ao vivo · passo 4 · a porta",
  "ligo o WAF e um limite de tentativas por minuto",
  "barra ataque conhecido e enxurrada de pedidos",
  "se eu martelar de tentativas, ele me bloqueia");
const praticaAnalise = naval("pratica_analise", {
  variant: "list",
  eyebrow: "ao vivo · passo 5 · análise",
  items: [
    { label: "verificador do Supabase", sub: "acha falha em 2 min (deixei uma de propósito pra ele pegar)" },
    { label: "auditar com IA", sub: "colo tudo no Claude e peço os furos" },
    { label: "o que levar pro seu fornecedor", sub: "pergunte se ele ligou a regra de acesso, o proxy e o limite", accent: true },
  ],
});

const materiaisSlide = naval("materiais", {
  variant: "act",
  eyebrow: "leve com você · material do aluno",
  title: "baixe e replique",
  subtitle: "guia de estudo, guia do lab e os códigos — tudo em PDF",
  href: "/materiais-moinhos.zip",
  cta: "baixar tudo (.zip)",
});

const PRATICA = [praticaIntro, conceitoStack, praticaRoteiro, passo1, passo2, passo3, praticaProva, passo4, praticaAnalise];

const base: SlideEntry[] = [cover, ...bootcampCaldeiraEvent.manifest.slice(1)];
const at = base.findIndex((s) => s.key === "confianca");
const withPratica: SlideEntry[] = at >= 0 ? [...base.slice(0, at), ...PRATICA, ...base.slice(at)] : [...base, ...PRATICA];
const manifest: SlideEntry[] = [...withPratica, materiaisSlide];

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
    // ── abertura / coerência online ──
    cover: `Fala, pessoal! Que bom ter vocês aqui, mesmo online. Combinando rápido: dúvida, joga no chat que eu paro pra responder. Essa parte é sobre segurança — como construir rápido com IA sem deixar a porta dos fundos aberta. O formato de hoje: primeiro a teoria, o porquê e os riscos; e na parte 2 eu monto um sistema seguro AO VIVO, na tela. Bora.`,
    about: `Rapidinho sobre mim: eu ajudo pessoas e times a construir com IA de forma segura. Só pra alinhar uma palavra que vou usar bastante: vibecoding é construir um aplicativo conversando com a IA, sem precisar saber programar — provavelmente o que vocês estão vendo nesse MBA. Meu objetivo não é acabar com isso, é fazer dar certo com segurança. Me acha no @gabreda, e a empresa é a @sobreai. Bora.`,
    agenda: `Esse é o mapa. Primeiro a teoria: por que segurança virou obrigatório, onde mora o risco, a parte de IA, e a LGPD — que pra vocês, da saúde, é ainda mais séria. Depois de um intervalinho, a parte 2: eu monto um sistema seguro AO VIVO, na tela, do zero. Qualquer dúvida no meio, joga no chat que eu paro.`,
    historia_real: `Olha como vaza na vida real, é sempre a mesma novela. Sexta você lança o sistema. Sábado já tem duzentos cadastros, com nome, e-mail, tudo. Domingo alguém curioso abre as ferramentas do navegador e percebe que dá pra puxar a base inteira. Segunda de manhã, a lista de pessoas tá circulando por aí. Não precisou de hacker: precisou de uma regra de acesso que faltou — daqui a pouco você vê o nome técnico dela.`,
    tres_camadas: `O risco mora em três lugares, e vou falar dos três sem enrolação. No banco: as regras de quem pode ver o quê. No código: as senhas e chaves do sistema, que não podem vazar. E na governança: a LGPD, quem tem acesso, backup. A maioria só pensa no terceiro quando já virou problema. A gente começa pelo banco, que é onde o estrago é maior.`,
    tres_pilares: `No banco tem três peças, e cada uma tem um jeito clássico de furar. As tabelas, onde o dado mora — risco: ficarem abertas pra todo mundo. As funções que rodam no servidor — risco: não conferir quem está pedindo. E funções dentro do próprio banco, que às vezes têm poder demais. Hoje eu foco na primeira, que é a mais comum e a mais perigosa.`,
    lovable_cloud_vs_supabase: `Antes de entrar no risco, uma escolha que vocês vão ouvir: tem duas formas de ter o "fundo" do app. Uma é o plano pronto, que já vem tudo ligado e funciona sem configurar nada — ótimo pra começar e pra maioria dos casos. A outra é a versão com controle total, pra quando o negócio cresce e tem um time técnico. A regra é simples: comece no pronto, migre pro avançado quando precisar.`,
    rls_aberto: `E aqui o perigo do padrão. Quando essa regra de acesso está desligada, é porta aberta. Existe uma "chave de visitante" que fica pendurada na vitrine — no código que qualquer um vê no navegador. Se o depósito não tem regra, essa chave de visitante abre as suas tabelas inteiras. Não é teoria: é o vazamento mais comum de app feito com IA.`,
    storage_publico: `E tem um segundo cadeado que quase todo mundo esquece: os arquivos. Se a "pasta" de arquivos fica pública, qualquer um com o link baixa a nota, o documento, o exame que a pessoa subiu. A regra de ouro: pasta privada e um link temporário que vence sozinho — tipo receita com validade: passou o prazo, não abre mais.`,
    codigo_vs_supabase: `Vale separar onde cada coisa mora. No código: conferir o que o usuário digitou antes de aceitar, guardar as senhas do sistema no servidor (nunca na tela), limitar tentativas e não registrar dado de paciente nos logs. No banco: as regras de acesso, quem entra, backup. Cada camada faz a sua parte — nenhuma sozinha resolve.`,
    nao_so_lovable: `O Lovable ajuda muito, mas não faz tudo por você. Três coisas: peça pra própria IA, o Claude ou o GPT, revisar o que foi construído. Guarde o histórico do que mudou, com botão de desfazer. E a chave-mestra do sistema NUNCA pode ir pra parte pública do app. E rode o verificador de segurança do Supabase toda semana — é de graça e acha muita coisa.`,
    ia_prompt_injection: `Se o seu app tem um assistente de IA — e no vibecoding isso é quase automático — presta atenção nesse risco. É como um paciente entregar na recepção um bilhete falsificado, assinado "pelo diretor", e o atendente obedecer — porque a instrução e a conversa chegam no mesmo balcão. Com IA é igual: a pessoa escreve um texto que o modelo confunde com uma ordem sua. É o risco número 1 da lista mundial de segurança de IA, a OWASP. E a defesa cabe numa frase: a IA do seu app nunca pode ter mais poder do que a pessoa que está falando com ela.`,
    // ── LGPD (ancorada em saúde) ──
    lgpd_dado_sensivel: `E aqui uma coisa que é o dia a dia de vocês: nem todo dado é igual. Tem o dado pessoal comum — nome, e-mail, CPF. E tem o dado SENSÍVEL, com regra muito mais dura: saúde, exame, prontuário, biometria. Ou seja, o dado que um hospital trata o tempo todo é o de regime mais pesado da lei. Vazou dado de saúde, o estrago e a multa são muito maiores. E atenção: pra dado sensível NÃO vale "legítimo interesse" — precisa de consentimento específico, ou de uma hipótese bem pontual, como a tutela da saúde.`,
    lgpd_pii_escondida: `E olha a pegadinha: você coleta muito mais dado pessoal do que imagina. O endereço de internet de quem acessa, o modelo do aparelho, a localização daquele popup de "permitir", e o óbvio, nome e e-mail. Tudo isso identifica uma pessoa. Você já é responsável por esses dados e talvez nem tenha percebido.`,
    lgpd_casos_reais: `Olha os números reais. A Meta, dona do Facebook, levou uma multa de um bilhão e duzentos milhões de euros, por mandar dado de europeu pros Estados Unidos sem base legal. A Amazon, setecentos e quarenta e seis milhões. O TikTok, trezentos e quarenta e cinco milhões, por dado de criança mal protegido. E aqui no Brasil a ANPD já aplicou multa. Não é "vai que pega" — já está pegando.`,
    direitos_titular: `A LGPD dá uma lista de direitos ao titular, e eu destaco os que viram um botão no app: acessar os dados, corrigir, exportar, apagar a conta e revogar o consentimento. E tem mais um, esse é o artigo 20: a pessoa pode pedir a revisão de uma decisão que a IA tomou sobre ela. Na prática, cada direito desses vira um botão ou uma tela no seu sistema.`,
    prompt_auditoria: `E é esse o prompt que tá na tela. Não precisa copiar daí — eu mando no chat e vai no material. A ideia é simples: você entrega pra IA a "planta" do seu banco e pede pra ela achar os furos. Dá pra fazer hoje à noite, de graça.`,
    // ── ferramentas / arquitetura (leigo) ──
    ferramentas_principais: `Olha o que já existe hoje. Tem uma IA da AWS que funciona como um "ladrão do bem": ela tenta invadir o seu sistema sozinha e te conta por onde entrou — o que antes levava semanas de um especialista. E tem uma da Anthropic, a dona do Claude, tão forte que achou falhas de mais de vinte anos em sistemas famosos. A mensagem: a mesma IA que ataca também defende, e ficou barata.`,
    setup_robusto: `Quando o sistema cresce, quatro "seguros" que valem ouro. Um botão de voltar no tempo, pra desfazer um estrago. Um ambiente de ensaio, pra testar antes de ir pro ar. Uma segunda chave na porta, o tal do dois fatores. E um alarme que te avisa do problema antes do cliente. Guarda esse slide pra quando você tiver um time técnico do lado.`,
    quando_migrar: `E como saber a hora de profissionalizar? Lembra que dá pra começar no plano simples e migrar pro avançado? Os sinais: o sistema começa a ficar lento com muito dado, você precisa de backup sério, o time cresce, ou você trata dado regulado — que é exatamente o caso de vocês, saúde.`,
    confianca: `E eu quero fechar com a ideia mais importante de todas. O cliente contrata pela funcionalidade — pelo que o sistema faz. Mas ele FICA pela confiança. Um vazamento não quebra só um banco de dados; quebra a relação. Segurança não é custo: é o que sustenta tudo que você construiu.`,
    vai_la_proteja: `Então é isso, pessoal. Vocês já sabem o que a tecnologia faz. Agora sabem as perguntas certas pra não deixar a porta aberta. Vai lá e protege — e valeu demais à Faculdade Moinhos de Vento pela parceria. Um abraço!`,
    // ── Parte 2 · prática (marcadores por passo, com de-risking) ──
    pratica_intro: `Teoria dada. Agora a parte que eu mais gosto: mão na massa. Vou compartilhar a tela e montar um sistema seguro do zero, ao vivo. E olha, importante: você NÃO precisa saber fazer isso — precisa saber que existe, que leva uma tarde, e que perguntas fazer pro seu fornecedor de tecnologia. Se aparecer um nome novo, relaxa: o próximo slide apresenta cada peça.`,
    conceito_stack: `Deixa eu apresentar os personagens, porque você provavelmente nunca ouviu alguns nomes, e tá tudo bem. Pensa num hospital: o Supabase é o arquivo, onde o dado do paciente mora. A função no servidor é a sala dos fundos, onde o procedimento acontece longe do público e a chave fica guardada. O Cloudflare é a recepção: todo mundo passa por ela antes de entrar. E o WAF é a segurança na porta. Guarda essa imagem, que agora vai fazer sentido na tela.`,
    pratica_roteiro: `Esse é o roteiro, e já aviso: deixei parte pronta pra não perder tempo com carregamento — tipo programa de culinária, o bolo já está quase no forno. Cinco passos: banco com regra de acesso, uma função no servidor, a recepção na frente, a segurança na porta, e a análise final. A cada passo eu volto aqui e resumo, pra ninguém se perder.`,
    passo1_rls: `Passo 1, o banco. O que eu faço: crio uma tabela e ligo a regra do "cada um só vê o que é dele". Por que importa: sem isso, qualquer um lê tudo. E como você sabe que deu certo? Eu tento ver o dado de outra pessoa e o sistema me barra. Esse é o passo mais importante pra vocês.`,
    passo2_edge: `Passo 2, a sala dos fundos. Crio uma função que roda no servidor, com a chave guardada lá dentro. Por que importa: a chave nunca aparece pro usuário. Como sei que deu certo: abro o navegador e a chave não está visível em lugar nenhum.`,
    passo3_proxy: `Passo 3, a recepção. Coloco a Cloudflare na frente, e ela carimba cada pedido com um segredo que só ela conhece. Por que importa: só pedido carimbado é atendido. Como sei que deu certo: se eu tentar entrar pela porta direta, sem carimbo, tomo "acesso negado".`,
    pratica_prova: `E olha a prova. Primeiro mostro funcionando, pela recepção, certinho. Agora eu tento entrar pela porta dos fundos direto... e o sistema responde 403, acesso negado. Essa tela feia é o app dizendo NÃO. Só passa quem vem pela recepção, com o carimbo certo.`,
    passo4_waf: `Passo 4, a segurança na porta. Ligo o WAF e um limite de tentativas por minuto. Por que importa: barra ataque conhecido e enxurrada de pedidos. Como sei que deu certo: se eu martelar de tentativas, ele me bloqueia.`,
    pratica_analise: `Passo 5, fechando: análise. Rodo o verificador do Supabase, que acha falha em dois minutos — e olha, eu deixei uma falha de propósito pra vocês verem ele pegando. Depois colo tudo no Claude e peço os furos. Isso qualquer um de vocês faz hoje, sem ser especialista. E o que levar pra casa: você não precisa configurar isso — precisa saber perguntar pro seu fornecedor se ele fez.`,
    materiais: `E pra fechar, tá tudo aqui pra vocês levarem. Esse pacote tem o guia de estudo, o passo a passo do lab e os códigos prontos, tudo em PDF, com a cara da SobreAI. Eu mando o link no chat. Estuda, refaz o lab com as suas chaves, e me chama quando construir o seu. Valeu!`,
  },
};

export default moinhosCyberEvent;
