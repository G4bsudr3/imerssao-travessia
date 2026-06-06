import { useEffect, useRef, useState } from "react";

const TOTAL_SECONDS = 70 * 60;

/**
 * Cronômetro regressivo local de 70min para o palestrante.
 * - Começa quando a apresentação monta.
 * - Atalhos: T toggla visibilidade · Shift+R reinicia.
 */
export function PresentationTimer({ visible: chromeVisible }: { visible: boolean }) {
  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [show, setShow] = useState(true);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    const tick = () => {
      const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
      setRemaining(Math.max(0, TOTAL_SECONDS - elapsed));
    };
    tick();
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "t" || e.key === "T") setShow((v) => !v);
      if ((e.key === "r" || e.key === "R") && e.shiftKey) {
        startRef.current = Date.now();
        setRemaining(TOTAL_SECONDS);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!show) return null;

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  const tone =
    remaining < 60
      ? "text-vermelho"
      : remaining < 5 * 60
        ? "text-laranja"
        : "text-preto/50";

  return (
    <div
      className={`pointer-events-none absolute left-4 top-4 z-40 chrome-fade ${chromeVisible ? "chrome-visible" : "chrome-hidden"}`}
    >
      <div
        className={`rounded-md bg-bege/70 px-2 py-1 font-mono text-xs tabular-nums backdrop-blur-sm ${tone}`}
        title="cronômetro · T toggle · shift+R reinicia"
      >
        {mm}:{ss}
      </div>
    </div>
  );
}
