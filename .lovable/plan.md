## Problema

Na rota `/feedback`:
- O container usa fundo `bege` (claro), mas os títulos dos cards ("SEGURANÇA", "ARQUITETURA"...) e o botão de contato (WhatsApp/Instagram) herdam `text-foreground` (bege) do tema escuro global → texto claro sobre fundo claro.
- O `eyebrow` (labels "COMO TE CHAMO?", "TUA PRINCIPAL...") é verde-neon `--laranja` direto, que perde força em cima do bege.
- Bordas `border-preto/15` ficam quase invisíveis.

## Mudanças (somente `src/pages/Feedback.tsx`)

1. **Forçar tema claro local**: adicionar `text-preto` no wrapper raiz para que todo texto herdado fique escuro.
2. **Eyebrows mais legíveis**: trocar a classe `eyebrow` (verde-neon) por um estilo local escuro — `font-mono-caps text-sm text-preto/70` — mantendo o feel "kicker" mas com contraste real.
3. **Títulos dos cards de tópico**: adicionar `text-preto` explícito no `font-display text-2xl` para garantir o preto profundo.
4. **Botões de contato (WhatsApp/Instagram)**: mesma correção — `text-preto` explícito.
5. **Bordas e placeholders**: subir `border-preto/15` → `border-preto/25` nos inputs/cards inativos, e `placeholder:opacity-40` → `placeholder:opacity-60` pra leitura.
6. **Header "o que ficou pulsando aí?"**: garantir `text-preto`.
7. **Estado de sucesso**: mesmo tratamento (eyebrow escuro + textos preto).

Nada muda no backend, no schema, nas validações ou no fluxo de envio. Só contraste visual.

## Resultado esperado

Labels dos campos, títulos de tópico e botões com preto sólido sobre bege; verde-neon `--laranja` reservado para o estado **ativo** (card selecionado) e para o fundo do botão de envio, mantendo o destaque da marca onde ele realmente brilha.
