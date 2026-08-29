import { motion } from "framer-motion";
import { SlideShell } from "../SlideShell";
import { BrandLogo, type Brand } from "../BrandLogo";

export interface LogoBulletsProps {
  eyebrow?: string;
  title?: string;
  items: { label: string; sub?: string; logo?: Brand; accent?: boolean }[];
}

export default function LogoBulletsSlide({ eyebrow, title, items }: LogoBulletsProps) {
  return (
    <SlideShell background="naval" className="items-center justify-center">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      {title && <h2 className="font-display text-5xl md:text-6xl mb-14">{title}</h2>}

      <div className="w-full max-w-[1200px] flex flex-col gap-5">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            className={`flex items-center gap-7 border rounded-2xl px-8 py-6 ${
              it.accent ? "border-laranja/50 bg-laranja/[0.06]" : "border-bege/12 bg-bege/[0.03]"
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.22, duration: 0.45, ease: "easeOut" }}
          >
            {it.logo && (
              <div className="shrink-0 h-16 w-16 rounded-xl border border-bege/15 bg-bege/5 flex items-center justify-center">
                <BrandLogo brand={it.logo} className="h-9 w-9 text-bege" />
              </div>
            )}
            <div className="text-left">
              <p className={`text-2xl md:text-3xl font-semibold ${it.accent ? "text-laranja" : "text-bege"}`}>
                {it.label}
              </p>
              {it.sub && <p className="text-bege/50 text-lg mt-1">{it.sub}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}
