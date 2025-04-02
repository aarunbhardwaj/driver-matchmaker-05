
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { BriefcaseIcon, CheckCircle, Clock, MapPin, Search, Users, ArrowUpRight } from "lucide-react";
import { CompanyHeader } from "@/components/CompanyHeader";

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="min-h-screen bg-muted/40">
      <CompanyHeader />
      <div className="container px-4 py-6 mx-auto">
        <h1 className="text-3xl font-bold mb-8">Recruitment Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Active Job Listings</CardTitle>
              <CardDescription>Your current open positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">12</span>
                <BriefcaseIcon className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">New Applications</CardTitle>
              <CardDescription>Unreviewed applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">28</span>
                <Users className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Matched Drivers</CardTitle>
              <CardDescription>AI-recommended matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">15</span>
                <CheckCircle className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" onValueChange={(value) => setActiveTab(value)} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Job Listings</TabsTrigger>
            <TabsTrigger value="candidates">Driver Candidates</TabsTrigger>
            <TabsTrigger value="matches">AI Matches</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Driver applications received in the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Driver Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <TableRow key={item}>
                        <TableCell className="font-medium">John Driver {item}</TableCell>
                        <TableCell>Delivery Driver</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" /> London
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" /> {item} day{item > 1 ? "s" : ""} ago
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link 
                            to="#" 
                            className="inline-flex items-center text-sm text-primary hover:underline"
                          >
                            View Profile <ArrowUpRight className="ml-1 h-3 w-3" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Job Performance</CardTitle>
                <CardDescription>How your job listings are performing</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Conversion Rate</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3].map((item) => (
                      <TableRow key={item}>
                        <TableCell className="font-medium">
                          {["Delivery Driver", "Bus Driver", "Truck Driver"][item-1]}
                        </TableCell>
                        <TableCell>{item * 120}</TableCell>
                        <TableCell>{item * 15}</TableCell>
                        <TableCell>{(item * 12.5).toFixed(1)}%</TableCell>
                        <TableCell>
                          <Link 
                            to="#" 
                            className="inline-flex items-center text-sm text-primary hover:underline"
                          >
                            View Details <ArrowUpRight className="ml-1 h-3 w-3" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="jobs" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Job Listings</h2>
              <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                Post New Job
              </button>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Posted Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <TableRow key={item}>
                        <TableCell className="font-medium">
                          {["Delivery Driver", "Bus Driver", "Truck Driver", "Taxi Driver", "Courier", "Van Driver"][item-1]}
                        </TableCell>
                        <TableCell>
                          {["London", "Manchester", "Birmingham", "Glasgow", "Leeds", "Edinburgh"][item-1]}
                        </TableCell>
                        <TableCell>
                          {item % 2 === 0 ? "Full-time" : "Part-time"}
                        </TableCell>
                        <TableCell>{item * 5}</TableCell>
                        <TableCell>{item * 2} days ago</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item % 3 === 0 ? "bg-yellow-100 text-yellow-800" : 
                            item % 3 === 1 ? "bg-green-100 text-green-800" : 
                            "bg-blue-100 text-blue-800"
                          }`}>
                            {item % 3 === 0 ? "Draft" : item % 3 === 1 ? "Active" : "Reviewing"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <button className="text-primary hover:underline text-sm">Edit</button>
                            <button className="text-primary hover:underline text-sm">View</button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="candidates" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Driver Candidates</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search candidates..."
                  className="pl-9 pr-4 py-2 border rounded-md w-[250px] focus:outline-none focus:ring-1 focus:ring-primary" 
                />
              </div>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Vehicle Types</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Match Score</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                      <TableRow key={item}>
                        <TableCell className="font-medium">
                          Driver Name {item}
                        </TableCell>
                        <TableCell>
                          {["London", "Manchester", "Birmingham", "Glasgow", "Edinburgh", "Leeds", "Bristol", "Liverpool"][item-1]}
                        </TableCell>
                        <TableCell>{item % 3 + 1} years</TableCell>
                        <TableCell>
                          {item % 4 === 0 ? "Car, Van" : 
                           item % 4 === 1 ? "Bus, Truck" : 
                           item % 4 === 2 ? "Car, Bicycle" : "Van, Truck"}
                        </TableCell>
                        <TableCell>
                          {item % 3 === 0 ? "Full-time" : item % 3 === 1 ? "Part-time" : "Weekends"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-16 h-2 rounded-full bg-gray-200 mr-2">
                              <div 
                                className={`h-full rounded-full ${
                                  item % 3 === 0 ? "bg-green-500 w-[85%]" : 
                                  item % 3 === 1 ? "bg-yellow-500 w-[65%]" : 
                                  "bg-blue-500 w-[75%]"
                                }`} 
                              />
                            </div>
                            <span className="text-sm">
                              {item % 3 === 0 ? "85%" : item % 3 === 1 ? "65%" : "75%"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link 
                            to="#" 
                            className="inline-flex items-center text-sm text-primary hover:underline"
                          >
                            View Profile <ArrowUpRight className="ml-1 h-3 w-3" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="matches" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI-Recommended Matches</CardTitle>
                <CardDescription>
                  Drivers who closely match your job requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Driver</TableHead>
                      <TableHead>Matched Job</TableHead>
                      <TableHead>Match Score</TableHead>
                      <TableHead>Key Factors</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <TableRow key={item}>
                        <TableCell className="font-medium">
                          Driver Name {item}
                        </TableCell>
                        <TableCell>
                          {["Delivery Driver", "Bus Driver", "Truck Driver", "Taxi Driver", "Van Driver"][item-1]}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-16 h-2 rounded-full bg-gray-200 mr-2">
                              <div 
                                className="bg-green-500 h-full rounded-full"
                                style={{ width: `${95 - (item * 3)}%` }}
                              />
                            </div>
                            <span className="text-sm">{95 - (item * 3)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs">
                            {item % 3 === 0 ? "Experience, Location" : 
                             item % 3 === 1 ? "Availability, Vehicle Type" : 
                             "Permits, Experience"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <button className="px-2 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary/90">
                              Contact
                            </button>
                            <button className="px-2 py-1 text-xs border border-primary text-primary rounded-md hover:bg-primary/10">
                              View Profile
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyDashboard;
