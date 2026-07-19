import { motion } from "framer-motion";
import { SlideShell } from "./SlideShell";

/**
 * Slide cinematográfico de "era" (a história que se repete): uma ilustração (gravura)
 * emoldurada + eyebrow + headline em duas cores + linhas de apoio. Fundo escuro (naval).
 * Um só objeto (image) ou dois lado a lado com "+" (image + image2, p/ coexistência).
 */
export function EraSlide({
  eyebrow,
  image,
  image2,
  kicker,
  kickerAccent,
  lines = [],
}: {
  eyebrow?: string;
  image?: string;
  image2?: string;
  kicker?: string;
  kickerAccent?: string;
  lines?: string[];
}) {
  const frame =
    "rounded-[1.4rem] bg-[#f5f1e6] shadow-[0_24px_90px_-24px_rgba(0,0,0,0.7)] ring-1 ring-bege/10";

  // duas imagens (coexistência): empilhado e centralizado
  if (image && image2) {
    return (
      <SlideShell background="naval">
        <div className="flex flex-col items-center gap-10 text-center">
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <div className="flex items-center justify-center gap-8">
            <img src={image} alt="" className={`h-[clamp(8rem,24vh,15rem)] w-auto ${frame}`} />
            <span className="font-display text-laranja text-[clamp(3rem,7vw,5rem)] leading-none">+</span>
            <img src={image2} alt="" className={`h-[clamp(8rem,24vh,15rem)] w-auto ${frame}`} />
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] text-bege">
            {kicker} {kickerAccent && <span className="text-laranja">{kickerAccent}</span>}
          </h1>
          {lines.map((l, i) => (
            <p key={i} className="max-w-3xl text-[clamp(1.15rem,1.9vw,1.75rem)] text-bege/60 leading-snug">{l}</p>
          ))}
        </div>
      </SlideShell>
    );
  }

  // uma imagem: gravura à esquerda, texto à direita
  return (
    <SlideShell background="naval">
      <div className="grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <motion.img
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          src={image}
          alt=""
          className={`mx-auto h-[clamp(11rem,44vh,30rem)] w-auto ${frame}`}
        />
        <div className="relative text-left">
          {/* cantoneira decorativa */}
          <span className="pointer-events-none absolute -left-4 -top-5 h-8 w-8 border-l-2 border-t-2 border-laranja/70" />
          {eyebrow && <div className="eyebrow mb-6">{eyebrow}</div>}
          <h1 className="font-display text-[clamp(3rem,7vw,5.6rem)] leading-[0.95] text-bege">
            {kicker}
            {kickerAccent && (
              <>
                {" "}
                <span className="text-laranja">{kickerAccent}</span>
              </>
            )}
          </h1>
          {lines.length > 0 && (
            <div className="mt-7 space-y-2">
              {lines.map((l, i) => (
                <p key={i} className="text-[clamp(1.2rem,2vw,1.85rem)] text-bege/60 leading-snug">{l}</p>
              ))}
            </div>
          )}
          <span className="pointer-events-none absolute -bottom-5 right-0 h-8 w-8 border-b-2 border-r-2 border-laranja/70" />
        </div>
      </div>
    </SlideShell>
  );
}
