// Contexto de apresentação puramente local.
// Antes era multi-device (sala + participantes via Supabase realtime).
// Agora a apresentação é solo do palestrante — só guarda o slide atual em memória.
import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type Phase = "idle" | "pensando" | "gerando" | "iterando" | "publicando";

type RoomContextValue = {
  currentSlide: number;
  isPresenter: boolean;
  ready: boolean;
  setSlide: (idx: number) => void;
  /** Reinicia a apresentação do começo */
  restart: () => void;
};

const RoomContext = createContext<RoomContextValue | null>(null);

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const setSlide = useCallback((idx: number) => setCurrentSlide(idx), []);
  const restart = useCallback(() => setCurrentSlide(0), []);

  const value = useMemo<RoomContextValue>(
    () => ({ currentSlide, isPresenter: true, ready: true, setSlide, restart }),
    [currentSlide, setSlide, restart],
  );

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}

export function useRoom() {
  const ctx = useContext(RoomContext);
  if (!ctx) throw new Error("useRoom precisa de RoomProvider");
  return ctx;
}
