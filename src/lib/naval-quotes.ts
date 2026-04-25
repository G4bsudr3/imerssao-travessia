// Naval Ravikant — frases pra rotação em estados vazios.
// Curtas, em português, mantendo a essência. Use NAVAL_QUOTES[i % NAVAL_QUOTES.length].
export const NAVAL_QUOTES: string[] = [
  "joga jogos longos com gente longa.",
  "se vais ler, lê o que ninguém mais lê.",
  "o trunfo não é trabalhar mais — é iterar mais rápido.",
  "aprende a vender, aprende a construir. quem faz os dois é imparável.",
  "leveraging code & media is the rocket fuel.",
  "a riqueza de verdade vem de equity, não de hora trabalhada.",
  "quem sabe pensar com clareza sabe ler, escrever e calcular.",
  "a especificidade do conhecimento é o que ainda paga.",
  "quanto mais reativo tu fores, menos efetivo serás.",
  "deseja menos. sofre menos.",
  "felicidade é uma escolha — e uma habilidade.",
  "tu te tornas o que tu fazes todo dia.",
];

// Hook simples: rotaciona uma frase a cada `intervalMs`.
import { useEffect, useState } from "react";
export function useRotatingQuote(intervalMs = 7000): string {
  const [i, setI] = useState(() => Math.floor(Math.random() * NAVAL_QUOTES.length));
  useEffect(() => {
    const t = window.setInterval(() => setI((cur) => (cur + 1) % NAVAL_QUOTES.length), intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs]);
  return NAVAL_QUOTES[i];
}
