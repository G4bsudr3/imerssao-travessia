# Backend — acesso via proxy

## Regra inegociável

Toda comunicação com o Supabase passa pelo proxy **https://api-slides.sobreai.com.br**
(Cloudflare Worker sob controle da SobreAI). O Worker injeta a anon key real no
servidor; o cliente carrega apenas um **JWT placeholder**.

## `src/integrations/supabase/client.ts`

**Nunca editar este arquivo.**

- `SUPABASE_URL = "https://api-slides.sobreai.com.br"`
- `SUPABASE_PUBLISHABLE_KEY` = JWT placeholder (não substituir por key real)

Se alguma ferramenta regenerar o arquivo apontando para `*.supabase.co`,
restaure os dois valores acima.

## Uso no frontend

- Importar sempre: `import { supabase } from "@/integrations/supabase/client";`
- Proibido: URLs `*.supabase.co` / `*.supabase.in`, `createClient` avulso,
  chamadas diretas a `*.functions.supabase.co`.
- Edge Functions: sempre via `supabase.functions.invoke(...)`.
- Auth (login, signup, recovery, OAuth): redirects sempre com
  `window.location.origin`.

## CSP e CORS

- CSP (`index.html`): `connect-src` libera `api-slides.sobreai.com.br` e
  `*.sobreai.com.br` (+ localhost em dev).
- CORS das Edge Functions: allow-list de `*.sobreai.com.br`, domínios publicados
  e `localhost`. Sem `*`.

## Observação

O `.env` e as ferramentas internas do Lovable Cloud continuam apontando para o
projeto Supabase nativo — isso é esperado e não afeta o cliente do app.
