-- Tabela para coletar feedback anônimo da audiência ao final da apresentação
CREATE TABLE public.feedback_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL CHECK (topic IN ('seguranca', 'arquitetura', 'lgpd', 'governanca')),
  question TEXT NOT NULL,
  room_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback_responses ENABLE ROW LEVEL SECURITY;

-- Anônimo pode inserir (sem auth) e ler agregados
CREATE POLICY "feedback_anon_insert"
ON public.feedback_responses
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(question) > 0
  AND char_length(question) <= 1000
  AND char_length(topic) > 0
);

CREATE POLICY "feedback_anon_select"
ON public.feedback_responses
FOR SELECT
TO anon, authenticated
USING (true);

CREATE INDEX idx_feedback_responses_created_at ON public.feedback_responses(created_at DESC);
CREATE INDEX idx_feedback_responses_topic ON public.feedback_responses(topic);