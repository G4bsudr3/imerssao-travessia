import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRoom } from "@/contexts/RoomContext";
import { supabase } from "@/integrations/supabase/client";
import { SlideShell } from "./SlideShell";

const SLIDE_KEY = "pulse";

export function PulseCheckSlide() {
  const { room } = useRoom();
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    if (!room) return;
    const load = async () => {
      const { data } = await supabase
        .from("text_responses")
        .select("content")
        .eq("room_id", room.id)
        .eq("slide_key", SLIDE_KEY);
      if (data) setValues(data.map((d) => Number(d.content)).filter((n) => !isNaN(n)));
    };
    load();
    const ch = supabase
      .channel(`pulse-${room.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "text_responses", filter: `room_id=eq.${room.id}` }, (p) => {
        const row = p.new as { slide_key: string; content: string };
        if (row.slide_key === SLIDE_KEY) {
          const n = Number(row.content);
          if (!isNaN(n)) setValues((v) => [...v, n]);
        }
      })
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [room]);

  const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  const fillPct = (avg / 10) * 100;

  return (
    <SlideShell>
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div className="text-left">
          <p className="eyebrow">pulse check</p>
          <h1 className="font-display text-7xl leading-tight">como tu chega aqui hoje?</h1>
          <p className="mt-6 text-xl opacity-60">de 1 a 10. responde no celular.</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative h-96 w-32 overflow-hidden rounded-full border-2 border-preto/15 bg-white">
            <motion.div
              animate={{ height: `${fillPct}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 18 }}
              className="absolute bottom-0 left-0 right-0 gradient-tear"
            />
          </div>
          <div className="text-center">
            <div className="font-display text-7xl leading-none">{avg.toFixed(1)}</div>
            <div className="eyebrow mt-2">{values.length} {values.length === 1 ? "voto" : "votos"}</div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
