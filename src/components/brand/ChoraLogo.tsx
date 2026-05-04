import { cn } from "@/lib/utils";

// TRAVESSIA wordmark — verde neon + off-white (igual à arte do evento)
export function ChoraLogo({ className }: { className?: string }) {
  return (
    <span className={cn("font-display tracking-tight", className)}>
      <span className="text-laranja">TRAVE</span>
      <span className="text-bege">SSIA</span>
    </span>
  );
}
