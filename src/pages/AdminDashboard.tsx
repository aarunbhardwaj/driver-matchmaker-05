import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Users, BriefcaseIcon, Settings, ShieldCheck, Clock, AlertCircle, LineChart } from "lucide-react";
import { DriverVerificationTable } from "@/components/admin/DriverVerificationTable";

// Mock data for demonstration
const driverData = [
  { id: 1, name: "John Smith", email: "john@example.com", status: "Active", registeredDate: "2024-02-15", lastActive: "2024-04-01", verificationStatus: "verified" },
  { id: 2, name: "Alice Johnson", email: "alice@example.com", status: "Active", registeredDate: "2024-01-10", lastActive: "2024-03-28", verificationStatus: "verified" },
  { id: 3, name: "Mike Brown", email: "mike@example.com", status: "Inactive", registeredDate: "2023-11-20", lastActive: "2024-02-15", verificationStatus: "rejected" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", status: "Active", registeredDate: "2024-03-05", lastActive: "2024-04-03", verificationStatus: "pending" },
  { id: 5, name: "David Clark", email: "david@example.com", status: "Suspended", registeredDate: "2023-10-18", lastActive: "2023-12-10", verificationStatus: "unverified" },
];

const companyData = [
  { id: 1, name: "Acme Logistics", email: "contact@acmelogistics.com", plan: "Premium", status: "Active", trialEnds: "N/A", billing: "Monthly" },
  { id: 2, name: "FastMove Inc", email: "info@fastmove.com", plan: "Basic", status: "Trial", trialEnds: "2024-04-15", billing: "N/A" },
  { id: 3, name: "City Haulers", email: "admin@cityhaulers.com", plan: "Premium", status: "Active", trialEnds: "N/A", billing: "Annual" },
  { id: 4, name: "Express Delivery", email: "contact@expressdelivery.com", plan: "Basic", status: "Inactive", trialEnds: "Expired", billing: "N/A" },
  { id: 5, name: "Global Transport", email: "info@globaltransport.com", plan: "Premium", status: "Active", trialEnds: "N/A", billing: "Monthly" },
];

const AdminDashboard = () => {
  const [driverSearchQuery, setDriverSearchQuery] = useState("");
  const [companySearchQuery, setCompanySearchQuery] = useState("");
  
  // Filter functions
  const filteredDrivers = driverData.filter(driver => 
    driver.name.toLowerCase().includes(driverSearchQuery.toLowerCase()) || 
    driver.email.toLowerCase().includes(driverSearchQuery.toLowerCase())
  );
  
  const filteredCompanies = companyData.filter(company => 
    company.name.toLowerCase().includes(companySearchQuery.toLowerCase()) || 
    company.email.toLowerCase().includes(companySearchQuery.toLowerCase())
  );

  // Calculate verification statistics
  const verifiedDrivers = driverData.filter(d => d.verificationStatus === "verified").length;
  const pendingVerifications = driverData.filter(d => d.verificationStatus === "pending").length;
  const rejectedVerifications = driverData.filter(d => d.verificationStatus === "rejected").length;

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin-dashboard" className="flex items-center">
                <Settings className="h-8 w-8 text-primary mr-2" />
                <span className="text-xl font-bold">Admin Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-sm font-medium text-gray-500 hover:text-primary">
                Back to Main Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">Total Drivers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-primary mr-2" />
                    <span className="text-4xl font-bold">{driverData.length}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {driverData.filter(d => d.status === "Active").length} active drivers
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">Total Companies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-8 w-8 text-primary mr-2" />
                    <span className="text-4xl font-bold">{companyData.length}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {companyData.filter(c => c.status === "Active").length} active companies
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">Verified Drivers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <ShieldCheck className="h-8 w-8 text-green-500 mr-2" />
                    <span className="text-4xl font-bold">
                      {verifiedDrivers}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {((verifiedDrivers / driverData.length) * 100).toFixed(0)}% of all drivers
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">Pending Verifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-amber-500 mr-2" />
                    <span className="text-4xl font-bold">
                      {pendingVerifications}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Awaiting review
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Drivers</CardTitle>
                  <CardDescription>Recently registered drivers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Verification</TableHead>
                        <TableHead>Registered</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {driverData.slice(0, 3).map(driver => (
                        <TableRow key={driver.id}>
                          <TableCell>{driver.name}</TableCell>
                          <TableCell>
                            <Badge variant={driver.status === "Active" ? "default" : "destructive"}>
                              {driver.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                driver.verificationStatus === "verified" ? "default" : 
                                driver.verificationStatus === "pending" ? "outline" : 
                                driver.verificationStatus === "rejected" ? "destructive" : 
                                "secondary"
                              }
                            >
                              {driver.verificationStatus === "verified" ? "Verified" : 
                               driver.verificationStatus === "pending" ? "Pending" : 
                               driver.verificationStatus === "rejected" ? "Rejected" : 
                               "Not Verified"}
                            </Badge>
                          </TableCell>
                          <TableCell>{driver.registeredDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Companies</CardTitle>
                  <CardDescription>Recently registered companies</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {companyData.slice(0, 3).map(company => (
                        <TableRow key={company.id}>
                          <TableCell>{company.name}</TableCell>
                          <TableCell>{company.plan}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                company.status === "Active" ? "default" : 
                                company.status === "Trial" ? "outline" : "destructive"
                              }
                            >
                              {company.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="drivers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Driver Management</CardTitle>
                <CardDescription>Manage driver accounts and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search drivers..." 
                      value={driverSearchQuery}
                      onChange={(e) => setDriverSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button className="ml-4">Add Driver</Button>
                </div>

                <Table>
                  <TableCaption>A list of all registered drivers</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verification</TableHead>
                      <TableHead>Registered Date</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDrivers.map(driver => (
                      <TableRow key={driver.id}>
                        <TableCell className="font-medium">{driver.name}</TableCell>
                        <TableCell>{driver.email}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              driver.status === "Active" ? "default" : 
                              driver.status === "Suspended" ? "destructive" : "secondary"
                            }
                          >
                            {driver.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              driver.verificationStatus === "verified" ? "default" : 
                              driver.verificationStatus === "pending" ? "outline" : 
                              driver.verificationStatus === "rejected" ? "destructive" : 
                              "secondary"
                            }
                          >
                            {driver.verificationStatus === "verified" ? "Verified" : 
                             driver.verificationStatus === "pending" ? "Pending" : 
                             driver.verificationStatus === "rejected" ? "Rejected" : 
                             "Not Verified"}
                          </Badge>
                        </TableCell>
                        <TableCell>{driver.registeredDate}</TableCell>
                        <TableCell>{driver.lastActive}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Management</CardTitle>
                <CardDescription>Manage company accounts, billing, and trials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search companies..." 
                      value={companySearchQuery}
                      onChange={(e) => setCompanySearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button className="ml-4">Add Company</Button>
                </div>

                <Table>
                  <TableCaption>A list of all registered companies</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Trial Ends</TableHead>
                      <TableHead>Billing</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies.map(company => (
                      <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>{company.email}</TableCell>
                        <TableCell>{company.plan}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              company.status === "Active" ? "default" : 
                              company.status === "Trial" ? "outline" : "destructive"
                            }
                          >
                            {company.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{company.trialEnds}</TableCell>
                        <TableCell>{company.billing}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Billing</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Driver Verification Management</CardTitle>
                <CardDescription>
                  Review and manage driver verification requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-amber-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium">Pending</p>
                            <p className="text-2xl font-bold">{pendingVerifications}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View All</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium">Verified</p>
                            <p className="text-2xl font-bold">{verifiedDrivers}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View All</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium">Rejected</p>
                            <p className="text-2xl font-bold">{rejectedVerifications}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View All</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <DriverVerificationTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>Configure global settings for the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Admin settings will be implemented in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
