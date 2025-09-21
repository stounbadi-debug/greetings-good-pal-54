import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import "./index.css";

// Import page components
import DiscoverClient from "@/components/pages/DiscoverClient";
import LandingClient from "@/components/pages/LandingClient";

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
            
            {/* Main discover page */}
            <Route path="/discover" element={<DiscoverClient />} />
            <Route path="/app" element={<DiscoverClient />} />
            
            {/* Redirect any unknown routes to discover */}
            <Route path="*" element={<Navigate to="/discover" replace />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);