import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoomProvider } from "@/contexts/RoomContext";
import { ChromeVisibilityProvider } from "@/contexts/ChromeVisibilityContext";

import { AuthProvider } from "@/contexts/AuthContext";
import { EventRoute } from "@/components/EventRoute";
import { ToastHost } from "@/components/mobile/ActionFeedback";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import Index from "./pages/Index.tsx";
import Feedback from "./pages/Feedback.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminAgenda from "./pages/admin/AdminAgenda.tsx";
import AdminFeedback from "./pages/admin/AdminFeedback.tsx";
import AdminTemplates from "./pages/admin/AdminTemplates.tsx";
import AdminEvents from "./pages/admin/AdminEvents.tsx";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ToastHost />
      <BrowserRouter>
        <AuthProvider>
          <RoomProvider>
            <ChromeVisibilityProvider>
              <Routes>
                <Route path="/" element={<NotFound />} />

                {/* admin */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="agenda" element={<AdminAgenda />} />
                  <Route path="eventos" element={<AdminEvents />} />
                  <Route path="feedback" element={<AdminFeedback />} />
                  <Route path="templates" element={<AdminTemplates />} />
                </Route>

                {/* rotas por evento */}
                <Route path="/:eventSlug" element={<EventRoute><Index /></EventRoute>} />
                <Route path="/:eventSlug/feedback" element={<EventRoute><Feedback /></EventRoute>} />

                {/* compat: feedback antigo aponta para travessia */}
                <Route path="/feedback" element={<Navigate to="/travessia/feedback" replace />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </ChromeVisibilityProvider>
          </RoomProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
