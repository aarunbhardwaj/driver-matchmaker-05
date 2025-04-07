
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Truck, Bell, Search, User, Menu, CreditCard, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DriverHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary font-medium" : "text-gray-500 hover:text-primary";
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/driver-dashboard" className="flex items-center">
              <Truck className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">DriverMatch</span>
            </Link>
            
            <nav className="hidden md:ml-8 md:flex md:space-x-4">
              <Link to="/driver-dashboard" className={`px-3 py-2 text-sm font-medium ${isActive('/driver-dashboard')}`}>
                Dashboard
              </Link>
              <Link to="/driver-search" className={`px-3 py-2 text-sm font-medium ${isActive('/driver-search')}`}>
                Find Jobs
              </Link>
              <Link to="/driver-profile" className={`px-3 py-2 text-sm font-medium ${isActive('/driver-profile')}`}>
                My Profile
              </Link>
              <Link to="/driver-membership" className={`px-3 py-2 text-sm font-medium ${isActive('/driver-membership')}`}>
                Membership
              </Link>
              <Link to="/driver-billing" className={`px-3 py-2 text-sm font-medium ${isActive('/driver-billing')}`}>
                <CreditCard className="h-4 w-4 inline mr-1" />
                Billing
              </Link>
              <Link to="/driver-feedback" className={`px-3 py-2 text-sm font-medium ${isActive('/driver-feedback')}`}>
                <MessageSquare className="h-4 w-4 inline mr-1" />
                AI Feedback
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:block relative mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-3 py-1.5 text-sm border rounded-md w-44 focus:outline-none focus:ring-1 focus:ring-primary" 
              />
            </div>
            
            <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0.5 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            <Link to="/driver-profile" className="ml-4 p-1.5 rounded-full text-gray-500 hover:text-gray-700 border border-gray-200">
              <User className="h-5 w-5" />
            </Link>
            
            <button className="ml-4 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-500" /> : <Menu className="h-6 w-6 text-gray-500" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/driver-dashboard" 
                className={`px-4 py-2 rounded-md ${isActive('/driver-dashboard')}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/driver-search" 
                className={`px-4 py-2 rounded-md ${isActive('/driver-search')}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find Jobs
              </Link>
              <Link 
                to="/driver-profile" 
                className={`px-4 py-2 rounded-md ${isActive('/driver-profile')}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Profile
              </Link>
              <Link 
                to="/driver-membership" 
                className={`px-4 py-2 rounded-md ${isActive('/driver-membership')}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Membership
              </Link>
              <Link 
                to="/driver-billing" 
                className={`px-4 py-2 rounded-md ${isActive('/driver-billing')}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
              </Link>
              <Link 
                to="/driver-feedback" 
                className={`px-4 py-2 rounded-md ${isActive('/driver-feedback')}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                AI Feedback
              </Link>
              <div className="pt-2 mt-2 border-t">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    Log Out
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
