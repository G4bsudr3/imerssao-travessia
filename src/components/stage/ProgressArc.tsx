type Props = {
  /** Segundos decorridos. */
  elapsed: number;
  /** Total esperado em segundos. Default 600 (10min). */
  expectedTotal?: number;
  /** Tamanho do círculo. */
  size?: number;
  children?: React.ReactNode;
};

/**
 * Arco SVG que preenche conforme `elapsed/expectedTotal`.
 * Após 80% do tempo esperado, vira vermelho pulsante.
 * Não recua se passar do total — fica em 100% e vermelho.
 */
export function ProgressArc({ elapsed, expectedTotal = 600, size = 240, children }: Props) {
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const ratio = Math.min(1, elapsed / expectedTotal);
  const offset = c * (1 - ratio);
  const urgent = elapsed >= expectedTotal * 0.8;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className={urgent ? "animate-pulse-soft" : ""}>
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fe7b02" />
            <stop offset="50%" stopColor="#f756a6" />
            <stop offset="100%" stopColor="#6f77fc" />
          </linearGradient>
        </defs>
        {/* track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(0 0% 4% / 0.08)"
          strokeWidth={stroke}
        />
        {/* progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={urgent ? "#fd4644" : "url(#arcGrad)"}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 600ms ease, stroke 400ms ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}
