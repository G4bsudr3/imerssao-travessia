import { useEffect, useRef, useState } from "react";

const BASE_W = 1920;
const BASE_H = 1080;

/**
 * Renderiza o conteúdo numa caixa 16:9 fixa de 1920x1080 e escala
 * uniformemente (contain) pra caber em qualquer viewport — mantém
 * a apresentação consistente do laptop ao telão.
 */
export function StageScaler({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const { clientWidth: w, clientHeight: h } = el;
      setScale(Math.min(w / BASE_W, h / BASE_H));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div
        style={{
          width: BASE_W,
          height: BASE_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
          containerType: "size",
        }}
      >
        {children}
      </div>
    </div>
  );
}
