import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRoom } from "@/contexts/RoomContext";
import { supabase } from "@/integrations/supabase/client";
import { SlideShell } from "./SlideShell";

const SLIDE_KEY = "poll_brief";

export function PollSlide() {
  const { room } = useRoom();
  const [counts, setCounts] = useState({ sim: 0, ajustar: 0 });

  useEffect(() => {
    if (!room) return;
    const load = async () => {
      const { data } = await supabase
        .from("text_responses")
        .select("content")
        .eq("room_id", room.id)
        .eq("slide_key", SLIDE_KEY);
      if (data) {
        const c = { sim: 0, ajustar: 0 };
        data.forEach((d) => {
          if (d.content === "sim") c.sim++;
          else if (d.content === "ajustar") c.ajustar++;
        });
        setCounts(c);
      }
    };
    load();
    const ch = supabase
      .channel(`poll-${room.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "text_responses", filter: `room_id=eq.${room.id}` }, (p) => {
        const row = p.new as { slide_key: string; content: string };
        if (row.slide_key === SLIDE_KEY) {
          setCounts((c) => row.content === "sim" ? { ...c, sim: c.sim + 1 } : row.content === "ajustar" ? { ...c, ajustar: c.ajustar + 1 } : c);
        }
      })
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [room]);

  const total = counts.sim + counts.ajustar || 1;
  return (
    <SlideShell>
      <div className="space-y-12">
        <h1 className="font-display text-7xl">o brief tá bom?</h1>
        <div className="grid grid-cols-2 gap-8">
          <Bar label="bora codar" count={counts.sim} pct={(counts.sim / total) * 100} accent />
          <Bar label="ajustar" count={counts.ajustar} pct={(counts.ajustar / total) * 100} />
        </div>
      </div>
    </SlideShell>
  );
}

function Bar({ label, count, pct, accent = false }: { label: string; count: number; pct: number; accent?: boolean }) {
  return (
    <div className={`relative h-64 overflow-hidden rounded-3xl border-2 border-preto/15 bg-white text-left`}>
      <motion.div animate={{ height: `${pct}%` }} transition={{ type: "spring", stiffness: 70, damping: 18 }} className={`absolute bottom-0 left-0 right-0 ${accent ? "bg-laranja" : "gradient-tear"}`} />
      <div className="relative flex h-full flex-col justify-end p-6">
        <p className="font-display text-5xl">{label}</p>
        <p className="eyebrow mt-2">{count} votos</p>
      </div>
    </div>
  );
}
