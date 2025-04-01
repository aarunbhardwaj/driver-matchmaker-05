
import { Check, ArrowRight, FileCheck, Award, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const benefits = [
  "Get matched with jobs that fit your skills and preferences",
  "Spend less time searching and more time driving",
  "Access better opportunities with top logistics companies",
  "Manage your profile, certifications and availability in one place",
  "Receive alerts for new job matches in your area"
];

export function DriverSection() {
  return (
    <section id="for-drivers" className="py-24 px-6 bg-accent">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-in">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-2">
              <User className="h-4 w-4 mr-2" />
              For Drivers
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold">Find Your Perfect Driving Position</h2>
            
            <p className="text-lg text-muted-foreground">
              DriverMatch helps qualified drivers connect with logistics companies that value their skills and experience. 
              Create your profile once and let our platform do the matching for you.
            </p>
            
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-3" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Button size="lg" className="group mt-4 hover-lift" asChild>
              <Link to="/driver-dashboard">
                <span>Create Driver Profile</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <div className="relative">
            <div className="glass rounded-xl overflow-hidden aspect-video animate-zoom-in">
              {/* This would be an image or video showing the driver interface */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-2xl font-bold mb-4">Driver Dashboard Preview</h3>
                <p className="text-muted-foreground mb-6">A sneak peek at the driver interface</p>
                
                <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                  <div className="glass p-4 rounded-lg flex flex-col items-center">
                    <FileCheck className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm">Profile</span>
                  </div>
                  <div className="glass p-4 rounded-lg flex flex-col items-center">
                    <MapPin className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm">Job Matches</span>
                  </div>
                  <div className="glass p-4 rounded-lg flex flex-col items-center">
                    <Award className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm">Certifications</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/30 blur-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-secondary/30 blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Import missing
import { User } from "lucide-react";
