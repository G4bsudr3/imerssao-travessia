import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
};

// Caixa estilo prompt do Lovable
export function CaixaPrompt({ children, className, highlight = false }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border-2 bg-white px-8 py-6 text-left text-2xl font-body text-preto shadow-[0_8px_32px_-8px_hsl(var(--preto)/0.18)]",
        highlight ? "border-laranja ring-4 ring-laranja/20" : "border-preto/10",
        className,
      )}
    >
      <div className="eyebrow mb-3">prompt</div>
      <div className="leading-snug">{children}</div>
    </div>
  );
}
