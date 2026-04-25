
# Apresentação chŏra — Segurança, Infra e Governança no Lovable

## Conceito

Reaproveitar a engine de slides existente (slideManifest, SlideStatic, SlideShell, mobile via QR, realtime) e trocar todo o conteúdo. Manter Naval gradient, lágrima, balão serrado e a estética minimal. Adicionar **acentos temáticos**: cadeado, escudo, terminal/code-block para SQL de RLS, traffic light verde/amarelo/vermelho para risco.

**Tom híbrido**: começa no porquê (estratégico), aprofunda no como (técnico com exemplos reais de RLS, JWT, Edge Functions), fecha com checklist acionável.

**30 min, 4 atos, ~36 slides**, com 3 momentos de interação pela plateia (QR → mobile).

---

## Estrutura narrativa (4 atos)

### Ato 1 — Por que importa (5 min, 7 slides)
Aterrissar a plateia no problema. Maioria constrói no Lovable sem pensar em segurança até dar problema.

1. `cover` — capa "construir rápido não pode custar a segurança"
2. `ato_1_porque` — slide de transição de ato, fundo Naval
3. `lobby` — QR pra entrar (reutiliza LobbySlide)
4. **🟢 Interação 1 — Pulse Check**: "qual seu medo número 1?" (LGPD / vazar dados / não saber o que tô fazendo / nada, tô tranquilo) — reutiliza PulseCheckSlide com novas opções
5. `agenda` — 4 atos: Por quê · Supabase · Código · Governança · Arquitetura
6. `realidade` — stat impactante: "X% das apps Lovable em produção têm RLS desativado" (citação do playbook)
7. `tres_camadas` — as 3 camadas de risco: Banco · Código · Governança

### Ato 2 — Supabase: o coração (10 min, 12 slides)
Coração técnico. Aqui mora 80% do risco.

8. `ato_2_supabase` — transição
9. `vitrine_deposito` — analogia "Lovable é a vitrine, Supabase é o depósito" (do playbook)
10. `tres_pilares` — Tabelas · Edge Functions · RPC (grid 3 colunas)
11. `o_que_e_rls` — RLS explicado em 1 frase + analogia da planilha de pedidos
12. `quatro_operacoes` — SELECT · INSERT · UPDATE · DELETE (grid)
13. `rls_default` — "RLS desativado = porta aberta" (visual cadeado aberto vs fechado)
14. `top_riscos_rls` — tabela dos 4 erros mais comuns (do playbook seção 1.4) com semáforo
15. `exemplo_ruim` — code block SQL: política `USING (true)` (vermelho)
16. `exemplo_bom` — code block SQL: política `USING (user_id = auth.uid())` (verde)
17. **🟡 Interação 2 — Quiz RLS**: mostro 3 políticas no palco, plateia vota qual é segura (PollSlide adaptado)
18. `edge_functions_jwt` — sempre validar JWT, exemplo de código
19. `rpc_security_definer` — SECURITY DEFINER + auth.uid(), o padrão dos pés no chão

### Ato 3 — Código + LGPD + Governança (8 min, 9 slides)
Sair do banco e olhar o resto.

20. `ato_3_codigo` — transição
21. `codigo_vs_supabase` — onde mora cada coisa (diagrama 2 colunas)
22. `nao_confiar_so_lovable` — auditar com prompts de IA + GitHub como rede de segurança
23. `lgpd_basico` — o que é, o que muda, multa potencial (visual de alerta)
24. `direitos_titular` — 5 direitos do usuário (acessar · corrigir · portar · revogar · excluir)
25. `consentimento` — pattern de consent + modal exemplo
26. `governanca_acessos` — quem acessa o quê (matriz de papéis)
27. **🟠 Interação 3 — Brainstorm**: "qual o maior buraco que você suspeita ter no seu projeto agora?" — usa BrainstormSlides, top 5 sobem ao palco
28. `quadro_riscos` — recap visual: os 7 riscos prioritários do playbook

### Ato 4 — Arquitetura + checklist (7 min, 8 slides)
Olhar pra frente: como evitar reaprender doendo.

29. `ato_4_arquitetura` — transição
30. `lovable_cloud_vs_supabase` — comparação direta (do playbook seção 4.1)
31. `quando_migrar` — sinais que indicam hora de profissionalizar Supabase
32. `setup_robusto` — 5 configurações que mudam a maturidade (backups, branching, observability, etc.)
33. `prompts_auditoria` — 3 prompts prontos pra copiar (Auditoria · RLS · LGPD) — destaque visual de copy-paste
34. `checklist_segunda` — 5 ações pra fazer segunda-feira (estilo grid existente)
35. `recap` — 4 atos em 4 frases
36. `vai_la_proteja` — slide final estilo "vai lá e cria" mas "vai lá e protege"

---

## Mudanças de código

### Conteúdo
- **Reescrever `src/slides/slideManifest.ts`** inteiro com os 36 slides acima, usando `kind: "static"` quando possível (variantes `act`, `headline`, `two-line`, `grid`, `list`, `transition`) e `kind: "special"` pros componentes existentes (Lobby, PulseCheck, Poll, Brainstorm).

### Componentes novos (mínimo necessário)
Criar em `src/components/slides/security/`:
- `CodeBlockSlide.tsx` — bloco de SQL/TS com syntax highlight leve, badge "❌ inseguro" / "✅ seguro" no canto. Reutilizado em 4 slides (RLS bom/ruim, Edge Function JWT, RPC).
- `RiskTableSlide.tsx` — tabela com semáforo (🟢🟡🔴) Risco · Impacto · Mitigação. Reutilizado em 2 slides.
- `ComparisonSlide.tsx` — duas colunas lado a lado (Lovable Cloud vs Supabase, Código vs Banco, Antes vs Depois).
- `PromptCardSlide.tsx` — caixa estilo `CaixaPrompt` (já existe!) com botão "copiar" mockado.
- `LockVisualSlide.tsx` — animação cadeado aberto → fechado (framer-motion, lucide Lock/Unlock).

### Componentes reaproveitados sem mudança
- `CoverSlide`, `LobbySlide`, `PulseCheckSlide`, `PollSlide`, `BrainstormQuestion/Active/Settled`, `SlideStatic` (todas as variantes), `SlideShell`, `LagrimaGradient`, `BalaoSerrado`, `ChoraLogo`, `StageProgress`, `PresentationTimer`, `PersistentSessionQR`.

### Adaptação leve
- **PulseCheckSlide**: trocar opções/copy pra "qual seu medo número 1?" via props (verificar se já aceita; se não, pequeno refactor pra receber options).
- **PollSlide**: adaptar pra mostrar 3 trechos de SQL em vez de texto comum.

### Conteúdo dos slides estáticos
Reescrita 100% com base no PDF — nada inventado, tudo ancorado nas seções 1 a 4 do playbook + glossário.

### Arquivos NÃO tocados
- Engine: `SlideContainer`, `SlideShell`, `RoomContext`, `acts.ts` (talvez ajuste só dos labels de ato), navegação por teclado, mobile shell, hooks.
- Brand: `LagrimaGradient`, `BalaoSerrado`, `ChromeFrame`, `EstrelaPerestroika`, `ChoraLogo` ficam idênticos.
- Backend: nenhuma migration, nenhuma edge function nova (RAG vivo ficou fora de escopo).

### Acentos visuais de segurança
- Paleta: manter base chŏra, adicionar via Tailwind classes existentes:
  - verde `emerald-400` pra "seguro/ok"
  - âmbar `amber-400` pra "atenção"
  - vermelho `red-400` pra "risco crítico"
- Ícones lucide: `Lock`, `Unlock`, `Shield`, `ShieldAlert`, `ShieldCheck`, `Database`, `Code2`, `FileWarning`, `KeyRound` — usados com parcimônia, sempre como acento, nunca dominando.
- Code blocks: fonte mono já disponível, fundo `bg-slate-900/80`, badges de status no topo.

---

## Acts.ts
Atualizar `src/lib/acts.ts` pra refletir:
1. Por quê
2. Supabase
3. Código + Governança
4. Arquitetura

---

## Fora de escopo (intencionalmente)
- Chat RAG ao vivo com edge function (você escolheu "só fonte de conteúdo").
- Download do PDF pela plateia (podemos adicionar depois se quiser).
- Migrations / mudanças de schema.
- Refazer identidade visual.

---

## Próximos passos depois do plano aprovado
1. Atualizar `slideManifest.ts` e `acts.ts`.
2. Criar os 5 componentes novos em `src/components/slides/security/`.
3. Pequeno refactor do `PulseCheckSlide` pra aceitar opções customizadas (se necessário).
4. Adaptar `PollSlide` pra suportar opções com code block.
5. Browser test do fluxo: navegar pelos 36 slides, verificar timing (~50s/slide), checar interações via QR mobile.
6. Ajustes finos de copy e spacing depois do primeiro pass visual.
