## Diagnóstico

Olhando o `LagrimaGradient.tsx` atual, três problemas concretos:

1. **O "cadeado" é só um rounded-square largo** (`SHAPE_LOCK_BODY` hoje é 88 de largura por 76 de altura, quase quadrado). Sem proporção vertical e sem o vão da chave, o cérebro lê "sacola" / "etiqueta" antes de "cadeado".
2. **O shackle (arco) é fino demais e some rápido**, então o frame em que ele aparece desenhado dura pouco e o olho não fixa o ícone.
3. **A transição entre gota → plasma → cadeado é "geometricamente correta" (flubber) mas visualmente morta**: não tem o "gotejar", "esticar", "pingar" que faz uma gosma parecer gosma. É só um morph linear de silhueta.

## O que eu vou mudar

### 1. Redesenhar o cadeado (anatomia real)

Substituir `SHAPE_LOCK_BODY` por um corpo com **proporção de cadeado**: mais alto que largo, ombros levemente achatados em cima (onde o shackle entra), base com cantos arredondados generosos. Algo como `width 64 × height 70`, centralizado em x=50, top em y≈46.

Adicionar **dois elementos novos** que só aparecem no estado lock:
- **Shackle reforçado**: arco em U mais grosso (`strokeWidth 11-12`), com as pontas "encaixando" levemente dentro do corpo (não flutuando acima). Mantém a animação de `pathLength` desenhando.
- **Vão da chave (keyhole)**: um círculo pequeno + uma fenda vertical descendo, posicionado em x=50, y≈75. Renderizado como recorte (`mask` ou path com `fill-rule="evenodd"` no próprio corpo) pra ser de fato um vão furado, não um adesivo por cima. Aparece com fade + scale curtinho depois do shackle terminar de desenhar.

### 2. Tornar a transição "gosmenta" de verdade

Hoje os dois plasmas (A e B) são silhuetas estáticas. Vou:

- **Adicionar 2 shapes intermediários novos**: `SHAPE_DRIP` (gota esticando pra baixo, formando um pingo que quase se desprende) e `SHAPE_BLOB` (forma irregular tipo amoeba, com 2 lóbulos assimétricos). Sequência nova fica: gota → drip → blob → plasma → corpo do cadeado → plasma → blob → drip → gota.
- **Animar o filtro SVG** durante os estados gosmentos: aplicar um `<filter>` com `feGaussianBlur` + `feColorMatrix` (efeito "goo"/metaball clássico) que fica ativo só nos shapes intermediários e desaparece nos extremos (gota nítida, cadeado nítido). Isso é o que dá a sensação de líquido viscoso de verdade, não só silhueta morfando.
- **Adicionar uma "pingo satélite"**: uma elipse pequena que sai do shape principal nos frames de drip/blob, cai um pouquinho, e é reabsorvida. Detalhe que vende a ideia de gosma viscosa.
- **Easing diferente por trecho**: trechos gosmentos usam easing elástico/squishy (`[0.6, -0.05, 0.4, 1.05]`); trecho de "cristalização" no cadeado usa easing firme com pequeno overshoot pra dar a sensação de "trava". Hoje tudo usa o mesmo `[0.65, 0, 0.35, 1]`.

### 3. Coreografia do estado cadeado

Quando o morph chega no corpo do cadeado:
1. Corpo se solidifica (filtro goo desliga, escala dá um leve "thud" 0.96 → 1).
2. Shackle desenha de fora pra dentro (já existe, mas mais grosso).
3. **Keyhole abre** (scale 0 → 1 com easing back, ~250ms) — esse é o frame que ancora "isso é um cadeado".
4. Hold de ~1.4s.
5. Keyhole fecha → shackle desenha ao contrário → filtro goo religa → volta a derreter.

### 4. Ajustes finos

- Reduzir levemente o tempo total de cada segmento de 1.6s pra ~1.2s nos trechos gosmentos (ficam mais fluidos) e manter 1.6s na entrada/saída do cadeado (dá peso ao momento).
- O shackle ganha um leve gradient highlight no topo (stop com brilho) pra parecer metal, não fita.
- Manter `useReducedMotion` desativando tudo (sem mudança).

## Arquivos a editar

- `src/components/brand/LagrimaGradient.tsx` — única mudança. Adiciona shapes novos, filtro goo, keyhole como mask, coreografia ajustada.

Sem novas dependências (flubber e framer-motion já cobrem tudo).

## O que **não** vou mexer

- `CoverSlide.tsx` continua igual, já passa `morphing`.
- O gradiente laranja → rosa → roxo da identidade fica intacto.
- Tamanho/proporção do SVG (viewBox 100×125) fica igual pra não quebrar layouts que já consomem o componente.

## Pergunta antes de implementar

O hold no estado cadeado hoje é 1.4s. Pra dar tempo do olho ler "shackle + keyhole" sem ficar lento demais, ideal seria ~1.8s. Posso aumentar pra 1.8s ou prefere manter 1.4s pra não atrasar o ciclo geral?