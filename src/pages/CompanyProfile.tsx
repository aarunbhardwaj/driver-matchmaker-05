
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Building2, MapPin, Globe, Mail, Phone, Users, Save, Upload, Edit2, Plus, CreditCard, Calendar } from "lucide-react";
import { CompanyHeader } from "@/components/CompanyHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const companyProfileSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  website: z.string().url("Please enter a valid website URL").or(z.string().length(0)),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zip: z.string().min(5, "Zip code must be at least 5 characters"),
  companySize: z.string(),
  yearFounded: z.string().regex(/^\d{4}$/, "Please enter a valid year"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

const newUserSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(1, "Please select a role"),
  sendInvite: z.boolean().default(true),
});

type CompanyProfileValues = z.infer<typeof companyProfileSchema>;
type NewUserValues = z.infer<typeof newUserSchema>;

// Mock data for the billing and users sections
const billingHistory = [
  { id: 1, date: "2024-03-01", description: "Premium Plan - Monthly", amount: "$149.00", status: "Paid" },
  { id: 2, date: "2024-02-01", description: "Premium Plan - Monthly", amount: "$149.00", status: "Paid" },
  { id: 3, date: "2024-01-01", description: "Premium Plan - Monthly", amount: "$149.00", status: "Paid" },
  { id: 4, date: "2023-12-01", description: "Premium Plan - Monthly", amount: "$149.00", status: "Paid" },
];

const subscriptionDetails = {
  plan: "Premium",
  price: "$149.00 / month",
  nextBilling: "May 1, 2024",
  status: "Active",
  features: [
    "Unlimited job postings",
    "Access to all driver profiles",
    "Priority support",
    "Advanced analytics",
    "Bulk job uploads",
  ]
};

const teamMembers = [
  { id: 1, name: "John Doe", email: "john@acmelogistics.example.com", role: "Admin", status: "Active", lastActive: "Today" },
  { id: 2, name: "Jane Smith", email: "jane@acmelogistics.example.com", role: "Editor", status: "Active", lastActive: "Yesterday" },
  { id: 3, name: "Robert Johnson", email: "robert@acmelogistics.example.com", role: "Viewer", status: "Inactive", lastActive: "5 days ago" },
];

const CompanyProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  
  // Mock data - this would come from an API in a real app
  const defaultValues = {
    companyName: "Acme Logistics",
    industry: "Transportation & Logistics",
    website: "https://acmelogistics.example.com",
    email: "contact@acmelogistics.example.com",
    phone: "(555) 123-4567",
    address: "123 Delivery Ave",
    city: "Logisticsville",
    state: "CA",
    zip: "90210",
    companySize: "51-200 employees",
    yearFounded: "2005",
    description: "Acme Logistics is a leading transportation company specializing in commercial freight and driver staffing. We provide competitive benefits and opportunities for professional growth in the logistics industry.",
  };

  const form = useForm<CompanyProfileValues>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues,
  });

  const newUserForm = useForm<NewUserValues>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
      sendInvite: true,
    },
  });

  const onSubmit = (data: CompanyProfileValues) => {
    // This would save to an API in a real app
    console.log("Saving company profile:", data);
    toast({
      title: "Profile Updated",
      description: "Your company profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUser = (data: NewUserValues) => {
    console.log("Adding new user:", data);
    toast({
      title: "User Invited",
      description: `Invitation sent to ${data.email}`,
    });
    setIsAddUserDialogOpen(false);
    newUserForm.reset();
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <CompanyHeader />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Company Profile</h1>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Company profile sidebar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                          <img 
                            src={profileImage} 
                            alt="Company logo" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building2 className="h-16 w-16 text-primary" />
                        )}
                      </div>
                      <div className="absolute bottom-0 right-0">
                        <label htmlFor="profile-image" className="cursor-pointer">
                          <div className="bg-primary text-white p-2 rounded-full">
                            <Upload className="h-4 w-4" />
                          </div>
                          <input 
                            type="file" 
                            id="profile-image" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleProfileImageChange}
                          />
                        </label>
                      </div>
                    </div>
                    <CardTitle>{form.watch("companyName")}</CardTitle>
                    <CardDescription>{form.watch("industry")}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {form.watch("city")}, {form.watch("state")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={form.watch("website")} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {form.watch("website").replace(/(^\w+:|^)\/\//, '')}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${form.watch("email")}`} className="text-primary hover:underline">
                        {form.watch("email")}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{form.watch("phone")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{form.watch("companySize")}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Company profile details */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Company Details</CardTitle>
                      <CardDescription>
                        Your public company profile information
                      </CardDescription>
                    </div>
                    <Button 
                      variant={isEditing ? "outline" : "default"} 
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? (
                        "Cancel"
                      ) : (
                        <>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="industry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Industry</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} />
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
                                  <Input {...field} disabled={!isEditing} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="companySize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company Size</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={!isEditing} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} />
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
                                  <Input {...field} disabled={!isEditing} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="zip"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="yearFounded"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year Founded</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={!isEditing} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  disabled={!isEditing} 
                                  className="min-h-[120px]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {isEditing && (
                          <div className="flex justify-end">
                            <Button type="submit">
                              <Save className="mr-2 h-4 w-4" />
                              Save Changes
                            </Button>
                          </div>
                        )}
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Subscription info */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                    <CardDescription>
                      Your current plan details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-xl">{subscriptionDetails.plan}</h3>
                      <p className="text-sm text-muted-foreground">{subscriptionDetails.price}</p>
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Status</span>
                        <Badge>{subscriptionDetails.status}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Next Billing</span>
                        <span className="text-sm">{subscriptionDetails.nextBilling}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h4 className="text-sm font-semibold mb-2">Included Features</h4>
                      <ul className="space-y-2">
                        {subscriptionDetails.features.map((feature, index) => (
                          <li key={index} className="text-sm flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline">Cancel Plan</Button>
                    <Button>Upgrade</Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Billing history */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Billing History</CardTitle>
                      <CardDescription>
                        Your recent payments and invoices
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Update Payment Method
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {billingHistory.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View Invoice
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Team Management</CardTitle>
                  <CardDescription>
                    Manage your team members and their permissions
                  </CardDescription>
                </div>
                <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Team Member</DialogTitle>
                      <DialogDescription>
                        Invite a new user to join your company team.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Form {...newUserForm}>
                      <form onSubmit={newUserForm.handleSubmit(handleAddUser)} className="space-y-4">
                        <FormField
                          control={newUserForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={newUserForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={newUserForm.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="editor">Editor</SelectItem>
                                  <SelectItem value="viewer">Viewer</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Admin can manage all aspects, Editors can post jobs, Viewers can only view data.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={newUserForm.control}
                          name="sendInvite"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Send Email Invitation</FormLabel>
                                <FormDescription>
                                  Send an email invitation to this user
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <DialogFooter>
                          <Button type="submit">Add User</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>
                          <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{member.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Remove</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Account settings content will be implemented in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyProfile;
