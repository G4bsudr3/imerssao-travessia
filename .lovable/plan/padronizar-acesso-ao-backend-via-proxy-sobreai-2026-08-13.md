# Padronizar acesso ao backend via proxy sobreai

Confirmado: `api-slides.sobreai.com.br` é seu proxy (Cloudflare Worker) e deve ser o único caminho de comunicação com o Supabase. Os domínios `g4business.com` / `g4educacao.com` ficam de fora — o domínio é `sobreai.com.br`.

## O que será feito

1. **Cliente único**
   - Manter `src/integrations/supabase/client.ts` exatamente como está: URL `https://api-slides.sobreai.com.br` e o JWT placeholder (a anon key real é injetada pelo Worker).
   - Não haverá nenhuma alteração nesse arquivo.

2. **Sem URLs diretas nem clientes avulsos no frontend**
   - Varredura em `src/` por `*.supabase.co`, `*.supabase.in` e `createClient(` fora do arquivo oficial.
   - Estado atual verificado: o frontend já importa só de `@/integrations/supabase/client`; as ocorrências de `createClient` estão apenas em Edge Functions (server-side, usam as env vars nativas e continuam assim) e em texto de documentação (`src/lib/audit-prompt.ts`). Nada a trocar, mas a varredura fica registrada.

3. **Edge Functions**
   - Confirmar que toda chamada usa `supabase.functions.invoke(...)` (hoje: `request-admin-otp` no `AuthContext`). Nenhuma URL `*.functions.supabase.co` no código.

4. **Auth redirects**
   - Garantir `window.location.origin` em qualquer `emailRedirectTo` / `redirectTo` de login, signup e recovery. O fluxo hoje é OTP puro (sem redirect); onde houver redirect será normalizado para a origem atual.

5. **CSP e CORS**
   - CSP no `index.html`: liberar `https://api-slides.sobreai.com.br` e `https://*.sobreai.com.br` em `connect-src`, mantendo fontes/imagens já usadas. Sem `g4business.com` / `g4educacao.com`.
   - CORS das Edge Functions: restringir a `https://*.sobreai.com.br` + `localhost` para desenvolvimento, no lugar do `*` atual.

6. **Documentação no repositório**
   - Criar `docs/BACKEND.md` registrando: `client.ts` é gerado e **nunca** deve ser editado à mão; toda comunicação com o Supabase passa pelo proxy; a anon key real vive no Worker.
   - Salvar a mesma regra na memória do projeto para valer em sessões futuras.

7. **Publish** ao final.

## Riscos a validar depois do deploy

- O JWT placeholder não é uma chave válida: se o Worker não substituir o header `apikey`/`Authorization` em **todas** as rotas (`/rest/v1`, `/auth/v1`, `/functions/v1`, `/realtime/v1`), essas chamadas falham com 401. Vale um teste rápido de login admin e de envio de feedback após publicar.
- O `.env` do projeto ainda contém a URL/anon key nativas do Lovable Cloud. Elas não são usadas pelo cliente, mas as ferramentas internas de banco/functions continuam apontando para lá — isso é esperado.

## Detalhes técnicos

- Arquivos previstos: `index.html` (CSP), `supabase/functions/*/index.ts` (cabeçalhos CORS), `docs/BACKEND.md` (novo).
- `src/integrations/supabase/client.ts`: sem alteração.
