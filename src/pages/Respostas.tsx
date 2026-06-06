import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

type Response = {
  id: string;
  topic: string;
  question: string;
  room_code: string | null;
  created_at: string;
};

const STORAGE_KEY = "respostas_password";

const Respostas = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<Response[] | null>(null);

  const fetchWith = async (pwd: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("get-respostas", {
        headers: { "x-respostas-password": pwd },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setResponses((data as any).responses);
      sessionStorage.setItem(STORAGE_KEY, pwd);
    } catch (e: any) {
      sessionStorage.removeItem(STORAGE_KEY);
      setResponses(null);
      toast({ title: "Acesso negado", description: e.message ?? "Senha inválida", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPassword(saved);
      fetchWith(saved);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    fetchWith(password);
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setPassword("");
    setResponses(null);
  };

  if (!responses) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Respostas · acesso restrito</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Verificando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Respostas</h1>
            <p className="text-sm text-muted-foreground">{responses.length} no total</p>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>Sair</Button>
        </header>

        <div className="space-y-3">
          {responses.map((r) => (
            <Card key={r.id}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">{r.topic}</Badge>
                  {r.room_code && <Badge variant="outline">sala {r.room_code}</Badge>}
                  <span className="text-xs text-muted-foreground ml-auto">
                    {new Date(r.created_at).toLocaleString("pt-BR")}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{r.question}</p>
              </CardContent>
            </Card>
          ))}
          {responses.length === 0 && (
            <p className="text-center text-muted-foreground py-12">Nenhuma resposta ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Respostas;
