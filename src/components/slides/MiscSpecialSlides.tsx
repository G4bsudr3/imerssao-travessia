import { motion } from "framer-motion";
import { CaixaPrompt } from "@/components/brand/CaixaPrompt";
import { ChromeFrame } from "@/components/brand/ChromeFrame";
import { PlaceholderIllustration } from "@/components/brand/PlaceholderIllustration";
import { LagrimaGradient } from "@/components/brand/LagrimaGradient";
import { SlideShell } from "./SlideShell";
import frattzImg from "@/assets/frattz-speaker.jpg";
import nachesLogo from "@/assets/naches-logo.png";

export function OiSlide() {
  return (
    <SlideShell>
      <div className="space-y-8 text-center">
        <p className="eyebrow">oi.</p>
        <h1 className="font-display text-[clamp(4rem,12vw,8.4rem)] leading-[0.95]">
          bem-vindo à travessia.
        </h1>
      </div>
    </SlideShell>
  );
}

export function HojeSlide() {
  return (
    <SlideShell>
      <div className="space-y-10">
        <p className="eyebrow">hoje</p>
        <div className="flex flex-col items-center gap-8">
          <img src={nachesLogo} alt="Naches" className="h-24" />
          <p className="font-display text-5xl">gamificação com IA pra educação.</p>
        </div>
      </div>
    </SlideShell>
  );
}

export function TudoLovable() {
  return (
    <SlideShell align="start">
      <p className="eyebrow mb-6">tudo isso, construído rápido</p>
      <div className="grid w-full grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((n) => (
          <PlaceholderIllustration key={n} variant="screen" label={`projeto · ${n}`} />
        ))}
      </div>
    </SlideShell>
  );
}

export function BuildIntro() {
  return (
    <SlideShell>
      <div className="flex flex-col items-center gap-8">
        <LagrimaGradient size={160} spinning />
        <p className="eyebrow">parte 2</p>
        <h1 className="font-display text-[clamp(4rem,12vw,8.4rem)] leading-none">construir.</h1>
        <p className="text-2xl opacity-60">ao vivo. com vocês.</p>
      </div>
    </SlideShell>
  );
}

export function AbrindoClaude() {
  return (
    <SlideShell>
      <ChromeFrame url="claude.ai" className="w-[min(80vw,900px)]">
        <div className="flex h-80 items-center justify-center bg-bege">
          <p className="font-display text-5xl text-preto">abrindo claude…</p>
        </div>
      </ChromeFrame>
    </SlideShell>
  );
}

export function AbrindoLovable() {
  return (
    <SlideShell>
      <div className="space-y-6">
        <ChromeFrame url="lovable.dev" className="w-[min(80vw,900px)]">
          <div className="bg-bege p-10">
            <CaixaPrompt highlight>construa o app que vocês acabaram de votar.</CaixaPrompt>
          </div>
        </ChromeFrame>
      </div>
    </SlideShell>
  );
}

export function PublishPrompt() {
  return (
    <SlideShell>
      <div className="space-y-6">
        <ChromeFrame url="lovable.dev" className="w-[min(80vw,900px)]">
          <div className="bg-bege p-10">
            <CaixaPrompt highlight>publish.</CaixaPrompt>
          </div>
        </ChromeFrame>
      </div>
    </SlideShell>
  );
}

export function IterPronta({ count }: { count: number }) {
  const items = Array.from({ length: count });
  const cols = count <= 2 ? "grid-cols-2" : count === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4";
  return (
    <SlideShell align="start">
      <p className="eyebrow mb-6">iteração {count - 1} pronta</p>
      <div className={`grid w-full gap-4 ${cols}`}>
        {items.map((_, i) => (
          <PlaceholderIllustration key={i} variant="screen" label={`v${i + 1}`} />
        ))}
      </div>
    </SlideShell>
  );
}
