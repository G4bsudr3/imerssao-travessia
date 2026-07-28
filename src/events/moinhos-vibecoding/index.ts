import type { EventModule } from "../types";
import type { SlideEntry } from "../travessia/manifest";
import { bootcampCaldeiraEvent } from "../bootcamp-caldeira";
import lovableLogo from "@/assets/lovable-logo-icon.png";
import eraCharrete from "@/assets/era-charrete.png";
import eraCarro from "@/assets/era-carro.png";
import eraAviao from "@/assets/era-aviao.png";

// DIA 1 do MBA da Faculdade Moinhos de Vento, "IA e Vibecoding com [logo Lovable]".
// Plateia CRUA/leiga: fundamentos (IA, front/back, API, banco, vibecoding) em ~2h, contados
// como HISTÓRIA (a evolução humana: fogo→...→IA) e por ANALOGIA (o restaurante), com cada nome
// técnico chegando junto de uma imagem, nunca solto. 3 momentos "ao vivo" (magenta). Fecha com o
// build ao vivo + a MÃO NA MASSA da plateia (~1h, ao vivo). Tema escuro (theme-moinhos).
// Estrutura/roteiro desenhados por multiagentes (fable) + bloco de "estratégia antes do Lovable".

type Item = { label?: string; sub?: string; accent?: boolean; strike?: boolean };
const S = (variant: string, sp: Record<string, unknown>, key: string): SlideEntry =>
  ({ key, kind: "static", staticProps: { variant, background: "naval", ...sp } as never });
const act = (key: string, eyebrow: string, title: string, subtitle?: string) => S("act", { eyebrow, title, subtitle }, key);
const two = (key: string, eyebrow: string, title: string, subtitle: string) => S("two-line", { eyebrow, title, subtitle }, key);
const head = (key: string, title: string, eyebrow?: string) => S("headline", { title, eyebrow }, key);
const live = (key: string, title: string) => S("headline", { title, background: "accent", eyebrow: "ao vivo · tela compartilhada" }, key);
const grid = (key: string, eyebrow: string, items: Item[]) => S("grid", { eyebrow, items }, key);
const list = (key: string, eyebrow: string, items: Item[]) => S("list", { eyebrow, items }, key);
const cmp =(key: string, eyebrow: string, left: { label: string; sub?: string }, right: { label: string; sub?: string }) => S("comparison", { eyebrow, comparison: { left, right } }, key);
const era = (key: string, p: { eyebrow?: string; image?: string; image2?: string; kicker?: string; kickerAccent?: string; lines?: string[] }): SlideEntry =>
  ({ key, kind: "special", component: "EraSlide", props: p });

const cover: SlideEntry = {
  key: "cover",
  kind: "special",
  component: "CoverSlide",
  props: {
    showLogo: false,
    logoSrc: lovableLogo,
    logoAlt: "Lovable",
    labels: {
      eyebrow: "FACULDADE MOINHOS DE VENTO · MBA · DIA 1",
      title: "IA e Vibecoding com",
      sub: "da ideia ao app, conversando.",
    },
  },
};

const manifest: SlideEntry[] = [
  cover,
  // ── abertura ──
  two("duas_perguntas", "pra começar · levanta a mão / manda no chat", "quem aqui já USOU o ChatGPT?", "e quem aqui já CRIOU um software?"),
  { key: "sobre", kind: "special", component: "AboutSlide", props: {
    photo: "/gabriel-breda.jpg",
    eyebrow: "quem tá no palco",
    name: "Gabriel Breda Sudre",
    accent: "Breda",
    tagline: "Ajudo quem não é técnico a construir com IA de verdade, e com segurança. Não vim te transformar em programador. Vim tirar o medo e te botar pra criar.",
    handles: [{ at: "@gabreda" }, { at: "@sobreai" }],
  } },
  grid("agenda", "o mapa do dia", [
    { label: "1. a história que se repete", sub: "os grandes saltos da humanidade, e o de agora" },
    { label: "2. o que é essa tal de IA", sub: "e como ela 'pensa', sem misticismo" },
    { label: "3. por dentro de todo app", sub: "frontend, backend, API e banco de dados, sem susto" },
    { label: "4. vibecoding", sub: "construir conversando, sem saber programar" },
    { label: "5. ao vivo: um app do zero", sub: "na tela, na frente de vocês", accent: true },
  ]),
  // ── parte 1 · a história que se repete (cinematográfico, imagens de gravura) ──
  act("bloco_historia", "parte 1 de 5 · a história que se repete", "o que muda quando a tecnologia chega", "e por que sempre acontece do mesmo jeito."),
  era("ponto_partida", { eyebrow: "ponto de partida · Brasil, 1900", image: eraCharrete, kicker: "1900", lines: ["ir de Porto Alegre a São Paulo era a pé, de burro, de charrete.", "mil e cem quilômetros que levavam semanas."] }),
  era("era_carro", { eyebrow: "1908 · o Ford Modelo T", image: eraCarro, kicker: "vieram os", kickerAccent: "carros.", lines: ["e com eles, uma vida nova: estradas, viagens, cidades inteiras.", "o que era de rico virou de todo mundo."] }),
  era("era_aviao", { eyebrow: "1906 · o 14-Bis do Santos Dumont", image: eraAviao, kicker: "vieram os", kickerAccent: "aviões.", lines: ["o oceano, que era semanas de navio, virou uma tarde de poltrona.", "de novo a mesma história: de poucos, pra todos."] }),
  list("profissoes", "o efeito colateral · umas profissões somem, outras nascem", [
    { label: "cocheiro", strike: true },
    { label: "ferreiro de carruagem", strike: true },
    { label: "fabricante de chicote", strike: true },
    { label: "e nasceram: motorista, mecânico, dono de posto, engenheiro de trânsito", accent: true },
  ]),
  era("coexistencia", { eyebrow: "e a parte que acalma o coração", image: eraCarro, image2: eraAviao, kicker: "o avião não", kickerAccent: "matou o carro.", lines: ["cada um achou o seu lugar. andam juntos até hoje.", "a IA é assim: não vem te substituir, vem andar do teu lado."] }),
  two("ford_acesso", "a lição que se repete", "a revolução não é a invenção.", "é o acesso."),
  two("salto_agora", "e o salto de agora?", "criar software", "acabou de virar de todos."),
  // ── parte 2 · a IA ──
  act("bloco_ia", "parte 2 de 5", "afinal, o que é a IA?", "sem misticismo e sem medo: como ela funciona de verdade."),
  two("jogo_autocomplete", "vamos jogar · responde em voz alta / no chat", "quem não deve, não ___", "água mole em pedra dura, tanto bate até que ___"),
  two("corretor_biblioteca", "então o que é a tal da IA?", "ela calcula a palavra mais provável", "treinada em uma quantidade absurda de texto. simples assim, e foi o que destravou tudo."),
  head("nao_sabe_preve", "ela não SABE. ela PREVÊ."),
  two("prompt_cabeleireiro", "a palavra do dia: prompt", "prompt é a instrução que você dá pra IA", "quanto mais claro e específico o pedido, melhor o resultado."),
  live("aovivo_ia", "a IA na tela"),
  // ── parte 3 · o app ──
  act("bloco_app", "parte 3 de 5", "por dentro de todo app", "o que existe atrás de cada botão que você aperta."),
  two("receita_de_bolo", "primeiro: o que É um app? · me fala o que você mais usa", "software é uma lista de instruções", "que o computador segue exatamente, sem improvisar."),
  grid("anatomia_app", "todo app tem as mesmas 3 partes, e cada uma tem NOME", [
    { label: "FRONTEND", sub: "o que você VÊ e toca: telas, botões, cores" },
    { label: "BACKEND", sub: "o que TRABALHA escondido: confere a senha, calcula o preço, aprova o pagamento" },
    { label: "BANCO DE DADOS", sub: "o que fica GUARDADO: cadastro, pedidos, fotos", accent: true },
  ]),
  two("lingua_da_maquina", "por que era coisa de poucos", "escrever esse código", "sempre exigiu falar a língua da máquina: anos de estudo."),
  two("restaurante", "a imagem-mãe do dia", "todo app é um", "restaurante."),
  grid("salao_cozinha", "os nomes de verdade: frontend e backend", [
    { label: "SALÃO = FRONTEND", sub: "tudo que o cliente vê e toca: telas, botões, cores" },
    { label: "COZINHA = BACKEND", sub: "onde o trabalho é feito de verdade, longe do cliente: regras, cálculo, pagamento", accent: true },
    { label: "por que separar? segurança", sub: "o cliente não entra na cozinha" },
    { label: "e organização", sub: "dá pra trocar a cozinha sem mexer no salão" },
  ]),
  grid("caderninho", "BANCO DE DADOS · onde o app guarda tudo, em TABELAS", [
    { label: "tabela de CLIENTES", sub: "uma linha (ficha) por pessoa: nome, e-mail, senha" },
    { label: "tabela de PEDIDOS", sub: "cada compra: data, valor, status" },
    { label: "tabela de PRODUTOS", sub: "preço, foto, estoque" },
    { label: "cada um só vê a PRÓPRIA linha", sub: "e o banco vive no backend, nunca exposto no frontend", accent: true },
  ]),
  two("drivethru", "o quarto nome: quando um sistema fala com outro", "API é o drive-thru", "a API é o jeito combinado de um app pedir dado a outro: cardápio fixo, resposta pela janela."),
  grid("garcons_cotidiano", "e os sistemas pedem uns aos outros o dia inteiro", [
    { label: "o iFood não tem mapa", sub: "passa no drive-thru do Google: 'me vê um mapa desta rua'" },
    { label: "a loja não tem banco", sub: "passa no drive-thru do PIX: 'cobra 30 reais dessa pessoa'" },
    { label: "o app do tempo não mede o tempo", sub: "pede os 22 graus no drive-thru do serviço de clima" },
    { label: "quando você constrói conversando, plugar um desses é UMA FRASE", sub: "pagamento, mapa, IA, já existem prontos, é só pedir", accent: true },
  ]),
  list("jornada_pedido", "agora junta tudo · vocês narram comigo · a jornada de um pedido", [
    { label: "1. você toca no botão", sub: "o salão (frontend)" },
    { label: "2. o pedido viaja pela janela", sub: "o drive-thru (a API)" },
    { label: "3. a cozinha confere e prepara", sub: "o backend: saldo, regras, aprovação" },
    { label: "4. o ARQUIVO registra tudo", sub: "o banco de dados" },
    { label: "5. a resposta volta pra sua tela", sub: "'pedido confirmado', e você nem viu a viagem", accent: true },
  ]),
  live("aovivo_app", "um app de verdade"),
  list("quiz_coro", "recapitulando · quem é quem", [
    { label: "o que você VÊ no app", sub: "o salão · frontend" },
    { label: "quem leva e traz o pedido", sub: "o drive-thru · API" },
    { label: "onde o trabalho acontece", sub: "a cozinha · backend" },
    { label: "onde o dado fica gravado", sub: "o arquivo · banco de dados", accent: true },
  ]),
  // ── parte 4 · vibecoding ──
  act("bloco_vibecoding", "parte 4 de 5", "e se você pudesse pedir?", "em vez de programar."),
  two("vibecoding_def", "a palavra do título do dia, enfim", "vibecoding", "construir um app CONVERSANDO com a IA, em português, sem saber programar."),
  two("reforma_sem_obra", "a virada", "você descreve, a IA constrói", "e mudar de ideia custa uma frase, não semanas."),
  cmp("antes_agora", "o que mudou de verdade · antes · agora",
    { label: "anos aprendendo a língua da máquina", sub: "mais um time de programadores e meses de trabalho" },
    { label: "você descreve, olha e pede ajuste", sub: "o app aparece na hora; mudar custa uma frase e um minuto" }),
  list("seu_trabalho", "e o que continua sendo SEU trabalho · a habilidade mudou de lugar", [
    { label: "saber O QUE pedir", sub: "a visão: qual problema esse app resolve, pra quem" },
    { label: "pedir BEM", sub: "ser específico: o quê, pra quem, quais telas" },
    { label: "CONFERIR o resultado", sub: "o gosto e o critério, a IA prevê, você decide", accent: true },
  ]),
  // ── parte 5 · o Lovable + estratégia + gancho ──
  grid("lovable_fabrica", "parte 5 de 5 · onde a conversa vira app", [
    { label: "monta o FRONTEND", sub: "o salão: as telas e os botões" },
    { label: "liga o BACKEND", sub: "a cozinha: as regras trabalhando escondido" },
    { label: "cria o BANCO DE DADOS", sub: "o arquivo, com as tabelas prontas" },
    { label: "conecta as APIs", sub: "pagamento, mapa, IA: numa frase" },
    { label: "e faz o DEPLOY: publica um link no ar", sub: "pra mandar pra qualquer pessoa, na hora", accent: true },
  ]),
  two("reprise", "lembra da charrete?", "criar software", "é o carro da nossa geração."),
  two("stat_antes_depois", "o tamanho do salto", "6 meses, uma equipe, R$ 100 mil.", "hoje: uma conversa e uma tarde."),
  two("tese_headline", "se levar uma frase pra casa", "não é mais quem sabe programar.", "é quem sabe o que quer."),
  two("colheita_ideias", "cobrando o dever de casa · fala aí / manda no chat", "que app VOCÊ criaria?", "guarda essa ideia, daqui a pouco uma delas pode virar realidade na tela."),
  // bloco de PREPARAÇÃO/ESTRATÉGIA antes de abrir a ferramenta (pedido do palestrante)
  grid("preparar_estrategia", "antes de abrir a ferramenta · a preparação é 80% do resultado", [
    { label: "1. o problema", sub: "que dor você resolve? e pra QUEM? (uma pessoa real, não 'todo mundo')" },
    { label: "2. a função-núcleo", sub: "a UMA coisa que o app PRECISA fazer, o resto fica pra depois" },
    { label: "3. comece pequeno", sub: "o menor app útil primeiro; dá pra crescer amanhã" },
    { label: "4. pense em passos", sub: "as telas na ordem: entrar → ação principal → resultado", accent: true },
  ]),
  list("prompt_com_ia", "o pulo do gato · peça pra IA escrever o prompt", [
    { label: "1. abra o ChatGPT ou o Gemini ANTES do Lovable", sub: "conversa primeiro, constrói depois" },
    { label: "2. peça: 'me entreviste e monte o prompt'", sub: "ele pergunta o que precisa: telas, dados, regras, estilo" },
    { label: "3. só responda as perguntas", sub: "você dá as respostas, ele organiza a lógica" },
    { label: "4. cole o prompt pronto no Lovable", sub: "sai um briefing redondo, muito melhor que improvisar", accent: true },
  ]),
  list("primeiro_pedido", "o que não pode faltar no prompt (você ou a IA garante)", [
    { label: "diga O QUE é e PRA QUEM", sub: "'um app pra [essa pessoa] fazer [essa ação]'" },
    { label: "liste as telas principais", sub: "'tela de entrada, tela da agenda, tela de novo agendamento'" },
    { label: "descreva como pra um amigo", sub: "sem termo técnico, a IA entende português" },
    { label: "diga o estilo, e peça 1 coisa por vez", sub: "'simples, limpo, cor da minha marca', construa em camadas", accent: true },
  ]),
  // gancho final (o deck termina aqui; encerramento é depois da prática, fora do deck)
  act("chega_de_slide", "teoria dada", "chega de slide", "vocês já conhecem os personagens. agora eu monto um restaurante inteiro na frente de vocês."),
  list("mapa_pratica", "agora, ao vivo · sem slide · o mapa da prática", [
    { label: "1. banho de loja na ferramenta", sub: "o tour por dentro: onde se conversa, onde nasce o app" },
    { label: "2. escolhemos UMA ideia de vocês", sub: "das que estão aqui no meu papel" },
    { label: "3. eu peço em português, na tela", sub: "e a gente vê o salão, a cozinha e o caderno nascerem" },
    { label: "4. o app NO AR antes de você ir embora", sub: "com link pra abrir no seu celular", accent: true },
  ]),
  live("aovivo_final", "do zero ao app"),
  // ── bloco extra 1 · publicar + casos reais (o "isso é de verdade") ──
  live("publicar_ao_vivo", "no ar, agora"),
  grid("casos_reais", "não foi sorte de principiante · isso vira ferramenta de verdade", [
    // TROCAR pelos apps reais da SobreAI (com link/print quando der)
    { label: "agenda da recepção", sub: "marca horário e vê o dia no celular; aposentou o caderno de papel" },
    { label: "captação de leads", sub: "formulário no ar, cada contato caindo direto no banco de dados" },
    { label: "painel do time comercial", sub: "cada vendedor enxerga só a própria carteira" },
    { label: "e o que você acabou de ver nascer", sub: "salão, cozinha, arquivo e link, numa conversa", accent: true },
  ]),
  // ── bloco extra 2 · MÃO NA MASSA · cada um cria o seu (o pico do dia) ──
  act("bloco_suavez", "agora é com você", "a sua vez", "chega de me ver fazer. abre o Lovable e põe a TUA ideia no ar, agora, comigo do teu lado."),
  list("lab_passos", "o passo a passo do laboratório · todo mundo junto, ninguém fica pra trás", [
    { label: "1. abra o ChatGPT/Gemini e peça: 'me entreviste e monte o prompt'", sub: "responda só sobre a SUA ideia" },
    { label: "2. cole o prompt pronto no Lovable", sub: "e veja o primeiro esboço aparecer" },
    { label: "3. peça UM ajuste por vez, conversando", sub: "'muda a cor', 'tira esse campo', sem pressa" },
    { label: "4. travou? levanta a mão", sub: "a gente conserta o seu pedido na tela; o teu erro vira a aula de todos", accent: true },
  ]),
  live("clinica_prompts", "clínica de prompts"),
  // ── bloco extra 3 · armadilhas + ponte pro dia 3 (segurança) ──
  list("armadilhas", "antes de sair criando sozinho · 3 armadilhas (e como escapar)", [
    { label: "pedir tudo de uma vez", sub: "um parágrafo gigante vira um monstro; peça em camadas" },
    { label: "aceitar sem conferir", sub: "a IA prevê, não sabe: erra com a mesma cara de certeza. quem revisa é você" },
    { label: "deixar dado sensível exposto", sub: "sem as regras certas, o cadastro de um cliente fica visível pra qualquer um", accent: true },
  ]),
  two("ponte_dia3", "o fio que liga hoje ao último dia", "criar ficou fácil.", "trancar a porta direito é o assunto do dia 3."),
  // ── bloco extra 4 · até onde vai + quanto custa (papo honesto, pra executivo) ──
  grid("ate_onde_vai", "papo honesto · onde ela brilha, e onde chamar reforço", [
    { label: "BRILHA: protótipo, ferramenta interna, MVP", sub: "tirar a ideia do papel e pôr no ar rápido: nisso é imbatível", accent: true },
    { label: "CHAME UM DEV: escala, muito dado, integração crítica", sub: "quando vira o coração do negócio e não pode falhar" },
  ]),
  grid("quanto_custa", "e quanto custa? · a real, sem susto", [
    { label: "Lovable", sub: "plano grátis pra começar hoje; planos pagos por uso quando quiser mais" },
    { label: "Supabase (o banco)", sub: "camada gratuita generosa; só paga quando o app cresce de verdade" },
    { label: "publicar o link", sub: "pôr no ar pra mostrar pra alguém não custa nada" },
    { label: "compare com o modelo antigo", sub: "R$ 100 mil e 6 meses viram uma assinatura e uma tarde", accent: true },
  ]),
  // ── fecho: lição de casa + gancho pros próximos encontros ──
  act("licao_de_casa", "sua vez · lição de casa", "constrói o teu", "essa semana, entra no lovable.dev (é grátis) e monta algo SEU. simples. e traz pro próximo encontro."),
  grid("proximos_encontros", "a jornada é em 3 encontros", [
    { label: "hoje · vibecoding", sub: "da ideia ao app, conversando com a IA" },
    { label: "próximo · design e produto", sub: "do 'monstro' que o Lovable cria ao MAP: Minimum Awesome Product", accent: true },
    { label: "depois · segurança", sub: "construir com IA sem deixar a porta aberta" },
  ]),
];

const OPENER_KEYS = ["bloco_historia", "bloco_ia", "bloco_app", "bloco_vibecoding", "lovable_fabrica"];
const openerIndices = OPENER_KEYS.map((k) => manifest.findIndex((s) => s.key === k)).filter((i) => i >= 0);
const boundaries = openerIndices.slice(1).map((i) => i - 1).concat(manifest.length - 1);

const scripts: Record<string, string> = {
  cover: `Deixa a capa no telão enquanto a galera senta e o pessoal do online vai chegando. Quando estiver todo mundo, eu começo, e a primeira coisa não é slide, é uma pergunta pra vocês.`,
  duas_perguntas: `Fala, pessoal! Que bom ter vocês aqui, quem tá na sala e quem tá online. Antes de qualquer slide, e antes até de eu me apresentar, duas perguntas. Primeira: quem aqui já usou o ChatGPT? Levanta a mão, e quem tá online, manda um 'eu' no chat. Olha isso... quase todo mundo. Agora a segunda: quem aqui já CRIOU um software? Um aplicativo, um sistema, qualquer coisa. ... Pois é, nenhuma, ou talvez uma ou duas mãos. E olha que interessante: a distância entre as duas perguntas continua enorme. É exatamente sobre essa distância que é o dia de hoje. Guarda esse momento, porque no fim da manhã eu vou refazer a segunda pergunta, e a resposta vai ser outra.`,
  sobre: `Agora sim, deixa eu me apresentar rápido, porque vocês têm todo o direito de saber quem tá dando esse papo. Eu sou o Gabriel Breda, da SobreAI. O meu trabalho é ajudar gente que NÃO é técnica, que nunca escreveu uma linha de código, a construir com IA de verdade, e sem deixar a porta aberta. Repara no que eu não disse: eu não vim te transformar em programador. Vim tirar o teu medo e te botar pra criar. Me acha no @gabreda, e a empresa é a @sobreai. Dito isso, bora pro mapa do dia.`,
  agenda: `O combinado é esse. Nas próximas duas horas, eu te dou o mapa: de onde vem essa revolução, o que é essa IA que todo mundo fala, e do que um aplicativo é feito por dentro, sem susto: cada nome técnico vai chegar com uma imagem do lado, nunca jogado sozinho. No meio tem um intervalo de dez minutos pra respirar. E aí vem a parte cinco, que não é slide: eu vou compartilhar a tela e montar um aplicativo DO ZERO, ao vivo, na frente de vocês. Você não precisa anotar nada, não precisa saber nada antes. Só precisa de uma coisa: curiosidade. Dúvida no meio do caminho? Quem tá aqui levanta a mão, quem tá online joga no chat, eu paro e respondo. Bora.`,
  bloco_historia: `Parte um. Antes de qualquer coisa técnica, eu quero te contar uma história. Uma história que a humanidade já viveu um monte de vezes, sempre do mesmo jeito. Presta atenção no padrão, porque quando ele aparecer de novo, agora, na nossa geração, você vai reconhecer na hora.`,
  ponto_partida: `Volta comigo pra 1900, aqui no Brasil. Se você quisesse ir de Porto Alegre a São Paulo, ia a pé, no lombo de um burro, numa charrete se tivesse algum dinheiro. Mil e cem quilômetros que levavam semanas, e olha que eu tô sendo otimista. O mundo de uma pessoa comum terminava ali, onde a perna alcançava. Guarda essa imagem, porque em vinte anos ela vira pó.`,
  era_carro: `Aí, em 1908, o Henry Ford faz uma coisa que ninguém tinha feito: ele deixa o carro barato. O carro já existia, mas era brinquedo de milionário. O Ford botou o operário da fábrica dentro do carro que ele mesmo montava. E não veio só o carro: veio estrada, veio viagem de fim de semana, vieram cidades inteiras desenhadas em volta dele. Repara na frase, porque ela é a chave do dia inteiro: o que era de poucos virou de todo mundo.`,
  era_aviao: `E quase junto, o avião. O nosso Santos Dumont voa o 14-Bis em 1906. Poucas décadas depois, aquele oceano que era semanas de navio, só pra quem podia pagar, virou uma tarde sentado numa poltrona. De novo a mesma história. Uma coisa que era de pouquíssimos vira de todos.`,
  profissoes: `Agora, toda revolução tem um lado que ninguém gosta de falar: ela mexe no trabalho das pessoas. Quando o carro chegou, sumiram profissões inteiras, sólidas, respeitadas. O cocheiro, o ferreiro que fazia carruagem, o fabricante de chicote. Acabaram. Mas olha o outro lado: nasceram o motorista, o mecânico, o dono de posto, o engenheiro de trânsito. O trabalho não evaporou. Ele mudou de lugar. Segura esse pensamento, porque daqui a pouco ele vale pra você.`,
  coexistencia: `E tem uma coisa que quase ninguém repara: o avião não matou o carro. Você não deixou de ter carro porque existe avião. Cada um achou o seu lugar, e os dois andam juntos até hoje. Eu tô contando isso de propósito, porque eu sei o medo que tá no ar: "será que a IA vai me substituir?". Guarda a resposta que a própria história já deu: ela não vem pra te substituir. Vem andar do teu lado, do mesmo jeito que o avião passou a andar junto com o carro.`,
  ford_acesso: `E se você levar uma ideia dessa história pra casa, que seja essa: a revolução nunca é a invenção em si. É o acesso. O carro virou revolução quando ficou barato. O livro virou revolução lá em 1450, quando a prensa do Gutenberg deixou ele acessível: antes disso, um livro custava o preço de uma casa e só clero e nobreza liam. E a IA existe em laboratório desde os anos cinquenta, setenta anos atrás. Ela virou revolução agora, em 2022, quando ganhou uma caixinha de conversa em português, o ChatGPT, que qualquer um usa. O que muda o mundo não é inventar. É deixar todo mundo usar.`,
  salto_agora: `Então a pergunta que vale o resto da manhã é essa: todo salto daquela história entregou pra todos uma coisa que antes era de poucos. A força, a distância, o conhecimento. Qual é o salto de agora? O que ficou acessível de repente? A resposta é: criar software. Usar aplicativo todo mundo já usa, você usou uns três antes do café. Mas criar um, até anteontem, exigia falar a língua das máquinas. Isso acabou de mudar. E é disso que a gente vai falar o resto do dia, começando pela pergunta óbvia: que raio de IA é essa?`,
  bloco_ia: `Parte dois. Eu vou te explicar o que é a IA de um jeito que você sai daqui explicando pro seu filho no almoço. Sem misticismo, ela não é um cérebro, não é mágica, não vai dominar o mundo hoje de manhã. E sem medo. E o melhor: eu vou provar que você JÁ sabe como ela funciona, porque você usa a mesma coisa todo dia sem perceber.`,
  jogo_autocomplete: `Vamos jogar um jogo. Eu começo a frase, vocês completam, em voz alta aqui, no chat quem tá online. 'Quem não deve, não...' [TEME!] Isso! 'Água mole em pedra dura, tanto bate até que...' [FURA!] Muito bem. Agora uma mais difícil: 'cheguei em casa e o jantar estava...', opa, aqui já dividiu, né? Uns falaram 'pronto', outros 'frio', alguém falou 'queimado'. Vocês responderam com base em TUDO que já ouviram na vida, e quanto mais ambígua a frase, mais vocês chutaram a opção mais PROVÁVEL. Segura esse pensamento, porque vocês acabaram de fazer, agora, em coro... exatamente o que a IA faz. Prever a próxima palavra. A diferença é só uma: ela leu muito, muito mais do que a gente.`,
  corretor_biblioteca: `Então, a definição pra levar pra casa: a IA generativa é um programa que prevê a próxima palavra, treinado numa quantidade absurda de texto. Foi tanto texto que essa previsão simples virou conversar, escrever, resumir, até programar. Não é mágica, não é um cérebro; é previsão em escala gigante. É o mesmo princípio do autocomplete do seu teclado, levado ao extremo.`,
  nao_sabe_preve: `E essa frase aqui é a que te protege dela. A IA não sabe as coisas como a gente sabe, ela prevê a continuação mais provável. Na maioria das vezes, a continuação mais provável é a verdade. Mas às vezes não é, e ela vai te entregar uma invenção com a MESMA cara de certeza, o mesmo tom confiante, a mesma pontuação impecável. Os técnicos chamam isso de 'alucinação'. Deixa eu checar se assentou: por que a IA às vezes inventa uma resposta? [deixar responderem] Isso, porque ela não tá consultando um arquivo da verdade, ela tá completando a frase mais provável. Então a regra é: ela erra com a mesma cara de certeza com que acerta. Coisa importante, você confere. E isso nunca vai deixar de ser trabalho SEU.`,
  prompt_cabeleireiro: `E o que você escreve pra ela tem um nome que vocês vão usar o dia todo: prompt. Prompt é a instrução, o pedido que você dá pra IA. Uma regra só, e é a habilidade mais valiosa da manhã: quanto mais claro e específico o prompt, melhor o resultado. Pedido vago, resposta vaga; pedido específico, resposta certeira. Deixa eu provar isso na tela.`,
  aovivo_ia: `Chega de eu FALAR da IA, deixa eu te mostrar. [compartilhar a tela com o ChatGPT aberto] Aqui o combinado do dia se cumpre pela primeira vez: nessa palestra a gente não fala de tecnologia, a gente USA na tela. Me dá um assunto qualquer, qualquer um, grita aí, ou manda no chat. [pegar um da sala e um do chat] Boa. Olha o pedido vago primeiro: 'fala sobre isso'. Viu? Resposta genérica, poderia estar em qualquer lugar. Agora o pedido específico: 'explica isso pra uma criança de 8 anos, em 3 frases, usando um exemplo de futebol'. Olha a diferença. É o mesmo modelo, o que mudou foi o PEDIDO. E repara como o texto vai aparecendo palavrinha por palavrinha: você tá literalmente VENDO ela prever a próxima palavra, igual vocês fizeram no coro agora há pouco. [voltar pros slides] Beleza. Vocês já entendem a IA. Agora falta entender a outra metade do título do dia: o que é um aplicativo por dentro.`,
  bloco_app: `Parte três, a maior do dia, e eu te adianto o presente que tem no fim dela: quando esse bloco acabar, você vai entender como funciona, por dentro, TODO aplicativo do seu celular. Todos. Do iFood ao app do banco. E vai perceber que eles são todos... a mesma coisa. Vamos por partes, começando pela pergunta mais básica de todas.`,
  receita_de_bolo: `Antes de tudo, o que é um app? Me fala o que você mais usa no celular. [colher 3: WhatsApp, iFood, banco, Instagram, anotar num papel] Prometo que no fim desse bloco você entende esses três por dentro. Definição direta: software é uma lista de instruções que o computador segue exatamente, sem improvisar e sem bom senso, ele só executa. App é essa lista rodando no celular; site é a mesma coisa rodando no navegador. E programar, desde sempre, foi escrever essas instruções na língua que a máquina entende.`,
  anatomia_app: `E a boa notícia: todo app, TODO, é feito de três partes, e cada uma tem um nome que vocês vão levar pra casa hoje. Primeira, FRONTEND: é o que você VÊ e toca, as telas, os botões, as cores. Segunda, BACKEND: é o que trabalha escondido, do outro lado; você aperta 'pagar' e o backend confere o saldo, valida o cartão, aprova. Terceira, BANCO DE DADOS: é o que fica GUARDADO, o seu cadastro, seus pedidos, suas fotos, pra amanhã continuar lá. Frontend, backend, banco de dados. Testa comigo: o Instagram e o app do banco têm essas mesmas três partes? [deixar responderem] Têm. Um mostra foto, o outro mostra saldo, mas a anatomia é idêntica. Agora deixa eu cravar esses três nomes numa imagem só.`,
  lingua_da_maquina: `E repara numa coisa: escrever essas instruções tem um nome, código, e sempre exigiu aprender a língua da máquina. Anos de estudo, uma língua de símbolos onde uma vírgula fora do lugar quebra tudo. POR ISSO criar software sempre foi coisa de poucos, do mesmo jeito que ler era de poucos antes do Gutenberg. Guarda essa tensão, ela se resolve depois do café, e é o motivo de vocês estarem aqui.`,
  restaurante: `E pra fixar esses três nomes numa imagem que não sai mais da cabeça: pensa que todo app é um restaurante. Vou usar essa imagem o resto do dia.`,
  salao_cozinha: `Presta atenção que essa imagem vai te acompanhar até o fim: TODO app é um restaurante. O salão é tudo que o cliente vê e toca, a fachada, o cardápio, a decoração, a música. No app: as telas, os botões, as cores, o que aparece quando você abre. Se o salão é confuso, o cliente vai embora sem nem descobrir se a comida era boa, quem aqui já desistiu de um app 'feio de mexer'? Pois é: você desistiu do salão. E a cozinha é onde o prato é FEITO. O cliente nunca entra nela, mas é lá que o pedido é conferido, o pagamento processado, a regra aplicada: 'esse cupom ainda vale?'. Agora que a imagem tá firme, os nomes técnicos colam nela: o salão, os técnicos chamam de FRONTEND. A cozinha, de BACKEND. Só isso. Quando alguém falar essas palavras perto de você, traduz na hora: salão, cozinha. E por que separar? Duas razões: segurança, o cliente não entra na cozinha, ninguém mexe onde não deve, e organização: dá pra trocar o fogão inteiro sem encostar numa cadeira do salão. Checagem: quando o iFood te mostra 'pedido confirmado'... QUEM confirmou? Onde isso aconteceu? [deixar responderem] Na cozinha. No backend. Vocês já falam a língua.`,
  caderninho: `Você fecha o Instagram, abre amanhã, e sua foto continua lá. Onde ela ficou guardada? No BANCO DE DADOS, que é o arquivo do restaurante, lá dentro da cozinha. E ele é organizado em TABELAS: uma tabela de clientes, uma de pedidos, uma de produtos. Cada linha da tabela é uma ficha, um cliente, um pedido. E o mais importante pra semana que vem: cada pessoa só enxerga a PRÓPRIA linha, e o banco vive no backend, nunca exposto no frontend. É exatamente aí, no banco de dados, que mora a segurança que a gente vê no terceiro encontro.`,
  drivethru: `Falta um personagem: alguém precisa levar o pedido do salão pra cozinha e trazer o prato de volta, sem o cliente jamais pisar na cozinha. E quando um sistema precisa de algo de OUTRO sistema, ele também não invade a cozinha alheia: ele passa no DRIVE-THRU. Pensa no drive-thru de verdade: tem um cardápio fixo do que dá pra pedir, um jeito combinado de pedir, e a resposta sai pela janela, você nunca vê a chapa, nunca entra na loja. Isso, no mundo dos sistemas, chama API. E repara num detalhe esperto: nem tudo está no cardápio, DE PROPÓSITO. O drive-thru só serve o que a casa decidiu servir, é assim que a cozinha fica protegida. Checagem: quando o app do tempo te mostra '22 graus'... quem foi buscar esse número, e onde? [deixar responderem] Isso: o app passou no drive-thru de um serviço de clima e pediu pela janela. Ele não tem termômetro nenhum.`,
  garcons_cotidiano: `E é por isso que nenhum app precisa fazer tudo sozinho. O iFood não desenhou mapa nenhum, ele passa no drive-thru do Google e pede 'um mapa desta rua'. A loja online não virou banco, ela passa no drive-thru do PIX e pede 'cobra trinta reais dessa pessoa'. O app do tempo não tem termômetro. Os sistemas pedem PRONTOS uns pros outros, o dia inteiro, em silêncio. E agora o motivo de eu estar te contando isso: daqui a pouco, quando você estiver construindo o SEU app conversando com a IA, plugar um desses drive-thrus, pagamento, mapa, até outra IA, vai custar UMA FRASE no pedido. 'Quero que dê pra pagar com PIX.' Pronto. O drive-thru já existe; você só contrata.`,
  jornada_pedido: `Bora juntar as quatro peças rastreando UM pedido de verdade, do clique ao prato, e vocês narram comigo. Você abre o iFood e toca em 'fazer pedido'. Onde você tá tocando? [SALÃO!] Isso, o frontend. O pedido precisa chegar na cozinha, quem leva? [o DRIVE-THRU!] A API, pela janela. Chegou na cozinha: ela confere se o restaurante tá aberto, se o cupom vale, se o pagamento passa, isso é o quê? [BACKEND!] E antes de responder, ela anota tudo, o pedido, o valor, o endereço, onde? [no ARQUIVO!] O banco de dados. E aí a resposta faz a viagem de volta e estampa na sua tela: 'pedido confirmado'. Isso tudo, essa viagem inteira... levou menos de um segundo. E acontece bilhões de vezes por dia, em cada app do planeta. Vocês acabaram de narrar, em coro, o funcionamento interno de todo software do mundo.`,
  aovivo_app: `E agora deixa eu provar que eu não inventei esse restaurante. [compartilhar a tela com um app real da SobreAI rodando + o painel do banco aberto do lado] Isso aqui é um app de verdade, meu, funcionando, no ar, e ele foi construído conversando com a IA. Vou apontar os personagens com o dedo: isso que vocês veem, as telas, os botões, as cores, é o salão, o frontend. Agora olha, eu clico em 'salvar'. Nesse instante o pedido passou pela janela do drive-thru, a API, e entrou na cozinha, o backend, e vocês não viram nada, é assim que deve ser. E o que eu mais gosto: esse painel aqui do lado é o ARQUIVO desse app, o banco de dados de verdade. Olha a tabela, olha as fichas. Eu clico de novo, e olha a ficha nova entrando na tabela, na sua frente. O dado saiu do seu clique, viajou, e foi gravado no arquivo. [voltar pros slides] É isso. Não tem mágica, tem uma cozinha bem organizada.`,
  quiz_coro: `Antes do café, um resumo rápido, e vocês vão ver o quanto já sabem. O que você VÊ no app é o salão, o frontend. Quem leva e traz o pedido é o drive-thru, a API. Onde o trabalho acontece é a cozinha, o backend. E o dado fica gravado no arquivo, o banco de dados. Repara: frontend, backend, API, banco de dados. Tem gente que leva um semestre de faculdade pra ficar confortável com esses quatro nomes, e vocês entenderam os quatro numa manhã. Você agora entende, por dentro, todo aplicativo do seu celular. Promessa da parte três: cumprida. Agora, dez minutos de café pra respirar. E um pedido pra levar na cabeça durante a pausa: pensa num problema SEU, da tua rotina ou da tua empresa, que um app resolveria. Pensa mesmo, porque eu VOU perguntar quando a gente voltar, e a ideia de alguém aqui pode virar realidade na tela ainda hoje.`,
  bloco_vibecoding: `Bem-vindos de volta. Deixa eu recomeçar com uma história minha. A primeira vez que eu construí alguma coisa só conversando, eu não acreditei. Eu escrevi, em português, num campinho de texto, o que eu queria, descrevi tipo quem descreve pra um amigo, e fiquei OLHANDO a tela se montar sozinha. Botão aparecendo, cor entrando, tela nascendo. Minha reação foi física, eu levantei da cadeira. Porque naquele momento caiu a ficha de que a pergunta que abre essa parte não era ficção: e se, em vez de aprender a língua da máquina... você pudesse simplesmente PEDIR o app? É disso que essa parte trata. E vocês já sabem TUDO que precisa pra entender, só falta juntar duas pontas.`,
  vibecoding_def: `Junta duas pontas comigo. Ponta um, da parte dois: a IA escreve qualquer texto. Ponta dois, da parte três: o código de um app é texto. Logo, a IA escreve o código. É isso o VIBECODING, a palavra do título que eu segurei até agora: construir um app conversando com a IA, em português, sem programar. Você descreve o que quer, 'um app onde meus clientes agendam horário', e a IA levanta o frontend, o backend e o banco de dados sozinha. A língua da máquina continua existindo, mas agora tem tradutor.`,
  reforma_sem_obra: `E o que muda na prática é o ritmo. Você descreve, olha o resultado pronto na tela, e pede o ajuste: 'muda a cor, tira esse botão, põe o preço maior'. Mudar de ideia custa uma frase e um minuto, não mais um time e semanas de trabalho. Errar ficou barato, e quando errar é barato, experimentar vira de graça. Essa é a mudança silenciosa mais profunda de todas.`,
  antes_agora: `Lado a lado, pra ficar sem dúvida. Antes: anos aprendendo a língua da máquina só pra fazer a primeira tela aparecer. Depois disso, uma equipe, a pessoa do salão, a pessoa da cozinha, a pessoa do caderno, e meses de obra. E ai de você se mudasse de ideia no meio. Agora: você descreve, olha o resultado pronto na tela, e pede o ajuste. 'Muda a cor. Tira esse botão. Põe o preço maior.' O ciclo que era de meses virou de minutos. E repara no que isso faz com o SEU papel: você deixa de ser o operário da obra, que você nunca foi, e vira o DONO do restaurante, que descreve o que quer. A IA vira a equipe de obra inteira. E o dono do restaurante, convenhamos, sempre foi quem vocês são: gente que sabe o que o negócio precisa.`,
  seu_trabalho: `Mas não é 'a IA faz tudo e você deita na rede'. Três coisas continuam SUAS. Um: saber O QUE pedir, a visão; qual problema o app resolve e pra quem. A IA não faz ideia do que o SEU cliente precisa. Dois: pedir BEM, ser específico, lembra a regra do prompt: pedido claro, resultado certeiro. Três: CONFERIR, o gosto e o critério; ela prevê, quem decide é você. Pergunto pra sala, quero duas ou três respostas de verdade: se você não precisa mais saber programar, o que muda no SEU trabalho? [deixar 2-3 responderem, ler 1 do chat] A habilidade deixou de ser saber construir. Virou saber DESCREVER. Falta só uma coisa: ONDE essa conversa acontece.`,
  lovable_fabrica: `Última parte: onde a conversa vira app. A ferramenta é o Lovable, aquela logo lá da capa. Você descreve o que quer e ela monta o app inteiro: o frontend, as telas; o backend, as regras; o banco de dados, com as tabelas; e conecta as APIs que você pedir, tipo pagamento. E no fim ela faz o DEPLOY, publica um link no ar de verdade, pra você mandar pra quem quiser abrir no celular. Frontend, backend, banco, API, deploy: tudo que a gente viu hoje, montado por uma conversa. E é nela que eu vou construir com vocês agora.`,
  reprise: `Lembra da charrete lá do começo? Da história que se repete? Pois é: criar software é o carro da nossa geração. Era de pouquíssimos, quem falava a língua das máquinas. Acabou de virar de todo mundo, de quem sabe descrever o que quer. Vocês não estão lendo essa história num livro. Vocês estão bem no ponto em que ela vira, agora, nesta sala.`,
  stat_antes_depois: `E pra quem gosta de número, o tamanho do salto. Um aplicativo como aquele que eu abri na tela antes do café, no modelo antigo: seis meses de projeto, uma equipe de programadores, e um orçamento que facilmente passava de cem mil reais, pergunta pra qualquer empresário aqui da sala que já orçou um sistema. Hoje: uma pessoa, uma conversa, a primeira versão no ar numa tarde. Não é dez por cento mais barato, não é o dobro mais rápido, é OUTRA categoria de coisa. É a diferença entre o livro do monge copista e o livro da prensa. Entre o carro do milionário e o carro do Ford.`,
  tese_headline: `Se você for embora hoje com UMA frase, que seja essa. A pergunta deixou de ser 'quem sabe programar', e virou 'quem sabe o que quer'. E olha que coisa: saber o que quer, entender o problema, conhecer o cliente, ter a visão... isso vocês já trouxeram de casa. É o que vocês fazem a vida inteira nos negócios de vocês. A barreira que faltava, a língua da máquina, caiu. Então deixa eu dizer com todas as letras: qualquer pessoa cria software. Inclusive você. Inclusive HOJE, antes do almoço.`,
  colheita_ideias: `E agora eu cobro o dever de casa do café. Que problema SEU um app resolveria? Quero ouvir, fala aí quem tá na sala, manda no chat quem tá online, e eu vou ANOTAR, olha o papel aqui na minha mão. [colher 4-5 ideias em no máximo uns 4 min, pra sobrar tempo de build; ler 1-2 do chat em voz alta; se travar, puxar: 'um controle de escala da clínica? uma lista de espera do restaurante? um agendamento pro consultório?'] Olha isso... [repetir as ideias anotadas em voz alta] Guardem essas ideias, e eu vou guardar este papel, porque daqui a alguns minutos a gente vai escolher UMA delas... e ela vai deixar de ser ideia na frente de vocês. Vocês não vão assistir a uma demonstração. Vocês acabaram de virar coautores do que vem agora.`,
  preparar_estrategia: `Só que, antes de eu abrir a ferramenta, um passo que muda tudo, porque quem chega no vibecoding e sai pedindo tudo de uma vez se perde. A preparação é oitenta por cento do resultado, e ela acontece FORA da tela, com você pensando. Quatro passos. Primeiro: qual é o problema, e pra QUEM? Não é 'um app de gestão', é 'um jeito da recepcionista ver a agenda do dia no celular'. Uma dor, uma pessoa real. Segundo: a função-núcleo, a UMA coisa que o app PRECISA fazer. Se você só pudesse ter UMA tela funcionando, qual seria? O resto é enfeite, fica pra depois. Terceiro: comece pequeno, o menor app que já é útil; dá pra crescer amanhã, lembra que errar é barato. E quarto: pense em passos, nas telas na ordem, a pessoa entra, faz a ação principal, vê o resultado. Repara: nada disso é técnico. É você organizando a ideia antes de descrever. Quem prepara, constrói em vinte minutos; quem não prepara, briga com a tela por duas horas. Pega já a sua ideia do papel e roda esses quatro no automático: problema, pra quem, função-núcleo, passos.`,
  prompt_com_ia: `E agora o pulo do gato, presta atenção porque isso muda tudo: você NÃO precisa escrever o prompt perfeito sozinho. Antes de abrir o Lovable, abre o ChatGPT ou o Gemini e usa ele como sócio. Você cola um pedido mais ou menos assim, e esse texto vai no material de vocês: 'quero criar um app que faz tal coisa pra tal pessoa. Antes de escrever qualquer coisa, me faça todas as perguntas que você precisar pra entender o problema, o usuário, as telas, os dados e o estilo. Quando tiver informação suficiente, gere um prompt completo, em português, pronto pra eu colar no Lovable.' Aí acontece a mágica: a IA vira uma entrevistadora. Ela te pergunta o que falta, você só responde, e no fim ela te devolve o prompt inteiro, organizado, redondo. Aí sim você leva esse prompt pro Lovable. É a IA te ajudando a conversar com a outra IA. Quem faz isso constrói muito melhor do que quem chega improvisando na tela.`,
  primeiro_pedido: `E aí, com a ideia organizada, o primeiro pedido. Quatro coisas. Um: diga o que é e pra quem, numa frase só, 'um app pra recepcionista marcar consulta'. Dois: liste as telas principais, do jeito que você imaginou nos passos, 'uma tela de entrada, uma tela com a agenda do dia, uma tela pra criar um agendamento novo'. Três: descreva como se estivesse explicando pra um amigo leigo, nada de termo técnico, a IA entende português muito bem. E quatro: diga o estilo, a cara que você quer, 'simples, limpo, com a cor da minha marca'. E o segredo que separa quem flui de quem sofre: peça UMA coisa de cada vez. Não despeje o app inteiro num parágrafo gigante, construa em camadas, conversando, olhando cada passo aparecer. É EXATAMENTE isso que eu vou fazer agora, na sua frente.`,
  chega_de_slide: `E chegou a hora que eu mais gosto. Façamos um balanço do que vocês já têm: vocês sabem o que é a IA, um programa que prevê a próxima palavra. Sabem do que todo app é feito, o frontend, o backend, o banco de dados e a API, tudo dentro da imagem do restaurante. Sabem o que é vibecoding, construir conversando com a IA. E sabem até como se preparar antes de pedir. Ou seja: teoria dada. Não tem mais nada que um slide possa fazer por vocês. Agora eu abro a tela e monto um app inteiro na frente de vocês, do zero, conversando em português. Só deixa eu te mostrar o mapa da próxima uma hora, pra ninguém se perder.`,
  mapa_pratica: `O mapa é esse, em quatro passos. Primeiro, uns quinze minutos de banho de loja: eu te mostro a ferramenta por dentro, onde se conversa, onde o app aparece, sem pressa. Depois a gente escolhe UMA ideia, deste papel aqui, das que vocês me deram. Aí eu peço, em português, na tela, com vocês lendo cada palavra do meu pedido pra IA, em tempo real. E a meta final: o app NO AR, com link, antes de você ir embora, pra você abrir no seu celular e mandar no grupo da família. E um combinado honesto, porque ao vivo é ao vivo: se alguma coisa travar no meio, eu sigo em frente, estilo programa de culinária, tem bolo pronto no forno. O que não vai acontecer é a gente terminar sem app.`,
  aovivo_final: `Vocês passaram duas horas entendendo COMO funciona. Agora vocês vão ver QUANTO TEMPO leva. Cronometra aí, pega o celular, abre o cronômetro, eu tô falando sério: eu quero que você tenha o número gravado no seu relógio, não na minha palavra. [este slide fica queimando na tela durante a troca, abrir o Lovable e compartilhar. quando o app estiver no ar, avance pros 2 últimos slides pra fechar] Bora construir.`,
  publicar_ao_vivo: `Repara no que acabou de acontecer: o app tá funcionando, mas ainda tá só na minha tela. Agora vem a parte que fecha tudo. Eu clico em publicar, e o Lovable me devolve um link de verdade, no ar. [publicar e copiar o link] Pronto. Vou fazer uma coisa: colar esse link agora no grupo de vocês. [colar no WhatsApp da turma] Abre no teu celular, quem tá online abre no navegador. Isso que tá na tua mão é um app que não existia quando você sentou aqui hoje de manhã. Nasceu de uma conversa, na tua frente, e já dá pra mandar pra qualquer pessoa do mundo. É isso que mudou.`,
  casos_reais: `E antes que alguém pense 'bonito, mas isso é brincadeira de palestra', deixa eu mostrar que isso vira ferramenta de verdade. [mostrar 2 ou 3 apps reais, de preferência seus, abrindo o link na hora] Uma agenda de recepção que aposentou o caderno de papel. Uma página que captura contato e joga direto no banco de dados. Um painel onde cada vendedor vê só a carteira dele. Nenhum desses teve equipe, nenhum teve seis meses. Teve uma pessoa que sabia o que queria, conversando com a IA. É exatamente o caminho que vocês vão fazer agora.`,
  bloco_suavez: `Chega de vocês me verem fazer. A parte que mais importa do dia é essa: agora é com você. Todo mundo pega o celular ou o notebook, porque nos próximos minutos não é a minha ideia que vai pro ar, é a sua. E eu vou tá aqui do teu lado o tempo todo, ninguém vai ficar perdido.`,
  lab_passos: `O caminho é o mesmo que eu acabei de mostrar, em quatro passos, e a gente vai junto. Primeiro, abre o ChatGPT ou o Gemini e escreve uma frase só: 'quero criar um app pra tal coisa, me entreviste e monte o prompt'. Deixa ele te perguntar, e você só responde sobre a SUA ideia. Segundo, pega o prompt que ele montou e cola no Lovable. Terceiro, olha o primeiro esboço aparecer e pede UM ajuste por vez, conversando, sem pressa. E o quarto, o mais importante: se travar, levanta a mão, não sofre calado. A gente projeta a tua tela e conserta o pedido na frente de todo mundo, porque o teu erro é a aula de todos.`,
  clinica_prompts: `Deixa eu pegar alguns de vocês pra gente consertar junto. [escolher 2 ou 3, projetar a tela] Olha um pedido assim: 'faz um app de gestão'. Genérico demais, e a IA devolve um monstro genérico. Vamos afiar juntos: gestão do quê, pra quem, qual é a primeira tela? [reescrever ao vivo] Viu a diferença? O pedido ficou específico, o resultado ficou certeiro. Essa é a habilidade que vale ouro, e vocês estão treinando ela agora, na prática, não no slide.`,
  armadilhas: `Antes de eu soltar vocês no mundo, três armadilhas, pra você não cair nelas amanhã sozinho. A primeira: pedir tudo de uma vez. Um parágrafo gigante com o app inteiro vira uma bagunça; peça em camadas, uma coisa de cada vez. A segunda: aceitar sem conferir. Lembra que a IA prevê, ela não sabe; ela erra com a mesma cara de certeza com que acerta, então quem revisa é você. E a terceira, a mais séria: dado sensível exposto. Se você não põe as regras certas, o cadastro de um cliente pode ficar visível pra qualquer um. E é bem aí que a gente chega no terceiro encontro.`,
  ponte_dia3: `Segura essa, porque é o fio que liga o dia de hoje ao último: criar ficou fácil, qualquer um faz, vocês acabaram de fazer. Trancar a porta direito, pra ninguém entrar onde não devia, isso é o assunto do dia de segurança. Uma coisa não vive sem a outra.`,
  ate_onde_vai: `E agora um papo honesto, porque eu não vim te vender fumaça. Onde essa ferramenta brilha? Tirar ideia do papel, protótipo, ferramenta interna da tua empresa, a primeira versão de um produto. Nisso ela é imbatível. E onde você chama reforço, um programador de verdade? Quando aquilo vira o coração do negócio, com muita gente usando ao mesmo tempo, muito dado, integração que não pode falhar. Saber essa diferença é o que separa quem usa bem de quem se frustra. Comece pequeno; quando crescer, você chama quem entende.`,
  quanto_custa: `E a pergunta que todo empresário na sala já tá fazendo: quanto isso custa? A real, sem susto. O Lovable tem um plano de graça pra você começar hoje, e planos pagos por uso quando quiser mais. O banco de dados, o Supabase, também tem uma camada gratuita generosa; você só paga quando o app cresce de verdade. E publicar o link pra mostrar pra alguém não custa nada. Compara com o modelo antigo, os cem mil reais e os seis meses que eu mostrei: hoje é o preço de uma assinatura e o tempo de uma tarde. Não é dez por cento mais barato, é outra categoria de coisa.`,
  licao_de_casa: `Antes de qualquer coisa, deixa eu voltar naquela segunda pergunta que eu fiz lá no comecinho: quem aqui já criou um software? Levanta a mão de novo agora. [espera, e comenta as mãos] Olha a diferença pra duas horas atrás. Vocês acabaram de ver um nascer, do zero, e já sabem como funciona por dentro. Agora a parte séria, porque quem só assiste esquece e quem faz aprende: essa é a sua lição de casa. Ainda essa semana, entra no lovable.dev, cria uma conta, que é de graça, e monta alguma coisa SUA. Não precisa ser grande, pelo contrário: pega uma dor pequena e real do teu dia a dia e faz o menor app que resolve ela. E traz pro próximo encontro, que é onde a gente pega o que VOCÊ construiu e transforma num produto de verdade.`,
  proximos_encontros: `Pra fechar, o mapa da nossa jornada, que é em três encontros. Hoje foi o vibecoding: da ideia ao app, conversando. No próximo, o [nome do parceiro] pega a parte de design e produto, e aí mora um pulo do gato: o Lovable, se você deixar, cria um monstro, cheio de coisa. Ele vai mostrar como transformar esse monstro num MAP, Minimum Awesome Product, o menor produto que já é incrível de usar. E no último, eu volto com vocês pra segurança: como construir com IA sem deixar a porta dos fundos aberta. Foi um prazer gigante. Agora vai lá, abre o Lovable, e constrói o teu.`,
};

export const moinhosVibecodingEvent: EventModule = {
  ...bootcampCaldeiraEvent,
  slug: "moinhos-vibecoding",
  name: "IA e Vibecoding · Moinhos de Vento",
  sectionLabel: "parte",
  themeClass: "theme-moinhos",
  manifest,
  totalSlides: manifest.length,
  acts: {
    metas: {
      1: { number: 1, name: "a história", subtitle: "os saltos" },
      2: { number: 2, name: "a IA", subtitle: "o que é, de verdade" },
      3: { number: 3, name: "o app", subtitle: "o restaurante" },
      4: { number: 4, name: "vibecoding", subtitle: "construir conversando" },
      5: { number: 5, name: "ao vivo", subtitle: "do zero ao app" },
    },
    boundaries,
    openerIndices,
  },
  isLivePhaseSlide: () => null,
  isIterationSlide: () => false,
  scripts,
};

export default moinhosVibecodingEvent;
