import { useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useRoom } from "@/contexts/RoomContext";
import { useEvent } from "@/contexts/EventContext";

/**
 * QR persistente da sessão no canto inferior direito.
 * Discreto (opacidade baixa, hover revela), pra quem sair da sessão conseguir voltar.
 * Auto-some junto com o resto do chrome quando visible=false.
 */
export function PersistentSessionQR({ visible }: { visible: boolean }) {
  const { room } = useRoom();
  const { resolveUrl } = useEvent();

  const joinUrl = useMemo(() => {
    if (!room?.code) return "";
    return resolveUrl(`join/${room.code}`);
  }, [room?.code, resolveUrl]);

  if (!joinUrl) return null;

  return (
    <div
      className={`group absolute bottom-4 right-4 z-40 chrome-fade ${visible ? "chrome-visible" : "chrome-hidden"}`}
    >
      <div className="flex items-end gap-2 opacity-30 transition-opacity duration-300 group-hover:opacity-95">
        <div className="hidden flex-col items-end pb-1 text-right group-hover:flex">
          <span className="font-mono text-[10px] uppercase tracking-widest text-preto/60">
            voltar pra sala
          </span>
          <span className="font-display text-lg leading-none text-preto">{room?.code}</span>
        </div>
        <div className="rounded-md bg-white p-1.5 shadow-[0_4px_20px_-6px_hsl(var(--preto)/0.25)]">
          <QRCodeSVG
            value={joinUrl}
            size={56}
            bgColor="#ffffff"
            fgColor="#090909"
            level="M"
          />
        </div>
      </div>
    </div>
  );
}
