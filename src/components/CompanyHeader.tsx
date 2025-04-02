
import { Link } from "react-router-dom";
import { BriefcaseIcon, Bell, Search, User, Menu } from "lucide-react";

export const CompanyHeader = () => {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/company-dashboard" className="flex items-center">
              <BriefcaseIcon className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">DriverMatch</span>
            </Link>
            
            <nav className="hidden md:ml-8 md:flex md:space-x-4">
              <Link to="/company-dashboard" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary">
                Dashboard
              </Link>
              <Link to="/job-listings" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary">
                Job Listings
              </Link>
              <Link to="/driver-search" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary">
                Find Drivers
              </Link>
              <Link to="/company-profile" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary">
                Company Profile
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
            
            <button className="ml-4 p-1.5 rounded-full text-gray-500 hover:text-gray-700 border border-gray-200">
              <User className="h-5 w-5" />
            </button>
            
            <button className="ml-4 md:hidden">
              <Menu className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
