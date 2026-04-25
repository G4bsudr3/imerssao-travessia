import { cn } from "@/lib/utils";

type Props = {
  label: string;
  variant?: "city" | "vehicle" | "screen";
  className?: string;
};

// SVG semântico estilizado pra POA 1900 / charrete / carro / screenshots
export function PlaceholderIllustration({ label, variant = "city", className }: Props) {
  return (
    <div className={cn("relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-preto/15 bg-gradient-to-br from-bege to-secondary", className)}>
      <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
        {variant === "city" && (
          <g fill="hsl(var(--preto))">
            <rect x="20" y="140" width="40" height="80" />
            <rect x="70" y="100" width="50" height="120" />
            <rect x="130" y="120" width="35" height="100" />
            <rect x="175" y="80" width="60" height="140" />
            <rect x="245" y="110" width="45" height="110" />
            <rect x="300" y="90" width="55" height="130" />
            <rect x="365" y="130" width="25" height="90" />
          </g>
        )}
        {variant === "vehicle" && (
          <g fill="hsl(var(--preto))" transform="translate(100 80)">
            <rect x="20" y="40" width="160" height="50" rx="8" />
            <circle cx="50" cy="100" r="22" />
            <circle cx="150" cy="100" r="22" />
          </g>
        )}
        {variant === "screen" && (
          <g fill="hsl(var(--preto))">
            <rect x="40" y="30" width="320" height="180" rx="12" fillOpacity="0.15" />
            <rect x="60" y="50" width="120" height="14" rx="3" />
            <rect x="60" y="76" width="200" height="10" rx="3" fillOpacity="0.5" />
            <rect x="60" y="94" width="180" height="10" rx="3" fillOpacity="0.5" />
            <rect x="60" y="120" width="80" height="60" rx="6" fillOpacity="0.3" />
            <rect x="160" y="120" width="80" height="60" rx="6" fillOpacity="0.3" />
            <rect x="260" y="120" width="80" height="60" rx="6" fillOpacity="0.3" />
          </g>
        )}
      </svg>
      <div className="relative font-mono-caps text-xs text-preto/60">{label}</div>
    </div>
  );
}
