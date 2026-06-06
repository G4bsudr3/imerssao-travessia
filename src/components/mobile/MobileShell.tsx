import { Volume2, VolumeX } from "lucide-react";
import { useMuted } from "@/hooks/useFeedback";
import { useRoom } from "@/contexts/RoomContext";
import { useEvent } from "@/contexts/EventContext";
import { avatarUrl } from "@/lib/avatar";
import { MobileTimerPill } from "./MobileTimerPill";

type Props = {
  children: React.ReactNode;
  nickname?: string;
  seed?: string;
};

export function MobileShell({ children, nickname, seed }: Props) {
  const [muted, setMuted] = useMuted();
  const { currentSlide } = useRoom();
  const { event, actForSlide } = useEvent();
  const meta = actForSlide(currentSlide);
  const total = event.totalSlides;
  const pct = ((currentSlide + 1) / total) * 100;

  return (
    <div className="bg-lagrima-blur min-h-[100dvh] bg-background">
      {/* Progress bar fina */}
      <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-preto/5">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, background: "var(--gradient-tear)" }}
        />
      </div>

      {/* Header sticky */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 px-4 pb-3 pt-4 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          {seed && (
            <img
              src={avatarUrl(seed, 64)}
              alt=""
              className="h-9 w-9 rounded-full bg-white shadow-sm ring-2 ring-white"
            />
          )}
          {nickname && (
            <span className="font-display text-lg leading-none">{nickname}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <MobileTimerPill />
          <div className="rounded-full bg-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-preto/70">
            ato {ato.num} · {ato.label}
          </div>
          <button
            onClick={() => setMuted(!muted)}
            aria-label={muted ? "ativar som" : "silenciar"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-preto/70 transition active:scale-90"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <main className="px-5 pb-12 pt-2">{children}</main>
    </div>
  );
}
