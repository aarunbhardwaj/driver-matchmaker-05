
import { ArrowRight, Truck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustedCompanies } from "@/components/TrustedCompanies";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-6">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          The Smarter Way to Connect <span className="text-primary">Drivers</span> with <span className="text-primary">Logistics Companies</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          DriverMatch uses intelligent matching to pair qualified drivers with the right logistics companies, 
          streamlining the hiring process for everyone involved.
        </p>
        
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="group gap-2 hover-lift text-lg px-8 py-6">
            <User className="h-5 w-5" />
            <span>I'm a Driver</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button size="lg" variant="outline" className="group gap-2 hover-lift text-lg px-8 py-6">
            <Truck className="h-5 w-5" />
            <span>I'm a Company</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="pt-12">
          <TrustedCompanies />
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium">Discover How It Works</span>
            <ArrowRight className="h-5 w-5 rotate-90" />
          </div>
        </a>
      </div>
    </section>
  );
}
