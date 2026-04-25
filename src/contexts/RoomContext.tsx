import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { generateRoomCode } from "@/lib/room-code";

export type Phase = "idle" | "pensando" | "gerando" | "iterando" | "publicando";

export type Room = {
  id: string;
  code: string;
  current_slide: number;
  current_phase: Phase;
  current_iteration: number;
  phase_started_at: string;
  force_count: number;
  start_time: string | null;
};

export type Participant = {
  id: string;
  room_id: string;
  nickname: string;
  avatar_seed: string;
  joined_at: string;
};

type RoomContextValue = {
  room: Room | null;
  participants: Participant[];
  currentSlide: number;
  isPresenter: boolean;
  ready: boolean;
  // presenter actions
  createRoom: () => Promise<Room>;
  setSlide: (idx: number) => Promise<void>;
  setPhase: (phase: Phase) => Promise<void>;
  setIteration: (n: number) => Promise<void>;
  resetForce: () => Promise<void>;
  startPresentation: () => Promise<void>;
  resetPresentationStart: () => Promise<void>;
  // mobile actions
  joinRoom: (code: string, nickname: string, avatarSeed: string) => Promise<{ room: Room; participant: Participant }>;
  attachToRoom: (code: string) => Promise<Room | null>;
  sendForce: () => Promise<void>;
  // realtime broadcast
  broadcast: (event: string, payload: unknown) => void;
  onBroadcast: (event: string, handler: (payload: unknown) => void) => () => void;
};

// Singleton pra sobreviver a HMR (contexto + estado)
type Singleton = {
  room: Room | null;
  channel: RealtimeChannel | null;
  isPresenter: boolean;
  participantId: string | null;
  context: React.Context<RoomContextValue | null> | null;
};
const G = globalThis as unknown as { __choraRoom__?: Singleton };
if (!G.__choraRoom__) {
  G.__choraRoom__ = { room: null, channel: null, isPresenter: false, participantId: null, context: null };
}
const SINGLETON = G.__choraRoom__;
if (!SINGLETON.context) {
  SINGLETON.context = createContext<RoomContextValue | null>(null);
}
const RoomContext = SINGLETON.context;

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room | null>(SINGLETON.room);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isPresenter, setIsPresenter] = useState(SINGLETON.isPresenter);
  const [ready, setReady] = useState(false);
  const handlersRef = useRef<Map<string, Set<(p: unknown) => void>>>(new Map());
  const localSlideWriteRef = useRef<{ idx: number; at: number } | null>(null);

  // Setup channel quando a sala muda
  useEffect(() => {
    if (!room) {
      setReady(true);
      return;
    }

    if (SINGLETON.channel && SINGLETON.room?.id !== room.id) {
      supabase.removeChannel(SINGLETON.channel);
      SINGLETON.channel = null;
    }

    if (!SINGLETON.channel) {
      const ch = supabase.channel(`chora-${room.code}`, {
        config: { broadcast: { self: false } },
      });

      ch.on("broadcast", { event: "*" }, ({ event, payload }) => {
        const set = handlersRef.current.get(event);
        if (set) set.forEach((fn) => fn(payload));
      });

      ch.on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms", filter: `id=eq.${room.id}` },
        (payload) => {
          const next = payload.new as Room;
          if (next?.id) {
            setRoom((prev) => {
              const pending = localSlideWriteRef.current;
              const keepLocalSlide =
                SINGLETON.isPresenter &&
                prev &&
                pending &&
                Date.now() - pending.at < 1500 &&
                next.current_slide !== pending.idx;
              if (pending && next.current_slide === pending.idx) localSlideWriteRef.current = null;
              const resolved = keepLocalSlide ? { ...next, current_slide: prev.current_slide } : next;
              SINGLETON.room = resolved;
              return resolved;
            });
          }
        },
      );

      ch.on(
        "postgres_changes",
        { event: "*", schema: "public", table: "participants", filter: `room_id=eq.${room.id}` },
        () => {
          loadParticipants(room.id);
        },
      );

      ch.subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setReady(true);
          loadParticipants(room.id);
        }
      });

      SINGLETON.channel = ch;
    } else {
      setReady(true);
      loadParticipants(room.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.id]);

  const loadParticipants = useCallback(async (roomId: string) => {
    const { data } = await supabase
      .from("participants")
      .select("*")
      .eq("room_id", roomId)
      .order("joined_at", { ascending: true });
    if (data) setParticipants(data as Participant[]);
  }, []);

  const createRoom = useCallback(async () => {
    for (let i = 0; i < 5; i++) {
      const code = generateRoomCode(4);
      const { data, error } = await supabase
        .from("rooms")
        .insert({ code, current_slide: 0 })
        .select()
        .single();
      if (!error && data) {
        const r = data as Room;
        SINGLETON.room = r;
        SINGLETON.isPresenter = true;
        setRoom(r);
        setIsPresenter(true);
        return r;
      }
    }
    throw new Error("Não foi possível criar sala");
  }, []);

  const setSlide = useCallback(
    async (idx: number) => {
      if (!room) return;
      localSlideWriteRef.current = { idx, at: Date.now() };
      const optimistic = { ...room, current_slide: idx };
      SINGLETON.room = optimistic;
      setRoom(optimistic);
      await supabase.from("rooms").update({ current_slide: idx }).eq("id", room.id);
    },
    [room],
  );

  const setPhase = useCallback(
    async (phase: Phase) => {
      if (!room) return;
      const now = new Date().toISOString();
      const optimistic = { ...room, current_phase: phase, phase_started_at: now, force_count: 0 };
      SINGLETON.room = optimistic;
      setRoom(optimistic);
      await supabase
        .from("rooms")
        .update({ current_phase: phase, phase_started_at: now, force_count: 0 })
        .eq("id", room.id);
    },
    [room],
  );

  const setIteration = useCallback(
    async (n: number) => {
      if (!room) return;
      const optimistic = { ...room, current_iteration: n };
      SINGLETON.room = optimistic;
      setRoom(optimistic);
      await supabase.from("rooms").update({ current_iteration: n }).eq("id", room.id);
    },
    [room],
  );

  const resetForce = useCallback(async () => {
    if (!room) return;
    await supabase.from("rooms").update({ force_count: 0 }).eq("id", room.id);
  }, [room]);

  // Marca o início da apresentação no servidor (idempotente: só seta se ainda não tem)
  const startPresentation = useCallback(async () => {
    if (!room || room.start_time) return;
    const now = new Date().toISOString();
    const optimistic = { ...room, start_time: now };
    SINGLETON.room = optimistic;
    setRoom(optimistic);
    await supabase.from("rooms").update({ start_time: now }).eq("id", room.id).is("start_time", null);
  }, [room]);

  // Reinicia o cronômetro (presenter only)
  const resetPresentationStart = useCallback(async () => {
    if (!room) return;
    const now = new Date().toISOString();
    const optimistic = { ...room, start_time: now };
    SINGLETON.room = optimistic;
    setRoom(optimistic);
    await supabase.from("rooms").update({ start_time: now }).eq("id", room.id);
  }, [room]);

  const sendForce = useCallback(async () => {
    if (!room) return;
    await supabase.rpc("increment_force", { p_room_id: room.id });
  }, [room]);

  const attachToRoom = useCallback(async (code: string) => {
    const { data } = await supabase.from("rooms").select("*").eq("code", code.toUpperCase()).maybeSingle();
    if (!data) return null;
    const r = data as Room;
    SINGLETON.room = r;
    setRoom(r);
    return r;
  }, []);

  const joinRoom = useCallback(
    async (code: string, nickname: string, avatarSeed: string) => {
      const r = await attachToRoom(code);
      if (!r) throw new Error("Sala não encontrada");
      const { data, error } = await supabase
        .from("participants")
        .insert({ room_id: r.id, nickname, avatar_seed: avatarSeed })
        .select()
        .single();
      if (error || !data) throw new Error("Falha ao entrar");
      SINGLETON.participantId = (data as Participant).id;
      return { room: r, participant: data as Participant };
    },
    [attachToRoom],
  );

  const broadcast = useCallback((event: string, payload: unknown) => {
    if (!SINGLETON.channel) return;
    SINGLETON.channel.send({ type: "broadcast", event, payload });
  }, []);

  const onBroadcast = useCallback((event: string, handler: (payload: unknown) => void) => {
    let set = handlersRef.current.get(event);
    if (!set) {
      set = new Set();
      handlersRef.current.set(event, set);
    }
    set.add(handler);
    return () => {
      set?.delete(handler);
    };
  }, []);

  const value = useMemo<RoomContextValue>(
    () => ({
      room,
      participants,
      currentSlide: room?.current_slide ?? 0,
      isPresenter,
      ready,
      createRoom,
      setSlide,
      setPhase,
      setIteration,
      resetForce,
      startPresentation,
      resetPresentationStart,
      joinRoom,
      attachToRoom,
      sendForce,
      broadcast,
      onBroadcast,
    }),
    [room, participants, isPresenter, ready, createRoom, setSlide, setPhase, setIteration, resetForce, startPresentation, resetPresentationStart, joinRoom, attachToRoom, sendForce, broadcast, onBroadcast],
  );

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}

export function useRoom() {
  const ctx = useContext(RoomContext);
  if (!ctx) throw new Error("useRoom precisa de RoomProvider");
  return ctx;
}
