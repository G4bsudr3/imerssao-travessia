import { Github } from "lucide-react";

/**
 * Logos de marcas em SVG inline — funcionam offline (telão) e herdam `currentColor`.
 * Use `className` para controlar tamanho/cor (ex: "h-10 w-10 text-bege").
 */
export type Brand =
  | "aws"
  | "anthropic"
  | "github"
  | "supabase"
  | "meta"
  | "amazon"
  | "tiktok"
  | "gitguardian"
  | "semgrep"
  | "openai"
  | "lovable";

const PATHS: Record<Exclude<Brand, "github">, React.ReactNode> = {
  // seta-sorriso da AWS
  aws: (
    <>
      <path
        d="M8 30c9.5 8.5 22.5 9.5 33 2.5"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M38 27.5l5.5 4.2-6.6 1.9z" fill="currentColor" />
      <text x="24" y="24" textAnchor="middle" fontSize="15" fontWeight="800" fill="currentColor" fontFamily="inherit">
        aws
      </text>
    </>
  ),
  // estrela/"A" radiante da Anthropic
  anthropic: (
    <path
      d="M24 4l4.2 14.5L43 14l-9.4 11.6L43 38l-14.8-4.5L24 48l-4.2-14.5L5 38l9.4-12.4L5 14l14.8 4.5z"
      fill="currentColor"
      transform="scale(0.92) translate(2,2)"
    />
  ),
  // bolt do Supabase
  supabase: (
    <path
      d="M27.5 3L11 27.5h9.8L18 45 37 20.5h-10.4z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  // loop infinito da Meta
  meta: (
    <path
      d="M16 34c-5 0-8-4-8-9.5S11 15 16 15c7 0 9 9.5 16 9.5 5 0 8-4 8-9.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  ),
  // "a" + sorriso da Amazon
  amazon: (
    <>
      <text x="24" y="26" textAnchor="middle" fontSize="26" fontWeight="800" fill="currentColor" fontFamily="inherit">
        a
      </text>
      <path
        d="M10 31c8 6.5 20 6.5 28 0"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M34.5 28.5l5 3.8-6 1.7z" fill="currentColor" />
    </>
  ),
  // nota musical do TikTok
  tiktok: (
    <path
      d="M34.6 6h-7.1v26.4a7.6 7.6 0 1 1-7.6-7.6c.4 0 .8 0 1.2.1v-7.4a15 15 0 0 0-1.2-.1 15 15 0 1 0 15 15V17.4a16.6 16.6 0 0 0 9.7 3.1v-7.3A9.9 9.9 0 0 1 34.6 6Z"
      fill="currentColor"
    />
  ),
  // escudo com chave (GitGuardian)
  gitguardian: (
    <>
      <path
        d="M24 3l16 6v13c0 10.5-6.8 18.4-16 23C14.8 40.4 8 32.5 8 22V9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="21" r="4.5" fill="currentColor" />
      <path d="M24 25.5V34m0 0h4m-4-4h3.2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  // < /> do Semgrep
  semgrep: (
    <path
      d="M17 11L6 24l11 13M31 11l11 13-11 13M27 7l-6 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  // nó hexagonal (OpenAI)
  openai: (
    <>
      <path
        d="M24 5l16.5 9.5v19L24 43 7.5 33.5v-19z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="6.5" fill="currentColor" />
    </>
  ),
  // coração (Lovable)
  lovable: (
    <path
      d="M24 43C11 33.5 4.5 26 4.5 17.5A10.5 10.5 0 0 1 24 12a10.5 10.5 0 0 1 19.5 5.5C43.5 26 37 33.5 24 43z"
      fill="currentColor"
    />
  ),
};

export function BrandLogo({ brand, className }: { brand: Brand; className?: string }) {
  if (brand === "github") return <Github className={className} aria-label="GitHub" />;
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-label={brand} role="img">
      {PATHS[brand]}
    </svg>
  );
}
