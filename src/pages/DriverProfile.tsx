
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  User, 
  FileText, 
  Award, 
  MapPin, 
  Truck, 
  Calendar, 
  Phone, 
  Mail,
  Edit,
  Check,
  X,
  Briefcase,
  Star,
  CreditCard
} from "lucide-react";

import { DriverHeader } from "@/components/DriverHeader";
import { Footer } from "@/components/Footer";
import { PreferencesForm } from "@/components/driver-profile/PreferencesForm";
import { toast } from "@/hooks/use-toast";

// Define form schema for profile editing
const profileFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "Please enter a valid city"),
  state: z.string().min(2, "Please enter a valid state"),
  zipCode: z.string().min(5, "Please enter a valid zip code"),
  licenseType: z.string().min(1, "License type is required"),
  licenseNumber: z.string().min(5, "Please enter a valid license number"),
  licenseExpiration: z.string().min(1, "Expiration date is required"),
  experience: z.string(),
  bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const DriverProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isPreferencesSubmitting, setIsPreferencesSubmitting] = useState(false);

  // Mock data - in a real app, this would come from an API
  const driverData = {
    firstName: "Alex",
    lastName: "Rodriguez",
    email: "alex.rodriguez@example.com",
    phone: "(555) 123-4567",
    address: "1234 Trucking Lane",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    licenseType: "Class A CDL",
    licenseNumber: "IL1234567",
    licenseExpiration: "2025-06-30",
    experience: "5 years",
    membershipTier: "free", // Added membership tier
    bio: "Professional truck driver with experience in long-haul transportation. Specialized in refrigerated freight and hazardous materials. Safe driving record with no accidents.",
    certifications: [
      { name: "Hazardous Materials Endorsement", expiry: "2025-06-30" },
      { name: "Tanker Endorsement", expiry: "2025-06-30" },
      { name: "Double/Triple Trailer Endorsement", expiry: "2025-06-30" }
    ],
    metrics: {
      jobsCompleted: 127,
      milesLogged: 105672,
      onTimeDeliveries: "98%",
      safetyScore: "Excellent"
    }
  };

  // Mock preferences data - in a real app, this would come from an API
  const preferencesData = {
    jobTypes: ["truck", "delivery"],
    vehicleTypes: ["truck", "van"],
    location: {
      city: "Chicago",
      state: "IL",
      radius: "50",
    },
    internationalTravel: false,
    availability: "full_time",
    permits: ["cdl_a", "hazmat"],
    minimumHourlyRate: "22",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: driverData.firstName,
      lastName: driverData.lastName,
      email: driverData.email,
      phone: driverData.phone,
      address: driverData.address,
      city: driverData.city,
      state: driverData.state,
      zipCode: driverData.zipCode,
      licenseType: driverData.licenseType,
      licenseNumber: driverData.licenseNumber,
      licenseExpiration: driverData.licenseExpiration,
      experience: driverData.experience,
      bio: driverData.bio,
    },
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    // In a real app, this would send the data to an API
    setIsEditing(false);
    // Show success message
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  }

  function handlePreferencesSubmit(data: any) {
    setIsPreferencesSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Preferences data:", data);
      setIsPreferencesSubmitting(false);
      toast({
        title: "Preferences Saved",
        description: "Your job preferences have been updated.",
      });
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-background">
      <DriverHeader />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Driver Profile</h1>
            <p className="text-muted-foreground">Manage your professional information</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => navigate('/driver-dashboard')} variant="outline">
              Back to Dashboard
            </Button>
            <Button onClick={() => navigate('/driver-membership')} variant="outline">
              <Star className="mr-2 h-4 w-4" /> Membership
              {driverData.membershipTier === "free" && (
                <Badge className="ml-1.5 bg-primary/20 text-primary text-xs">
                  Upgrade
                </Badge>
              )}
            </Button>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Summary Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <User className="h-16 w-16 text-primary" />
              </div>
              <CardTitle>
                {driverData.firstName} {driverData.lastName}
                {driverData.membershipTier !== "free" && (
                  <div className="mt-2">
                    <Badge className="bg-primary">
                      {driverData.membershipTier === "plus" ? "Driver Plus" : "Driver Pro"}
                    </Badge>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                {driverData.licenseType} Driver
                {driverData.membershipTier !== "free" && (
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-300">
                    Verified
                  </Badge>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{driverData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{driverData.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{driverData.city}, {driverData.state}</span>
                </div>
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{driverData.experience} experience</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-sm text-muted-foreground mb-2">DRIVER METRICS</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Jobs Completed</p>
                    <p className="text-lg font-semibold">{driverData.metrics.jobsCompleted}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Miles Logged</p>
                    <p className="text-lg font-semibold">{driverData.metrics.milesLogged.toLocaleString()}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">On-Time</p>
                    <p className="text-lg font-semibold">{driverData.metrics.onTimeDeliveries}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Safety Score</p>
                    <p className="text-lg font-semibold">{driverData.metrics.safetyScore}</p>
                  </div>
                </div>
              </div>
              
              {driverData.membershipTier === "free" && (
                <div className="mt-6">
                  <Button className="w-full" onClick={() => navigate('/driver-membership')}>
                    <Star className="mr-2 h-4 w-4" /> Upgrade Membership
                  </Button>
                </div>
              )}
              
              <div className="mt-4">
                <Button variant="outline" className="w-full" onClick={() => navigate('/driver-billing')}>
                  <CreditCard className="mr-2 h-4 w-4" /> Billing Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="details">
              <TabsList className="mb-6">
                <TabsTrigger value="details">
                  <FileText className="w-4 h-4 mr-2" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="certifications">
                  <Award className="w-4 h-4 mr-2" />
                  Certifications
                </TabsTrigger>
                <TabsTrigger value="preferences">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Job Preferences
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details">
                {isEditing ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Edit Your Profile</CardTitle>
                      <CardDescription>
                        Update your personal and professional information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-4">Address</h3>
                            <div className="grid grid-cols-1 gap-4">
                              <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Street Address</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                  control={form.control}
                                  name="city"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>City</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="state"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>State</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="zipCode"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Zip Code</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-4">Professional Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="licenseType"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>License Type</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="licenseNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>License Number</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="licenseExpiration"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>License Expiration</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="date" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="experience"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Years of Experience</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                  <Textarea {...field} rows={5} className="resize-none" />
                                </FormControl>
                                <FormDescription>
                                  Briefly describe your experience and specialties as a driver
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                              <X className="mr-2 h-4 w-4" /> Cancel
                            </Button>
                            <Button type="submit">
                              <Check className="mr-2 h-4 w-4" /> Save Changes
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Driver Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3">Personal Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Full Name</p>
                              <p>{driverData.firstName} {driverData.lastName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p>{driverData.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Phone</p>
                              <p>{driverData.phone}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-3">Address</h3>
                          <p>{driverData.address}</p>
                          <p>{driverData.city}, {driverData.state} {driverData.zipCode}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-3">License Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">License Type</p>
                              <p>{driverData.licenseType}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">License Number</p>
                              <p>{driverData.licenseNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Expiration Date</p>
                              <p>{new Date(driverData.licenseExpiration).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Years of Experience</p>
                              <p>{driverData.experience}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-3">Bio</h3>
                          <p className="whitespace-pre-line">{driverData.bio}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="certifications">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Certifications & Endorsements</CardTitle>
                      <CardDescription>Your professional qualifications and endorsements</CardDescription>
                    </div>
                    <Button variant="outline">
                      <Edit className="mr-2 h-4 w-4" /> Manage
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {driverData.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <Award className="h-5 w-5 text-primary mr-3" />
                            <div>
                              <p className="font-medium">{cert.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Expires: {new Date(cert.expiry).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-300">
                            Active
                          </Badge>
                        </div>
                      ))}
                      
                      <div className="mt-6 flex justify-center">
                        <Button variant="outline">
                          Add New Certification
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Preferences</CardTitle>
                    <CardDescription>
                      Set your work preferences to help us match you with the right opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PreferencesForm 
                      onSubmit={handlePreferencesSubmit} 
                      isSubmitting={isPreferencesSubmitting} 
                      defaultValues={preferencesData}
                    />
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
