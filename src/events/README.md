# Eventos (templates de apresentação)

Cada apresentação vive em uma pasta isolada dentro de `src/events/<slug>/`.
A rota `/<slug>` carrega o evento; `/<slug>/join/:code`, `/<slug>/feedback` e
`/<slug>/respostas` são as rotas do mobile/apoio.

## Estrutura de um evento

```
src/events/<slug>/
  ├── index.ts        # config do evento (slug, nome, contatos, atos, tema)
  └── manifest.tsx    # ordem e conteúdo dos slides
```

## Criar um novo evento

1. Duplique a pasta de um evento existente:
   ```bash
   cp -r src/events/travessia src/events/<novo-slug>
   ```
2. Em `src/events/<novo-slug>/index.ts`:
   - troque `slug` e `name`
   - ajuste `contacts` (Instagram, WhatsApp, feedback)
   - reveja os `boundaries` e `openerIndices` dos atos depois de editar o manifest
   - opcional: defina `themeClass` (ex: `"theme-<slug>"`) e crie overrides em `src/index.css`
3. Edite `src/events/<novo-slug>/manifest.tsx` com os slides do evento.
4. Registre em `src/events/registry.ts`:
   ```ts
   import { meuEvento } from "./<novo-slug>";
   export const EVENTS = { [travessiaEvent.slug]: travessiaEvent, [meuEvento.slug]: meuEvento };
   ```
5. Acesse em `/<novo-slug>`.

## Customizar cores por evento

Adicione overrides escopados pelo `themeClass` em `src/index.css`:

```css
.theme-meu-evento {
  --laranja: 210 100% 60%;       /* primária do evento */
  --gradient-tear: linear-gradient(135deg, hsl(var(--laranja)), hsl(210 100% 80%));
}
```

O `EventProvider` adiciona/remove essa classe do `<html>` automaticamente.
