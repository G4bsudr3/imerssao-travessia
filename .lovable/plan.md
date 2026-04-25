## Diagnóstico

O morph atual tem 3 problemas estruturais que precisam ser resolvidos juntos. Ataque parcial não resolve.

### 1. O cadeado não lê como cadeado
`SHAPE_LOCK` hoje é só um blob arredondado com leve estreitamento no topo. Cadeado real precisa de **2 elementos visuais distintos**: corpo (retangular arredondado) + arco/shackle (a alça em U aberto em cima). Forçar tudo num path único com a mesma topologia da gota nunca vai dar leitura semântica de "cadeado", por mais que se ajustem pontos.

### 2. A interpolação está travada
`framer-motion` interpolando `d` como string faz mistura **caractere por caractere**, não interpolação geométrica. Quando os pontos de controle não se correspondem semanticamente entre as 4 shapes, dá warp não-linear: parece pulo, deformação suja, "saltinhos". É exatamente a sensação de "travado" que você descreveu.

### 3. Falta respiro e profissionalismo
4 keyframes em loop seco de 8s, easing único, sem rotação, sem variação de escala, sem pausas. O ciclo inteiro passa como "transição mecânica" em vez de "transformação orgânica".

---

## Solução proposta

### A. Adicionar `flubber` pra interpolação real de path
Flubber (Mike Bostock, autor do D3) é a lib padrão pra morph SVG profissional. Ela aceita paths com **topologias diferentes** (1 path → 2 paths, gota → cadeado de verdade) e gera os pontos intermediários de forma geométrica. Resolve a raiz do "travado".

Tamanho: ~12kb gzipped, zero dependências peso. Vale a troca.

### B. Reconstruir o cadeado como 2 paths reais
Em vez de espremer cadeado num blob:
- **Corpo**: retângulo super arredondado (rounded square ~60x55, com cantos generosos pra parecer brand chŏra, não cadeado genérico)
- **Arco/shackle**: U aberto no topo, traçado com `stroke` + `stroke-linecap="round"` ou path fechado fino

Quando o morph está fora do estado "lock", o arco fica com `opacity: 0` e `pathLength: 0` (animado via framer-motion). Quando entra no estado lock, ele "desenha" no topo do corpo. Isso dá leitura **inequívoca** de cadeado e ainda fica visualmente lindo (efeito de traçar).

### C. Sequência narrativa, não loop seco
Refazer a sequência de morph com pausas e easing por trecho:

```
gota (pausa 1.2s, respira) 
  → [1.6s, easeInOut] plasma A 
    → [1.4s, easeInOut] plasma B (microvariação, sem voltar pra gota)
      → [1.6s, easeInOut] cadeado (corpo)
        + [0.5s atrasado, easeOut] arco desenha
        → pausa 1.4s no cadeado fechado
        ← [0.4s, easeIn] arco se apaga
      ← [1.6s, easeInOut] plasma C
    ← [1.6s, easeInOut] gota
  → loop
```

Total ~12-14s por ciclo. Mais lento, mais respirado, mais "vivo".

### D. Camadas de movimento secundário
Pra dar profundidade profissional além do morph:
- **Rotação sutil contínua**: -3° a +3° em loop de 10s, fora de fase com o morph
- **Escala respirando**: 0.98 → 1.02 em loop de 4s (efeito breathing, comum em logos animados premium)
- **Gradient drift**: animar levemente a posição dos stops do gradiente pra cor "fluir" dentro da forma (sutil, ~6s loop)

Tudo respeita `prefers-reduced-motion` (cai pra path estático).

### E. Manter API e compatibilidade
- Prop `morphing` continua existindo, mesmo nome, mesmo comportamento de ativação
- Prop `spinning` intocado (usado em 6 outros lugares)
- Sem breaking change pros outros slides

---

## Arquivos a editar

1. **`package.json`** (via `bun add`): adicionar `flubber` + `@types/flubber`
2. **`src/components/brand/LagrimaGradient.tsx`**: reescrever a lógica de morph com flubber + useMotionValue + useTransform, adicionar segundo `motion.path` pro arco do cadeado, adicionar camadas de movimento secundário
3. **Verificação**: `tsc --noEmit` e checagem visual via screenshot na rota `/` pra confirmar que o `CoverSlide` está fluido

## O que NÃO vai mudar
- Paleta de cores (laranja → rosa → azul brand)
- Tamanho default 200, viewBox 100x125
- Comportamento de `spinning`, `size`, `className`
- Uso em Join, Lobby, AltTab, Celebration, Misc

## Risco
Baixo. Flubber é estável (8 anos, 4M downloads/mês), e o fallback com `useReducedMotion` cobre acessibilidade. Se você não curtir a sequência narrativa depois de ver, ajustamos timing/ordem das shapes em 1 iteração.