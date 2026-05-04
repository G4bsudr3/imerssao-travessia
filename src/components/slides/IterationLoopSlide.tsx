import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRoom } from "@/contexts/RoomContext";
import { supabase } from "@/integrations/supabase/client";
import { SlideShell } from "./SlideShell";
import { Button } from "@/components/ui/button";

type Idea = { id: string; content: string; nickname: string | null };

export function IterationLoopSlide() {
  const { room, isPresenter, setIteration } = useRoom();
  const iter = room?.current_iteration ?? 1;
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    if (!room) return;
    const load = async () => {
      const { data } = await supabase
        .from("text_responses")
        .select("id, content, nickname")
        .eq("room_id", room.id)
        .eq("slide_key", "iteration")
        .eq("iteration", iter)
        .order("created_at", { ascending: false })
        .limit(12);
      if (data) setIdeas(data as Idea[]);
    };
    load();

    const ch = supabase
      .channel(`iter-${room.id}-${iter}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "text_responses",
          filter: `room_id=eq.${room.id}`,
        },
        (payload) => {
          const row = payload.new as Idea & { iteration: number; slide_key: string };
          if (row.slide_key === "iteration" && row.iteration === iter) {
            setIdeas((cur) => [{ id: row.id, content: row.content, nickname: row.nickname }, ...cur].slice(0, 12));
          }
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [room?.id, iter]);

  // garante iteration >= 1 ao entrar no slide
  useEffect(() => {
    if (isPresenter && room && room.current_iteration < 1) {
      setIteration(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.id]);

  return (
    <SlideShell align="start">
      <div className="flex w-full items-baseline justify-between gap-6">
        <div>
          <p className="eyebrow">iteração</p>
          <p className="font-display text-[clamp(4rem,14cqw,12rem)] leading-none">
            #<span className="text-laranja">{iter}</span>
          </p>
        </div>
        <p className="text-right text-2xl opacity-60">
          o que falta?<br />
          <span className="text-base">a plateia tá mandando do celular →</span>
        </p>
      </div>

      <div className="mt-10 grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {ideas.map((idea) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl bg-white/80 p-5"
            >
              <p className="font-display text-xl leading-tight">{idea.content}</p>
              {idea.nickname && <p className="mt-2 text-xs opacity-50">— {idea.nickname}</p>}
            </motion.div>
          ))}
        </AnimatePresence>
        {ideas.length === 0 && (
          <p className="col-span-full text-center text-lg opacity-40">
            esperando ideias da plateia…
          </p>
        )}
      </div>

      {isPresenter && (
        <div className="mt-10 flex gap-3">
          <Button
            onClick={() => setIteration(iter + 1)}
            className="rounded-2xl bg-laranja text-preto hover:bg-laranja/90"
          >
            + próxima iteração
          </Button>
        </div>
      )}
    </SlideShell>
  );
}
