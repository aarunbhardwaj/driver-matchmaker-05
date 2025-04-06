
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our components
import { RegistrationHeader } from "@/components/driver-registration/RegistrationHeader";
import { PersonalInfoSection } from "@/components/driver-registration/PersonalInfoSection";
import { DriverInfoSection } from "@/components/driver-registration/DriverInfoSection";
import { CVUploadSection } from "@/components/driver-registration/CVUploadSection";
import { SocialMediaSection } from "@/components/driver-registration/SocialMediaSection";
import { TermsSection } from "@/components/driver-registration/TermsSection";
import { MembershipTiers } from "@/components/driver-membership/MembershipTiers";
import { driverFormSchema, DriverFormValues, defaultValues } from "@/components/driver-registration/DriverRegistrationSchema";

export default function DriverRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedMembership, setSelectedMembership] = useState("free");
  const navigate = useNavigate();
  
  const form = useForm<DriverFormValues>({
    resolver: zodResolver(driverFormSchema),
    defaultValues,
  });

  function onSubmit(data: DriverFormValues) {
    setIsSubmitting(true);
    
    // Create FormData object to handle file upload
    const formData = new FormData();
    // Add all form fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "cvFile") {
        formData.append(key, value as string);
      }
    });
    
    // Add the file if it exists
    if (selectedFile) {
      formData.append("cvFile", selectedFile);
    }
    
    // Add the selected membership tier
    formData.append("membershipTier", selectedMembership);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Driver registration data:", data);
      console.log("Selected file:", selectedFile);
      console.log("Selected membership tier:", selectedMembership);
      setIsSubmitting(false);
      
      toast({
        title: "Registration Successful",
        description: "Your driver profile has been created.",
      });
      
      // Redirect to driver dashboard
      navigate("/driver-dashboard");
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <RegistrationHeader />

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-card rounded-xl shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="profile" className="text-md py-3">Profile Information</TabsTrigger>
              <TabsTrigger value="membership" className="text-md py-3">Choose Membership</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="p-8">
              <Form {...form}>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (form.formState.isValid) {
                    setActiveTab("membership");
                  } else {
                    form.handleSubmit(onSubmit)(e);
                  }
                }} className="space-y-6">
                  <PersonalInfoSection form={form} />
                  <DriverInfoSection form={form} />
                  <CVUploadSection 
                    form={form} 
                    selectedFile={selectedFile} 
                    setSelectedFile={setSelectedFile} 
                  />
                  <SocialMediaSection form={form} />
                  <TermsSection form={form} />

                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="w-full py-6" 
                      size="lg"
                    >
                      <span className="flex items-center">
                        <span className="mr-2">Continue to Membership</span>
                        <CheckCircle2 className="h-5 w-5" />
                      </span>
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="membership" className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Choose Your Membership</h2>
                <p className="text-muted-foreground mt-1">
                  Select the plan that best fits your needs. You can change your plan anytime.
                </p>
              </div>
              
              <MembershipTiers 
                currentTier={selectedMembership} 
                onSelectTier={setSelectedMembership}
              />
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("profile")}
                >
                  Back to Profile
                </Button>
                <Button 
                  onClick={() => form.handleSubmit(onSubmit)()}
                  className="min-w-[150px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="mr-2">Processing...</span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="mr-2">Create Account</span>
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm text-muted-foreground p-6 bg-muted rounded-b-xl">
            Already have an account?{" "}
            <a href="/login" className="text-primary font-medium hover:underline">
              Log in
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
