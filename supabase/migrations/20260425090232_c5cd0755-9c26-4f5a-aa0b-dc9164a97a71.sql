ALTER TABLE public.rooms 
  ADD COLUMN IF NOT EXISTS current_phase text NOT NULL DEFAULT 'idle',
  ADD COLUMN IF NOT EXISTS current_iteration int NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS phase_started_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS force_count int NOT NULL DEFAULT 0;

ALTER TABLE public.text_responses
  ADD COLUMN IF NOT EXISTS iteration int NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION public.increment_force(p_room_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  UPDATE public.rooms SET force_count = force_count + 1 WHERE id = p_room_id;
$$;