import { useEffect, useRef, useState } from "react";

type Props = {
  /** Contador absoluto de forças (vem de room.force_count). */
  force: number;
  /** Largura total do equalizer. */
  width?: number;
  /** Altura máxima das barras. */
  height?: number;
  /** Quantas barras. */
  bars?: number;
};

/**
 * Equalizer que reage ao ritmo de ⚡: cada incremento em `force` dispara um pulso
 * que percorre as barras. Decai naturalmente. Visceral e silencioso.
 */
export function EqualizerForce({ force, width = 320, height = 80, bars = 24 }: Props) {
  const [levels, setLevels] = useState<number[]>(() => Array(bars).fill(0));
  const lastForceRef = useRef(force);

  // Quando o force sobe, joga energia nas barras (centro mais forte)
  useEffect(() => {
    if (force <= lastForceRef.current) {
      lastForceRef.current = force;
      return;
    }
    const delta = force - lastForceRef.current;
    lastForceRef.current = force;
    setLevels((cur) => {
      const next = [...cur];
      const center = Math.floor(bars / 2);
      for (let i = 0; i < bars; i++) {
        const dist = Math.abs(i - center);
        const energy = Math.max(0, 1 - dist / (bars / 1.5)) * (0.6 + Math.random() * 0.4);
        next[i] = Math.min(1, next[i] + energy * Math.min(1, delta * 0.5));
      }
      return next;
    });
  }, [force, bars]);

  // Decay loop: a cada frame, drena energia
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setLevels((cur) => cur.map((v) => Math.max(0, v - 0.02)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const barW = width / bars;
  return (
    <svg width={width} height={height} aria-hidden className="overflow-visible">
      <defs>
        <linearGradient id="eqGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#fe7b02" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f756a6" />
        </linearGradient>
      </defs>
      {levels.map((v, i) => {
        const h = Math.max(4, v * height);
        return (
          <rect
            key={i}
            x={i * barW + barW * 0.15}
            y={height - h}
            width={barW * 0.7}
            height={h}
            rx={barW * 0.35}
            fill="url(#eqGrad)"
            style={{ transition: "y 80ms linear, height 80ms linear" }}
          />
        );
      })}
    </svg>
  );
}
