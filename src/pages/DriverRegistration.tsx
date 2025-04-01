
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

// Import our new components
import { RegistrationHeader } from "@/components/driver-registration/RegistrationHeader";
import { PersonalInfoSection } from "@/components/driver-registration/PersonalInfoSection";
import { DriverInfoSection } from "@/components/driver-registration/DriverInfoSection";
import { CVUploadSection } from "@/components/driver-registration/CVUploadSection";
import { SocialMediaSection } from "@/components/driver-registration/SocialMediaSection";
import { TermsSection } from "@/components/driver-registration/TermsSection";
import { driverFormSchema, DriverFormValues, defaultValues } from "@/components/driver-registration/DriverRegistrationSchema";

export default function DriverRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
    
    // Simulate API call
    setTimeout(() => {
      console.log("Driver registration data:", data);
      console.log("Selected file:", selectedFile);
      setIsSubmitting(false);
      
      toast({
        title: "Registration Successful",
        description: "Your driver profile has been created.",
      });
      
      // Redirect to home page for now
      // In a real app, would redirect to driver dashboard
      navigate("/");
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <RegistrationHeader />

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-card rounded-xl shadow-lg p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="mr-2">Processing...</span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="mr-2">Create Driver Profile</span>
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="text-center text-sm text-muted-foreground mt-8">
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
