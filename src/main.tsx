import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import "./index.css";

// Import page components
import DiscoverClient from "@/components/pages/DiscoverClient";
import LandingClient from "@/components/pages/LandingClient";
import { EnterpriseLayout } from "@/components/EnterpriseLayout";
import ContentPerformance from "@/pages/ContentPerformance";
import TrendIntelligence from "@/pages/TrendIntelligence";
import IntelligenceHub from "@/pages/IntelligenceHub";
import CreatorTools from "@/pages/CreatorTools";
import StudioAnalytics from "@/pages/StudioAnalytics";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<LandingClient />} />
            
            {/* Enterprise Platform Routes */}
            <Route path="/platform" element={<EnterpriseLayout />}>
              <Route index element={<Navigate to="/platform/content-performance" replace />} />
              <Route path="content-performance" element={<ContentPerformance />} />
              <Route path="trend-intelligence" element={<TrendIntelligence />} />
              <Route path="intelligence-hub" element={<IntelligenceHub />} />
              <Route path="creator-tools" element={<CreatorTools />} />
              <Route path="studio-analytics" element={<StudioAnalytics />} />
              <Route path="discover" element={<DiscoverClient />} />
            </Route>
            
            {/* Legacy discover routes */}
            <Route path="/discover" element={<DiscoverClient />} />
            <Route path="/app" element={<DiscoverClient />} />
            
            {/* Redirect to platform */}
            <Route path="*" element={<Navigate to="/platform" replace />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);