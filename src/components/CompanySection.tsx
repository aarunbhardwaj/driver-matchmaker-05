
import { Truck, Check, ArrowRight, Search, Clock, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Access our database of qualified and verified drivers",
  "Reduce hiring time and costs with smart matching",
  "Improve driver retention with better fit candidates",
  "Streamline your recruitment process with our tools",
  "Get insights and analytics on your recruitment efforts"
];

export function CompanySection() {
  return (
    <section id="for-companies" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="glass rounded-xl overflow-hidden aspect-video animate-zoom-in">
              {/* This would be an image or video showing the company interface */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-2xl font-bold mb-4">Company Dashboard Preview</h3>
                <p className="text-muted-foreground mb-6">A sneak peek at the company interface</p>
                
                <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                  <div className="glass p-4 rounded-lg flex flex-col items-center">
                    <Search className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm">Find Drivers</span>
                  </div>
                  <div className="glass p-4 rounded-lg flex flex-col items-center">
                    <Clock className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm">Job Postings</span>
                  </div>
                  <div className="glass p-4 rounded-lg flex flex-col items-center">
                    <ClipboardCheck className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm">Applications</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-primary/30 blur-2xl -z-10"></div>
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-secondary/30 blur-2xl -z-10"></div>
          </div>
          
          <div className="space-y-6 animate-slide-in order-1 lg:order-2">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-2">
              <Truck className="h-4 w-4 mr-2" />
              For Companies
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold">Find Qualified Drivers Faster</h2>
            
            <p className="text-lg text-muted-foreground">
              DriverMatch helps logistics companies find the right drivers quickly and efficiently, 
              saving time and resources while ensuring better quality hires.
            </p>
            
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-3" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Button size="lg" className="group mt-4 hover-lift">
              <span>Register Your Company</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
