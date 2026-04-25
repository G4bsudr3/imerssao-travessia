import { useEffect, useRef, useState } from "react";
import { useRoom } from "@/contexts/RoomContext";

const TOTAL_SECONDS = 70 * 60;

/**
 * Cronômetro regressivo de 70min, sincronizado via rooms.start_time (servidor).
 * - Presenter: dispara o start no servidor automaticamente no primeiro mount.
 * - Participantes: leem o mesmo start_time, sem drift entre devices.
 * - Compensação de skew: usa Date(server_start) como ancora absoluta (UTC).
 *
 * Atalhos (presenter): T toggla visibilidade · Shift+R reinicia.
 */
export function PresentationTimer({ visible: chromeVisible }: { visible: boolean }) {
  const { room, isPresenter, startPresentation, resetPresentationStart } = useRoom();
  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [show, setShow] = useState(true);
  const startedRef = useRef(false);

  // Presenter: garante que start_time existe no servidor
  useEffect(() => {
    if (!isPresenter || !room || room.start_time || startedRef.current) return;
    startedRef.current = true;
    startPresentation();
  }, [isPresenter, room, startPresentation]);

  // Tick local ancorado no timestamp do servidor
  useEffect(() => {
    if (!room?.start_time) {
      setRemaining(TOTAL_SECONDS);
      return;
    }
    const startMs = new Date(room.start_time).getTime();
    const tick = () => {
      const elapsed = Math.floor((Date.now() - startMs) / 1000);
      setRemaining(Math.max(0, TOTAL_SECONDS - elapsed));
    };
    tick();
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, [room?.start_time]);

  // Atalhos
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "t" || e.key === "T") setShow((v) => !v);
      if ((e.key === "r" || e.key === "R") && e.shiftKey && isPresenter) {
        resetPresentationStart();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPresenter, resetPresentationStart]);

  if (!show || !room) return null;

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
        title={isPresenter ? "cronômetro · T toggle · shift+R reinicia" : "cronômetro da sessão"}
      >
        {mm}:{ss}
      </div>
    </div>
  );
}
