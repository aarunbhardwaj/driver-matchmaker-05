
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Bell, 
  Briefcase, 
  ChevronDown, 
  CreditCard, 
  LogOut, 
  Menu, 
  MessageSquare, 
  Search, 
  Settings, 
  Star, 
  Truck, 
  User, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const DriverHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };
  
  // Mock notification data
  const notifications = 2;
  const membershipTier = "free"; // This would come from your auth/user context in a real app
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/driver-dashboard" className="flex items-center">
              <Truck className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold">DriverMatch</span>
              
              {membershipTier !== "free" && (
                <Badge className="ml-2" variant="outline">
                  {membershipTier === "plus" ? "PLUS" : "PRO"}
                </Badge>
              )}
            </Link>
            
            <nav className="hidden md:ml-8 md:flex md:space-x-1">
              <Link 
                to="/driver-dashboard" 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  isActivePath("/driver-dashboard") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                Dashboard
              </Link>
              <Link 
                to="/jobs" 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  isActivePath("/jobs") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                Find Jobs
              </Link>
              <Link 
                to="/applications" 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  isActivePath("/applications") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                Applications
              </Link>
              <Link 
                to="/messages" 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  isActivePath("/messages") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                Messages
              </Link>
              <Link 
                to="/driver-membership" 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  isActivePath("/driver-membership") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                Membership
                {membershipTier === "free" && (
                  <Badge className="ml-1.5 bg-primary/20 text-primary text-xs">
                    Upgrade
                  </Badge>
                )}
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:block relative mr-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="pl-9 py-2 pr-4 text-sm w-48 rounded-full bg-muted focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                  {notifications}
                </span>
              )}
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sm font-medium rounded-full ml-4 p-0.5 hover:bg-accent">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/driver-profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/driver-membership" className="cursor-pointer">
                      <Star className="mr-2 h-4 w-4" />
                      <span>Membership</span>
                      {membershipTier === "free" && (
                        <Badge className="ml-auto bg-primary/20 text-primary text-xs">
                          Upgrade
                        </Badge>
                      )}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/driver-billing" className="cursor-pointer">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/applications" className="cursor-pointer">
                      <Briefcase className="mr-2 h-4 w-4" />
                      <span>Applications</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/messages" className="cursor-pointer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                      {notifications > 0 && (
                        <Badge className="ml-auto bg-primary text-primary-foreground">
                          {notifications}
                        </Badge>
                      )}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button 
              className="ml-4 p-2 text-muted-foreground hover:text-foreground rounded-lg md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-1">
              <Link 
                to="/driver-dashboard" 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  isActivePath("/driver-dashboard") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/jobs" 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  isActivePath("/jobs") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find Jobs
              </Link>
              <Link 
                to="/applications" 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  isActivePath("/applications") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Applications
              </Link>
              <Link 
                to="/messages" 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  isActivePath("/messages") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Messages
              </Link>
              <Link 
                to="/driver-profile" 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  isActivePath("/driver-profile") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link 
                to="/driver-membership" 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  isActivePath("/driver-membership") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Membership
                {membershipTier === "free" && (
                  <Badge className="ml-1.5 bg-primary/20 text-primary text-xs">
                    Upgrade
                  </Badge>
                )}
              </Link>
              <Link 
                to="/driver-billing" 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  isActivePath("/driver-billing") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Billing
              </Link>
              <Link 
                to="/settings" 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  isActivePath("/settings") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Settings
              </Link>
              <div className="pt-2 mt-2 border-t">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-3 text-muted-foreground"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </nav>
            
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="pl-9 py-2 pr-4 text-sm w-full rounded-full bg-muted focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
