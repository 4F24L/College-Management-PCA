import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Faculties from "./pages/Faculties";
import Index from "./pages/Index";
import Marks from "./pages/Marks";
import NotFound from "./pages/NotFound";
import Placements from "./pages/Placements";
import Staffs from "./pages/Staffs";
import StudentMarks from "./pages/StudentMarks";
import StudentPlacements from "./pages/StudentPlacements";
import Students from "./pages/Students";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/staffs" element={<Staffs />} />
          <Route path="/marks" element={<Marks />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/students/:id/marks" element={<StudentMarks />} />
          <Route path="/students/:id/placements" element={<StudentPlacements />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
