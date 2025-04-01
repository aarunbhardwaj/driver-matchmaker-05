
import { useState, useEffect } from "react";
import { Menu, X, Truck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10",
      isScrolled ? "glass shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Truck className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl tracking-tight">DriverMatch</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
            How it Works
          </a>
          <a href="#for-drivers" className="text-foreground/80 hover:text-foreground transition-colors">
            For Drivers
          </a>
          <a href="#for-companies" className="text-foreground/80 hover:text-foreground transition-colors">
            For Companies
          </a>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="hover-lift">
            <Link to="/driver-dashboard">Log in</Link>
          </Button>
          <Button className="hover-lift">
            <Link to="/driver-registration">Sign up</Link>
          </Button>
        </div>
        
        <button 
          className="md:hidden text-foreground" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass animate-slide-in py-6 px-6">
          <nav className="flex flex-col space-y-4 mb-6">
            <a 
              href="#how-it-works" 
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How it Works
            </a>
            <a 
              href="#for-drivers" 
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              For Drivers
            </a>
            <a 
              href="#for-companies" 
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              For Companies
            </a>
          </nav>
          
          <div className="flex flex-col space-y-3">
            <Button variant="outline" className="w-full justify-center" asChild>
              <Link to="/driver-dashboard">Log in</Link>
            </Button>
            <Button className="w-full justify-center" asChild>
              <Link to="/driver-registration">Sign up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
