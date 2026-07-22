import type { EventModule } from "../types";
import type { SlideEntry } from "../travessia/manifest";
import { bootcampCaldeiraEvent } from "../bootcamp-caldeira";
import lovableLogo from "@/assets/lovable-logo-icon.png";
import eraCharrete from "@/assets/era-charrete.png";
import eraCarro from "@/assets/era-carro.png";
import eraAviao from "@/assets/era-aviao.png";

// DIA 1 do MBA da Faculdade Moinhos de Vento, "IA e Vibecoding com [logo Lovable]".
// Plateia CRUA/leiga: fundamentos (IA, front/back, API, banco, vibecoding) em ~2h, contados
// como HISTÓRIA (a evolução humana: fogo→...→IA) e por ANALOGIA (o restaurante), com o jargão
// sempre chegando DEPOIS da imagem. 3 momentos "ao vivo" (magenta). Fecha passando a bola pro
// banho de loja + build ao vivo no Lovable (~1h, fora deste deck). Tema escuro (theme-moinhos).
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
  grid("agenda", "o mapa do dia", [
    { label: "1. a história que se repete", sub: "os grandes saltos da humanidade, e o de agora" },
    { label: "2. o que é essa tal de IA", sub: "e como ela 'pensa', sem misticismo" },
    { label: "3. por dentro de todo app", sub: "do iFood ao app do banco: as mesmas peças" },
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
  act("bloco_ia", "parte 2 de 5", "a máquina que adivinha", "o que é essa tal de IA, sem misticismo e sem medo."),
  two("jogo_autocomplete", "vamos jogar · responde em voz alta / no chat", "quem não deve, não ___", "água mole em pedra dura, tanto bate até que ___"),
  two("corretor_biblioteca", "a analogia pra levar pra casa", "a IA é o corretor do seu teclado…", "…que leu a biblioteca do mundo inteiro."),
  head("nao_sabe_preve", "ela não SABE. ela PREVÊ."),
  two("prompt_cabeleireiro", "a palavra nova do dia: prompt", "prompt é o pedido no cabeleireiro", "'dá uma ajeitada' é loteria, com foto de referência sai do jeito que você quer."),
  live("aovivo_ia", "a IA na tela"),
  // ── parte 3 · o app ──
  act("bloco_app", "parte 3 de 5", "por dentro de todo app", "o que existe atrás de cada botão que você aperta."),
  two("receita_de_bolo", "primeiro: o que É um app? · me fala o que você mais usa", "software é uma receita de bolo", "que o computador segue ao pé da letra, sem improvisar nunca."),
  grid("anatomia_app", "a anatomia · todo app tem as mesmas 3 partes", [
    { label: "o que você VÊ", sub: "as telas, os botões, as cores, onde você toca" },
    { label: "o que TRABALHA escondido", sub: "as regras: conferir a senha, calcular o preço, aprovar o pagamento" },
    { label: "o que fica GUARDADO", sub: "seu cadastro, seus pedidos, suas fotos, pra amanhã continuar lá", accent: true },
  ]),
  two("lingua_da_maquina", "por que era coisa de poucos", "escrever essa receita", "era falar a língua da máquina."),
  two("restaurante", "a imagem-mãe do dia", "todo app é um", "restaurante."),
  grid("salao_cozinha", "dentro do restaurante · o salão e a cozinha", [
    { label: "o SALÃO, o que o cliente vê e toca", sub: "a fachada, o cardápio, as mesas · no app: as telas, os botões, as cores" },
    { label: "a COZINHA, onde o prato é feito", sub: "pedido conferido, pagamento processado, regras aplicadas, o cliente nunca entra", accent: true },
    { label: "por que separar? segurança", sub: "cliente não circula na cozinha, ninguém mexe onde não deve" },
    { label: "e organização", sub: "a cozinha troca o fogão inteiro sem mexer numa cadeira do salão" },
  ]),
  grid("caderninho", "o caderno que nunca esquece · por que o app LEMBRA de você", [
    { label: "gaveta de CLIENTES", sub: "uma ficha por pessoa: nome, e-mail, senha" },
    { label: "gaveta de PEDIDOS", sub: "cada compra, com data, valor e status" },
    { label: "gaveta de PRODUTOS", sub: "tudo que está à venda, com preço e foto" },
    { label: "cada cliente só vê a PRÓPRIA ficha", sub: "e o caderno mora na cozinha, nunca no salão", accent: true },
  ]),
  two("drivethru", "falta um personagem: quem LEVA e TRAZ", "API é o drive-thru dos sistemas", "um cardápio fixo do que dá pra pedir, e a resposta sai pela janelinha."),
  grid("garcons_cotidiano", "e os sistemas pedem uns aos outros o dia inteiro", [
    { label: "o iFood não tem mapa", sub: "passa no drive-thru do Google: 'me vê um mapa desta rua'" },
    { label: "a lojinha não tem banco", sub: "passa no drive-thru do PIX: 'cobra 30 reais dessa pessoa'" },
    { label: "o app do tempo não mede o tempo", sub: "pede os 22 graus no drive-thru do serviço de clima" },
    { label: "quando você constrói conversando, plugar um desses é UMA FRASE", sub: "pagamento, mapa, IA, já existem prontos, é só pedir", accent: true },
  ]),
  list("jornada_pedido", "agora junta tudo · vocês narram comigo · a jornada de um pedido", [
    { label: "1. você toca no botão", sub: "o salão (frontend)" },
    { label: "2. o pedido viaja pela janelinha", sub: "o drive-thru (a API)" },
    { label: "3. a cozinha confere e prepara", sub: "o backend: saldo, regras, aprovação" },
    { label: "4. o caderno registra tudo", sub: "o banco de dados" },
    { label: "5. a resposta volta pra sua tela", sub: "'pedido confirmado', e você nem viu a viagem", accent: true },
  ]),
  live("aovivo_app", "um app de verdade"),
  list("quiz_coro", "prova rápida · em coro, sala e chat · quem é quem?", [
    { label: "o que você VÊ no app é o…", sub: "salão! (frontend)" },
    { label: "quem LEVA e TRAZ o pedido é o…", sub: "drive-thru! (API)" },
    { label: "onde o trabalho acontece é a…", sub: "cozinha! (backend)" },
    { label: "e o dado DORME no…", sub: "caderno! (banco de dados)", accent: true },
  ]),
  act("intervalo", "respira", "intervalo", "quando voltar: criar tudo isso SEM saber programar. e pensa, que problema SEU um app resolveria? eu vou perguntar."),
  // ── parte 4 · vibecoding ──
  act("bloco_vibecoding", "parte 4 de 5", "e se você pudesse pedir?", "em vez de programar."),
  two("vibecoding_def", "a palavra do título do dia, enfim", "vibecoding", "construir um app CONVERSANDO com a IA, em português, sem saber programar."),
  two("reforma_sem_obra", "a sensação de vibecodar", "é uma reforma sem obra.", "a parede levanta na hora."),
  cmp("antes_agora", "o que mudou de verdade · antes · agora",
    { label: "anos aprendendo a língua da máquina", sub: "+ equipe e meses de obra, e mudar de ideia custava caro" },
    { label: "descrever, olhar, pedir ajuste", sub: "a parede levanta na hora; errar custa uma frase e um minuto" }),
  list("seu_trabalho", "e o que continua sendo SEU trabalho · a habilidade mudou de lugar", [
    { label: "saber O QUE pedir", sub: "a visão: qual problema esse app resolve, pra quem" },
    { label: "pedir BEM", sub: "lembra do cabeleireiro? briefing com foto de referência" },
    { label: "CONFERIR o resultado", sub: "o gosto e o critério, a IA prevê, você decide", accent: true },
  ]),
  // ── parte 5 · o Lovable + estratégia + gancho ──
  grid("lovable_fabrica", "parte 5 de 5 · onde a conversa vira app · a construtora que atende pelo WhatsApp", [
    { label: "monta o salão", sub: "as telas e os botões, o frontend" },
    { label: "liga a cozinha", sub: "as regras trabalhando escondido, o backend" },
    { label: "abre o caderno", sub: "o banco de dados, com as gavetas prontas" },
    { label: "contrata os drive-thrus", sub: "pagamento, mapa, IA, as APIs, numa frase" },
    { label: "e te entrega a CHAVE: um link no ar", sub: "pra mandar pra qualquer pessoa, na hora", accent: true },
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
  list("primeiro_pedido", "o primeiro pedido · o briefing de cabeleireiro, agora valendo", [
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
  duas_perguntas: `Fala, pessoal! Que bom ter vocês aqui, quem tá na sala e quem tá online. Rapidinho sobre mim: eu sou o Gabriel Breda, da SobreAI, e o meu trabalho é ajudar pessoas que NÃO são técnicas a construir coisas com IA. Antes de qualquer slide, duas perguntas. Primeira: quem aqui já usou o ChatGPT? Levanta a mão, e quem tá online, manda um 'eu' no chat. Olha isso... quase todo mundo. Agora a segunda: quem aqui já CRIOU um software? Um aplicativo, um sistema, qualquer coisa. ... Pois é, nenhuma, ou talvez uma ou duas mãos. E olha que interessante: a distância entre as duas perguntas continua enorme. É exatamente sobre essa distância que é o dia de hoje. Guarda esse momento, porque no fim da manhã eu vou refazer a segunda pergunta, e a resposta vai ser outra.`,
  agenda: `O combinado é esse. Nas próximas duas horas, eu te dou o mapa: de onde vem essa revolução, o que é essa IA que todo mundo fala, e do que um aplicativo é feito por dentro, tudo sem UMA palavra técnica solta; toda vez que aparecer um nome estranho, ele vai chegar depois de uma imagem que você já entendeu. No meio tem um intervalo de dez minutos pra respirar. E aí vem a parte cinco, que não é slide: eu vou compartilhar a tela e montar um aplicativo DO ZERO, ao vivo, na frente de vocês. Você não precisa anotar nada, não precisa saber nada antes. Só precisa de uma coisa: curiosidade. Dúvida no meio do caminho? Quem tá aqui levanta a mão, quem tá online joga no chat, eu paro e respondo. Bora.`,
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
  corretor_biblioteca: `Agora a analogia oficial do dia. Quem aqui já mandou mensagem errada por culpa do corretor do celular? Todo mundo, né. Aquele teclado que sugere a próxima palavra em cima do que você digitou, a IA é EXATAMENTE isso. Um completador de frases. Só que, pra treinar ela, colocaram a máquina pra 'ler' uma fração gigantesca de tudo que a humanidade já publicou: os livros, as enciclopédias, os sites, os fóruns, o equivalente a milhões de livros. É como uma pessoa que leu tanta receita de bolo na vida que, quando você fala 'farinha, ovos, açúcar e...', ela chuta 'leite' antes de você terminar, e acerta. A IA ficou tão absurdamente boa em adivinhar a próxima palavra que a adivinhação começou a PARECER raciocínio. E a funcionar como um. Ela não pensa como você, ela leu tanto que consegue prever o que alguém que pensa diria.`,
  nao_sabe_preve: `E essa frase aqui é a que te protege dela. A IA não sabe as coisas como a gente sabe, ela prevê a continuação mais provável. Na maioria das vezes, a continuação mais provável é a verdade. Mas às vezes não é, e ela vai te entregar uma invenção com a MESMA cara de certeza, o mesmo tom confiante, a mesma pontuação impecável. Os técnicos chamam isso de 'alucinação'. Deixa eu checar se assentou: por que a IA às vezes inventa uma resposta? [deixar responderem] Isso, porque ela não tá consultando um arquivo da verdade, ela tá completando a frase mais provável. Então a regra é: a IA é um assistente brilhante e ocasionalmente mentiroso com boas intenções. Coisa importante, você confere. E isso nunca vai deixar de ser trabalho SEU.`,
  prompt_cabeleireiro: `Falta uma peça: como se FALA com essa máquina. O pedido que você escreve pra IA tem nome, chama prompt, mas esquece o nome e pensa no cabeleireiro. Chegar lá e falar 'dá uma ajeitada' é loteria: pode sair qualquer coisa, e a culpa nem é do cabeleireiro. Agora, chegar com a foto de referência e dizer 'curto dos lados, mantém em cima, franja não', sai do jeito que você imaginou. A IA é o melhor cabeleireiro do mundo... mas ela corta exatamente o que você PEDIU, não o que você imaginou. Com uma vantagem gigante sobre o cabelo: deu errado, você pede de novo, na hora, de graça. Prompt bom não é palavra mágica, é briefing bem dado. Guarda isso com carinho, porque daqui a pouco 'pedir bem' vai virar a habilidade mais valiosa da sua manhã.`,
  aovivo_ia: `Chega de eu FALAR da IA, deixa eu te mostrar. [compartilhar a tela com o ChatGPT aberto] Aqui o combinado do dia se cumpre pela primeira vez: nessa palestra a gente não fala de tecnologia, a gente USA na tela. Me dá um assunto qualquer, qualquer um, grita aí, ou manda no chat. [pegar um da sala e um do chat] Boa. Olha o pedido vago primeiro: 'fala sobre isso'. Viu? Resposta genérica, poderia estar em qualquer lugar. Agora o pedido de cabeleireiro com foto: 'explica isso pra uma criança de 8 anos, em 3 frases, usando um exemplo de futebol'. Olha a diferença. É o mesmo cérebro, o que mudou foi o BRIEFING. E repara como o texto vai aparecendo palavrinha por palavrinha: você tá literalmente VENDO ela prever a próxima palavra, igual vocês fizeram no coro agora há pouco. [voltar pros slides] Beleza. Vocês já entendem a IA. Agora falta entender a outra metade do título do dia: o que é um aplicativo por dentro.`,
  bloco_app: `Parte três, a maior do dia, e eu te adianto o presente que tem no fim dela: quando esse bloco acabar, você vai entender como funciona, por dentro, TODO aplicativo do seu celular. Todos. Do iFood ao app do banco. E vai perceber que eles são todos... a mesma coisa. Vamos por partes, começando pela pergunta mais básica de todas.`,
  receita_de_bolo: `Antes de qualquer coisa: me fala o app que você MAIS usa no celular. Grita aí, e o chat também. [colher 3: vai sair WhatsApp, iFood, banco, Instagram... anotar num papel visível] Anotei. Prometo: no fim desse bloco você vai entender esses três por dentro. Agora, uma ponte com o que a gente acabou de ver: a IA escreve qualquer texto, certo? E se o texto que ela escreve... for um APP? Calma, ainda não, primeiro precisamos saber o que É um app. Software é uma receita de bolo que o computador segue ao pé da letra. AO PÉ DA LETRA mesmo: se a receita mandar 'adicione 500 ovos', ele adiciona 500 ovos sem franzir a testa, porque ele não improvisa, não desconfia, não tem bom senso, ele só segue. Aplicativo é essa receita embalada pro bolso; site é a mesma receita rodando no navegador. Mesma coisa, embalagem diferente. E 'programar', desde sempre, foi escrever essa receita na língua que a máquina entende.`,
  anatomia_app: `E olha que descoberta boa: todo app do mundo, TODO, tem as mesmas três partes. Um: o que você VÊ. As telas, os botões, as cores; a parte que encosta no seu dedo. Dois: o que TRABALHA escondido. Você aperta 'pagar' e alguma coisa, em algum lugar que você não vê, confere seu saldo, valida o cartão, aprova. Três: o que fica GUARDADO. Você fecha o app, abre amanhã, e seus dados continuam lá, alguém guardou. Bora testar com os apps que VOCÊS me deram: o Instagram e o app do banco, o que eles têm em comum por dentro? [deixar responderem] Exatamente: as mesmas três partes. Um mostra foto e o outro mostra saldo, mas a anatomia é idêntica. Agora eu vou dar um nome e um endereço pra cada uma dessas partes, e pra isso eu vou usar a imagem mais importante da manhã.`,
  lingua_da_maquina: `Só que antes, deixa eu fechar um ciclo. Escrever essa receita, programar, sempre exigiu aprender a língua da máquina. Anos de estudo. Faculdade, curso, prática, uma língua inteira feita de símbolos e regras onde uma vírgula fora do lugar quebra o bolo inteiro. POR ISSO software sempre foi coisa de poucos, lembra da linha dos saltos? Antes de Gutenberg, ler era pra poucos porque copiar livro era um ofício raro. Até ontem, criar software era pra poucos porque escrever a receita era um ofício raro. Guarda essa tensão aí. Ela se resolve depois do intervalo, e a resolução é o motivo de vocês estarem aqui hoje.`,
  salao_cozinha: `Presta atenção que essa imagem vai te acompanhar até o fim: TODO app é um restaurante. O salão é tudo que o cliente vê e toca, a fachada, o cardápio, a decoração, a música. No app: as telas, os botões, as cores, o que aparece quando você abre. Se o salão é confuso, o cliente vai embora sem nem descobrir se a comida era boa, quem aqui já desistiu de um app 'feio de mexer'? Pois é: você desistiu do salão. E a cozinha é onde o prato é FEITO. O cliente nunca entra nela, mas é lá que o pedido é conferido, o pagamento processado, a regra aplicada: 'esse cupom ainda vale?'. Agora que a imagem tá firme, os nomes técnicos, porque aqui o jargão sempre chega DEPOIS da imagem: o salão, os técnicos chamam de FRONTEND. A cozinha, de BACKEND. Só isso. Quando alguém falar essas palavras perto de você, traduz na hora: salão, cozinha. E por que separar? Duas razões: segurança, o cliente não entra na cozinha, ninguém mexe onde não deve, e organização: dá pra trocar o fogão inteiro sem encostar numa cadeira do salão. Checagem: quando o iFood te mostra 'pedido confirmado'... QUEM confirmou? Onde isso aconteceu? [deixar responderem] Na cozinha. No backend. Vocês já falam a língua.`,
  caderninho: `Pergunta: você fecha o Instagram, desliga o celular, abre de novo amanhã... e a sua foto continua lá. Onde ela passou a noite? [deixar chutarem] Existe um lugar no restaurante que a gente ainda não visitou: o caderninho de fiado da venda. O dono da venda anota quem comprou, o quê, quanto deve, e acha a página na hora. O banco de dados é esse caderninho com superpoderes: nunca perde uma página, cabem milhões de clientes, mil pessoas consultam ao mesmo tempo, e, o mais importante, cada cliente só enxerga a PRÓPRIA página. Ele é organizado em gavetas: uma gaveta de clientes, uma ficha por pessoa; uma gaveta de pedidos; uma gaveta de produtos. TUDO que um app 'lembra' de você, seu nome, seu carrinho, seu histórico, é porque anotou no caderninho. Aliás, o nome e o CPF de cada pessoa dessa sala estão, agora, em DEZENAS de caderninhos desses pelo mundo. E onde fica o caderno? Na COZINHA. Jamais aberto no salão, à vista de qualquer um, guarda essa, porque na parte prática eu volto nela.`,
  drivethru: `Falta um personagem: alguém precisa levar o pedido do salão pra cozinha e trazer o prato de volta, sem o cliente jamais pisar na cozinha. E quando um sistema precisa de algo de OUTRO sistema, ele também não invade a cozinha alheia: ele passa no DRIVE-THRU. Pensa no drive-thru de verdade: tem um cardápio fixo do que dá pra pedir, um jeito combinado de pedir, e a resposta sai pela janelinha, você nunca vê a chapa, nunca entra na loja. Isso, no mundo dos sistemas, chama API. E repara num detalhe esperto: nem tudo está no cardápio, DE PROPÓSITO. O drive-thru só serve o que a casa decidiu servir, é assim que a cozinha fica protegida. Checagem: quando o app do tempo te mostra '22 graus'... quem foi buscar esse número, e onde? [deixar responderem] Isso: o app passou no drive-thru de um serviço de clima e pediu pela janelinha. Ele não tem termômetro nenhum.`,
  garcons_cotidiano: `E é por isso que nenhum app precisa fazer tudo sozinho. O iFood não desenhou mapa nenhum, ele passa no drive-thru do Google e pede 'um mapa desta rua'. A lojinha online não virou banco, ela passa no drive-thru do PIX e pede 'cobra trinta reais dessa pessoa'. O app do tempo não tem termômetro. Os sistemas pedem PRONTOS uns pros outros, o dia inteiro, em silêncio. E agora o motivo de eu estar te contando isso: daqui a pouco, quando você estiver construindo o SEU app conversando com a IA, plugar um desses drive-thrus, pagamento, mapa, até outra IA, vai custar UMA FRASE no pedido. 'Quero que dê pra pagar com PIX.' Pronto. O drive-thru já existe; você só contrata.`,
  jornada_pedido: `Bora juntar as quatro peças rastreando UM pedido de verdade, do clique ao prato, e vocês narram comigo. Você abre o iFood e toca em 'fazer pedido'. Onde você tá tocando? [SALÃO!] Isso, o frontend. O pedido precisa chegar na cozinha, quem leva? [o DRIVE-THRU!] A API, pela janelinha. Chegou na cozinha: ela confere se o restaurante tá aberto, se o cupom vale, se o pagamento passa, isso é o quê? [BACKEND!] E antes de responder, ela anota tudo, o pedido, o valor, o endereço, onde? [no CADERNO!] O banco de dados. E aí a resposta faz a viagem de volta e estampa na sua tela: 'pedido confirmado'. Isso tudo, essa viagem inteira... levou menos de um segundo. E acontece bilhões de vezes por dia, em cada app do planeta. Vocês acabaram de narrar, em coro, o funcionamento interno de todo software do mundo.`,
  aovivo_app: `E agora deixa eu provar que eu não inventei esse restaurante. [compartilhar a tela com um app real da SobreAI rodando + o painel do banco aberto do lado] Isso aqui é um app de verdade, meu, funcionando, no ar, e detalhe que eu conto depois do intervalo: ele foi construído conversando com a IA. Vou apontar os personagens com o dedo. Isso que vocês estão vendo, as telas, os botões, as cores? [deixar a sala responder: o salão!] Frontend. Agora olha: eu vou clicar em 'salvar'... prontinho. Nesse instante, o pedido acabou de passar pela janelinha do drive-thru e entrou na cozinha, vocês não viram nada, e é assim que deve ser. E agora o momento que eu mais gosto: esse painel aqui do lado é o CADERNO desse app, o banco de dados de verdade. Olha a gaveta, olha as fichas. Eu clico aqui de novo... e olha a ficha nova APARECENDO na gaveta, na sua frente. O dado saiu do seu clique, viajou, e foi dormir no caderno. [voltar pros slides] É isso. Não tem mágica, tem restaurante.`,
  quiz_coro: `Prova rápida antes do café, em coro, valendo. O que você VÊ no app é o...? [SALÃO!] Quem LEVA e TRAZ o pedido é o...? [DRIVE-THRU!] Onde o trabalho acontece é a...? [COZINHA!] E o dado dorme no...? [CADERNO!] Cem por cento de aproveitamento. Deixa eu te dizer uma coisa séria no meio da brincadeira: frontend, backend, API, banco de dados, tem gente que leva um semestre de faculdade pra ficar confortável com esses quatro nomes. Vocês acabaram de gabaritar em coro, antes do café. Você agora entende como funciona, por dentro, TODO aplicativo do seu celular. Promessa da parte três: cumprida.`,
  intervalo: `Dez minutos de intervalo, estica a perna, pega um café, quem tá online aproveita também. Dois avisos antes de você levantar. Primeiro, um teaser: quando a gente voltar, eu respondo a pergunta que ficou armada, como é que se cria tudo isso, o salão, a cozinha, o caderno, SEM saber programar. Segundo, um dever de casa de corredor: durante o café, pensa num problema SEU, da sua empresa, da sua rotina, da sua família, que um aplicativo resolveria. Pensa mesmo, porque eu VOU perguntar quando voltar... e a resposta de alguém aqui pode virar realidade na tela ainda hoje. Até já.`,
  bloco_vibecoding: `Bem-vindos de volta. Deixa eu recomeçar com uma história minha. A primeira vez que eu construí alguma coisa só conversando, eu não acreditei. Eu escrevi, em português, num campinho de texto, o que eu queria, descrevi tipo quem descreve pra um amigo, e fiquei OLHANDO a tela se montar sozinha. Botão aparecendo, cor entrando, tela nascendo. Minha reação foi física, eu levantei da cadeira. Porque naquele momento caiu a ficha de que a pergunta que abre essa parte não era ficção: e se, em vez de aprender a língua da máquina... você pudesse simplesmente PEDIR o app? É disso que essa parte trata. E vocês já sabem TUDO que precisa pra entender, só falta juntar duas pontas.`,
  vibecoding_def: `Junta as duas pontas comigo. Ponta um, lá da parte dois: a IA é um completador que escreve QUALQUER texto. Ponta dois, da parte três: um app é uma receita, e receita é o quê? TEXTO. A receita do aplicativo, o tal do código, é texto. Então... a IA escreve código. Ela leu praticamente todo o código aberto publicado na internet, do mesmo jeito que leu os livros. E quando você junta as pontas, nasce a palavra que tá no título do dia e que eu segurei até agora de propósito: VIBECODING. Construir um app conversando com a IA, em português, sem saber programar. Você descreve o restaurante, 'quero um app onde meus clientes agendam horário', e a IA escreve a receita inteira: levanta o salão, monta a cozinha, abre o caderno. A língua da máquina continua existindo... mas agora tem tradutor. E o tradutor leu a biblioteca do mundo.`,
  reforma_sem_obra: `A melhor imagem que eu conheço pra sensação de vibecodar é essa: uma reforma sem obra. Quem aqui já sofreu numa reforma, ou viu alguém sofrer? Então: na obra de verdade, mudar de ideia no meio custa caro e demora. 'Ah, eu queria a parede mais pra lá', são duas semanas e um orçamento novo. No vibecoding, você conversa com o arquiteto e a parede LEVANTA na hora, na sua frente. Não gostou? 'Derruba, faz de novo azul', custa uma frase e leva um minuto. Errar ficou barato. E quando errar fica barato, experimentar fica de graça, essa é a mudança silenciosa mais profunda da história toda.`,
  antes_agora: `Lado a lado, pra ficar sem dúvida. Antes: anos aprendendo a língua da máquina só pra fazer a primeira tela aparecer. Depois disso, uma equipe, a pessoa do salão, a pessoa da cozinha, a pessoa do caderno, e meses de obra. E ai de você se mudasse de ideia no meio. Agora: você descreve, olha o resultado pronto na tela, e pede o ajuste. 'Muda a cor. Tira esse botão. Põe o preço maior.' O ciclo que era de meses virou de minutos. E repara no que isso faz com o SEU papel: você deixa de ser o operário da obra, que você nunca foi, e vira o DONO do restaurante, que descreve o que quer. A IA vira a equipe de obra inteira. E o dono do restaurante, convenhamos, sempre foi quem vocês são: gente que sabe o que o negócio precisa.`,
  seu_trabalho: `Mas atenção, porque isso não é uma história de 'a IA faz tudo e você deita na rede'. Três coisas continuam sendo insubstituivelmente SUAS. Um: saber O QUE pedir, a visão. Qual problema esse app resolve, pra quem, por quê. A IA não tem a menor ideia do que o SEU cliente precisa. Dois: pedir BEM, lembra do cabeleireiro da parte dois? 'Dá uma ajeitada' continua sendo loteria; briefing bem dado continua saindo certo. E três: CONFERIR, o gosto, o critério. Lembra: ela não sabe, ela prevê; quem bate o martelo é você. Pergunta pra sala, e eu quero ouvir duas ou três respostas de verdade: se você não precisa mais saber programar... o que muda no SEU trabalho? [deixar 2-3 responderem, ler 1 do chat] Ótimo. A habilidade deixou de ser saber construir. Virou saber DESCREVER. Falta só uma coisa: ONDE essa conversa acontece.`,
  lovable_fabrica: `Última parte. Lembra da logo lá na capa, a primeira coisa que vocês viram hoje? Então, é essa a ferramenta, chama Lovable, e agora vocês têm o vocabulário inteiro pra entender o que ela é: uma construtora que atende pelo WhatsApp. Você manda uma mensagem descrevendo o que quer, e do outro lado uma equipe invisível, arquiteto, engenheiro, eletricista, decorador, levanta o prédio COMPLETO e te manda a chave em minutos. E completo é completo: ela monta o salão, as telas; liga a cozinha, as regras; abre o caderno, o banco de dados com as gavetas prontas; contrata os drive-thrus que você pedir, pagamento, mapa, IA; e no fim te entrega a chave: um LINK, no ar, na internet de verdade, pra você mandar pra quem quiser abrir no celular. Todos os personagens que a gente conheceu hoje de manhã, montados por uma conversa. É onde a conversa vira um app de verdade, e é nela que eu vou construir com vocês daqui a pouquinho.`,
  reprise: `Lembra da charrete lá do começo? Da história que se repete? Pois é: criar software é o carro da nossa geração. Era de pouquíssimos, quem falava a língua das máquinas. Acabou de virar de todo mundo, de quem sabe descrever o que quer. Vocês não estão lendo essa história num livro. Vocês estão bem no ponto em que ela vira, agora, nesta sala.`,
  stat_antes_depois: `E pra quem gosta de número, o tamanho do salto. Um aplicativo como aquele que eu abri na tela antes do intervalo, no modelo antigo: seis meses de projeto, uma equipe de programadores, e um orçamento que facilmente passava de cem mil reais, pergunta pra qualquer empresário aqui da sala que já orçou um sistema. Hoje: uma pessoa, uma conversa, a primeira versão no ar numa tarde. Não é dez por cento mais barato, não é o dobro mais rápido, é OUTRA categoria de coisa. É a diferença entre o livro do monge copista e o livro da prensa. Entre o carro do milionário e o carro do Ford.`,
  tese_headline: `Se você for embora hoje com UMA frase, que seja essa. A pergunta deixou de ser 'quem sabe programar', e virou 'quem sabe o que quer'. E olha que coisa: saber o que quer, entender o problema, conhecer o cliente, ter a visão... isso vocês já trouxeram de casa. É o que vocês fazem a vida inteira nos negócios de vocês. A barreira que faltava, a língua da máquina, caiu. Então deixa eu dizer com todas as letras: qualquer pessoa cria software. Inclusive você. Inclusive HOJE, antes do almoço.`,
  colheita_ideias: `E agora eu cobro o dever de casa do intervalo. Que problema SEU um app resolveria? Quero ouvir, fala aí quem tá na sala, manda no chat quem tá online, e eu vou ANOTAR, olha o papel aqui na minha mão. [colher 4-5 ideias em no máximo uns 4 min, pra sobrar tempo de build; ler 1-2 do chat em voz alta; se travar, puxar: 'um controle de escala da clínica? uma lista de espera do restaurante? um agendamento pro consultório?'] Olha isso... [repetir as ideias anotadas em voz alta] Guardem essas ideias, e eu vou guardar este papel, porque daqui a alguns minutos a gente vai escolher UMA delas... e ela vai deixar de ser ideia na frente de vocês. Vocês não vão assistir a uma demonstração. Vocês acabaram de virar coautores do que vem agora.`,
  preparar_estrategia: `Só que, segura o cavalo, antes de eu abrir a ferramenta, deixa eu te dar o pulo do gato, porque quem chega no vibecoding e sai pedindo tudo de uma vez se perde. A preparação é oitenta por cento do resultado, e ela acontece FORA da tela, com você pensando. Quatro passos. Primeiro: qual é o problema, e pra QUEM? Não é 'um app de gestão', é 'um jeito da recepcionista ver a agenda do dia no celular'. Uma dor, uma pessoa real. Segundo: a função-núcleo, a UMA coisa que o app PRECISA fazer. Se você só pudesse ter UMA tela funcionando, qual seria? O resto é enfeite, fica pra depois. Terceiro: comece pequeno, o menor app que já é útil; dá pra crescer amanhã, lembra que errar é barato. E quarto: pense em passos, nas telas na ordem, a pessoa entra, faz a ação principal, vê o resultado. Repara: nada disso é técnico. É você organizando a ideia antes de descrever. Quem prepara, constrói em vinte minutos; quem não prepara, briga com a tela por duas horas. Pega já a sua ideia do papel e roda esses quatro no automático: problema, pra quem, função-núcleo, passos.`,
  primeiro_pedido: `E aí, com a ideia organizada, o primeiro pedido, o briefing. Lembra do cabeleireiro lá do começo? É a mesma coisa, agora valendo. Um: diga o que é e pra quem, numa frase só, 'um app pra recepcionista marcar consulta'. Dois: liste as telas principais, do jeito que você imaginou nos passos, 'uma tela de entrada, uma tela com a agenda do dia, uma tela pra criar um agendamento novo'. Três: descreva como se estivesse explicando pra um amigo leigo, nada de termo técnico, a IA entende português melhor do que qualquer um de nós. E quatro: diga o estilo, a cara que você quer, 'simples, limpo, com a cor da minha marca'. E o segredo que separa quem flui de quem sofre: peça UMA coisa de cada vez. Não despeje o app inteiro num parágrafo gigante, construa em camadas, conversando, olhando cada passo aparecer. É EXATAMENTE isso que eu vou fazer agora, na sua frente.`,
  chega_de_slide: `E chegou a hora que eu mais gosto. Façamos um balanço do que vocês já têm: vocês sabem o que é a IA, o corretor que leu a biblioteca do mundo. Sabem do que todo app é feito, o salão, a cozinha, o drive-thru, o caderno. Sabem o que é vibecoding, a reforma sem obra. E sabem até como se prepara antes de pedir. Ou seja: teoria dada. Não tem mais nada que um slide possa fazer por vocês. Agora eu abro a tela e monto um restaurante inteiro, salão, cozinha, caderno e tudo, na frente de vocês, do zero, conversando em português. Só deixa eu te mostrar o mapa da próxima uma hora, pra ninguém se perder.`,
  mapa_pratica: `O mapa é esse, em quatro passos. Primeiro, uns quinze minutos de banho de loja: eu te mostro a ferramenta por dentro, onde se conversa, onde o app aparece, sem pressa. Depois a gente escolhe UMA ideia, deste papel aqui, das que vocês me deram. Aí eu peço, em português, na tela, com vocês lendo cada palavra do meu pedido, meu briefing de cabeleireiro em tempo real. E a meta final: o app NO AR, com link, antes de você ir embora, pra você abrir no seu celular e mandar no grupo da família. E um combinado honesto, porque ao vivo é ao vivo: se alguma coisa travar no meio, eu sigo em frente, estilo programa de culinária, tem bolo pronto no forno. O que não vai acontecer é a gente terminar sem app.`,
  aovivo_final: `Vocês passaram duas horas entendendo COMO funciona. Agora vocês vão ver QUANTO TEMPO leva. Cronometra aí, pega o celular, abre o cronômetro, eu tô falando sério: eu quero que você tenha o número gravado no seu relógio, não na minha palavra. [este slide fica queimando na tela durante a troca, abrir o Lovable e compartilhar. quando o app estiver no ar, avance pros 2 últimos slides pra fechar] Bora construir.`,
  licao_de_casa: `Antes de qualquer coisa, deixa eu voltar naquela segunda pergunta que eu fiz lá no comecinho: quem aqui já criou um software? Levanta a mão de novo agora. [espera, e comenta as mãos] Olha a diferença pra duas horas atrás. Vocês acabaram de ver um nascer, do zero, e já sabem como funciona por dentro. Agora a parte séria, porque quem só assiste esquece e quem faz aprende: essa é a sua lição de casa. Ainda essa semana, entra no lovable.dev, cria uma conta, que é de graça, e monta alguma coisa SUA. Não precisa ser grande, pelo contrário: pega uma dorzinha do teu dia a dia e faz o menor app que resolve ela. E traz pro próximo encontro, que é onde a gente pega o que VOCÊ construiu e transforma num produto de verdade.`,
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
      2: { number: 2, name: "a IA", subtitle: "a máquina que adivinha" },
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
