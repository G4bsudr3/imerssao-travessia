import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRoom } from "@/contexts/RoomContext";
import { supabase } from "@/integrations/supabase/client";
import { avatarUrl, randomSeed } from "@/lib/avatar";
import { Button } from "@/components/ui/button";
import { slideManifest, isLivePhaseSlide, isIterationSlide } from "@/slides/slideManifest";
import { MobileShell } from "@/components/mobile/MobileShell";
import { showToast, microConfetti, bigConfetti } from "@/components/mobile/ActionFeedback";
import { useFeedback } from "@/hooks/useFeedback";
import { ProgressArc } from "@/components/stage/ProgressArc";
import { LagrimaGradient } from "@/components/brand/LagrimaGradient";

type Phase = "join" | "in";

const Join = () => {
  const { code } = useParams<{ code: string }>();
  const { joinRoom, currentSlide } = useRoom();
  const [phase, setPhase] = useState<Phase>("join");
  const [nickname, setNickname] = useState("");
  const [seed, setSeed] = useState(randomSeed());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fb = useFeedback();

  const submit = async () => {
    if (!code || !nickname.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await joinRoom(code, nickname.trim(), seed);
      fb("success");
      setPhase("in");
    } catch {
      setError("não consegui entrar. confere o código.");
    } finally {
      setLoading(false);
    }
  };

  if (phase === "join") {
    return (
      <div className="bg-lagrima-blur relative flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-background p-6">
        <div className="text-center">
          <p className="eyebrow">sala</p>
          <p className="font-display text-7xl tracking-wider">{code}</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <motion.img
            key={seed}
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            src={avatarUrl(seed, 128)}
            alt=""
            className="h-28 w-28 rounded-full bg-white shadow-md"
          />
          <button
            onClick={() => { setSeed(randomSeed()); fb("tap"); }}
            className="eyebrow underline-offset-4 hover:underline"
          >
            outro avatar
          </button>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="teu apelido"
            maxLength={20}
            autoFocus
            className="input-line text-center"
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          {/* Preview live: como vai aparecer no palco */}
          {nickname.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white/60 px-4 py-2"
            >
              <img src={avatarUrl(seed, 48)} alt="" className="h-7 w-7 rounded-full bg-white" />
              <span className="font-display text-lg">{nickname}</span>
              <span className="text-xs opacity-50">→ no palco</span>
            </motion.div>
          )}
          {error && <p className="text-center text-sm text-vermelho">{error}</p>}
          <Button
            onClick={submit}
            disabled={loading || !nickname.trim()}
            className="btn-laranja"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "entrar"}
          </Button>
        </div>
      </div>
    );
  }

  return <MobileScreen slideIndex={currentSlide} nickname={nickname} seed={seed} />;
};

function MobileScreen({ slideIndex, nickname, seed }: { slideIndex: number; nickname: string; seed: string }) {
  const entry = slideManifest[slideIndex];
  const key = entry?.key ?? "";

  // alt-tab live → tela de força (sem MobileShell, é tela cheia)
  const livePhase = isLivePhaseSlide(key);
  if (livePhase) return <LivePhaseScreen phaseLabel={livePhase} nickname={nickname} seed={seed} />;

  const inner = (() => {
    if (isIterationSlide(key)) return <IterationInput nickname={nickname} />;
    if (key === "pulse") return <PulseInput nickname={nickname} />;
    if (key === "sentiment_pergunta" || key === "sentiment_collecting") return <SentimentInput nickname={nickname} />;
    if (key === "pergunta_problema" || key === "brainstorm_active") return <BrainstormInput slideKey="brainstorm" nickname={nickname} />;
    if (key === "voting_active") return <VoteInput nickname={nickname} />;
    if (key === "confirma_brief") return <PollInput nickname={nickname} />;
    return <Waiting nickname={nickname} seed={seed} />;
  })();

  return (
    <MobileShell nickname={nickname} seed={seed}>
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {inner}
        </motion.div>
      </AnimatePresence>
    </MobileShell>
  );
}

function Waiting({ nickname, seed }: { nickname: string; seed: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <div className="relative">
        <LagrimaGradient size={120} spinning />
      </div>
      <div className="space-y-2">
        <p className="eyebrow">{nickname}, tá na sala.</p>
        <p className="font-display text-4xl">acompanha o palco.</p>
      </div>
    </div>
  );
}

// === LIVE PHASE SCREEN — timer com arco + força ===
const PHASE_LABELS: Record<string, { label: string; expected: number }> = {
  pensando: { label: "pensando no claude", expected: 180 },
  gerando: { label: "construindo no lovable", expected: 240 },
  iterando: { label: "iterando", expected: 180 },
  publicando: { label: "publicando", expected: 60 },
};

function LivePhaseScreen({ phaseLabel, nickname, seed }: { phaseLabel: string; nickname: string; seed: string }) {
  const { room, sendForce } = useRoom();
  const [elapsed, setElapsed] = useState(0);
  const [pulses, setPulses] = useState<number[]>([]);
  const [floaters, setFloaters] = useState<number[]>([]);
  const fb = useFeedback();
  const lastForceRef = useRef(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  const meta = PHASE_LABELS[phaseLabel] ?? { label: phaseLabel, expected: 180 };

  useEffect(() => {
    if (!room?.phase_started_at) return;
    const start = new Date(room.phase_started_at).getTime();
    const tick = () => setElapsed(Math.max(0, Math.floor((Date.now() - start) / 1000)));
    tick();
    const t = window.setInterval(tick, 500);
    return () => window.clearInterval(t);
  }, [room?.phase_started_at]);

  // Detecta milestones de 10 ⚡ pra dar feedback bigger
  useEffect(() => {
    const force = room?.force_count ?? 0;
    if (force > 0 && Math.floor(force / 10) > Math.floor(lastForceRef.current / 10)) {
      fb("milestone");
      bigConfetti();
    }
    lastForceRef.current = force;
  }, [room?.force_count, fb]);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  const expectedM = Math.round(meta.expected / 60);

  const handleForce = async () => {
    const now = Date.now();
    setPulses((p) => [...p, now]);
    setFloaters((f) => [...f, now]);
    fb("force");
    microConfetti(btnRef.current);
    await sendForce();
  };

  return (
    <div className="bg-lagrima-blur flex min-h-[100dvh] flex-col bg-background p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={avatarUrl(seed, 48)} alt="" className="h-8 w-8 rounded-full bg-white" />
          <span className="font-display text-lg">{nickname}</span>
        </div>
        <span className="rounded-full bg-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
          ao vivo
        </span>
      </div>

      <div className="mt-6 flex flex-col items-center text-center">
        <p className="eyebrow">frattz tá</p>
        <p className="mt-1 font-display text-3xl text-laranja">{meta.label}</p>
        <p className="mt-1 text-sm opacity-50">~{expectedM}min esperado</p>

        <div className="mt-8">
          <ProgressArc elapsed={elapsed} expectedTotal={meta.expected} size={260}>
            <div className="text-center">
              <div className="font-display text-6xl tabular-nums">{mm}:{ss}</div>
            </div>
          </ProgressArc>
        </div>
      </div>

      <div className="mt-auto flex flex-col items-center gap-5 pb-6">
        <p className="text-center text-sm opacity-60">manda força. ele vê no palco.</p>
        <button
          ref={btnRef}
          onClick={handleForce}
          className="relative h-44 w-44 rounded-full bg-laranja text-preto transition active:scale-90"
          style={{ boxShadow: "0 20px 60px -16px hsl(26 99% 51% / 0.6)" }}
        >
          <span className="font-display text-7xl">⚡</span>
          {pulses.map((p) => (
            <span
              key={p}
              className="absolute inset-0 animate-ping rounded-full bg-laranja/40"
              onAnimationEnd={() => setPulses((cur) => cur.filter((x) => x !== p))}
            />
          ))}
          {/* +1 floaters */}
          {floaters.map((f) => (
            <motion.span
              key={f}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -60, scale: 1.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onAnimationComplete={() => setFloaters((cur) => cur.filter((x) => x !== f))}
              className="pointer-events-none absolute inset-x-0 top-2 font-display text-3xl text-preto"
            >
              +1
            </motion.span>
          ))}
        </button>
        <p className="text-center font-display text-3xl tabular-nums">
          {room?.force_count ?? 0}{" "}
          <span className="text-base opacity-60">forças no total</span>
        </p>
      </div>
    </div>
  );
}

function IterationInput({ nickname }: { nickname: string }) {
  const { room } = useRoom();
  const [text, setText] = useState("");
  const [sent, setSent] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const fb = useFeedback();
  const iter = room?.current_iteration ?? 1;

  const send = async () => {
    if (!room || !text.trim()) return;
    await supabase.from("text_responses").insert({
      room_id: room.id,
      slide_key: "iteration",
      response_type: "text",
      iteration: iter,
      content: text.trim(),
      nickname,
    });
    fb("send");
    microConfetti(btnRef.current);
    showToast(`valeu, ${nickname} ⚡`);
    setText("");
    setSent((s) => s + 1);
  };

  return (
    <div className="flex min-h-[70vh] flex-col justify-center gap-5">
      <div className="text-center">
        <p className="eyebrow">iteração #{iter}</p>
        <p className="mt-2 font-display text-5xl">o que falta?</p>
      </div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="curto e direto"
        maxLength={120}
        autoFocus
        className="input-line"
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <Button ref={btnRef} onClick={send} disabled={!text.trim()} className="btn-laranja">
        enviar
      </Button>
      {sent > 0 && (
        <p className="text-center text-sm opacity-60">
          {sent} enviada{sent > 1 ? "s" : ""}. manda mais se vier.
        </p>
      )}
    </div>
  );
}

function PulseInput({ nickname }: { nickname: string }) {
  const { room } = useRoom();
  const [sent, setSent] = useState<number | null>(null);
  const fb = useFeedback();

  const send = async (n: number) => {
    if (!room) return;
    setSent(n);
    fb("vote");
    showToast(`anotado · ${n}/10`);
    await supabase.from("text_responses").insert({
      room_id: room.id,
      slide_key: "pulse",
      response_type: "scale",
      content: String(n),
      nickname,
    });
  };

  return (
    <div className="flex min-h-[70vh] flex-col justify-center gap-6">
      <div className="text-center">
        <p className="eyebrow">como tu chega?</p>
        <p className="mt-1 font-display text-4xl">de 1 a 10</p>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
          const isSent = sent === n;
          const isDimmed = sent !== null && sent !== n;
          return (
            <motion.button
              key={n}
              onClick={() => send(n)}
              disabled={sent !== null}
              animate={{
                scale: isSent ? 1.08 : 1,
                opacity: isDimmed ? 0.3 : 1,
              }}
              whileTap={{ scale: 0.92 }}
              className={`aspect-square rounded-2xl font-display text-3xl ${isSent ? "bg-laranja text-preto" : "bg-white text-preto"}`}
              style={isSent ? { boxShadow: "var(--shadow-laranja)" } : { boxShadow: "var(--shadow-soft)" }}
            >
              {n}
            </motion.button>
          );
        })}
      </div>
      {sent !== null && <p className="text-center text-lg opacity-60">recebido. valeu, {nickname}.</p>}
    </div>
  );
}

function SentimentInput({ nickname }: { nickname: string }) {
  const { room } = useRoom();
  const [text, setText] = useState("");
  const [sentCount, setSentCount] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const fb = useFeedback();

  const send = async () => {
    if (!room || !text.trim()) return;
    await supabase.from("text_responses").insert({
      room_id: room.id,
      slide_key: "sentiment",
      response_type: "text",
      content: text.trim(),
      nickname,
    });
    fb("send");
    microConfetti(btnRef.current);
    showToast(`obrigado, ${nickname}`);
    setText("");
    setSentCount((c) => c + 1);
  };

  return (
    <div className="flex min-h-[70vh] flex-col justify-center gap-5">
      <p className="text-center font-display text-3xl">o que é sucesso na vida pra ti?</p>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="uma palavra ou frase curta"
        maxLength={80}
        autoFocus
        className="input-line"
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <Button ref={btnRef} onClick={send} disabled={!text.trim()} className="btn-laranja">
        enviar
      </Button>
      {sentCount > 0 && (
        <p className="text-center text-sm opacity-60">
          {sentCount} {sentCount === 1 ? "enviada" : "enviadas"}. manda mais se quiser.
        </p>
      )}
    </div>
  );
}

function BrainstormInput({ slideKey, nickname }: { slideKey: string; nickname: string }) {
  const { room } = useRoom();
  const [text, setText] = useState("");
  const [sent, setSent] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const fb = useFeedback();

  const send = async () => {
    if (!room || !text.trim()) return;
    await supabase.from("ideas").insert({ room_id: room.id, slide_key: slideKey, content: text.trim(), nickname });
    fb("send");
    microConfetti(btnRef.current);
    showToast(`tua ideia tá no palco ⚡`);
    setText("");
    setSent((s) => s + 1);
  };

  return (
    <div className="flex min-h-[70vh] flex-col justify-center gap-5">
      <p className="text-center font-display text-3xl">manda tua ideia</p>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="curto e direto"
        maxLength={120}
        autoFocus
        className="input-line"
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <Button ref={btnRef} onClick={send} disabled={!text.trim()} className="btn-laranja">
        enviar
      </Button>
      {sent > 0 && (
        <p className="text-center text-sm opacity-60">
          {sent} enviada{sent > 1 ? "s" : ""}. quanto mais, melhor.
        </p>
      )}
    </div>
  );
}

function VoteInput({ nickname }: { nickname: string }) {
  const { room } = useRoom();
  const [ideas, setIdeas] = useState<{ id: string; content: string }[]>([]);
  const [voted, setVoted] = useState<string | null>(null);
  const fb = useFeedback();

  useEffect(() => {
    if (!room) return;
    supabase
      .from("ideas")
      .select("id, content")
      .eq("room_id", room.id)
      .eq("slide_key", "brainstorm")
      .order("created_at", { ascending: true })
      .limit(5)
      .then(({ data }) => data && setIdeas(data));
  }, [room]);

  const vote = async (id: string) => {
    if (voted) return;
    setVoted(id);
    fb("vote");
    showToast(`voto computado, ${nickname}`);
    await supabase.rpc("increment_vote", { p_idea_id: id });
  };

  return (
    <div className="flex min-h-[70vh] flex-col gap-4">
      <p className="text-center font-display text-3xl">vota na tua favorita</p>
      <div className="flex flex-col gap-3">
        {ideas.map((i, idx) => {
          const isVoted = voted === i.id;
          const isDimmed = voted && !isVoted;
          return (
            <motion.button
              key={i.id}
              onClick={() => vote(i.id)}
              disabled={!!voted}
              animate={{ scale: isVoted ? 1.04 : 1, opacity: isDimmed ? 0.35 : 1 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-3 rounded-2xl p-4 text-left ${isVoted ? "bg-laranja text-preto" : "bg-white"}`}
              style={isVoted ? { boxShadow: "var(--shadow-laranja)" } : { boxShadow: "var(--shadow-soft)" }}
            >
              <span className={`font-display text-3xl ${isVoted ? "text-preto" : "text-laranja"}`}>{idx + 1}</span>
              <span className="font-display text-xl leading-tight">{i.content}</span>
            </motion.button>
          );
        })}
        {ideas.length === 0 && (
          <p className="py-8 text-center text-sm opacity-50">aguardando candidatas…</p>
        )}
      </div>
      {voted && <p className="text-center text-sm opacity-60">voto registrado.</p>}
    </div>
  );
}

function PollInput({ nickname }: { nickname: string }) {
  const { room } = useRoom();
  const [voted, setVoted] = useState<string | null>(null);
  const fb = useFeedback();

  const send = async (choice: "sim" | "ajustar") => {
    if (!room || voted) return;
    setVoted(choice);
    fb("vote");
    showToast(choice === "sim" ? "bora" : "ajustando");
    await supabase.from("text_responses").insert({
      room_id: room.id,
      slide_key: "poll_brief",
      response_type: "poll",
      content: choice,
      nickname,
    });
  };

  return (
    <div className="flex min-h-[70vh] flex-col justify-center gap-4">
      <p className="text-center font-display text-3xl">o brief tá bom?</p>
      <div className="flex flex-col gap-3">
        <motion.button
          onClick={() => send("sim")}
          disabled={!!voted}
          animate={{ scale: voted === "sim" ? 1.04 : 1, opacity: voted && voted !== "sim" ? 0.35 : 1 }}
          whileTap={{ scale: 0.96 }}
          className="h-24 rounded-3xl bg-laranja font-display text-4xl text-preto"
          style={{ boxShadow: "var(--shadow-laranja)" }}
        >
          bora codar
        </motion.button>
        <motion.button
          onClick={() => send("ajustar")}
          disabled={!!voted}
          animate={{ scale: voted === "ajustar" ? 1.04 : 1, opacity: voted && voted !== "ajustar" ? 0.35 : 1 }}
          whileTap={{ scale: 0.96 }}
          className="h-24 rounded-3xl border-2 border-preto/15 bg-white font-display text-4xl"
        >
          ajustar
        </motion.button>
      </div>
      {voted && <p className="text-center text-sm opacity-60">voto registrado.</p>}
    </div>
  );
}

export default Join;
