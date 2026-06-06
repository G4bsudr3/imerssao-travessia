// supabase/functions/request-admin-otp/index.ts
// Recebe um e-mail, valida contra a allow-list, cria o usuário (se não existir)
// e dispara o OTP de magic-link. Frontend chama essa função em vez de
// supabase.auth.signInWithOtp diretamente (a auth tá com signup desabilitado).
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let payload: { email?: string; redirectTo?: string };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const rawEmail = (payload.email ?? "").trim().toLowerCase();
  if (!rawEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(rawEmail)) {
    return json({ error: "invalid_email" }, 400);
  }

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  // 1. checa allow-list
  const { data: allowed, error: allowErr } = await admin.rpc("is_email_allowed", { _email: rawEmail });
  if (allowErr) {
    console.error("is_email_allowed error", allowErr);
    return json({ error: "server_error" }, 500);
  }
  if (!allowed) {
    // resposta genérica pra não vazar quais e-mails existem
    return json({ ok: true });
  }

  // 2. cria usuário se ainda não existe (signup público tá off)
  const { data: existing } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  let user = existing?.users?.find((u) => u.email?.toLowerCase() === rawEmail);
  if (!user) {
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: rawEmail,
      email_confirm: true,
    });
    if (createErr || !created.user) {
      console.error("createUser error", createErr);
      return json({ error: "server_error" }, 500);
    }
    user = created.user;
  }

  // 2b. garante role admin (allow-list = admin por design)
  const { error: roleErr } = await admin
    .from("user_roles")
    .upsert({ user_id: user.id, role: "admin" }, { onConflict: "user_id,role" });
  if (roleErr) {
    console.error("upsert role error", roleErr);
    // não bloqueia: o login segue, admin pode ser concedido depois
  }

  // 3. dispara OTP/magic-link (usuário já existe, então shouldCreateUser=false)
  const anon = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
  const redirectTo = payload.redirectTo ?? undefined;
  const { error: otpErr } = await anon.auth.signInWithOtp({
    email: rawEmail,
    options: { shouldCreateUser: false, emailRedirectTo: redirectTo },
  });
  if (otpErr) {
    console.error("signInWithOtp error", otpErr);
    return json({ error: "server_error" }, 500);
  }

  return json({ ok: true });
});
