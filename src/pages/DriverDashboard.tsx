import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, MapPin, Calendar, DollarSign, Bell, FileText, MessageCircle, Star, User } from "lucide-react";
import { DriverHeader } from "@/components/DriverHeader";
import { Footer } from "@/components/Footer";

const DriverDashboard = () => {
  const navigate = useNavigate();
  // For demonstration purposes, we'll use mock data
  // In a real app, this would come from an API or state management
  const [activeTab, setActiveTab] = useState("available");
  
  const availableJobs = [
    {
      id: 1,
      title: "Long-haul Truck Driver",
      company: "LogistiCorp Inc.",
      location: "Chicago, IL to Denver, CO",
      pay: "$0.55/mile, est. $1,200",
      date: "Starting Oct 15",
      distance: "850 miles",
      match: "95%",
      logo: "/logos/dhl-logo.svg",
      isNew: true
    },
    {
      id: 2, 
      title: "Regional Delivery Driver",
      company: "FastFreight Systems",
      location: "Minneapolis Metro Area",
      pay: "$28/hour, est. $1,120/week",
      date: "Immediate Start",
      distance: "Local routes",
      match: "87%",
      logo: "/logos/dsv-logo.svg",
      isNew: false
    },
    {
      id: 3,
      title: "Refrigerated Truck Operator",
      company: "CoolHaul Logistics",
      location: "Dallas, TX to St. Louis, MO",
      pay: "$0.60/mile, est. $900",
      date: "Starting Oct 18",
      distance: "630 miles",
      match: "82%",
      logo: "/logos/maersk-logo.svg",
      isNew: true
    }
  ];

  const appliedJobs = [
    {
      id: 4,
      title: "Container Transport Driver",
      company: "SeaRoad Logistics",
      location: "Port of Seattle, WA",
      status: "Interview Scheduled",
      date: "Interview: Oct 12",
      logo: "/logos/uber-freight-logo.svg"
    },
    {
      id: 5,
      title: "Team Driver - Cross Country",
      company: "TransAmerica Shipping",
      location: "New York to Los Angeles",
      status: "Application Reviewed",
      date: "Applied: Oct 1",
      logo: "/logos/db-schenker-logo.svg"
    }
  ];

  const upcomingShifts = [
    {
      id: 1,
      title: "Container Pickup - Port of Oakland",
      date: "Oct 15, 2023",
      time: "06:00 - 14:00",
      company: "Pacific Shipping Co."
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Interview Scheduled",
      message: "SeaRoad Logistics wants to interview you for Container Transport Driver position",
      time: "2 hours ago",
      isRead: false
    },
    {
      id: 2,
      title: "New Match",
      message: "You have a new job match with LogistiCorp Inc.",
      time: "1 day ago",
      isRead: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DriverHeader />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Alex</h1>
            <p className="text-muted-foreground">Your driver dashboard at DriverMatch</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={() => navigate("/driver-profile")}>
              <User className="mr-2 h-4 w-4" /> Profile
            </Button>
            <Button>
              <Bell className="mr-2 h-4 w-4" /> Notifications 
              <Badge className="ml-2 bg-primary" variant="secondary">2</Badge>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Job Match Score</CardTitle>
              <CardDescription>Based on your skills and preferences</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">92%</span>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#e2e8f0" 
                      strokeWidth="10" 
                    />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth="10" 
                      strokeDasharray="283"
                      strokeDashoffset="22.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Your recent application activity</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="flex-1">Application reviewed by SeaRoad</span>
                  <span className="text-xs text-muted-foreground">Today</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="flex-1">Applied to TransAmerica</span>
                  <span className="text-xs text-muted-foreground">Yesterday</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <span className="flex-1">Completed profile update</span>
                  <span className="text-xs text-muted-foreground">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="available" className="w-full" onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="available">
                <Truck className="mr-2 h-4 w-4" /> Available Jobs
                {activeTab === "available" && availableJobs.filter(job => job.isNew).length > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                    {availableJobs.filter(job => job.isNew).length} new
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="applications">
                <FileText className="mr-2 h-4 w-4" /> My Applications
                {activeTab === "applications" && appliedJobs.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {appliedJobs.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="messages">
                <MessageCircle className="mr-2 h-4 w-4" /> Messages
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="available" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableJobs.map((job) => (
                <Card key={job.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          {job.company}
                        </CardDescription>
                      </div>
                      <div className="flex-shrink-0">
                        <img 
                          src={job.logo} 
                          alt={job.company} 
                          className="h-8 w-auto"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                        {job.isNew && (
                          <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-600 border-green-300 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{job.pay}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{job.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <span>{job.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-primary/10 text-primary border-none">
                          <Star className="h-3 w-3 fill-primary mr-1" />
                          <span>{job.match} match</span>
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full">Apply Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {appliedJobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-muted rounded-md">
                          <img 
                            src={job.logo} 
                            alt={job.company} 
                            className="h-8 w-auto"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className={
                          job.status === "Interview Scheduled" 
                            ? "bg-green-50 text-green-600 border-green-300" 
                            : "bg-blue-50 text-blue-600 border-blue-300"
                        }>
                          {job.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{job.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="font-semibold text-lg mb-2">No messages yet</h3>
                  <p className="text-muted-foreground mb-4">
                    When companies respond to your applications or want to contact you,
                    their messages will appear here.
                  </p>
                  <Button variant="outline">View Available Jobs</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default DriverDashboard;
