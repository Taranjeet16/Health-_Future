
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import LegalPage from "./pages/LegalPage";
import { ProtectedRoute } from "@/components/protected-route";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="health-dashboard-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* Legal & Information Pages */}
          <Route path="/privacy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/cookies" element={<LegalPage />} />
          <Route path="/about" element={<LegalPage />} />
          <Route path="/legal/:pageType" element={<LegalPage />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
