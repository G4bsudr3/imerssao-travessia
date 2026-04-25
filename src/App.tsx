import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoomProvider } from "@/contexts/RoomContext";
import { ChromeVisibilityProvider } from "@/contexts/ChromeVisibilityContext";
import { ToastHost } from "@/components/mobile/ActionFeedback";
import Index from "./pages/Index.tsx";
import Join from "./pages/Join.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

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
              <Route path="/" element={<Index />} />
              <Route path="/join/:code" element={<Join />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ChromeVisibilityProvider>
        </RoomProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
