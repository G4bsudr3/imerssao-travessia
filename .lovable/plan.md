## Objetivo

Apresentação está pronta no esqueleto, mas tem bugs que constrangem ao vivo, tipografia secundária pequena pra sala grande, e algumas redundâncias de conteúdo. Esse plano deixa ela sólida pros 30 minutos.

---

## 1. Bugs críticos (precisa corrigir antes de qualquer coisa)

### 1.1 Typewriter do CodeBlockSlide vazando HTML
**Arquivo:** `src/components/slides/security/CodeBlockSlide.tsx`

Hoje a função `tokenize()` roda em cima do trecho parcial revelado pelo typewriter. Quando o slice cai no meio de uma tag `<span>`, o markup vaza visualmente como texto (vi `"text-zinc-500 italic">--` aparecendo na tela).

**Correção:** tokenizar o código completo uma vez, renderizar tudo no DOM, e revelar progressivamente via `clip-path: inset(0 X% 0 0)` ou via contagem de chars de **texto puro** (não de HTML). Abordagem mais simples: renderizar o code completo com `opacity:0` numa overlay e fazer a animação do cursor + um `clip-path` animado de 0 → 100%. Mantém a sensação de "digitação" sem risco de quebrar o markup.

### 1.2 Capa com tagline genérica
**Arquivo:** `src/components/slides/CoverSlide.tsx` (variant `intro`)

Hoje mostra "ideia boa é ideia construída." (tagline geral do CHŎRA). Trocar para algo do tema:
- eyebrow: `porto alegre · 25.04.2026 · chŏra lovable`
- subtítulo: `construa rápido. sem deixar buracos.`

### 1.3 Fechamento duplicado
**Arquivo:** `src/slides/slideManifest.tsx` + `src/components/SlideContainer.tsx`

O slide `vai_la_proteja` (StaticProps two-line "vai lá / e protege") está bom como fechamento real. Já o `SlideContainer.tsx:30` força `CoverSlide variant="final"` quando key é `vai_la_proteja` — código morto que nunca executa porque `vai_la_proteja` é `static`, não `special`. Remover essa linha pra não confundir manutenção futura.

### 1.4 Asset Supabase no slide do Ato 2
Validar visualmente que o ícone Supabase aparece. Se não aparecer (cor `#3ECF8E` em fundo naval/preto), garantir contraste e tamanho mínimo de 180px.

---

## 2. Síntese de conteúdo (cortes e ajustes)

Meta: passar de **30 → 27 slides** abrindo respiro pra ~1:07/slide.

**Cortar:**
- `o_que_e_rls` — funde com `quatro_operacoes` num slide só: eyebrow "RLS · row level security", título "regra que define quem vê qual linha", grid 4-up com SELECT/INSERT/UPDATE/DELETE.
- `recap` — redundante com `checklist_segunda`. Manter o checklist (acionável) e cortar o recap (abstrato).
- `quiz_resposta` — remover (decisão sua). O slide `exemplo_bom` já comunica a resposta certa.

**Ajustar conteúdo:**
- `buracos_comuns`: cortar os 3 itens que repetem `top_riscos_rls` (RLS desativado, service_role no front, MFA). Deixar só "edge sem validar JWT" e "logs com PII", e adicionar "secrets versionados no Git" e "anon key tratada como segredo" pra ficarem 4 itens novos.
- `lgpd_basico` lado direito: o título "o que custa" + bullets "multa, danos, ações" são o mesmo conceito repetido. Trocar bullets por **consequências práticas distintas**: "multa ANPD até 2% do faturamento", "bloqueio de tratamento por ordem da ANPD", "danos morais coletivos via MP", "perda de confiança do usuário".
- `governanca_acessos`: reclassificar "dev solo" de `low` → `medium` (ponto único de falha é risco real).
- `setup_robusto`: diz "5 configs" mas tem 4. Ou ajustar pra "4 configs", ou adicionar "secrets rotation · trocar chaves a cada 90 dias".
- Subtítulos dos atos: padronizar tom. Ato 4 está "escalar sem reaprender doendo" no manifest mas "escalar sem dor" em `acts.ts`. Escolher um (recomendo "escalar sem dor" — mais curto e direto).

---

## 3. Tipografia pra projetor

Apresentação será exibida em telona — fontes secundárias estão pequenas demais pra leitura no fundo da sala.

**Globais (em `src/index.css`):**
- `.eyebrow`: `text-xs` → `text-sm` (12px → 14px). Mantém a sensação de "rótulo discreto" mas vira legível.

**`SlideShell.tsx` e containers principais:**
- Trocar `max-w-6xl` (1152px) por `max-w-[1500px]` ou `max-w-7xl` em ComparisonSlide, RiskTableSlide, CodeBlockSlide e nos grids do SlideStatic. Hoje a apresentação ocupa só ~60% da largura útil em 1920px.

**`ComparisonSlide.tsx`:**
- Bullets: `text-base` → `text-2xl` (16px → 24px).
- Sub label: `text-lg` → `text-2xl`.
- Padding interno do card: `p-8` → `p-10`.
- Espaçamento entre bullets: `space-y-2` → `space-y-3`.

**`RiskTableSlide.tsx`:**
- Coluna risco: trocar `font-display text-2xl md:text-3xl` por `font-body text-2xl font-semibold` (parar de competir com mitigação).
- Coluna impacto e mitigação: `text-lg` → `text-2xl`, opacity `0.75` → `0.9`.
- Coluna mitigação: adicionar `font-display text-laranja` pra dar peso visual à ação (é o que importa).
- Padding das linhas: `py-6` → `py-7`.

**`SlideStatic.tsx`:**
- `grid` cards: `min-h-[140px]` → `min-h-[220px]`, `text-base` no sub → `text-xl`, `p-8` → `p-10`.
- `list` items sub: `text-base` → `text-2xl`.
- `stat` sub: `text-2xl` → `text-3xl`.
- `naval` subtitle: `text-2xl` → `text-3xl`.

**`CodeBlockSlide.tsx`:**
- Caption: `text-lg` → `text-2xl`.
- Code: `text-xl` → `text-2xl` (mantendo `leading-relaxed`).
- Badge "inseguro/seguro": `text-xs` → `text-sm`.

---

## 4. Hierarquia e composição

**RiskTableSlide:** invertendo o peso (item 3 acima já cobre): mitigação em laranja display, risco em sans semi-bold. A audiência sai do slide com a *ação* gravada, não com o nome do problema.

**Grids 4-up (agenda, quatro_operacoes, checklist_segunda):** com `min-h-[220px]` os cards passam a respirar e usam mais da altura disponível.

**Ato openers (slides naval com fundo preto):** já estão excelentes. Manter. Adicionar uma sutil linha laranja embaixo do número do ato pra reforçar continuidade (~2px, 60px de largura, centralizada).

---

## 5. Validação final

Depois de aplicar tudo, navegar pelos 27 slides em viewport 1920x1080 e tirar screenshot de cada um pra confirmar:
- Nenhum slide tem texto vazando do container.
- Nenhum slide tem mais de 60% de espaço vazio (top + bottom combinados).
- Code blocks renderizam limpo do começo ao fim do typewriter.
- Capa, transições de ato e fechamento estão consistentes em tom.

---

## Arquivos que serão tocados

- `src/components/slides/security/CodeBlockSlide.tsx` (bug typewriter + tipografia)
- `src/components/slides/security/ComparisonSlide.tsx` (tipografia + container)
- `src/components/slides/security/RiskTableSlide.tsx` (tipografia + hierarquia)
- `src/components/slides/SlideStatic.tsx` (tipografia grid/list/stat/naval)
- `src/components/slides/SlideShell.tsx` (não muda — containers ficam por slide)
- `src/components/slides/CoverSlide.tsx` (capa nova)
- `src/components/SlideContainer.tsx` (remover linha morta do CoverSlide final)
- `src/slides/slideManifest.tsx` (cortar 3 slides + ajustar conteúdo de buracos_comuns, lgpd_basico, governanca_acessos, setup_robusto, subtítulo do ato 4)
- `src/lib/acts.ts` (rebalancear boundaries dos atos depois dos cortes)
- `src/index.css` (eyebrow text-sm)

---

## Não está no escopo (fica pra próxima iteração)

- Acessibilidade `prefers-reduced-motion` nos slides (Kinetic e typewriter já respeitam parcialmente, mas podem melhorar).
- Modo presenter view (cronômetro + próximo slide) — útil mas não bloqueia.
- Versão mobile da apresentação pra audiência acompanhar — avaliar se faz sentido pro público dessa palestra.