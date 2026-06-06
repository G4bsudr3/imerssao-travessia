-- ============= 1. roles =============
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "users see own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "admins see all roles" ON public.user_roles
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ============= 2. allowed_emails (allow-list pra OTP) =============
CREATE TABLE public.allowed_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.allowed_emails TO authenticated;
GRANT ALL ON public.allowed_emails TO service_role;

ALTER TABLE public.allowed_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins manage allowed emails" ON public.allowed_emails
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.is_email_allowed(_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.allowed_emails WHERE lower(email) = lower(_email))
$$;

-- inserir o e-mail mestre
INSERT INTO public.allowed_emails (email, note)
VALUES ('gabreda188@gmail.com', 'owner');

-- ============= 3. event_editions (agenda) =============
CREATE TABLE public.event_editions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_slug text NOT NULL,           -- ex 'travessia' (referencia src/events/<slug>)
  title text NOT NULL,                -- ex 'Travessia Alphaville · turma 2'
  scheduled_at timestamptz NOT NULL,  -- data e hora da palestra
  duration_minutes integer NOT NULL DEFAULT 120,
  location text,
  audience text,
  room_code text,                     -- código da sala usado, se já rodou
  status text NOT NULL DEFAULT 'scheduled',   -- scheduled | live | done | canceled
  notes text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX event_editions_event_slug_idx ON public.event_editions (event_slug);
CREATE INDEX event_editions_scheduled_at_idx ON public.event_editions (scheduled_at);
CREATE INDEX event_editions_room_code_idx ON public.event_editions (room_code) WHERE room_code IS NOT NULL;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_editions TO authenticated;
GRANT ALL ON public.event_editions TO service_role;

ALTER TABLE public.event_editions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins manage editions" ON public.event_editions
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER event_editions_touch
BEFORE UPDATE ON public.event_editions
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============= 4. ligar feedback e rooms à edição =============
ALTER TABLE public.feedback_responses
  ADD COLUMN event_slug text,
  ADD COLUMN edition_id uuid REFERENCES public.event_editions(id) ON DELETE SET NULL;

CREATE INDEX feedback_responses_event_slug_idx ON public.feedback_responses (event_slug);
CREATE INDEX feedback_responses_edition_id_idx ON public.feedback_responses (edition_id);

-- admins podem ver tudo de feedback (mantém policy anônima existente pra leitura pública)
CREATE POLICY "admins read all feedback" ON public.feedback_responses
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.rooms
  ADD COLUMN event_slug text,
  ADD COLUMN edition_id uuid REFERENCES public.event_editions(id) ON DELETE SET NULL;

CREATE INDEX rooms_event_slug_idx ON public.rooms (event_slug);
CREATE INDEX rooms_edition_id_idx ON public.rooms (edition_id);
