// Mapeamento de slides para atos da apresentação chŏra
export type Act = 1 | 2 | 3 | 4;

export type ActMeta = {
  number: Act;
  name: string;
  subtitle: string;
};

export const ACTS: Record<Act, ActMeta> = {
  1: { number: 1, name: "por quê", subtitle: "o risco que você não vê" },
  2: { number: 2, name: "supabase", subtitle: "RLS, edge, RPC" },
  3: { number: 3, name: "código + governança", subtitle: "LGPD + ferramentas" },
  4: { number: 4, name: "arquitetura", subtitle: "escalar sem dor" },
};

// Boundaries por índice (0-based) recomputados a partir do slideManifest atual (55 slides).
// Ato 1: 0-7    (cover → ponte_supabase)
// Ato 2: 8-15   (ato_2_supabase → exemplo_bom)
// Ato 3: 16-47  (ato_3_codigo → prompt_auditoria — inclui LGPD + ferramentas)
// Ato 4: 48-54  (ato_4_arquitetura → vai_la_proteja)
export function actForSlide(idx: number): Act {
  if (idx <= 7) return 1;
  if (idx <= 15) return 2;
  if (idx <= 47) return 3;
  return 4;
}

// Primeiro slide de cada ato (slide de transição "act")
export function isActOpener(idx: number): boolean {
  return idx === 1 || idx === 8 || idx === 16 || idx === 48;
}
