
import { useState, useEffect } from "react";
import { Menu, X, Truck, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOptionsOpen, setIsLoginOptionsOpen] = useState(false);
  
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
          <div className="relative">
            <Button 
              variant="outline" 
              className="hover-lift"
              onClick={() => setIsLoginOptionsOpen(!isLoginOptionsOpen)}
            >
              Log in
            </Button>
            
            {isLoginOptionsOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 animate-fade-in">
                <Link 
                  to="/driver-dashboard" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsLoginOptionsOpen(false)}
                >
                  <User className="mr-2 h-4 w-4" /> Driver Login
                </Link>
                <Link 
                  to="/company-login" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsLoginOptionsOpen(false)}
                >
                  <Briefcase className="mr-2 h-4 w-4" /> Company Login
                </Link>
              </div>
            )}
          </div>
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
            <Link 
              to="/driver-dashboard" 
              className="flex items-center py-2 px-3 rounded-md border border-gray-300 bg-background hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="mr-2 h-4 w-4" /> Driver Login
            </Link>
            <Link 
              to="/company-login" 
              className="flex items-center py-2 px-3 rounded-md border border-gray-300 bg-background hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Briefcase className="mr-2 h-4 w-4" /> Company Login
            </Link>
            <Button className="w-full justify-center" asChild>
              <Link to="/driver-registration">Sign up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
