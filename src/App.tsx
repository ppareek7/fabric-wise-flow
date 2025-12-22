import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import YarnStock from "./pages/YarnStock";
import UnfinishedGoods from "./pages/UnfinishedGoods";
import BiratnagarStock from "./pages/BiratnagarStock";
import BirgunStock from "./pages/BirgunStock";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/yarn-stock" element={<YarnStock />} />
          <Route path="/unfinished-goods" element={<UnfinishedGoods />} />
          <Route path="/biratnagar" element={<BiratnagarStock />} />
          <Route path="/birgunj" element={<BirgunStock />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
