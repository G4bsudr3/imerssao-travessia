-- Agenda: estado/cidade e eventos de múltiplos dias.
-- Adiciona colunas em event_editions. A RLS já é admin-only (policy
-- "admins manage editions" FOR ALL) e cobre automaticamente as colunas novas.
ALTER TABLE public.event_editions
  ADD COLUMN IF NOT EXISTS state text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS ends_at timestamptz;
