
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DriverRegistration from "./pages/DriverRegistration";
import CompanyRegistration from "./pages/CompanyRegistration";
import DriverDashboard from "./pages/DriverDashboard";
import DriverProfile from "./pages/DriverProfile";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyLogin from "./pages/CompanyLogin";
import DriverSearch from "./pages/DriverSearch";
import JobCreation from "./pages/JobCreation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/driver-registration" element={<DriverRegistration />} />
          <Route path="/company-registration" element={<CompanyRegistration />} />
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
          <Route path="/driver-profile" element={<DriverProfile />} />
          <Route path="/company-login" element={<CompanyLogin />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/driver-search" element={<DriverSearch />} />
          <Route path="/job-creation" element={<JobCreation />} />
          {/* Add more routes here later */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
