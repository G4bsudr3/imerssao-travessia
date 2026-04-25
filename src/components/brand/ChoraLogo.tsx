import { cn } from "@/lib/utils";

export function ChoraLogo({ className }: { className?: string }) {
  return (
    <span className={cn("font-display tracking-tight", className)}>
      CHŎRA
    </span>
  );
}
