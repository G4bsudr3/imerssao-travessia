REVOKE EXECUTE ON FUNCTION public.is_email_allowed(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
-- has_role fica acessível por authenticated (necessário pras RLS policies).
