
import React, { useState } from "react";
import { CompanyHeader } from "@/components/CompanyHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, MapPin, Truck, Star, Download, CheckCircle, Globe, Award, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mock data for drivers with updated properties for verification and membership
const MOCK_DRIVERS = [
  {
    id: 1,
    name: "John Smith",
    location: "Berlin, DE",
    experience: "5 years",
    licenseTypes: ["Class C", "Class CE"],
    availability: "Immediate",
    rating: 4.8,
    skills: ["Long-haul", "Refrigerated"],
    jobTypes: ["truck", "delivery"],
    vehicleTypes: ["truck"],
    shiftPreferences: ["morning", "afternoon"],
    employmentType: "permanent",
    isVerified: true,
    internationalRoutes: true,
    membershipTier: "pro", // Driver Pro
    featured: true,
  },
  {
    id: 2,
    name: "Maria Garcia",
    location: "Hamburg, DE",
    experience: "8 years",
    licenseTypes: ["Class C", "Class CE", "Class D"],
    availability: "2 weeks",
    rating: 4.9,
    skills: ["Hazardous Materials", "International"],
    jobTypes: ["truck"],
    vehicleTypes: ["truck"],
    shiftPreferences: ["night", "evening"],
    employmentType: "freelance",
    isVerified: true,
    internationalRoutes: true,
    membershipTier: "plus", // Driver Plus
    featured: false,
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    location: "Munich, DE",
    experience: "3 years",
    licenseTypes: ["Class C"],
    availability: "Immediate",
    rating: 4.5,
    skills: ["Local delivery", "Van"],
    jobTypes: ["delivery", "courier"],
    vehicleTypes: ["van", "car"],
    shiftPreferences: ["morning", "afternoon"],
    employmentType: "either",
    isVerified: false,
    internationalRoutes: false,
    membershipTier: "free", // Free tier
    featured: false,
  },
  {
    id: 4,
    name: "Sophie Laurent",
    location: "Frankfurt, DE",
    experience: "10 years",
    licenseTypes: ["Class C", "Class CE", "Class D"],
    availability: "1 month",
    rating: 5.0,
    skills: ["Long-haul", "International", "Hazardous Materials"],
    jobTypes: ["truck"],
    vehicleTypes: ["truck"],
    shiftPreferences: ["evening", "night"],
    employmentType: "permanent",
    isVerified: true,
    internationalRoutes: true,
    membershipTier: "pro", // Driver Pro
    featured: true,
  },
  {
    id: 5,
    name: "Carlos Mendez",
    location: "Cologne, DE",
    experience: "4 years",
    licenseTypes: ["Class C", "Class B"],
    availability: "Immediate",
    rating: 4.6,
    skills: ["Urban delivery", "Light truck"],
    jobTypes: ["delivery", "rideshare", "courier"],
    vehicleTypes: ["van", "car"],
    shiftPreferences: ["weekend"],
    employmentType: "freelance",
    isVerified: false,
    internationalRoutes: false,
    membershipTier: "free", // Free tier
    featured: false,
  },
  {
    id: 6,
    name: "Emma Wilson",
    location: "Dresden, DE",
    experience: "6 years",
    licenseTypes: ["Class C", "Class CE"],
    availability: "2 weeks",
    rating: 4.7,
    skills: ["Long-haul", "Temperature controlled"],
    jobTypes: ["truck", "delivery"],
    vehicleTypes: ["truck"],
    shiftPreferences: ["morning", "afternoon"],
    employmentType: "permanent",
    isVerified: true,
    internationalRoutes: true,
    membershipTier: "plus", // Driver Plus
    featured: false,
  },
];

// Filter options
const EXPERIENCE_OPTIONS = ["Any", "0-2 years", "3-5 years", "5+ years", "10+ years"];
const LICENSE_OPTIONS = ["Class B", "Class C", "Class CE", "Class D"];
const AVAILABILITY_OPTIONS = ["Any", "Immediate", "Within 2 weeks", "Within a month"];
const JOB_TYPE_OPTIONS = [
  { id: "taxi", label: "Taxi Driver" },
  { id: "rideshare", label: "Rideshare" },
  { id: "delivery", label: "Delivery" },
  { id: "bus", label: "Bus Driver" },
  { id: "truck", label: "Truck Driver" },
  { id: "courier", label: "Courier" },
  { id: "chauffeur", label: "Chauffeur" },
  { id: "moving", label: "Moving Services" },
];
const VEHICLE_TYPE_OPTIONS = [
  { id: "car", label: "Car" },
  { id: "van", label: "Van" },
  { id: "bus", label: "Bus" },
  { id: "minibus", label: "Mini-Bus" },
  { id: "truck", label: "Truck" },
  { id: "motorbike", label: "Motorbike" },
  { id: "bicycle", label: "Bicycle" },
];
const SHIFT_OPTIONS = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
  { id: "night", label: "Night" },
  { id: "weekend", label: "Weekend" },
];
const EMPLOYMENT_OPTIONS = [
  { id: "permanent", label: "Permanent" },
  { id: "freelance", label: "Freelance" },
  { id: "either", label: "Either" },
];
const VERIFICATION_OPTIONS = [
  { id: "any", label: "Any" },
  { id: "verified", label: "Verified Only" },
];
const MEMBERSHIP_OPTIONS = [
  { id: "any", label: "Any" },
  { id: "plus", label: "Driver Plus & Pro" },
  { id: "pro", label: "Driver Pro Only" },
];
const INTERNATIONAL_OPTIONS = [
  { id: "any", label: "Any" },
  { id: "yes", label: "International Routes" },
  { id: "no", label: "Local Routes Only" },
];

const DriverSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    experience: "Any",
    license: "Any",
    availability: "Any",
    radius: [50],
    jobTypes: [],
    vehicleTypes: [],
    shiftPreferences: [],
    employmentType: "Any",
    verification: "any",
    international: "any",
    membershipTier: "any",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [drivers, setDrivers] = useState(MOCK_DRIVERS);

  const handleSearch = () => {
    // In a real application, this would call an API with the search query and filters
    let filteredDrivers = [...MOCK_DRIVERS];
    
    if (searchQuery) {
      filteredDrivers = filteredDrivers.filter(
        driver => 
          driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          driver.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          driver.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply filters
    if (filters.experience !== "Any") {
      filteredDrivers = filteredDrivers.filter(driver => {
        const years = parseInt(driver.experience);
        if (filters.experience === "0-2 years") return years < 3;
        if (filters.experience === "3-5 years") return years >= 3 && years <= 5;
        if (filters.experience === "5+ years") return years > 5;
        if (filters.experience === "10+ years") return years >= 10;
        return true;
      });
    }

    if (filters.license !== "Any") {
      filteredDrivers = filteredDrivers.filter(driver => 
        driver.licenseTypes.includes(filters.license)
      );
    }

    if (filters.availability !== "Any") {
      filteredDrivers = filteredDrivers.filter(driver => {
        if (filters.availability === "Immediate") return driver.availability === "Immediate";
        if (filters.availability === "Within 2 weeks") return ["Immediate", "2 weeks"].includes(driver.availability);
        if (filters.availability === "Within a month") return ["Immediate", "2 weeks", "1 month"].includes(driver.availability);
        return true;
      });
    }

    // Filter by job types
    if (filters.jobTypes.length > 0) {
      filteredDrivers = filteredDrivers.filter(driver => 
        filters.jobTypes.some(jobType => driver.jobTypes.includes(jobType))
      );
    }

    // Filter by vehicle types
    if (filters.vehicleTypes.length > 0) {
      filteredDrivers = filteredDrivers.filter(driver => 
        filters.vehicleTypes.some(vehicleType => driver.vehicleTypes.includes(vehicleType))
      );
    }

    // Filter by shift preferences
    if (filters.shiftPreferences.length > 0) {
      filteredDrivers = filteredDrivers.filter(driver => 
        filters.shiftPreferences.some(shift => driver.shiftPreferences.includes(shift))
      );
    }

    // Filter by employment type
    if (filters.employmentType !== "Any") {
      filteredDrivers = filteredDrivers.filter(driver => 
        driver.employmentType === filters.employmentType || driver.employmentType === "either"
      );
    }

    // Filter by verification status
    if (filters.verification === "verified") {
      filteredDrivers = filteredDrivers.filter(driver => driver.isVerified);
    }

    // Filter by international routes availability
    if (filters.international === "yes") {
      filteredDrivers = filteredDrivers.filter(driver => driver.internationalRoutes);
    } else if (filters.international === "no") {
      filteredDrivers = filteredDrivers.filter(driver => !driver.internationalRoutes);
    }

    // Filter by membership tier
    if (filters.membershipTier === "plus") {
      filteredDrivers = filteredDrivers.filter(driver => 
        driver.membershipTier === "plus" || driver.membershipTier === "pro"
      );
    } else if (filters.membershipTier === "pro") {
      filteredDrivers = filteredDrivers.filter(driver => driver.membershipTier === "pro");
    }

    // Sort to show featured profiles first
    filteredDrivers.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Secondary sort by tier
      const tierOrder = { pro: 0, plus: 1, free: 2 };
      return tierOrder[a.membershipTier] - tierOrder[b.membershipTier];
    });

    setDrivers(filteredDrivers);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleCheckboxChange = (field, id) => {
    setFilters(prev => {
      const updated = [...prev[field]];
      const index = updated.indexOf(id);
      
      if (index > -1) {
        updated.splice(index, 1);
      } else {
        updated.push(id);
      }
      
      return { ...prev, [field]: updated };
    });
  };

  const resetFilters = () => {
    setFilters({
      experience: "Any",
      license: "Any",
      availability: "Any",
      radius: [50],
      jobTypes: [],
      vehicleTypes: [],
      shiftPreferences: [],
      employmentType: "Any",
      verification: "any",
      international: "any",
      membershipTier: "any",
    });
  };
  
  // Renders a badge for membership tier
  const renderMembershipBadge = (tier) => {
    switch(tier) {
      case 'pro':
        return (
          <Badge className="bg-purple-600 text-white hover:bg-purple-700 flex items-center gap-1">
            <Award className="h-3 w-3" />
            Driver Pro
          </Badge>
        );
      case 'plus':
        return (
          <Badge className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Driver Plus
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-gray-600 flex items-center gap-1">
            Free Tier
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Find Drivers</h1>
        
        {/* Search bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search by name, location, or skills..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} className="w-full md:w-auto">
            Search
          </Button>
          <Button 
            variant="outline" 
            onClick={toggleFilters}
            className="w-full md:w-auto flex items-center gap-2"
          >
            <Filter className="h-4 w-4" /> 
            Filters
          </Button>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <Card className="mb-6 animate-in fade-in-50 duration-300">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Enhanced filters section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Experience</label>
                    <Select 
                      value={filters.experience}
                      onValueChange={(value) => setFilters({...filters, experience: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any experience" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXPERIENCE_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">License Type</label>
                    <Select 
                      value={filters.license}
                      onValueChange={(value) => setFilters({...filters, license: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any license" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Any">Any</SelectItem>
                        {LICENSE_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Availability</label>
                    <Select 
                      value={filters.availability}
                      onValueChange={(value) => setFilters({...filters, availability: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any availability" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABILITY_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* New filters for verification, international routes, and membership tier */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Verification Status</label>
                    <Select 
                      value={filters.verification}
                      onValueChange={(value) => setFilters({...filters, verification: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any verification status" />
                      </SelectTrigger>
                      <SelectContent>
                        {VERIFICATION_OPTIONS.map((option) => (
                          <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">International Routes</label>
                    <Select 
                      value={filters.international}
                      onValueChange={(value) => setFilters({...filters, international: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any route preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {INTERNATIONAL_OPTIONS.map((option) => (
                          <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Membership Tier</label>
                    <Select 
                      value={filters.membershipTier}
                      onValueChange={(value) => setFilters({...filters, membershipTier: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any membership tier" />
                      </SelectTrigger>
                      <SelectContent>
                        {MEMBERSHIP_OPTIONS.map((option) => (
                          <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Job Types */}
                <div>
                  <label className="block text-sm font-medium mb-2">Job Types</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {JOB_TYPE_OPTIONS.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`job-${option.id}`} 
                          checked={filters.jobTypes.includes(option.id)}
                          onCheckedChange={() => handleCheckboxChange('jobTypes', option.id)}
                        />
                        <label 
                          htmlFor={`job-${option.id}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vehicle Types */}
                <div>
                  <label className="block text-sm font-medium mb-2">Vehicle Types</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {VEHICLE_TYPE_OPTIONS.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`vehicle-${option.id}`} 
                          checked={filters.vehicleTypes.includes(option.id)}
                          onCheckedChange={() => handleCheckboxChange('vehicleTypes', option.id)}
                        />
                        <label 
                          htmlFor={`vehicle-${option.id}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shift Preferences */}
                <div>
                  <label className="block text-sm font-medium mb-2">Shift Preferences</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {SHIFT_OPTIONS.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`shift-${option.id}`} 
                          checked={filters.shiftPreferences.includes(option.id)}
                          onCheckedChange={() => handleCheckboxChange('shiftPreferences', option.id)}
                        />
                        <label 
                          htmlFor={`shift-${option.id}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Employment Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Employment Type</label>
                  <Select 
                    value={filters.employmentType}
                    onValueChange={(value) => setFilters({...filters, employmentType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any">Any</SelectItem>
                      {EMPLOYMENT_OPTIONS.map((option) => (
                        <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Distance Range */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">Max Distance (km)</label>
                    <span className="text-sm font-medium">{filters.radius[0]}km</span>
                  </div>
                  <Slider
                    defaultValue={filters.radius}
                    max={200}
                    step={10}
                    onValueChange={(value) => setFilters({...filters, radius: value})}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                    <span>150</span>
                    <span>200</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button variant="outline" className="mr-2" onClick={resetFilters}>Reset</Button>
                <Button onClick={handleSearch}>Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {drivers.length} drivers
        </p>
        
        {/* Results table */}
        <div className="rounded-md border mb-4 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>License Types</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow 
                  key={driver.id}
                  className={driver.featured ? "bg-purple-50 dark:bg-purple-900/10" : ""}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {driver.featured && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="mr-1.5">
                                <Sparkles className="h-4 w-4 text-yellow-500" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Featured Profile</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      {driver.name}
                    </div>
                    <div className="mt-1">
                      {renderMembershipBadge(driver.membershipTier)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" /> 
                      {driver.location}
                    </div>
                    {driver.internationalRoutes && (
                      <div className="flex items-center mt-1 text-xs text-blue-600">
                        <Globe className="h-3 w-3 mr-1" />
                        International routes
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Truck className="h-3.5 w-3.5 mr-1 text-muted-foreground" /> 
                      {driver.experience}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {driver.licenseTypes.map((license, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-secondary/10 text-secondary rounded-full px-2 py-0.5"
                        >
                          {license}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{driver.availability}</TableCell>
                  <TableCell>
                    {driver.isVerified ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1 fill-green-100" />
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Not verified</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 text-yellow-500 mr-1 fill-yellow-500" />
                      <span className="font-medium">{driver.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button size="sm">Contact</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default DriverSearch;
