# Revisão pré-palestra · TRAVESSIA

Apresentação tem ~40 slides em 4 atos. Li o manifesto todo, os componentes de slide e os atos. Aqui está o que encontrei, dividido em três blocos: **fatos a confirmar**, **bugs de estrutura/storytelling** e **ajustes visuais**. No fim, o plano de execução.

---

## 1) Conteúdo · pontos que precisam ser confirmados antes de subir no palco

Tem coisa que, se estiver errada, **queima a credibilidade na hora**. Esses são os que me preocupam mais:

- **"Anthropic Mythos"** (slide `ferramentas_principais`) — Está correto
- **"AWS Security Agent"** - Está correto
- **Telekall — "R$ 14,4 mil"** vs slide seguinte fala em **"1ª multa só em 2023 (R$ 14 mil)"** → **inconsistência numérica entre dois slides consecutivos**. O valor oficial da 1ª multa da ANPD é R$ 14.400.
- **Serasa 2021 — "+200 milhões de CPFs"** → o vazamento divulgado em jan/2021 foi de ~223 mi. Ajustar pra "+220 mi" fica mais defensável.
- **LGPD · art. 18 "os direitos do titular"** — slide mostra 6 cards, mas a redação atual da LGPD lista **9 direitos** (após a Lei 13.853/2019). Tudo bem destacar 6, mas a chamada "os direitos do titular" induz a achar que são só esses. Sugiro mudar pra "**6 direitos que você precisa garantir no código**". - Concordo
- **"10 bases legais · 3 que importam no SaaS"** ✓ ok (art. 7º LGPD tem 10).
- **Linha do tempo LGPD** (2018 sancionada · 2020 vigor · 2021 sanções) ✓ ok.
- **Multas internacionais** (Meta €1,2 bi · Amazon €746 mi · TikTok €345 mi) ✓ ok.
- **"multa da ANPD pode chegar a 2% do faturamento (teto R$ 50mi por infração)"** ✓ ok (art. 52).

**Decisão que preciso de você:** quer que eu corrija direto onde tiver fonte clara, ou prefere que eu liste tudo e você aprova caso a caso? Corrige os pontos pendentes, os que marquei como correto pode deixar.

---

## 2) Estrutura · bugs que afetam navegação e narrativa

- `**src/lib/acts.ts` está desatualizado.** Comenta "27 slides" e mapeia ato 4 a partir do índice 21, mas o manifesto tem ~40 slides. Resultado: a barra de progresso por ato e a marcação de "abertura de ato" estão **erradas** a partir do meio da apresentação. Precisa recalcular os boundaries pelos `key`s reais (`ato_1_porque`, `ato_2_supabase`, `ato_3_codigo`, `ato_3_lgpd`, `ferramentas_intro`, `ato_4_arquitetura`).
- **Ato 3 virou um monstro** (código + LGPD + ferramentas) — uns 20+ slides seguidos no mesmo ato. Duas opções:
  - **(a)** promover `ato_3_lgpd` e `ferramentas_intro` a atos próprios → vira deck de 6 atos.
  - **(b)** manter 4 atos mas adicionar dois "respiros" de transição mais marcantes ("agora a lei" / "agora as ferramentas") pra você ter pontos naturais de pausa, água, perguntas.
  Minha recomendação é **(b)** — não bagunça a promessa de "4 atos · 90 min" da agenda.
- **Agenda no início diz "código + LGPD", mas o ato real chama "código + governança"** (subtítulo). Alinhar nomenclatura.
- `**historia_real**` → o arco "sexta → segunda" é ótimo, mas você nunca menciona explicitamente que isso é o gancho do "por que RLS". Sugiro um slide-pause de 1 frase entre `historia_real` e `tres_camadas` ("isso é uma policy faltando.") pra cravar a conexão.

---

## 3) Visual · risco de quebra no telão (1920×1080)

- `**kit_dia_a_dia**` tem 5 cards → grid usa `md:grid-cols-5`, fica com cards muito estreitos, texto secundário aperta. Melhor 2 linhas (3 + 2) ou cortar pra 4 (juntar Semgrep/Snyk como "SAST").
- `**lgpd_basico**` (ComparisonSlide) — lado direito tem `sub` + 4 bullets longos. Em 1080p com a fonte atual estoura ou fica colado no rodapé. Cortar pra 3 bullets curtos.
- `**lgpd_exemplos_base**` — 6 cards com `accent` em 2 deles está ok, mas a hierarquia visual fica confusa (laranja preenchido grita mais que a info). Sugiro usar `accent` só num card.
- `**lgpd_linha_tempo**` (timeline) — labels usam `text-sm opacity-70`, **pequeno demais pro telão**. Subir pra `text-xl` / `text-2xl` e reduzir opacidade só pra 0.8.
- `**prompt_auditoria**` — texto mono no card pode quebrar em telas muito largas. Confirmar que cabe sem scroll.
- `**top_riscos_rls` e `governanca_acessos**` (RiskTableSlide) — já ajustei recentemente, vou só revalidar visualmente que nenhuma linha estoura.
- `**vitrine_deposito**` e demais Comparison — verificar que bullets de 3-4 itens com `sub` não estouram em 1500px.

---

## Plano de execução (build)

1. **Fact-check via web** (Anthropic Mythos + AWS Security Agent + Telekall + Serasa). Corrijo o que tiver fonte; te trago lista do que mudei.
2. **Corrigir `src/lib/acts.ts**` com os boundaries reais do manifesto atual (recomputados pelos `key`s dos `ato_*` e divisores).
3. **Ajustes de conteúdo:**
  - alinhar "código + LGPD" vs "código + governança" na agenda e no ato.
  - inserir 1 slide-pause entre `historia_real` e `tres_camadas`.
  - corrigir "+200 mi CPFs" → "+220 mi" no Serasa.
  - corrigir título "os direitos do titular" → "6 direitos que viram código".
  - normalizar a multa Telekall (R$ 14.400) nos dois slides.
4. **Ajustes visuais:**
  - `kit_dia_a_dia` → 4 cards ou 2 linhas.
  - `lgpd_basico` → enxugar bullets.
  - `lgpd_exemplos_base` → manter só 1 accent.
  - `lgpd_linha_tempo` → tipografia maior.
5. **QA no telão:** abrir cada slide no preview em 1920×1080, screenshot, verificar overflow/contraste em todos. Te entrego lista com cada slide marcado ✓ ou com nota.

Estimativa: ~30-40 min de trabalho meu depois que você aprovar.

---

**Antes de começar, me confirma:**

- (a) Posso corrigir direto os fatos que tiverem fonte clara, ou prefere review caso-a-caso?
- (b) Mantém 4 atos (opção b acima) ou prefere promover LGPD e Ferramentas a atos próprios?
- (c) Tem algum slide que você **não quer que eu mexa** (texto que você decorou ou frase de efeito que é sua marca)?