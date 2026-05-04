import { cn } from "@/lib/utils";

// TRAVESSIA wordmark — mantém o nome do arquivo por compatibilidade de imports
export function ChoraLogo({ className }: { className?: string }) {
  return (
    <span className={cn("font-display tracking-tight text-laranja", className)}>
      TRAVE<span className="text-preto">SSIA</span>
    </span>
  );
}
