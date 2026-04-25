import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "naval";
};

// Balão de fala com borda serrada (estilo recortado)
export function BalaoSerrado({ children, className, variant = "default" }: Props) {
  const bg =
    variant === "accent"
      ? "bg-laranja text-preto"
      : variant === "naval"
        ? "bg-preto text-bege"
        : "bg-bege text-preto";
  return (
    <div
      className={cn(
        "relative inline-block px-8 py-5 font-display text-4xl md:text-6xl",
        bg,
        className,
      )}
      style={{
        clipPath:
          "polygon(2% 8%, 8% 0%, 18% 6%, 28% 0%, 40% 5%, 52% 0%, 64% 6%, 78% 0%, 92% 6%, 100% 16%, 96% 30%, 100% 48%, 96% 64%, 100% 82%, 92% 96%, 78% 100%, 60% 96%, 42% 100%, 22% 96%, 8% 100%, 0% 88%, 4% 70%, 0% 52%, 4% 34%, 0% 18%)",
      }}
    >
      {children}
    </div>
  );
}
