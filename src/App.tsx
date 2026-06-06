import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useParams, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoomProvider } from "@/contexts/RoomContext";
import { ChromeVisibilityProvider } from "@/contexts/ChromeVisibilityContext";
import { EventProvider } from "@/contexts/EventContext";
import { getEvent } from "@/events/registry";
import { ToastHost } from "@/components/mobile/ActionFeedback";
import Index from "./pages/Index.tsx";
import Join from "./pages/Join.tsx";
import Feedback from "./pages/Feedback.tsx";
import Respostas from "./pages/Respostas.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

/** Resolve o evento pela URL e injeta no contexto. Se não existe, 404. */
function EventRoute({ children }: { children: React.ReactNode }) {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const event = getEvent(eventSlug);
  if (!event) return <NotFound />;
  return <EventProvider event={event}>{children}</EventProvider>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ToastHost />
      <BrowserRouter>
        <RoomProvider>
          <ChromeVisibilityProvider>
            <Routes>
              {/* raiz sem evento → 404 (sem evento padrão) */}
              <Route path="/" element={<NotFound />} />

              {/* rotas por evento */}
              <Route path="/:eventSlug" element={<EventRoute><Index /></EventRoute>} />
              <Route path="/:eventSlug/join/:code" element={<EventRoute><Join /></EventRoute>} />
              <Route path="/:eventSlug/feedback" element={<EventRoute><Feedback /></EventRoute>} />
              <Route path="/:eventSlug/respostas" element={<EventRoute><Respostas /></EventRoute>} />

              {/* compat: rotas antigas sem evento → redirecionam pra Travessia */}
              <Route path="/join/:code" element={<LegacyJoinRedirect />} />
              <Route path="/feedback" element={<Navigate to="/travessia/feedback" replace />} />
              <Route path="/respostas" element={<Navigate to="/travessia/respostas" replace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </ChromeVisibilityProvider>
        </RoomProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

function LegacyJoinRedirect() {
  const { code } = useParams<{ code: string }>();
  return <Navigate to={`/travessia/join/${code ?? ""}`} replace />;
}

export default App;
