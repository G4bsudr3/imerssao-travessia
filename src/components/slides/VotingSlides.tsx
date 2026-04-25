import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useRoom } from "@/contexts/RoomContext";
import { supabase } from "@/integrations/supabase/client";
import { CONFETTI_PALETTE } from "@/lib/colors";
import { SlideShell } from "./SlideShell";

type Idea = { id: string; content: string; votes_count: number };

const VOTE_SLIDE_KEY = "brainstorm";

function useTopIdeas() {
  const { room } = useRoom();
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    if (!room) return;
    let cancelled = false;

    const load = async () => {
      const { data } = await supabase
        .from("ideas")
        .select("id, content, votes_count")
        .eq("room_id", room.id)
        .eq("slide_key", VOTE_SLIDE_KEY)
        .order("created_at", { ascending: true })
        .limit(5);
      if (!cancelled && data) setIdeas(data as Idea[]);
    };
    load();

    const ch = supabase
      .channel(`vote-${room.id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "ideas", filter: `room_id=eq.${room.id}` },
        (payload) => {
          // patch incremental — sem refetch
          const next = payload.new as Idea;
          setIdeas((prev) => prev.map((i) => (i.id === next.id ? { ...i, votes_count: next.votes_count } : i)));
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(ch);
    };
  }, [room]);

  return ideas;
}

export function VotingActive() {
  const ideas = useTopIdeas();
  // Reordena por votos desc; mantém ordem estável p/ empates por created_at (já vem assim).
  const ranked = [...ideas].sort((a, b) => b.votes_count - a.votes_count);
  const max = Math.max(1, ...ranked.map((i) => i.votes_count));
  const leader = ranked[0];
  return (
    <SlideShell align="start">
      <p className="eyebrow mb-4">votação aberta</p>
      <div className="w-full space-y-4">
        {ranked.map((i, idx) => {
          const isLeader = leader && i.id === leader.id && i.votes_count > 0;
          return (
            <motion.div
              key={i.id}
              layout
              transition={{ layout: { type: "spring", stiffness: 220, damping: 26 } }}
              className={`flex items-center gap-4 rounded-2xl p-5 transition-colors ${isLeader ? "bg-laranja text-preto" : "bg-white"}`}
            >
              <span className={`w-12 text-center font-display text-4xl ${isLeader ? "text-preto" : "text-laranja"}`}>{idx + 1}</span>
              <div className="flex-1">
                <p className="font-display text-2xl md:text-3xl">{i.content}</p>
                <div className={`mt-2 h-3 w-full overflow-hidden rounded-full ${isLeader ? "bg-preto/20" : "bg-preto/10"}`}>
                  <motion.div animate={{ width: `${(i.votes_count / max) * 100}%` }} transition={{ type: "spring", stiffness: 90, damping: 18 }} className={`h-full ${isLeader ? "bg-preto" : "gradient-tear"}`} />
                </div>
              </div>
              <span className="w-16 text-right font-display text-4xl">{i.votes_count}</span>
            </motion.div>
          );
        })}
        {ranked.length === 0 && <p className="opacity-50">aguardando ideias…</p>}
      </div>
    </SlideShell>
  );
}

export function VotingWinner() {
  const ideas = useTopIdeas();
  const winner = [...ideas].sort((a, b) => b.votes_count - a.votes_count)[0];

  useEffect(() => {
    if (!winner) return;
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors: CONFETTI_PALETTE });
  }, [winner?.id]);

  return (
    <SlideShell>
      <div className="space-y-8">
        <p className="eyebrow">vencedora</p>
        <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="font-display text-[clamp(3rem,8vw,8rem)] leading-tight text-laranja">
          {winner?.content ?? "—"}
        </motion.h1>
        <p className="text-2xl opacity-60">{winner?.votes_count ?? 0} votos</p>
      </div>
    </SlideShell>
  );
}
