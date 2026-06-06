import { useEffect, useMemo, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown } from "lucide-react";
import { useRoom } from "@/contexts/RoomContext";
import { useEvent } from "@/contexts/EventContext";
import { avatarUrl } from "@/lib/avatar";
import { LagrimaGradient } from "@/components/brand/LagrimaGradient";


import { SlideShell } from "./SlideShell";

// Conta animada: tween simples de número anterior → novo.
function AnimatedCount({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const start = prev.current;
    const end = value;
    if (start === end) return;
    const dur = 600;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (k < 1) raf = requestAnimationFrame(tick);
      else prev.current = end;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{display}</>;
}

export function LobbySlide() {
  const { room, participants } = useRoom();
  
  
  const { resolveUrl } = useEvent();
  const joinUrl = useMemo(() => {
    if (!room) return "";
    return resolveUrl(`join/${room.code}`);
  }, [room, resolveUrl]);

  // ordem estável por chegada (assume joined_at asc; reforça aqui pra coroas)
  const ordered = useMemo(
    () => [...participants].sort((a, b) => (a.joined_at < b.joined_at ? -1 : 1)),
    [participants],
  );
  const lastJoinedId = ordered[ordered.length - 1]?.id;

  return (
    <SlideShell align="start">
      <div className="grid h-full w-full grid-cols-1 gap-12 lg:grid-cols-[auto_1fr]">
        {/* coluna QR — sempre visível (info essencial: sem QR ninguém entra) */}
        <div className="flex flex-col items-center justify-center gap-6">
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_-16px_hsl(var(--preto)/0.32)]"
            style={{ width: 320 + 48, height: 320 + 48 }}
          >
            {/* QR sempre montado: usa placeholder estável até joinUrl existir,
                evita unmount/remount e flicker durante navegação de slides */}
            <QRCodeSVG
              value={joinUrl || "https://chora.naches.app"}
              size={320}
              bgColor="#ffffff"
              fgColor="#090909"
              level="M"
              style={{ opacity: joinUrl ? 1 : 0, transition: "opacity 200ms linear" }}
            />
          </motion.div>
          <div className="text-center">
            <p className="eyebrow">entra com o celular</p>
            <p className="font-display text-7xl tracking-wider">{room?.code ?? "····"}</p>
            <p className="mt-2 min-h-[1.25rem] text-sm opacity-60">
              {joinUrl ? joinUrl.replace(/^https?:\/\//, "") : ""}
            </p>
          </div>
        </div>

        {/* coluna participantes */}
        <div className="flex min-h-0 flex-col">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">na sala</p>
              <p className="font-display text-[clamp(4rem,10vw,6.3rem)] leading-none">
                <AnimatedCount value={ordered.length} />
                <span className="ml-3 text-3xl opacity-50">/ 40</span>
              </p>
            </div>
            <LagrimaGradient size={120} spinning />
          </div>

          {/* área dos chips (ou estado vazio) */}
          <div className="relative mt-8 flex-1 overflow-hidden">
            {ordered.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="eyebrow"
                >
                  aguardando a turma
                </motion.div>
              </div>
            ) : (
              <div className="grid h-full grid-cols-4 content-start gap-4 overflow-y-auto pr-2 md:grid-cols-6 lg:grid-cols-8">
                <AnimatePresence>
                  {ordered.map((p, idx) => {
                    const isEarly = idx < 3;
                    const isLast = p.id === lastJoinedId && ordered.length > 3;
                    return (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, scale: 0.4, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.4 }}
                        transition={{ type: "spring", stiffness: 320, damping: 22 }}
                        className="relative flex flex-col items-center gap-1"
                      >
                        {/* coroa pros 3 primeiros */}
                        {isEarly && (
                          <motion.div
                            initial={{ y: -8, opacity: 0, rotate: -20 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 18 }}
                            className="absolute -top-3 z-10"
                          >
                            <Crown
                              size={20}
                              className={
                                idx === 0
                                  ? "fill-laranja text-laranja drop-shadow-[0_2px_4px_hsl(var(--laranja)/0.5)]"
                                  : idx === 1
                                    ? "fill-laranja/70 text-laranja/80"
                                    : "fill-laranja/40 text-laranja/60"
                              }
                            />
                          </motion.div>
                        )}
                        {/* halo pulsante no último a entrar */}
                        {isLast && (
                          <motion.div
                            className="absolute -inset-1 rounded-full bg-laranja/30"
                            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                          />
                        )}
                        <img
                          src={avatarUrl(p.avatar_seed, 96)}
                          alt=""
                          className={`relative h-16 w-16 rounded-full bg-white shadow-md ${
                            isEarly ? "ring-2 ring-laranja/60 ring-offset-2 ring-offset-background" : ""
                          }`}
                        />
                        <span className="max-w-[80px] truncate text-xs font-medium">{p.nickname}</span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
