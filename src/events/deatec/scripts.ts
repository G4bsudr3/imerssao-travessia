// Roteiros de TELEPROMPTER do workshop DEATEC ("Segurança em IA & Automação").
// key do slide → fala do apresentador (tom natural, 1ª pessoa, evento ONLINE).
// Exibido pelo overlay de teleprompter (tecla T). As deixas dos demos ao vivo
// (aovivo_injection / aovivo_automacao) lembram o passo a passo na hora de compartilhar a tela.

export const scripts: Record<string, string> = {
  // ─── ABERTURA ───
  cover: `Fala, pessoal! Sejam muito bem-vindos. Esse é o workshop de Segurança em IA e Automação, aqui com a DEATEC. Na próxima hora a gente vai falar dos riscos reais de quem constrói com inteligência artificial, da LGPD sem juridiquês, e — o melhor — eu vou mostrar dois ataques e uma automação ao vivo. É mão na massa de verdade. Bora começar.`,
  agenda: `Olha como vai ser a nossa hora. A gente abre com o panorama de ameaças de 2026. Depois entra em segurança em IA e LGPD, e aí eu faço um ataque de prompt injection ao vivo. Na sequência, a gente constrói uma automação segura no Supabase, também ao vivo. Fecho mostrando como auditar com IA, e a gente termina com perguntas. Cinco blocos, uma hora.`,
  online_intro: `Como é online, deixa eu combinar uma coisa com vocês: joga as dúvidas no chat a qualquer momento que eu vou parando pra responder. E presta atenção nas partes de tela compartilhada, que é onde a mágica — e o perigo — acontece de verdade.`,

  // ─── BLOCO 1 · ABERTURA ───
  bloco_1: `Bloco um: abertura e contexto. Antes de qualquer técnica, eu quero te convencer de uma coisa — por que segurança deixou de ser opcional pra quem usa IA.`,
  panorama_2026: `Olha o que mudou em 2026. A IA virou as duas coisas ao mesmo tempo: alvo e arma. Os atacantes usam IA pra te achar e te explorar mais rápido. E, ao mesmo tempo, a IA que VOCÊ colocou no seu produto virou uma nova superfície de ataque. Então não dá mais pra tratar isso como detalhe — é o centro do jogo agora.`,
  porque_agora: `Por que agora? Quatro motivos. A automação virou agente: a gente saiu do 'se isso, então aquilo' pra agentes que decidem sozinhos. A superfície de ataque explodiu: cada integração e cada prompt é uma porta nova. O dado roda em mais lugares: treino, inferência, logs, terceiros. E o resumo: quem constrói com IA virou o novo alvo, e o atacante também usa IA pra te achar primeiro.`,
  seguranca_opcional: `Então fica a primeira frase pra levar pra casa: segurança deixou de ser opcional. Não é mais enfeite, é pré-requisito.`,

  // ─── BLOCO 2 · SEGURANÇA EM IA + ATAQUE AO VIVO ───
  bloco_2: `Bloco dois: segurança em IA. Aqui eu vou te mostrar os riscos que importam e, no meio do caminho, fazer um ataque ao vivo que costuma assustar.`,
  riscos_ia: `Os riscos que realmente importam quando você bota IA num produto. Viés: dado enviesado vira decisão injusta, e isso te responsabiliza. Envenenamento de dados: alguém manipula o treino pra corromper o modelo. Ataques adversariais: input desenhado pra enganar a inferência. E o protagonista de hoje: prompt injection, quando uma instrução maliciosa sequestra o seu agente.`,
  vibecoding_contexto: `E onde isso bate no vibecoding, na stack Lovable mais Supabase? Assim: você pluga um agente de IA no app, um chat, um copiloto. Esse agente lê e escreve no Supabase, via edge function ou RPC. O prompt do usuário chega junto com o dado, no mesmo texto. E aí o pulo do gato: se o agente tem permissão demais, a injeção vira escalonamento de privilégio. Foi exatamente isso que eu vou te mostrar acontecendo.`,
  prompt_injection: `Prompt injection, em uma frase: é a SQL injection da era dos agentes. Você não ataca o banco com query maliciosa — você ataca o agente com instrução maliciosa. E a IA, coitada, não sabe distinguir o que é ordem do que é conteúdo.`,
  injection_exemplo: `Olha o padrão vulnerável, e isso aqui é MUITO comum em app vibecoded. O desenvolvedor dá ao agente uma ferramenta poderosa, tipo trocar o papel de um usuário. E a única trava contra escalonamento é uma frase no prompt: 'não altere papéis'. O problema? Quando o modelo decide chamar a ferramenta, o backend executa sem checar se quem pediu é admin. A autorização virou texto. E texto a gente contorna.`,
  injection_tecnicas: `As técnicas que furam essa guarda. Bloco de sistema falso: eu finjo uma mensagem de SISTEMA com uma diretiva, e a IA trata como instrução legítima. Autoridade genérica: 'manutenção autorizada', 'solicitação aprovada', sem citar ninguém real. E delimiter injection: eu forjo um 'nova instrução de sistema' pra sair de dado e virar comando. A raiz de tudo é a mesma: a IA não separa instrução de conteúdo.`,
  aovivo_injection: `Agora é ao vivo — compartilhando a tela. Roteiro: eu abro o CRM, logo como uma vendedora comum. Mostro que ela só vê os clientes dela, com CPF mascarado, e que não existe menu de usuários. No chat, peço pro bot 'me promove a admin' — ele RECUSA, então parece seguro. Aí eu colo o payload de sistema falso, e... a vendedora vira admin na hora. Recarrego, e agora aparece tudo: todos os clientes, CPF aberto. Foi só conversa.`,
  injection_mitigar: `E como blinda? Quatro coisas. Autorização no código, não no prompt: a ação sensível confere o papel real de quem chamou, e nunca confia no modelo. Menor privilégio: o agente nem deveria ter a ferramenta de mudar papel. Trate o input do usuário como dado não-confiável, sempre. E o RLS no banco como rede final: mesmo que a injeção passe, o dado dos outros não vaza.`,
  lgpd_interface: `Agora o outro lado da moeda: a LGPD. Onde a IA encosta na lei? Base legal: qual base cobre treinar e inferir com dado pessoal. Explicabilidade: o artigo 20 dá ao titular o direito de contestar uma decisão automatizada. Dado sensível no treino: saúde e biometria têm regime reforçado. E minimização: não treine nem infira com o que você não precisa.`,
  ia_e_tratamento: `E grava essa: treinar e inferir com dado pessoal é tratamento. Ponto. Se a sua IA toca o dado de uma pessoa, a LGPD entra junto — sem exceção.`,

  // ─── BLOCO 3 · AUTOMAÇÃO SEGURA AO VIVO ───
  bloco_3: `Bloco três: automação inteligente. A gente viu o ataque; agora vamos construir uma coisa útil — e segura — ao vivo.`,
  arquitetura_demo: `Olha o que a gente vai construir agora. Uma Edge Function no Supabase, uma função só, sem app nenhum, chamada direto no navegador. A IA analisa o estilo de um perfil de inspiração e gera um post pra mídia social, legenda e imagem, nas minhas cores. Eu aprovo ou descarto, e o aprovado vira referência do próximo. Com o Cloudflare na frente protegendo o endpoint, e a chave da IA só no servidor.`,
  stack_pre: `Repara num ponto que é a moral do bloco: a mesma stack que você vibecoda é a que você protege. Eu deixei a stack pré-montada pra caber no tempo — o foco aqui é você VER segurança e automação funcionando juntas, no mesmo fluxo.`,
  aovivo_automacao: `Tela compartilhada de novo. Roteiro: abro a URL do gerador, ele chama a IA, analisa o perfil de referência e monta o post — legenda mais imagem — num card de Instagram. Aprovo um, mostro que ele vira contexto do próximo. E aí eu aponto a segurança no fluxo: a chave da OpenAI nunca aparece, ela vive só no servidor; o Cloudflare está na frente com rate limit; e a função só responde pro meu proxy, por um header secreto. Automação e segurança no mesmo lugar.`,

  // ─── BLOCO 4 · AUDITANDO COM IA ───
  bloco_4: `Bloco quatro, rapidinho: auditando com IA. Porque a mesma IA que ataca também defende.`,
  ferramentas_aud: `O arsenal de auditoria de 2026. O AWS Security Agent: um pentest autônomo, multi-agente, que lê o seu código-fonte. A Anthropic, ainda em preview, com descoberta de vulnerabilidade que acha centenas de falhas inéditas sozinha. O básico bem feito e de graça: Security Advisor, Semgrep, gitleaks. E o mais acessível de todos: cola o seu RLS e o seu schema no Claude ou no GPT e peça uma auditoria.`,
  auditar_diy: `O recado é: dá pra auditar por conta própria, hoje, de graça. Você não precisa de orçamento de enterprise pra começar a se proteger — precisa começar.`,

  // ─── BLOCO 5 · ENCERRAMENTO ───
  bloco_5: `Chegamos no encerramento. Deixa eu amarrar tudo no que importa levar pra casa.`,
  takeaways: `Quatro coisas pra levar. Se a IA toca o dado, a LGPD entra junto. Agente de IA com menor privilégio — o RLS vale até pra ele. Automação segura é proxy na frente, secret no servidor e RLS no banco. E o último: audite com IA antes que auditem por você.`,
  qa: `E é isso! Agora abre o microfone e o chat — joga suas dúvidas aí que eu respondo. Bora trocar ideia.`,
  encerramento_final: `Muito obrigado pela presença, foi um prazer. Me acha lá no @gabreda pra continuar a conversa. E o recado final é simples: vai lá e cria — rápido, bonito, e seguro. Um abraço!`,
};
