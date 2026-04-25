// Manifest dos 84 slides — fonte da verdade da apresentação CHŎRA
// Narrativa em 4 atos: Sentir · Quem fala · O que mudou · Construir
import type { StaticProps } from "@/components/slides/SlideStatic";
import type { Phase } from "@/contexts/RoomContext";

export type SlideEntry =
  | { key: string; kind: "static"; staticProps: StaticProps }
  | { key: string; kind: "special"; component: string; props?: Record<string, unknown> };

export const slideManifest: SlideEntry[] = [
  // ─── ATO 1 · SENTIR (1–8) ───
  // 1
  { key: "cover", kind: "special", component: "CoverSlide" },
  { key: "ato_1_sentir", kind: "static", staticProps: { variant: "act", eyebrow: "ato 1", title: "sentir", subtitle: "como a turma chega", background: "naval" } },
  // 2
  { key: "lobby", kind: "special", component: "LobbySlide" },
  // 3
  { key: "pulse", kind: "special", component: "PulseCheckSlide" },
  // 4 — agenda 4 atos
  {
    key: "agenda",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "agenda · 60 min",
      items: [
        { label: "1. sentir", sub: "como a turma chega" },
        { label: "2. quem fala", sub: "história + filosofia" },
        { label: "3. o que mudou", sub: "tecnologia, IA, lovable" },
        { label: "4. construir", sub: "ao vivo, juntos" },
      ],
    },
  },
  // 5–8 sentiment
  { key: "sentiment_pergunta", kind: "special", component: "SentimentQuestion" },
  { key: "sentiment_collecting", kind: "special", component: "SentimentCards" },
  { key: "sentiment_analysis", kind: "special", component: "SentimentAnalysis" },

  // ─── ATO 2 · QUEM FALA / POR QUÊ (9–25) ───
  // 9
  { key: "ato_2_quem_fala", kind: "static", staticProps: { variant: "act", eyebrow: "ato 2", title: "quem fala", subtitle: "história + filosofia", background: "naval" } },
  { key: "ponte_eu", kind: "static", staticProps: { variant: "transition", title: "antes de continuar." } },
  // 10
  { key: "oi", kind: "special", component: "OiSlide" },
  // 11
  { key: "no_comeco", kind: "special", component: "NoComecoSlide" },
  // 12
  { key: "no_meio", kind: "special", component: "NoMeioSlide" },
  // 13
  { key: "oposicao_intro", kind: "special", component: "OposicaoIntroSlide" },
  // 14 — quadro completo das 7 oposições/clarezas
  { key: "quadro_oposicao_clareza", kind: "special", component: "QuadroOposicaoClarezaSlide" },
  // 15
  { key: "a_dor", kind: "static", staticProps: { variant: "headline", title: "a dor significa o jogo." } },
  // 16
  { key: "hoje", kind: "special", component: "HojeSlideRich" },
  // 17 — prova social
  { key: "prova_social", kind: "special", component: "ProvaSocialSlide" },
  // 18 — sucesso medida errada
  { key: "sucesso_errado", kind: "special", component: "SucessoMedidaErradaSlide" },
  // 19 — sucesso medida certa
  { key: "sucesso_certo", kind: "special", component: "SucessoMedidaCertaSlide" },
  // 20 — Naval corpo/mente
  { key: "naval_corpo_mente", kind: "special", component: "NavalCorpoMenteSlide" },
  // 21 — Naval iterações
  { key: "naval_iteracoes", kind: "special", component: "NavalIteracoesSlide" },
  // 22
  { key: "transicao_volta", kind: "static", staticProps: { variant: "transition", title: "agora, zoom out." } },
  // 23
  { key: "iterar", kind: "static", staticProps: { variant: "two-line", title: "o trunfo é", subtitle: "iterar rápido." } },
  // 24
  {
    key: "ia_pra_que",
    kind: "static",
    staticProps: {
      variant: "list",
      eyebrow: "IA pra quê",
      items: [{ label: "amplificar sharp thinking" }, { label: "acelerar design thinking" }, { label: "comprimir tempo" }],
    },
  },
  // 25
  { key: "design_x_sharp", kind: "special", component: "DesignXSharpSlide" },

  // ─── ATO 3 · O QUE MUDOU NO MUNDO (26–44) ───
  // Sequência narrativa importada do projeto v2 e adaptada ao design system do chŏra.
  // 26
  { key: "ato_3_o_que_mudou", kind: "static", staticProps: { variant: "act", eyebrow: "ato 3", title: "o que mudou", subtitle: "tecnologia, IA, lovable", background: "naval" } },
  { key: "bh_1900", kind: "special", component: "BH1900Slide" },
  // 27
  { key: "vieram_carros", kind: "special", component: "VieramCarrosSlide" },
  // 28
  { key: "encurtou_caminho", kind: "special", component: "EncurtouCaminhoSlide" },
  // 29
  { key: "matou_profissoes", kind: "special", component: "MatouProfissoesSlide" },
  // 30
  { key: "profissoes_surgiram", kind: "special", component: "ProfissoesSurgiramSlide" },
  // 31
  { key: "vieram_avioes", kind: "special", component: "VieramAvioesSlide" },
  // 32
  { key: "aviao_nao_matou", kind: "special", component: "AviaoNaoMatouSlide" },
  // 33
  { key: "encurtou_mais", kind: "special", component: "EncurtouMaisSlide" },
  // 34
  { key: "trabalho_muda", kind: "special", component: "TrabalhoMudaSlide" },
  // 35
  { key: "ia_fazendo", kind: "special", component: "IAFazendoSlide" },
  // 36
  { key: "nada_novo", kind: "special", component: "NadaNovoSlide" },
  // 37
  { key: "mais_facil", kind: "special", component: "MaisFacilSlide" },
  // 38
  { key: "humano_se_ocupar", kind: "special", component: "HumanoSeOcuparSlide" },
  // 39
  { key: "risco_charrete", kind: "special", component: "RiscoCharreteSlide" },
  // 40
  { key: "e_agora_ia", kind: "special", component: "EAgoraIASlide" },
  // 39 — empilhar ferramentas (1, 2, 3, 4, 5)
  { key: "um_e_pouco", kind: "special", component: "UmEPoucoSlide" },
  // 40
  { key: "megazord", kind: "special", component: "MegazordVisualSlide" },
  // 41 — Naval vibe coding
  { key: "naval_vibe", kind: "special", component: "NavalVibeCodingSlide" },
  // 42
  { key: "por_que_lovable", kind: "static", staticProps: { variant: "headline", title: "por que lovable?" } },

  // ─── PONTE LOVABLE (43–48) ───
  // 43
  { key: "lovable_numbers", kind: "special", component: "LovableNumbersSlide" },
  // 44
  { key: "lovable_usado", kind: "special", component: "LovableUsadoPorSlide" },
  // 45
  { key: "lovable_une", kind: "special", component: "LovableUneTimesSlide" },
  // 46
  { key: "tese", kind: "static", staticProps: { variant: "two-line", title: "tese:", subtitle: "ideia boa é ideia construída." } },
  // 47
  { key: "build_intro", kind: "special", component: "BuildIntro" },
  // 48
  { key: "chegou_a_hora", kind: "static", staticProps: { variant: "two-line", title: "chegou a hora.", subtitle: "vamos construir agora." } },

  // ─── ATO 4 · CONSTRUIR ───
  { key: "ato_4_construir", kind: "static", staticProps: { variant: "act", eyebrow: "ato 4", title: "construir", subtitle: "ao vivo, juntos", background: "naval" } },
  { key: "pergunta_problema", kind: "special", component: "BrainstormQuestion" },
  { key: "brainstorm_active", kind: "special", component: "BrainstormActive" },
  { key: "5_na_mesa", kind: "special", component: "BrainstormSettled" },
  { key: "voting_active", kind: "special", component: "VotingActive" },
  { key: "vencedora", kind: "special", component: "VotingWinner" },
  // CTA: abrir o passo a passo externo e construir junto
  {
    key: "mao_na_massa_link",
    kind: "static",
    staticProps: {
      variant: "two-line",
      eyebrow: "mão na massa",
      title: "iapravidax.lovable.app",
      subtitle: "vou abrir e construir agora.",
      href: "https://iapravidax.lovable.app",
      cta: "abrir o passo a passo",
    },
  },

  // ─── ENCERRAMENTO (76–83) ───
  // 76
  { key: "celebracao", kind: "special", component: "CelebrationSlide" },
  // 78
  { key: "respiro", kind: "static", staticProps: { variant: "transition", title: "respira." } },
  // 79
  {
    key: "recap_mentalidade",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "mentalidade que fica",
      items: [
        { label: "oposição → clareza" },
        { label: "sharp + design" },
        { label: "iterar" },
        { label: "megazord" },
      ],
    },
  },
  // 80
  {
    key: "recap_ferramentas",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "ferramentas",
      items: [
        { label: "claude · gpt · gemini", sub: "pensar", icon: "brain" },
        { label: "lovable", sub: "construir", icon: "heart" },
        { empty: true },
        { empty: true },
      ],
    },
  },
  // 81
  { key: "os_dois", kind: "static", staticProps: { variant: "two-line", title: "os dois juntos.", subtitle: "sempre." } },
  // 82
  { key: "penso_logo_crio", kind: "static", staticProps: { variant: "two-line", title: "penso,", subtitle: "logo crio." } },
  // 83
  {
    key: "3_caminhos",
    kind: "static",
    staticProps: {
      variant: "grid",
      eyebrow: "3 caminhos pra segunda",
      items: [
        { label: "tarefa chata", sub: "automatiza uma" },
        { label: "ideia parada", sub: "constrói o esqueleto" },
        { label: "time", sub: "ensina alguém" },
      ],
    },
  },
  // 84
  { key: "vai_la_e_cria", kind: "special", component: "FinalSlide" },
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
