import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const { requestOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleSendCode = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setMsg(null);
    const res = await requestOtp(email);
    setLoading(false);
    if (!res.ok) {
      setMsg("não consegui enviar agora. tenta de novo.");
      return;
    }
    // resposta genérica de propósito (não vaza allow-list)
    setMsg("se esse e-mail tem acesso, o código chegou na caixa.");
    setStep("code");
  };

  const handleVerify = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setMsg(null);
    const res = await verifyOtp(email, code);
    setLoading(false);
    if (!res.ok) {
      setMsg("código inválido ou expirado.");
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <div className="bg-lagrima-blur flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm space-y-6 rounded-3xl border border-preto/10 bg-white/80 p-8 shadow-[0_20px_60px_-30px_hsl(var(--preto)/0.3)]">
        <div className="space-y-1">
          <p className="eyebrow">admin</p>
          <h1 className="font-display text-3xl">acessa pelo e-mail</h1>
          <p className="text-sm opacity-60">
            sem senha. mandamos um código de 6 dígitos.
          </p>
        </div>

        {step === "email" ? (
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
              autoFocus
              autoComplete="email"
            />
            <Button onClick={handleSendCode} disabled={loading || !email.trim()} className="btn-laranja w-full">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (<><Mail className="mr-2 h-4 w-4" />enviar código</>)}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm opacity-60">código enviado pra <strong>{email}</strong></p>
            <Input
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              autoFocus
              className="text-center font-mono text-2xl tracking-[0.5em]"
            />
            <Button onClick={handleVerify} disabled={loading || code.length < 6} className="btn-laranja w-full">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "entrar"}
            </Button>
            <button
              type="button"
              onClick={() => { setStep("email"); setCode(""); setMsg(null); }}
              className="block w-full text-center text-xs opacity-60 hover:opacity-100"
            >
              voltar e trocar e-mail
            </button>
          </div>
        )}

        {msg && <p className="text-center text-sm opacity-75">{msg}</p>}
      </div>
    </div>
  );
}
