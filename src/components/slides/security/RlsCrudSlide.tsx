import { motion } from "framer-motion";
import { Eye, Plus, Pencil, Trash2, ShieldCheck } from "lucide-react";
import { SlideShell } from "../SlideShell";

const OPS = [
  { op: "SELECT", desc: "quem pode ver", icon: Eye },
  { op: "INSERT", desc: "quem pode criar", icon: Plus },
  { op: "UPDATE", desc: "quem pode editar", icon: Pencil },
  { op: "DELETE", desc: "quem pode apagar", icon: Trash2 },
];

const ROWS = [
  { id: "01", dono: "você", mine: true },
  { id: "02", dono: "maria", mine: false },
  { id: "03", dono: "você", mine: true },
  { id: "04", dono: "joão", mine: false },
];

export default function RlsCrudSlide() {
  return (
    <SlideShell background="naval" className="items-center justify-center">
      <p className="eyebrow mb-3">RLS · row level security</p>
      <h2 className="font-display text-[clamp(2.6rem,5vw,3.8rem)] mb-3 text-center">
        regra que define quem vê qual linha
      </h2>
      <div className="mb-10 flex items-center gap-3 text-bege/50">
        <ShieldCheck className="h-5 w-5 text-laranja" />
        <p className="font-mono text-sm tracking-widest">o cadeado fica no banco — não no front</p>
      </div>

      <div className="grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* tabela filtrada pela policy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl border border-bege/12 bg-bege/[0.04]"
        >
          <div className="flex items-center justify-between border-b border-bege/10 px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-bege/45">
            <span>tabela · pedidos</span>
            <span className="text-laranja">policy: user_id = auth.uid()</span>
          </div>

          {ROWS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
              className="relative flex items-center gap-6 border-b border-bege/[0.06] px-6 py-4 font-mono text-base last:border-0"
            >
              <span className="text-bege/35">#{r.id}</span>
              <span className={r.mine ? "text-bege" : "text-bege/30"}>dono: {r.dono}</span>
              <span className={`ml-auto text-sm ${r.mine ? "text-laranja" : "text-vermelho/70"}`}>
                {r.mine ? "visível" : "bloqueado"}
              </span>

              {!r.mine && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-vermelho/[0.07]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.1 + i * 0.15, duration: 0.5, ease: "easeOut" }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* operações */}
        <div className="grid grid-cols-2 gap-5">
          {OPS.map((o, i) => (
            <motion.div
              key={o.op}
              className="group flex items-center gap-4 rounded-2xl border border-bege/12 bg-bege/[0.04] p-5 transition-colors hover:border-laranja/40"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.14, type: "spring", stiffness: 190, damping: 17 }}
            >
              <motion.div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-laranja/40 bg-laranja/10"
                animate={{ boxShadow: ["0 0 0px hsl(var(--laranja)/0)", "0 0 18px hsl(var(--laranja)/0.35)", "0 0 0px hsl(var(--laranja)/0)"] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              >
                <o.icon className="h-6 w-6 text-laranja" />
              </motion.div>
              <div className="text-left">
                <p className="font-mono text-xl font-bold tracking-wider text-bege">{o.op}</p>
                <p className="text-base text-bege/50">{o.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p
        className="mt-10 text-center text-lg text-bege/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        sem policy, o Supabase nega tudo por padrão. com policy errada, libera tudo.
      </motion.p>
    </SlideShell>
  );
}
