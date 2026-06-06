-- 1) Drop tabelas n\u00e3o usadas
DROP TABLE IF EXISTS public.ideas CASCADE;
DROP TABLE IF EXISTS public.participants CASCADE;
DROP TABLE IF EXISTS public.text_responses CASCADE;
DROP TABLE IF EXISTS public.rooms CASCADE;
DROP FUNCTION IF EXISTS public.increment_vote(uuid);
DROP FUNCTION IF EXISTS public.increment_force(uuid);

-- 2) feedback_responses: remove room_code, mant\u00e9m event_slug + edition_id
ALTER TABLE public.feedback_responses DROP COLUMN IF EXISTS room_code;

-- 3) events table
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  theme jsonb NOT NULL DEFAULT '{}'::jsonb,
  contacts jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid
);

GRANT SELECT ON public.events TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone reads published events"
ON public.events FOR SELECT
TO anon, authenticated
USING (is_published = true OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admins manage events"
ON public.events FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER events_touch_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- 4) Seed Travessia
INSERT INTO public.events (slug, name, description, theme, contacts, is_published)
VALUES (
  'travessia',
  'Imers\u00e3o Travessia',
  'Do vibe coder ao empres\u00e1rio de software',
  '{"themeClass": "theme-travessia"}'::jsonb,
  '{"instagram": {"url": "https://instagram.com/gabreda", "label": "@gabreda"}}'::jsonb,
  true
)
ON CONFLICT (slug) DO NOTHING;
