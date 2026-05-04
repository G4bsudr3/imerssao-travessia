import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRoom } from "@/contexts/RoomContext";
import { supabase } from "@/integrations/supabase/client";
import { SlideShell } from "./SlideShell";

type Idea = { id: string; content: string; nickname: string | null; votes_count: number };

export function BrainstormQuestion({ slideKey, question }: { slideKey: string; question: string }) {
  return (
    <SlideShell>
      <div className="space-y-6">
        <p className="eyebrow">brainstorm</p>
        <h1 className="font-display text-[clamp(3rem,8cqw,8rem)] leading-tight">{question}</h1>
        <p className="text-xl opacity-60">manda no celular. quantas ideias quiser.</p>
      </div>
    </SlideShell>
  );
}

function useIdeas(slideKey: string) {
  const { room } = useRoom();
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    if (!room) return;
    const load = async () => {
      const { data } = await supabase
        .from("ideas")
        .select("*")
        .eq("room_id", room.id)
        .eq("slide_key", slideKey)
        .order("created_at", { ascending: true });
      if (data) setIdeas(data as Idea[]);
    };
    load();
    const ch = supabase
      .channel(`ideas-${room.id}-${slideKey}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "ideas", filter: `room_id=eq.${room.id}` }, () => load())
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [room, slideKey]);

  return ideas;
}

export function BrainstormActive({ slideKey }: { slideKey: string }) {
  const ideas = useIdeas(slideKey);
  return (
    <SlideShell align="start">
      <div className="mb-6 flex w-full items-end justify-between">
        <p className="eyebrow">ideias chegando</p>
        <p className="font-display text-5xl">{ideas.length}</p>
      </div>
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {ideas.map((i) => (
            <motion.div
              key={i.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="rounded-2xl bg-white p-5 shadow-[0_8px_32px_-8px_hsl(var(--preto)/0.18)]"
            >
              <p className="font-display text-2xl leading-tight">{i.content}</p>
              {i.nickname && <p className="mt-2 text-xs opacity-50">— {i.nickname}</p>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SlideShell>
  );
}

export function BrainstormSettled({ slideKey }: { slideKey: string }) {
  const ideas = useIdeas(slideKey).slice(0, 5);
  return (
    <SlideShell align="start">
      <p className="eyebrow mb-4">5 na mesa</p>
      <div className="grid w-full grid-cols-1 gap-4">
        {ideas.map((i, idx) => (
          <motion.div
            key={i.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="flex items-center gap-6 rounded-2xl bg-white p-6"
          >
            <span className="font-display text-6xl text-laranja">{idx + 1}</span>
            <span className="font-display text-3xl md:text-4xl">{i.content}</span>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}
