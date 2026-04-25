import { cn } from "@/lib/utils";

type Props = {
  url?: string;
  children: React.ReactNode;
  className?: string;
};

// Frame de navegador fake (pra slides 52, 57, 71)
export function ChromeFrame({ url = "lovable.dev", children, className }: Props) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border-2 border-preto/20 bg-white shadow-[0_20px_60px_-16px_hsl(var(--preto)/0.32)]", className)}>
      <div className="flex items-center gap-3 border-b border-preto/10 bg-bege/60 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-vermelho" />
          <span className="h-3 w-3 rounded-full bg-laranja" />
          <span className="h-3 w-3 rounded-full bg-azul" />
        </div>
        <div className="ml-2 flex-1 truncate rounded-md bg-white/80 px-3 py-1 text-xs font-mono text-preto/60">
          {url}
        </div>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}
