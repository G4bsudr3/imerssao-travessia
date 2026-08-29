import { motion } from "framer-motion";
import { Eye, Plus, Pencil, Trash2, Lock } from "lucide-react";
import { SlideShell } from "../SlideShell";

const OPS = [
  { op: "SELECT", desc: "quem pode ver", icon: Eye },
  { op: "INSERT", desc: "quem pode criar", icon: Plus },
  { op: "UPDATE", desc: "quem pode editar", icon: Pencil },
  { op: "DELETE", desc: "quem pode apagar", icon: Trash2 },
];

export default function RlsCrudSlide() {
  return (
    <SlideShell background="naval" className="items-center justify-center">
      <p className="eyebrow mb-4">RLS · row level security</p>
      <h2 className="font-display text-5xl md:text-6xl mb-3">regra que define quem vê qual linha</h2>
      <div className="flex items-center gap-3 mb-14 text-bege/50">
        <Lock className="h-5 w-5 text-laranja" />
        <p className="font-mono text-sm tracking-widest">o cadeado fica no banco — não no front</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-[1400px]">
        {OPS.map((o, i) => (
          <motion.div
            key={o.op}
            className="border border-bege/12 bg-bege/[0.04] rounded-2xl p-8 flex flex-col items-center gap-4 text-center"
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.4 + i * 0.18, type: "spring", stiffness: 180, damping: 16 }}
          >
            <div className="h-16 w-16 rounded-full border border-laranja/40 bg-laranja/10 flex items-center justify-center">
              <o.icon className="h-7 w-7 text-laranja" />
            </div>
            <p className="font-mono text-2xl font-bold tracking-wider text-bege">{o.op}</p>
            <p className="text-bege/50 text-lg">{o.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-12 text-bege/40 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        sem policy, o Supabase nega tudo por padrão. com policy errada, libera tudo.
      </motion.p>
    </SlideShell>
  );
}
