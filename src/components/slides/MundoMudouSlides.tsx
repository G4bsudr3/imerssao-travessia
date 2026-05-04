// Sequência narrativa "o que mudou no mundo" — charrete → carro → avião → IA
// Importada do projeto v2 Chora Lovable Slides e adaptada ao design system do chŏra
// (bege/preto/laranja, font-display, escala 1920x1080 via SlideShell).

import { motion } from "framer-motion";
import { Footprints, Car, Plane, Check, ArrowRight } from "lucide-react";
import { SlideShell } from "./SlideShell";

// ────────────────────────────────────────────────────────────────────────────
// 26 — BH 1900: ponto de partida
// ────────────────────────────────────────────────────────────────────────────
export function BH1900Slide() {
  const lines = [
    { text: "de Belo Horizonte para Alphaville", delay: 0.4 },
    { text: "~1.700 km", delay: 0.55 },
    { text: "a pé. de burro. talvez de charrete.", delay: 0.7 },
    { text: "semanas de viagem.", delay: 0.9, bold: true },
  ];
  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Footprints className="h-20 w-20 text-preto/30" strokeWidth={1} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display text-[clamp(7rem,18cqw,14rem)] leading-none"
        >
          1900
        </motion.h1>
        <div className="flex flex-col items-center gap-3">
          {lines.map((line) => (
            <motion.p
              key={line.text}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: line.delay, ease: "easeOut" }}
              className={`text-center text-2xl ${line.bold ? "font-display text-3xl text-preto" : "text-preto/70"}`}
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 27 — Vieram os carros
// ────────────────────────────────────────────────────────────────────────────
export function VieramCarrosSlide() {
  const keywords = ["estradas", "postos", "mecânicos", "motoristas"];
  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Car className="h-24 w-24 text-preto/30" strokeWidth={1} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-[clamp(3.5rem,9cqw,7rem)] leading-tight"
        >
          vieram os carros.
        </motion.h1>
        <div className="flex flex-col items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-2xl text-preto/60"
          >
            e com eles:
          </motion.p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {keywords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.15 }}
                className="font-display text-3xl"
              >
                {word}
                {i < keywords.length - 1 && <span className="ml-6 text-preto/30">·</span>}
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="mt-2 text-xl text-preto/50"
          >
            uma infraestrutura inteira surgiu.
          </motion.p>
        </div>
      </div>
    </SlideShell>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 28 — Encurtou o caminho: semanas → dias
// ────────────────────────────────────────────────────────────────────────────
export function EncurtouCaminhoSlide() {
  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-[clamp(3.5rem,9cqw,7rem)] leading-tight text-center"
        >
          e encurtou o caminho.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center"
        >
          <span className="font-display text-6xl text-preto/40">semanas</span>
          <motion.div
            initial={{ width: 240 }}
            animate={{ width: 80 }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            className="mx-6 flex items-center"
          >
            <div className="h-1 w-full rounded-full bg-laranja" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="font-display text-6xl"
          >
            dias
          </motion.span>
        </motion.div>
      </div>
    </SlideShell>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 29 — Matou profissões
// ────────────────────────────────────────────────────────────────────────────
export function MatouProfissoesSlide() {
  const professions = [
    { name: "cocheiros", delay: 0.5 },
    { name: "ferreiros de carruagem", delay: 0.65 },
    { name: "fabricantes de chicotes", delay: 0.8 },
    { name: "cavalariços", delay: 0.95 },
    { name: "seleiros", delay: 1.1 },
    { name: "condutores de bondes a cavalo", delay: 1.25 },
  ];
  const half = Math.ceil(professions.length / 2);
  const col1 = professions.slice(0, half);
  const col2 = professions.slice(half);

  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-10">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-[clamp(3rem,7cqw,6rem)] leading-tight text-center"
        >
          e profissões praticamente <span className="text-laranja">desapareceram.</span>
        </motion.h1>
        <div className="grid grid-cols-2 gap-x-20 gap-y-4">
          {[col1, col2].map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {col.map((prof) => (
                <motion.p
                  key={prof.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: prof.delay }}
                  className="font-display text-3xl text-preto/60 line-through decoration-vermelho/70 decoration-2"
                >
                  {prof.name}
                </motion.p>
              ))}
            </div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-xl text-preto/40"
        >
          praticamente desapareceram do transporte.
        </motion.p>
      </div>
    </SlideShell>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 30 — Profissões surgiram: ~30 mi
// ────────────────────────────────────────────────────────────────────────────
export function ProfissoesSurgiramSlide() {
  const examples = [
    "motoristas",
    "mecânicos",
    "postos de combustível",
    "concessionárias",
    "autoescolas",
    "seguradoras",
    "pedágios",
  ];
  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl text-preto/60"
        >
          e quantas profissões surgiram?
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="font-display text-[clamp(7rem,18cqw,15rem)] leading-none text-laranja"
        >
          ~30 mi
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="max-w-3xl text-center text-2xl text-preto/70"
        >
          de pessoas trabalham no ecossistema do automóvel no Brasil
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="max-w-4xl text-center text-base text-preto/45"
        >
          {examples.join(" · ")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-base font-medium text-preto/50"
        >
          nenhuma dessas profissões existia há 120 anos.
        </motion.p>
      </div>
    </SlideShell>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 31 — Vieram os aviões
// ────────────────────────────────────────────────────────────────────────────
export function VieramAvioesSlide() {
  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Plane className="h-40 w-40 text-preto/30" strokeWidth={1} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-display text-[clamp(3.5rem,9cqw,7rem)] leading-tight"
        >
          vieram os aviões.
        </motion.h1>
      </div>
    </SlideShell>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 32 — Avião não matou o carro
// ────────────────────────────────────────────────────────────────────────────
export function AviaoNaoMatouSlide() {
  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-10">
        <div className="flex items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 20 }}
          >
            <Car className="h-28 w-28 text-preto/40" strokeWidth={1} />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="font-display text-6xl text-preto/30"
          >
            +
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 20 }}
          >
            <Plane className="h-28 w-28 text-preto/40" strokeWidth={1} />
          </motion.div>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-display text-[clamp(3rem,8cqw,6.5rem)] leading-tight text-center"
        >
          o avião não matou o carro.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-2xl text-preto/60"
        >
          ele expandiu o que era possível.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-lg font-medium text-preto/70"
        >
          hoje usamos os dois.
        </motion.p>
      </div>
    </SlideShell>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 33 — Encurtou ainda mais: dias → horas
// ────────────────────────────────────────────────────────────────────────────
export function EncurtouMaisSlide() {
  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-[clamp(3.5rem,9cqw,7rem)] leading-tight text-center"
        >
          e encurtou <span className="text-laranja">ainda mais.</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center"
        >
          <span className="font-display text-6xl text-preto/40">dias</span>
          <motion.div
            initial={{ width: 240 }}
            animate={{ width: 80 }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            className="mx-6 flex items-center"
          >
            <div className="h-1 w-full rounded-full bg-laranja" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="font-display text-6xl"
          >
            horas
          </motion.span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="font-display text-2xl text-laranja"
        >
          BH → Alphaville: 1h30min
        </motion.div>
      </div>
    </SlideShell>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 34 — Trabalho muda de lugar
// ────────────────────────────────────────────────────────────────────────────
export function TrabalhoMudaSlide() {
  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-display text-[clamp(3.5rem,9cqw,7rem)] leading-tight text-center"
        >
          o trabalho não some.
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-display text-[clamp(3.5rem,9cqw,7rem)] leading-tight text-laranja text-center"
        >
          ele muda de lugar.
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="mt-6 h-[2px] w-72 origin-left bg-preto/20"
        />
      </div>
    </SlideShell>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 35 — A IA está fazendo isso
// ────────────────────────────────────────────────────────────────────────────
export function IAFazendoSlide() {
  const bullets = [
    { text: "reduz distâncias", delay: 0.6 },
    { text: "acelera resultados", delay: 0.8 },
    { text: "democratiza o acesso", delay: 1.0 },
  ];
  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-[clamp(3rem,7.5cqw,6rem)] leading-tight text-center"
        >
          a IA está fazendo <span className="text-laranja">exatamente isso.</span>
        </motion.h1>
        <div className="flex flex-col items-start gap-4">
          {bullets.map((b) => (
            <motion.div
              key={b.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: b.delay }}
              className="flex items-center gap-4 font-display text-3xl"
            >
              <span className="text-laranja">▸</span>
              <span className="text-preto/75">{b.text}</span>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="text-xl text-preto/45"
        >
          mesmo padrão. nova era.
        </motion.p>
      </div>
    </SlideShell>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 36 — Nada disso é novo
// ────────────────────────────────────────────────────────────────────────────
export function NadaNovoSlide() {
  const items = [
    { text: "criar um site pro seu negócio", delay: 0.5 },
    { text: "organizar sua rotina com um app", delay: 0.7 },
    { text: "fazer um quiz pro seu curso ou evento", delay: 0.9 },
  ];
  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-[clamp(3.5rem,9cqw,7rem)] leading-tight text-center"
        >
          nada disso é novo.
        </motion.h1>
        <div className="flex flex-col items-start gap-3">
          {items.map((item) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: item.delay }}
              className="flex items-center gap-4 text-2xl"
            >
              <Check className="h-6 w-6 flex-shrink-0 text-laranja" strokeWidth={2.5} />
              <span className="text-preto/75">{item.text}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="font-display text-[clamp(2.5rem,5cqw,4rem)] text-center leading-tight">
            a <span className="text-laranja">IA</span> comprimiu o tempo.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="text-xl text-preto/50"
          >
            de meses para horas. de equipes para indivíduos.
          </motion.p>
        </motion.div>
      </div>
    </SlideShell>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 37 — Mais fácil começar, vai mais longe
// ────────────────────────────────────────────────────────────────────────────
export function MaisFacilSlide() {
  const lines = [
    { from: "1 site", to: "10 experimentos", delay: 0.6 },
    { from: "1 ideia", to: "10 validações", delay: 0.8 },
    { from: "1 pessoa", to: "10x mais output", delay: 1.0 },
  ];
  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl font-display text-[clamp(2.5rem,6cqw,4.5rem)] leading-tight text-center"
        >
          quando fica mais fácil começar, <span className="text-laranja">você vai mais longe.</span>
        </motion.h1>
        <div className="flex flex-col gap-5">
          {lines.map((line) => (
            <motion.div
              key={line.from}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: line.delay }}
              className="flex items-center gap-5"
            >
              <span className="font-display text-3xl text-preto/45">{line.from}</span>
              <ArrowRight className="h-7 w-7 text-laranja" strokeWidth={2} />
              <span className="font-display text-3xl">{line.to}</span>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-base text-preto/40"
        >
          mais resultado. menos esforço.
        </motion.p>
      </div>
    </SlideShell>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 38 — Humano se ocupar
// ────────────────────────────────────────────────────────────────────────────
export function HumanoSeOcuparSlide() {
  return (
    <SlideShell>
      <div className="flex max-w-5xl flex-col items-center gap-12 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
          className="font-display text-[clamp(2rem,4.5cqw,3.5rem)] leading-snug text-preto/75"
        >
          o ser humano nunca vai deixar de encontrar motivo para se ocupar.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="font-display text-[clamp(2.5rem,5.5cqw,4.5rem)] leading-tight"
        >
          é isso que significa estar vivo.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
          className="font-display text-[clamp(3rem,6.5cqw,5.5rem)] leading-tight text-laranja"
        >
          a busca eterna pela perfeição.
        </motion.p>
      </div>
    </SlideShell>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 39 — Risco da charrete
// ────────────────────────────────────────────────────────────────────────────
export function RiscoCharreteSlide() {
  return (
    <SlideShell>
      <div className="flex max-w-5xl flex-col items-center gap-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-display text-[clamp(2rem,4.5cqw,3.5rem)] leading-snug text-preto/65"
        >
          o <span className="text-laranja">risco</span> não é a IA acabar com empregos.
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="font-display text-[clamp(3rem,7cqw,6rem)] leading-tight text-laranja"
        >
          é continuar na charrete num mundo que já voa.
        </motion.h1>
      </div>
    </SlideShell>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 40 — E agora, IA: timeline + escolhi voar
// ────────────────────────────────────────────────────────────────────────────
export function EAgoraIASlide() {
  const timeline = [
    { label: "charrete", delay: 0.6 },
    { label: "automóvel", delay: 0.8 },
    { label: "aviação", delay: 1.0 },
    { label: "IA", delay: 1.2, active: true },
  ];
  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl text-preto/50"
        >
          charrete → carro → avião → e agora...
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-[clamp(3rem,8cqw,6.5rem)] leading-tight text-center"
        >
          estamos no momento da <span className="text-laranja">IA.</span>
        </motion.h1>
        <div className="mt-2 flex items-center gap-6">
          {timeline.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.delay }}
              className="flex items-center gap-3"
            >
              {i > 0 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: item.delay - 0.1 }}
                  className="h-[2px] w-12 origin-left bg-preto/20"
                />
              )}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`rounded-full ${
                    item.active
                      ? "h-5 w-5 bg-laranja shadow-[0_0_18px_hsl(var(--laranja)/0.6)]"
                      : "h-4 w-4 bg-preto/20"
                  }`}
                />
                <span
                  className={`text-base ${
                    item.active ? "font-display text-lg text-laranja" : "text-preto/55"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="text-xl text-preto/45"
        >
          a questão é: você vai voar ou ficar na charrete?
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.5 }}
          className="font-display text-[clamp(2rem,4cqw,3.5rem)] text-laranja"
        >
          eu escolhi voar.
        </motion.p>
      </div>
    </SlideShell>
  );
}
