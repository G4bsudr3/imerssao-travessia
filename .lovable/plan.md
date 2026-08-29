# Plano: Rodada de animações, logos e revisão LGPD

Aproveitar o padrão criado no slide da multa do TikTok (logo real + selo animado + contador) e aplicar a mesma linguagem em outros slides, além de corrigir o conceito de "dado pessoal" na seção LGPD.

## 1. Infra reutilizável

- Criar `src/components/slides/BrandLogo.tsx`: logos oficiais em SVG inline (monocromáticos ou cor da marca) para **AWS, Anthropic/Claude, GitHub, Supabase, Lovable, GitGuardian, Semgrep, Meta, Amazon, TikTok** — sem depender de imagens externas (funciona offline no telão).
- Criar um hook/util compartilhado de animações de entrada escalonadas (stagger) para padronizar as transições, no mesmo estilo do TikTokFineSlide.

## 2. Slides com animação + logos

- **ferramentas_principais (AWS Security Agent × Claude Mythos)**: virar slide especial animado — logo AWS e logo Anthropic entrando de cada lado, versus no centro, bullets subindo em sequência.
- **kit_dia_a_dia**: grid com logos reais (Supabase, Lovable, GitGuardian, Semgrep, Claude/GPT) e entrada em cascata.
- **nao_so_lovable**: bullet do GitHub ganha logo do GitHub (e Claude/GPT onde couber).
- **lgpd_casos_reais**: logos Meta, Amazon, TikTok + destaque Telekall, com entrada escalonada.
- **lgpd_multa_recorde**: animação de contador/estampa no estilo TikTokFineSlide.
- **historia_real (sexta→segunda)**: timeline animada dia a dia, último item ("tabela inteira num fórum") com shake/pulso vermelho.
- **o_que_e_rls / tres_pilares**: ícones melhores (cadeado, olho, lápis, lixeira para SELECT/INSERT/UPDATE/DELETE) com micro-animação.

## 3. Correção conceitual LGPD — dado pessoal

- Reformular o slide **lgpd_dado_sensivel** (e ajustar **lgpd_pii_escondida** se necessário):
  - **Identificada**: o dado aponta a pessoa diretamente — nome, CPF, e-mail.
  - **Identificável**: nenhum dado sozinho identifica, mas a combinação identifica — IP + device ID + geolocalização + user agent.
  - Layout dos dois lados com exemplos de cada, pronto para o apresentador explicar verbalmente.

## 4. Checagem de fatos (pesquisa web)

Validar e corrigir no deck:
- Multa TikTok/ANPD (R$ 153,7 mi, ago/2026) — já aplicada; reconfirmar número e data.
- AWS Security Agent: disponibilidade (GA), preço ~US$ 50/h, claims de pentest.
- Claude Mythos: zero-days, bug OpenBSD 27 anos, CVE-2026-4747 FreeBSD.
- Meta € 1,2 bi (2023), Amazon € 746 mi, Telekall R$ 14.400 (1ª multa ANPD), Serasa 220 mi CPFs.

## 5. Validação

- Percorrer o deck inteiro via Playwright, com screenshots dos slides alterados (início/meio/fim da animação) e checagem de overflow no telão (1280×1800 e 1920×1080).

## Detalhes técnicos

- Tudo em `src/components/slides/` + registro no `src/components/SlideContainer.tsx` e entradas no `src/events/travessia/manifest.tsx`.
- Manter tokens do tema (laranja/verde neon, Anton + Inter) — nada de cor hardcoded fora dos SVGs de marca.
- Ajustar `BOUNDARIES` em `src/events/travessia/index.ts` se a contagem de slides mudar.
- Nada de backend — mudança 100% frontend.
