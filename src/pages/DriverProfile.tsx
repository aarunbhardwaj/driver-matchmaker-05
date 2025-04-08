
import { useState } from "react";
import { DriverHeader } from "@/components/DriverHeader";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Award, Briefcase, UserCheck } from "lucide-react";
import { PreferencesForm } from "@/components/driver-profile/PreferencesForm";
import { VerificationStatusCard, VerificationStatus } from "@/components/driver-profile/VerificationStatus";

const DriverProfile = () => {
  // For demonstration, we're using a state variable to track verification status
  // In a real app, this would come from an API/database
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("verified");
  
  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      <DriverHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile sidebar */}
          <div className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt="Profile Picture" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 text-2xl font-bold">John Driver</h2>
                  <p className="text-muted-foreground">Professional Truck Driver</p>
                  <div className="flex items-center mt-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" /> London, UK
                  </div>
                  <Button className="mt-4 w-full">Edit Profile</Button>
                </div>
                
                <div className="border-t mt-6 pt-6">
                  <h3 className="font-semibold mb-4">Profile Completion</h3>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full w-[85%]"></div>
                  </div>
                  <p className="text-sm text-right mt-1 text-muted-foreground">85% Complete</p>
                </div>
                
                <div className="border-t mt-6 pt-6">
                  <h3 className="font-semibold mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Member Since</span>
                      </div>
                      <span className="text-sm font-medium">Jan 2023</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Last Active</span>
                      </div>
                      <span className="text-sm font-medium">Today</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Experience</span>
                      </div>
                      <span className="text-sm font-medium">5+ years</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Applications</span>
                      </div>
                      <span className="text-sm font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <UserCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Verification</span>
                      </div>
                      <span className={`text-sm font-medium ${
                        verificationStatus === "verified" ? "text-green-600" : 
                        verificationStatus === "pending" ? "text-amber-600" : 
                        verificationStatus === "rejected" ? "text-red-600" : 
                        "text-gray-600"
                      }`}>
                        {verificationStatus === "verified" ? "Verified" : 
                         verificationStatus === "pending" ? "Pending" : 
                         verificationStatus === "rejected" ? "Failed" : 
                         "Not Verified"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <VerificationStatusCard status={verificationStatus} />
          </div>
          
          {/* Profile main content */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Professional truck driver with over 5 years of experience in long-haul and regional deliveries. 
                      Excellent safety record with no accidents or violations. Experienced with temperature-controlled 
                      freight, hazardous materials, and oversized loads. Looking for opportunities with companies that 
                      value safety, reliability, and work-life balance.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-semibold">Long-Haul Driver</h3>
                        <span className="text-sm text-muted-foreground">2021 - Present</span>
                      </div>
                      <h4 className="text-muted-foreground">Express Logistics</h4>
                      <p className="mt-2 text-sm">
                        Responsible for cross-country freight deliveries, ensuring on-time arrival and maintaining 
                        vehicle safety standards. Consistently received top ratings for timeliness and cargo condition.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-semibold">Regional Delivery Driver</h3>
                        <span className="text-sm text-muted-foreground">2018 - 2021</span>
                      </div>
                      <h4 className="text-muted-foreground">City Haulers</h4>
                      <p className="mt-2 text-sm">
                        Handled regional deliveries within a 300-mile radius. Managed loading and unloading of cargo 
                        and maintained detailed logs compliant with regulations.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Commercial Driver's License (CDL) Class A</h3>
                        <p className="text-sm text-muted-foreground">State Department of Transportation</p>
                      </div>
                      <span className="text-sm text-muted-foreground">Expires: 2026</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Hazardous Materials Endorsement</h3>
                        <p className="text-sm text-muted-foreground">Federal Motor Carrier Safety Administration</p>
                      </div>
                      <span className="text-sm text-muted-foreground">Expires: 2025</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Tanker Vehicles Endorsement</h3>
                        <p className="text-sm text-muted-foreground">State Department of Transportation</p>
                      </div>
                      <span className="text-sm text-muted-foreground">Expires: 2026</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resume">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume</CardTitle>
                    <CardDescription>Your uploaded resume and related settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Resume content will be implemented in a future update.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences">
                <PreferencesForm />
              </TabsContent>
              
              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents & Licenses</CardTitle>
                    <CardDescription>Your uploaded documents and licenses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Documents section will be implemented in a future update.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DriverProfile;
