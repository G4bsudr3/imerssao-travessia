import { useEffect, useState } from "react";
import { useRoom } from "@/contexts/RoomContext";

const TOTAL_SECONDS = 70 * 60;

/**
 * Mini cronômetro pra exibir no MobileShell, sincronizado com rooms.start_time.
 * Mesma fonte de verdade do PresentationTimer do palco — sem drift entre devices.
 */
export function MobileTimerPill() {
  const { room } = useRoom();
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!room?.start_time) {
      setRemaining(null);
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

  if (remaining === null) return null;

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const tone =
    remaining < 60
      ? "text-vermelho"
      : remaining < 5 * 60
        ? "text-laranja"
        : "text-preto/60";

  return (
    <div className={`rounded-full bg-white/70 px-2.5 py-1 font-mono text-[10px] tabular-nums ${tone}`}>
      {mm}:{ss}
    </div>
  );
}
