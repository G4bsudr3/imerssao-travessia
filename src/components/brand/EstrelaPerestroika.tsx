import { cn } from "@/lib/utils";

// Estrela 5 pontas estilo Perestroika
export function EstrelaPerestroika({ size = 120, className, color = "currentColor" }: { size?: number; className?: string; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden>
      <polygon
        points="50,5 61,38 96,38 67,58 78,92 50,72 22,92 33,58 4,38 39,38"
        fill={color}
      />
    </svg>
  );
}
