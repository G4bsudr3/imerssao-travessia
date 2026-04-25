import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type Ctx = { visible: boolean; show: () => void };
const ChromeCtx = createContext<Ctx>({ visible: true, show: () => {} });

export function ChromeVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const t = useRef<number | null>(null);

  const show = useCallback(() => {
    setVisible(true);
    if (t.current) window.clearTimeout(t.current);
    t.current = window.setTimeout(() => setVisible(false), 2500);
  }, []);

  useEffect(() => {
    const onPointer = () => show();
    // Teclas de navegação NÃO devem reaparecer o HUD (evita flicker a cada slide).
    const navKeys = new Set(["ArrowRight", "ArrowLeft", " ", "PageDown", "PageUp", "Escape"]);
    const onKey = (e: KeyboardEvent) => {
      if (navKeys.has(e.key)) return;
      show();
    };
    window.addEventListener("mousemove", onPointer);
    window.addEventListener("touchstart", onPointer);
    window.addEventListener("keydown", onKey);
    show();
    return () => {
      window.removeEventListener("mousemove", onPointer);
      window.removeEventListener("touchstart", onPointer);
      window.removeEventListener("keydown", onKey);
      if (t.current) window.clearTimeout(t.current);
    };
  }, [show]);

  return <ChromeCtx.Provider value={{ visible, show }}>{children}</ChromeCtx.Provider>;
}

export const useChromeVisibility = () => useContext(ChromeCtx);
