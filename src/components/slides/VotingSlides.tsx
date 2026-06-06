import { motion } from "framer-motion";

function Prompt({ eyebrow, question }: { eyebrow: string; question: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-bege px-12 text-preto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-6">
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="max-w-5xl text-center font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight"
      >
        {question}
      </motion.h2>
    </div>
  );
}

export function VotingActive() {
  return <Prompt eyebrow="votação" question="qual ideia segue?" />;
}
export function VotingWinner() {
  return <Prompt eyebrow="venceu" question="vamos com essa." />;
}
