import { motion } from "framer-motion";
import { Box, Palette, Code2 } from "lucide-react";
import { SlideShell } from "./SlideShell";
import frattzCrianca from "@/assets/frattz-crianca.jpg";
import frattzPhoto from "@/assets/frattz-jovem.jpeg";
import frattzAmbassador from "@/assets/frattz-ambassador.jpg";
import navalPhoto from "@/assets/naval-ravikant.jpg";
import nachesLogo from "@/assets/naches-logo-new.png";
import lovableLogo from "@/assets/lovable-logo-icon.png";
import workshopImg from "@/assets/workshop-nexti-presenting.jpeg";
import megazordMp4 from "@/assets/megazord.mp4";
import megazordWebm from "@/assets/megazord.webm";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// === BLOCO HISTÓRIA PESSOAL ===

export function NoComecoSlide() {
  return (
    <SlideShell align="start">
      <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-2">
        <motion.img
          src={frattzCrianca}
          alt="frattz criança"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="aspect-[4/5] w-full rounded-3xl object-cover shadow-[0_20px_60px_-16px_hsl(var(--preto)/0.32)]"
        />
        <div className="space-y-6">
          <p className="eyebrow">no começo…</p>
          <h1 className="font-display text-[clamp(3.5rem,9vw,6.3rem)] leading-[0.92]">
            tinha mais
            <br />
            <span className="text-laranja">pergunta</span>
            <br />
            que resposta.
          </h1>
        </div>
      </div>
    </SlideShell>
  );
}

export function NoMeioSlide() {
  return (
    <SlideShell align="start">
      <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="space-y-6 md:order-2">
          <p className="eyebrow">no meio…</p>
          <h1 className="font-display text-[clamp(3.5rem,9vw,6.3rem)] leading-[0.92]">
            tinha mais
            <br />
            <span className="text-laranja">oposição</span>
            <br />
            que clareza.
          </h1>
        </div>
        <motion.img
          src={frattzPhoto}
          alt="frattz no trabalho"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="aspect-[4/5] w-full rounded-3xl object-cover shadow-[0_20px_60px_-16px_hsl(var(--preto)/0.32)] md:order-1"
        />
      </div>
    </SlideShell>
  );
}

export function OposicaoIntroSlide() {
  return (
    <SlideShell>
      <div className="space-y-2 text-center">
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-[clamp(5rem,15vw,10.5rem)] leading-[0.85]"
        >
          oposição
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-display text-[clamp(5rem,15vw,10.5rem)] leading-[0.85] text-laranja"
        >
          clareza
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-6 text-xl opacity-60"
        >
          dois lados da mesma folha.
        </motion.p>
      </div>
    </SlideShell>
  );
}

const pares = [
  { o: "não quero odiar meu trabalho e trabalhar só por dinheiro", c: "quero ficar rico fazendo o que eu amo" },
  { o: "não quero ter um casamento ruim e de fachada", c: "quero que meu casamento melhore com o tempo" },
  { o: "não quero ser pai velho", c: "quero ser pai antes dos 30" },
  { o: "não quero ficar só no Brasil", c: "quero viajar pra fora o quanto antes" },
  { o: "não quero viajar só quando tiver muito dinheiro", c: "vou viajar trabalhando pra pagar meus custos lá fora" },
  { o: "não quero ter que decidir uma carreira agora", c: "vou focar em ter experiências de trabalho e de vida" },
  { o: "não quero aprender matemática pra ser bem sucedido", c: "vou potencializar as qualidades que já tenho" },
];

export function QuadroOposicaoClarezaSlide() {
  return (
    <SlideShell align="start">
      <div className="grid w-full grid-cols-2 gap-6">
        <div>
          <p className="eyebrow mb-4">oposição</p>
          <ul className="space-y-3">
            {pares.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.18, duration: 0.4 }}
                className="text-base md:text-lg leading-snug text-preto/30"
              >
                {p.o}
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-laranja">clareza</p>
          <ul className="space-y-3">
            {pares.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.18, duration: 0.5 }}
                className="font-display text-xl md:text-2xl leading-tight text-preto"
              >
                {p.c}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </SlideShell>
  );
}

export function HojeSlideRich() {
  return (
    <SlideShell>
      <div className="grid w-full grid-cols-1 items-center gap-16 md:grid-cols-[1fr_1.1fr]">
        <motion.img
          src={frattzAmbassador}
          alt="frattz embaixador"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="aspect-[4/5] w-full max-w-[520px] justify-self-center rounded-3xl object-cover shadow-[0_20px_60px_-16px_hsl(var(--preto)/0.32)]"
        />
        <div className="space-y-10 text-left">
          <p className="eyebrow">hoje</p>

          {/* Bloco principal: papel atual */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={nachesLogo} alt="Naches" className="h-8" />
              <p className="font-display text-2xl md:text-3xl leading-tight">
                cofundador & ceo da naches
              </p>
            </div>
          </div>

          {/* Divisor sutil */}
          <div className="h-px w-24 bg-current opacity-15" />

          {/* Bloco secundário: reconhecimento */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={lovableLogo} alt="Lovable" className="h-8" />
              <p className="font-display text-2xl md:text-3xl leading-tight">
                embaixador global lovable
              </p>
            </div>
            <p className="text-sm uppercase tracking-[0.2em] opacity-50">
              ambassador of the month · fev 2026
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// === BLOCO SUCESSO ===

export function SucessoMedidaErradaSlide() {
  return (
    <SlideShell>
      <div className="space-y-8 text-center">
        <p className="eyebrow">como nos ensinam a medir sucesso</p>
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-[clamp(4rem,12vw,8.4rem)] leading-none"
          >
            salário
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-[clamp(4rem,12vw,8.4rem)] leading-none"
          >
            cargo
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl opacity-50"
        >
          só isso?
        </motion.p>
      </div>
    </SlideShell>
  );
}

export function SucessoMedidaCertaSlide() {
  const dims = ["salário", "cargo", "tempo livre", "gostar do que faz", "saúde física", "saúde mental"];
  return (
    <SlideShell align="start">
      <p className="eyebrow mb-6">uma medida melhor</p>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
        {dims.map((d, i) => (
          <motion.div
            key={d}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`rounded-2xl p-8 text-center ${i < 2 ? "bg-white/60 opacity-60" : "bg-laranja text-preto"}`}
          >
            <div className="font-display text-3xl md:text-4xl leading-tight">{d}</div>
          </motion.div>
        ))}
      </div>
      <p className="mt-6 text-sm opacity-50">@lizandmollie</p>
    </SlideShell>
  );
}

// === NAVAL ===

function NavalQuoteCard({ quote, highlight, footer }: { quote: string; highlight?: string; footer?: string }) {
  return (
    <SlideShell>
      <div className="flex max-w-5xl items-start gap-10">
        <motion.img
          src={navalPhoto}
          alt="Naval Ravikant"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="hidden h-40 w-40 shrink-0 rounded-full border-2 border-preto/15 object-cover md:block"
        />
        <div className="space-y-6 border-l-4 border-laranja pl-8 text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl md:text-6xl leading-tight"
          >
            "{quote}{highlight && " "}
            {highlight && <span className="text-laranja">{highlight}</span>}"
          </motion.p>
          <p className="text-sm opacity-50">naval ravikant — fundador do angellist</p>
          {footer && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg italic opacity-60"
            >
              {footer}
            </motion.p>
          )}
        </div>
      </div>
    </SlideShell>
  );
}

export function NavalCorpoMenteSlide() {
  return (
    <NavalQuoteCard
      quote="um corpo saudável, uma mente calma, uma casa cheia de amor."
      highlight="essas coisas não se compram, se conquistam."
      footer="cuidado com quem você admira só pelo dinheiro."
    />
  );
}

export function NavalIteracoesSlide() {
  return (
    <SlideShell align="start">
      <div className="border-l-4 border-laranja pl-8 max-w-5xl mb-10">
        <p className="font-display text-4xl md:text-6xl leading-tight">
          "não são 10 mil horas que criam outliers,{" "}
          <span className="text-laranja">são 10 mil iterações."</span>
        </p>
        <p className="mt-3 text-sm opacity-50">naval ravikant</p>
      </div>
      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-preto/10 bg-white/50 p-8 strike-diagonal">
          <p className="eyebrow mb-3">antes</p>
          <p className="font-display text-3xl">10 mil horas de prática</p>
          <p className="mt-3 text-sm italic opacity-50">malcolm gladwell, outliers (2008)</p>
        </div>
        <div className="rounded-2xl border-2 border-laranja bg-laranja/10 p-8">
          <p className="eyebrow mb-3 text-laranja">agora</p>
          <p className="font-display text-3xl">10 mil iterações</p>
          <p className="mt-3 text-sm opacity-70">testar, errar, ajustar, tentar de novo.</p>
        </div>
      </div>
      <p className="mt-8 text-center text-xl opacity-60">
        a IA não diminui o esforço. <span className="text-laranja">acelera o ciclo de feedback.</span>
      </p>
    </SlideShell>
  );
}

export function NavalVibeCodingSlide() {
  return (
    <NavalQuoteCard
      quote="vibe coding é"
      highlight="mais viciante que qualquer videogame já criado — se você sabe o que quer construir."
    />
  );
}

// === BLOCO MUNDO COMPRIMIDO ===

export function IAComprimeSlide() {
  return (
    <SlideShell>
      <div className="space-y-10 text-center">
        <p className="eyebrow">o que o carro fez com a distância…</p>
        <div className="font-display text-6xl md:text-8xl leading-tight">
          a IA tá fazendo
          <br />
          <span className="text-laranja">com o tempo de criar.</span>
        </div>
        <p className="text-2xl opacity-60">comprime. comprime. comprime.</p>
      </div>
    </SlideShell>
  );
}

// === DESIGN × SHARP THINKING ===

export function DesignXSharpSlide() {
  return (
    <SlideShell align="start">
      <p className="eyebrow mb-6">os dois músculos</p>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white/60 p-8"
        >
          <p className="eyebrow mb-3">design thinking</p>
          <p className="font-display text-3xl mb-4">a batalha</p>
          <p className="text-base opacity-70 leading-relaxed">
            empatia, experimentação, iteração. entender o problema, testar rápido, aprender do
            fracasso, voltar e testar de novo.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-laranja/15 border-2 border-laranja p-8"
        >
          <p className="eyebrow mb-3 text-laranja">sharp thinking</p>
          <p className="font-display text-3xl mb-4">a espada</p>
          <p className="text-base opacity-70 leading-relaxed">
            clareza, premissas, perguntas profundas. parar e pensar com rigor. qual é a raiz?
            isso é real ou suposição?
          </p>
        </motion.div>
      </div>
      <p className="mt-8 text-center text-xl opacity-60">
        ir pra batalha sem espada afiada dá ruim. afiar a espada sem ir pra batalha é perder de
        W.O.
      </p>
    </SlideShell>
  );
}

// === MEGAZORD ===

export function UmEPoucoSlide() {
  const linhas = [
    { n: "1", txt: "é pouco", cls: "" },
    { n: "2", txt: "é bom", cls: "" },
    { n: "3", txt: "é d+", cls: "" },
    { n: "4", txt: "é cabuloso", cls: "" },
    { n: "5", txt: "é megazord", cls: "text-laranja" },
  ];
  return (
    <SlideShell align="start">
      <p className="eyebrow mb-8">empilhar ferramentas</p>
      <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1fr]">
        <div className="space-y-2">
          {linhas.map((l, i) => (
            <motion.div
              key={l.n}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className={`flex items-baseline gap-6 font-display leading-none ${l.cls}`}
              style={{ fontSize: `clamp(3rem, ${4 + i * 1.5}cqw, ${4 + i * 2}rem)` }}
            >
              <span className="opacity-40">{l.n}</span>
              <span>{l.txt}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="justify-self-center w-full"
        >
          <video
            src={megazordMp4}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full max-w-[760px] rounded-2xl object-cover shadow-[0_20px_60px_-16px_hsl(var(--preto)/0.32)]"
            style={{ imageRendering: "pixelated" }}
          >
            <source src={megazordWebm} type="video/webm" />
            <source src={megazordMp4} type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </SlideShell>
  );
}

export function MegazordVisualSlide() {
  return (
    <SlideShell>
      <div className="space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto flex h-64 w-64 items-center justify-center"
        >
          {/* Megazord SVG estilizado */}
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <defs>
              <linearGradient id="mg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--laranja))" />
                <stop offset="50%" stopColor="hsl(var(--rosa))" />
                <stop offset="100%" stopColor="hsl(var(--azul))" />
              </linearGradient>
            </defs>
            {/* cabeça */}
            <rect x="75" y="20" width="50" height="40" rx="6" fill="url(#mg)" />
            <rect x="85" y="32" width="8" height="8" fill="hsl(var(--bege))" />
            <rect x="107" y="32" width="8" height="8" fill="hsl(var(--bege))" />
            {/* tronco */}
            <rect x="60" y="65" width="80" height="80" rx="8" fill="url(#mg)" />
            {/* peito (estrela) */}
            <polygon points="100,80 108,98 128,98 112,110 118,130 100,118 82,130 88,110 72,98 92,98" fill="hsl(var(--bege))" />
            {/* braços */}
            <rect x="35" y="70" width="22" height="60" rx="4" fill="url(#mg)" />
            <rect x="143" y="70" width="22" height="60" rx="4" fill="url(#mg)" />
            {/* pernas */}
            <rect x="68" y="148" width="26" height="42" rx="4" fill="url(#mg)" />
            <rect x="106" y="148" width="26" height="42" rx="4" fill="url(#mg)" />
          </svg>
        </motion.div>
        <h1 className="font-display text-[clamp(3rem,9vw,6.3rem)] leading-none">
          monta o teu <span className="text-laranja">megazord</span>.
        </h1>
        <p className="text-xl opacity-60">cada IA é um membro. tu é a alma.</p>
      </div>
    </SlideShell>
  );
}

// === LOVABLE ===

export function LovableNumbersSlide() {
  const data = [
    { name: "Lovable", years: 0.8, accent: true },
    { name: "Cursor", years: 1.5 },
    { name: "Wiz", years: 2 },
    { name: "OpenAI", years: 2.5 },
    { name: "Slack", years: 3 },
    { name: "Twilio", years: 5 },
    { name: "Shopify", years: 6 },
  ];
  const max = 6;
  return (
    <SlideShell align="start">
      <p className="eyebrow mb-2">do $1M ao $100M ARR</p>
      <h2 className="font-display text-4xl md:text-5xl mb-6">
        o mais rápido da história.
      </h2>
      <div className="w-full space-y-2">
        {data.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-24 text-right text-base md:text-lg">{d.name}</div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(d.years / max) * 100}%` }}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.7 }}
              className={`h-8 rounded-r-full ${d.accent ? "bg-laranja" : "bg-preto/20"}`}
            />
            <div className={`text-base ${d.accent ? "text-laranja font-bold" : "opacity-60"}`}>
              {d.years} {d.years === 1 ? "ano" : "anos"}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-6 text-sm opacity-50">fundado nov/23 · lançado nov/24</p>
    </SlideShell>
  );
}

const empresas = [
  "Klarna", "Airbnb", "Stripe", "Google", "OpenAI", "Adobe",
  "Spotify", "BCG", "Quora", "Miro", "McKinsey", "Dropbox",
  "Sage", "Oracle", "Shopify", "Nvidia", "GitHub", "Grafana",
];

export function LovableUsadoPorSlide() {
  return (
    <SlideShell>
      <div className="space-y-8 text-center">
        <p className="eyebrow">quem usa</p>
        <h2 className="font-display text-4xl md:text-5xl">
          de criadores solo a equipes <span className="text-laranja">fortune 500</span>.
        </h2>
        <div className="grid w-full max-w-5xl grid-cols-3 gap-3 md:grid-cols-6">
          {empresas.map((e, i) => (
            <motion.div
              key={e}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl bg-white/70 px-3 py-4 text-center text-sm font-mono-caps tracking-wider"
            >
              {e}
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

export function LovableUneTimesSlide() {
  return (
    <SlideShell>
      <div className="space-y-10 text-center">
        <p className="eyebrow">o que dá uma equipe de software</p>
        <div className="grid grid-cols-3 gap-4 md:gap-12">
          {[
            { t: "produto", Icon: Box },
            { t: "design", Icon: Palette },
            { t: "engenharia", Icon: Code2 },
          ].map(({ t, Icon }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-preto/10 text-preto md:h-32 md:w-32">
                <Icon className="h-10 w-10 md:h-14 md:w-14" strokeWidth={1.5} />
              </div>
              <p className="font-display text-2xl md:text-3xl">{t}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-3xl">↓</p>
          <div className="rounded-3xl bg-laranja px-12 py-8 text-preto">
            <p className="font-display text-5xl md:text-7xl leading-none">um só fluxo</p>
          </div>
          <p className="mt-2 text-lg opacity-60">menos retrabalho. mais velocidade.</p>
        </motion.div>
      </div>
    </SlideShell>
  );
}

// === MVP/MLP/MVT + PIRO ===

export function RegraDoJogoMVPSlide() {
  const tipos = [
    { sigla: "MVP", nome: "viable", desc: "o mínimo que funciona" },
    { sigla: "MLP", nome: "lovable", desc: "o mínimo que encanta", accent: true },
    { sigla: "MVT", nome: "traction", desc: "o mínimo que tração" },
  ];
  return (
    <SlideShell align="start">
      <p className="eyebrow mb-4">a regra do jogo</p>
      <h2 className="font-display text-3xl md:text-4xl mb-8">
        nesta hora, vamos fazer um <span className="text-laranja">MLP</span>.
      </h2>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {tipos.map((t, i) => (
          <motion.div
            key={t.sigla}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`rounded-2xl p-6 ${
              t.accent ? "bg-laranja text-preto" : "bg-white/60"
            }`}
          >
            <div className="font-display text-5xl mb-2">{t.sigla}</div>
            <div className={`eyebrow mb-3 ${t.accent ? "text-preto/70" : ""}`}>minimum {t.nome} product</div>
            <div className="text-lg">{t.desc}</div>
          </motion.div>
        ))}
      </div>
      <p className="mt-6 text-base opacity-60">
        encantar primeiro. métricas depois.
      </p>
    </SlideShell>
  );
}

export function FramePIROSlide() {
  const etapas = [
    { n: "01", titulo: "transforma sua ideia em prompt", duracao: "5 min", where: "LLM externa" },
    { n: "02", titulo: "cria seu protótipo no lovable", duracao: "10-15 min", where: "lovable.dev" },
    { n: "03", titulo: "refina com gosto / quero / e se", duracao: "15-20 min", where: "chat do lovable" },
    { n: "04", titulo: "adiciona dados + superpoderes", duracao: "10-15 min", where: "lovable cloud" },
    { n: "05", titulo: "publica e compartilha", duracao: "5 min", where: "lovable + grupo" },
  ];
  return (
    <SlideShell align="start">
      <p className="eyebrow mb-4">o caminho da ideia ao app</p>
      <h2 className="font-display text-4xl md:text-6xl mb-10 leading-tight">
        <span className="text-laranja">5 etapas.</span> 1 ideia. 1 app no ar.
      </h2>
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-5">
        {etapas.map((e, i) => (
          <motion.div
            key={e.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-white/60 p-5 flex flex-col gap-3"
          >
            <div className="font-display text-5xl text-laranja leading-none">{e.n}</div>
            <div className="font-display text-lg leading-tight">{e.titulo}</div>
            <div className="mt-auto flex flex-col gap-1 pt-2">
              <span className="eyebrow text-[10px]">{e.duracao}</span>
              <span className="text-xs opacity-60">{e.where}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}

// === PROVA SOCIAL ===

export function ProvaSocialSlide() {
  return (
    <SlideShell>
      <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-2">
        <motion.img
          src={workshopImg}
          alt="frattz em workshop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_20px_60px_-16px_hsl(var(--preto)/0.32)]"
        />
        <div className="space-y-4 text-left">
          <p className="eyebrow">a vida recompensa</p>
          <h2 className="font-display text-5xl md:text-6xl leading-tight">
            quem é generoso <br /> com ela.
          </h2>
          <p className="text-lg opacity-60">workshops, palestras, comunidade lovable brasil.</p>
        </div>
      </div>
    </SlideShell>
  );
}
