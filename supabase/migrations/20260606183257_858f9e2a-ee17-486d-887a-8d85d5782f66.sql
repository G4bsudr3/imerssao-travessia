-- Lock feedback_responses reads to admins only (anon can still submit)
DROP POLICY IF EXISTS "feedback_anon_select" ON public.feedback_responses;
DROP POLICY IF EXISTS "admins read all feedback" ON public.feedback_responses;

CREATE POLICY "admins read feedback"
ON public.feedback_responses
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Keep anon insert policy as-is (feedback_anon_insert already exists)

-- Revoke anon SELECT on feedback_responses
REVOKE SELECT ON public.feedback_responses FROM anon;
GRANT INSERT ON public.feedback_responses TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.feedback_responses TO authenticated;
GRANT ALL ON public.feedback_responses TO service_role;

-- Ensure allowed_emails is locked (only gabreda188@gmail.com seeded, admin-only access)
-- Already has admin-only policy. Make sure anon has no privileges.
REVOKE ALL ON public.allowed_emails FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.allowed_emails TO authenticated;
GRANT ALL ON public.allowed_emails TO service_role;

-- event_editions: admin-only (already), revoke anon
REVOKE ALL ON public.event_editions FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_editions TO authenticated;
GRANT ALL ON public.event_editions TO service_role;

-- user_roles: lock down (admins manage via SQL/service_role only)
REVOKE ALL ON public.user_roles FROM anon;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

-- Live presentation tables (rooms, ideas, participants, text_responses) MUST keep
-- anonymous access because participants join via QR without auth. They are ephemeral
-- session data, not admin/private data.
-- We keep existing public policies as-is.

-- Hard guarantee: only gabreda188@gmail.com is allowlisted
DELETE FROM public.allowed_emails WHERE lower(email) <> 'gabreda188@gmail.com';
INSERT INTO public.allowed_emails (email, note)
SELECT 'gabreda188@gmail.com', 'owner'
WHERE NOT EXISTS (SELECT 1 FROM public.allowed_emails WHERE lower(email) = 'gabreda188@gmail.com');
