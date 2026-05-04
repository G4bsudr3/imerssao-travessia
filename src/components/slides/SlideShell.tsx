import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  background?: "bege" | "naval" | "accent";
  align?: "center" | "start";
};

export function SlideShell({ children, className, background = "bege", align = "center" }: Props) {
  const bg =
    background === "naval"
      ? "bg-black text-foreground"
      : background === "accent"
        ? "bg-laranja text-black"
        : "bg-background text-foreground";
  return (
    <div
      className={cn(
        "stage-safe flex h-full w-full flex-col",
        bg,
        align === "center" ? "items-center justify-center text-center" : "items-start justify-center text-left",
        className,
      )}
    >
      {children}
    </div>
  );
}
