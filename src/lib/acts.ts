// Mapeamento de slides para atos da narrativa CHŎRA
export type Act = 1 | 2 | 3 | 4;

export type ActMeta = {
  number: Act;
  name: string;
  subtitle: string;
};

export const ACTS: Record<Act, ActMeta> = {
  1: { number: 1, name: "sentir", subtitle: "como a turma chega" },
  2: { number: 2, name: "quem fala", subtitle: "história + filosofia" },
  3: { number: 3, name: "o que mudou", subtitle: "tecnologia, IA, lovable" },
  4: { number: 4, name: "construir", subtitle: "ao vivo, juntos" },
};

// Slide index ranges (0-based) por ato. Baseado no slideManifest.
// Ato 1: 1-7   (ato_1_sentir → sentiment_analysis; índice 0 é a capa)
// Ato 2: 8-25  (ato_2_quem_fala → design_x_sharp)
// Ato 3: 26-51 (ato_3_o_que_mudou → chegou_a_hora; inclui ponte lovable)
// Ato 4: 52+   (ato_4_construir → vai_la_e_cria)
export function actForSlide(idx: number): Act {
  if (idx <= 7) return 1;
  if (idx <= 25) return 2;
  if (idx <= 51) return 3;
  return 4;
}

// Primeiro slide de cada ato, agora como slides manuais no manifest.
export function isActOpener(idx: number): boolean {
  return idx === 1 || idx === 8 || idx === 26 || idx === 52;
}
