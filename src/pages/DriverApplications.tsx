
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { DriverHeader } from "@/components/DriverHeader";
import { Footer } from "@/components/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Calendar, Clock, Search, FileText, CheckCircle2, CheckCircle, XCircle, Clock3, Eye } from "lucide-react";
import { toast } from "sonner";

// Mock application data - in a real app, this would come from an API
const mockApplications = [
  {
    id: "app1",
    jobId: "1",
    jobTitle: "Long-haul Truck Driver",
    company: "LogistiCorp Inc.",
    companyLogo: "/logos/dhl-logo.svg",
    appliedDate: "2023-10-01",
    status: "Interview Scheduled",
    statusColor: "success",
    feedback: true,
    nextStep: "Interview on Oct 12, 2023"
  },
  {
    id: "app2",
    jobId: "2",
    jobTitle: "Regional Delivery Driver",
    company: "FastFreight Systems",
    companyLogo: "/logos/dsv-logo.svg",
    appliedDate: "2023-09-25",
    status: "Application Reviewed",
    statusColor: "info",
    feedback: true,
    nextStep: "Waiting for employer response"
  },
  {
    id: "app3",
    jobId: "3",
    jobTitle: "Refrigerated Truck Operator",
    company: "CoolHaul Logistics",
    companyLogo: "/logos/maersk-logo.svg",
    appliedDate: "2023-09-15",
    status: "Not Selected",
    statusColor: "error",
    feedback: false,
    nextStep: "Application closed"
  },
  {
    id: "app4",
    jobId: "4",
    jobTitle: "Local Delivery Driver",
    company: "Metro Freight Co.",
    companyLogo: "/logos/uber-freight-logo.svg",
    appliedDate: "2023-09-10",
    status: "Pending",
    statusColor: "warning",
    feedback: false,
    nextStep: "Application under review"
  }
];

const DriverApplications = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [applications, setApplications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Check if user just applied (coming from job application page)
  useEffect(() => {
    if (location.state?.justApplied) {
      const { jobId, jobTitle, companyName } = location.state;
      
      // In a real app, we would make an API call to add the application
      // For now, just add it to our mock data
      if (!applications.some(app => app.jobId === jobId)) {
        const newApplication = {
          id: `app${applications.length + 1}`,
          jobId,
          jobTitle,
          company: companyName,
          companyLogo: "/logos/dhl-logo.svg", // Default logo
          appliedDate: new Date().toISOString().split('T')[0],
          status: "Pending",
          statusColor: "warning",
          feedback: true,
          nextStep: "Application under review"
        };
        
        setApplications([newApplication, ...applications]);
        toast.success("Your application has been added to your history!");
      }
    }
  }, [location.state]);
  
  // Filter applications based on search term and status filter
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (statusFilter === "all") return matchesSearch;
    
    // Map status filter to actual status values
    const statusMap: Record<string, string[]> = {
      active: ["Pending", "Application Reviewed", "Interview Scheduled"],
      successful: ["Hired", "Offer Extended"],
      rejected: ["Not Selected", "Position Filled"]
    };
    
    return matchesSearch && statusMap[statusFilter]?.includes(app.status);
  });
  
  // Helper function to get status badge variant based on status
  const getStatusBadgeClass = (statusColor: string) => {
    switch (statusColor) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  // Helper function to render status icon
  const getStatusIcon = (statusColor: string) => {
    switch (statusColor) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "info":
        return <Clock3 className="h-4 w-4 text-blue-600" />;
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DriverHeader />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Applications</h1>
            <p className="text-muted-foreground">Track and manage your job applications</p>
          </div>
          
          <div className="w-full md:w-auto">
            <Button onClick={() => navigate('/driver-search')}>Find New Jobs</Button>
          </div>
        </div>
        
        <div className="mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search jobs or companies..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setStatusFilter}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="successful">Successful</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {filteredApplications.length === 0 ? (
          <Card>
            <CardContent className="py-12 flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No applications found</h2>
              <p className="text-muted-foreground max-w-md mb-6">
                {searchTerm || statusFilter !== "all" 
                  ? "No applications match your current filters. Try adjusting your search criteria."
                  : "You haven't applied to any jobs yet. Start by exploring available opportunities."}
              </p>
              <Button onClick={() => navigate('/driver-search')}>Find Jobs</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <Card key={application.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center p-4 md:p-6">
                    <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                      <div className="h-12 w-12 bg-white flex items-center justify-center rounded-md border mr-4">
                        <img
                          src={application.companyLogo}
                          alt={application.company}
                          className="h-8 w-auto"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{application.jobTitle}</h3>
                        <p className="text-muted-foreground">{application.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 ml-auto mt-4 md:mt-0">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm">Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                      </div>
                      
                      <Badge 
                        variant="outline" 
                        className={`${getStatusBadgeClass(application.statusColor)} flex items-center gap-1 px-2 py-1`}
                      >
                        {getStatusIcon(application.statusColor)}
                        {application.status}
                      </Badge>
                      
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/job-details/${application.jobId}`)}>
                        <Eye className="h-4 w-4 mr-1" /> View Job
                      </Button>
                      
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/driver-application-details/${application.id}`}>
                          Details
                        </Link>
                      </Button>
                      
                      {application.feedback && (
                        <Button size="sm" asChild>
                          <Link to={`/driver-feedback?applicationId=${application.id}`}>
                            Get AI Feedback
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t px-4 py-3 bg-muted/20 flex items-center">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">Next step: {application.nextStep}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DriverApplications;
