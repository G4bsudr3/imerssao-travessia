// Sound + Haptic global, com toggle persistido em localStorage.
// Sons sintetizados via Web Audio API — zero asset, zero latência.
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "chora.sound.muted";

let _ctx: AudioContext | null = null;
function ctx(): AudioContext {
  if (!_ctx) _ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  return _ctx;
}

type Tone = "tap" | "send" | "vote" | "force" | "milestone" | "success";

function playTone(kind: Tone) {
  try {
    const c = ctx();
    if (c.state === "suspended") c.resume();
    const now = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);

    let freq = 440, dur = 0.08, vol = 0.05, type: OscillatorType = "sine";
    switch (kind) {
      case "tap": freq = 880; dur = 0.04; vol = 0.03; type = "triangle"; break;
      case "send": freq = 660; dur = 0.12; vol = 0.06; type = "sine"; break;
      case "vote": freq = 523; dur = 0.18; vol = 0.07; type = "sine"; break;
      case "force": freq = 1100; dur = 0.06; vol = 0.05; type = "square"; break;
      case "milestone": freq = 783; dur = 0.4; vol = 0.09; type = "triangle"; break;
      case "success": freq = 659; dur = 0.25; vol = 0.08; type = "triangle"; break;
    }
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (kind === "send" || kind === "vote" || kind === "success") {
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + dur);
    }
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(vol, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.start(now);
    osc.stop(now + dur + 0.02);
  } catch {
    // silently fail — som é nice-to-have
  }
}

function vibrate(pattern: number | number[]) {
  if ("vibrate" in navigator) navigator.vibrate?.(pattern);
}

export function getMuted(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "1";
}

export function useMuted(): [boolean, (m: boolean) => void] {
  const [muted, setMutedState] = useState(getMuted);
  useEffect(() => {
    const onStorage = () => setMutedState(getMuted());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  const setMuted = useCallback((m: boolean) => {
    window.localStorage.setItem(STORAGE_KEY, m ? "1" : "0");
    setMutedState(m);
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }, []);
  return [muted, setMuted];
}

/**
 * Hook unificado: feedback(kind) dispara som + vibração apropriada.
 * Respeita mute global. Vibração sempre roda (vibração é menos invasiva que som).
 */
export function useFeedback() {
  return useCallback((kind: Tone) => {
    if (!getMuted()) playTone(kind);
    switch (kind) {
      case "tap": vibrate(8); break;
      case "send": vibrate(15); break;
      case "vote": vibrate([15, 40, 15]); break;
      case "force": vibrate(10); break;
      case "milestone": vibrate([30, 60, 30, 60, 60]); break;
      case "success": vibrate([20, 40, 20]); break;
    }
  }, []);
}
