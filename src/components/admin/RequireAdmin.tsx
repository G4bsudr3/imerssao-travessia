import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { session, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin opacity-60" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="eyebrow">acesso negado</p>
        <p className="font-display text-3xl">essa conta não é admin.</p>
      </div>
    );
  }

  return <>{children}</>;
}
