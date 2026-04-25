import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";
import { CONFETTI_PALETTE } from "@/lib/colors";

type Toast = { id: number; text: string };

let _seq = 0;
let _emit: ((t: Toast) => void) | null = null;

/** Mostra um toast laranja efêmero no topo da tela. */
export function showToast(text: string) {
  if (_emit) _emit({ id: ++_seq, text });
}

/** Confeti micro-burst em um elemento específico (usa boundingRect). */
export function microConfetti(target?: HTMLElement | null) {
  if (target) {
    const r = target.getBoundingClientRect();
    confetti({
      particleCount: 18,
      spread: 60,
      startVelocity: 28,
      gravity: 0.9,
      ticks: 90,
      scalar: 0.7,
      colors: CONFETTI_PALETTE,
      origin: { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight },
      disableForReducedMotion: true,
    });
  } else {
    confetti({ particleCount: 18, spread: 60, scalar: 0.7, colors: CONFETTI_PALETTE, disableForReducedMotion: true });
  }
}

/** Confeti grande pra peaks (vencedora, milestones). */
export function bigConfetti() {
  confetti({
    particleCount: 140,
    spread: 100,
    startVelocity: 45,
    origin: { y: 0.6 },
    colors: CONFETTI_PALETTE,
    disableForReducedMotion: true,
  });
}

export function ToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    _emit = (t) => {
      setToasts((cur) => [...cur, t]);
      window.setTimeout(() => {
        setToasts((cur) => cur.filter((x) => x.id !== t.id));
      }, 1800);
    };
    return () => { _emit = null; };
  }, []);

  if (typeof document === "undefined") return null;
  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex flex-col items-center gap-2 pt-4">
      {toasts.map((t) => (
        <div key={t.id} className="toast-laranja">
          {t.text}
        </div>
      ))}
    </div>,
    document.body,
  );
}
