
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
import DriverMembership from "./pages/DriverMembership";
import DriverBilling from "./pages/DriverBilling";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyLogin from "./pages/CompanyLogin";
import CompanyProfile from "./pages/CompanyProfile";
import DriverSearch from "./pages/DriverSearch";
import JobCreation from "./pages/JobCreation";
import AdminDashboard from "./pages/AdminDashboard";
import CompanyFeedback from "./pages/CompanyFeedback";
import DriverFeedback from "./pages/DriverFeedback";
import JobDetails from "./pages/JobDetails";
import DriverApplications from "./pages/DriverApplications";

// Blog and Dashboard Pages
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategories from "./pages/BlogCategories";
import DriverBlogDashboard from "./pages/DriverBlogDashboard";
import DriverBlogEditor from "./pages/DriverBlogEditor";
import CompanyBlogDashboard from "./pages/CompanyBlogDashboard";

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
          <Route path="/driver-membership" element={<DriverMembership />} />
          <Route path="/driver-billing" element={<DriverBilling />} />
          <Route path="/company-login" element={<CompanyLogin />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/driver-search" element={<DriverSearch />} />
          <Route path="/job-creation" element={<JobCreation />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/company-feedback" element={<CompanyFeedback />} />
          <Route path="/driver-feedback" element={<DriverFeedback />} />
          <Route path="/job-details/:jobId" element={<JobDetails />} />
          <Route path="/driver-applications" element={<DriverApplications />} />
          
          {/* Blog Routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blogId" element={<BlogPost />} />
          <Route path="/blog/categories" element={<BlogCategories />} />
          <Route path="/blog/category/:categoryName" element={<Blog />} />
          <Route path="/blog/tags/:tagName" element={<Blog />} />
          
          {/* Driver Blog Dashboard Routes */}
          <Route path="/driver-blog-dashboard" element={<DriverBlogDashboard />} />
          <Route path="/driver-blog-new" element={<DriverBlogEditor />} />
          <Route path="/driver-blog-edit/:articleId" element={<DriverBlogEditor />} />
          
          {/* Company Blog Dashboard Routes */}
          <Route path="/company-blog-dashboard" element={<CompanyBlogDashboard />} />
          <Route path="/company-blog-new" element={<DriverBlogEditor />} />
          <Route path="/company-blog-edit/:articleId" element={<DriverBlogEditor />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
