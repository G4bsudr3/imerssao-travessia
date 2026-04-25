## Remover slide "acesso direto" (QR_LINK)

O slide 76 (`qr_link` → componente `PublishQr`) gera um QR pra `https://exemplo.lovable.app` (fallback) ou pra uma URL salva em localStorage. Como na hora do evento não tem URL real publicada e o QR não leva a lugar nenhum, remove a experiência.

### Mudanças

**`src/slides/slideManifest.ts`** — apaga as linhas 192-193:
```ts
// 76
{ key: "qr_link", kind: "special", component: "PublishQr" },
```
A renumeração dos comentários (77→76, 78→77, etc.) ajusto também pra ficar honesto. Total de slides cai de 84 → 83.

**`src/lib/acts.ts`** — se ATO 4/5 tiverem boundaries fixos por índice, ajusto pra refletir o slide a menos.

**`src/components/mobile/MobileShell.tsx`** — se houver entrada mobile correspondente ao `qr_link`, removo.

**`src/components/SlideContainer.tsx` e `src/components/slides/PublishSlides.tsx`** — deixo o componente `PublishQr` exportado (sem custo) caso queira reativar depois com URL real. Não removo o código do componente.

### Verificação pós-mudança
- Rodar `rg "qr_link|PublishQr"` pra garantir que não tem referência órfã quebrando algo.
- Conferir que o índice total no header (`X / 84`) vai virar `X / 83`.