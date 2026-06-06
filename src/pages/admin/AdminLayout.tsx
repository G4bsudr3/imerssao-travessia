import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Calendar, MessageSquare, LayoutGrid, BarChart3, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NAV = [
  { to: "/admin", label: "visão geral", icon: BarChart3, end: true },
  { to: "/admin/agenda", label: "agenda", icon: Calendar },
  { to: "/admin/feedback", label: "feedback", icon: MessageSquare },
  { to: "/admin/templates", label: "templates", icon: LayoutGrid },
];

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="flex w-60 shrink-0 flex-col gap-4 border-r border-preto/10 bg-white/60 p-5">
        <div>
          <p className="eyebrow">admin</p>
          <p className="font-display text-2xl leading-tight">palco</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                  isActive ? "bg-laranja/15 text-preto" : "text-preto/70 hover:bg-preto/5"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-2 border-t border-preto/10 pt-3">
          <p className="truncate text-xs opacity-60">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-preto/70 transition hover:bg-preto/5"
          >
            <LogOut className="h-4 w-4" /> sair
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
