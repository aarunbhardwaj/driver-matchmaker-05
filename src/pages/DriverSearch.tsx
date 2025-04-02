
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
import { Search, Filter, MapPin, Truck, Star, Download } from "lucide-react";

// Mock data for drivers
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
  },
];

// Filter options
const EXPERIENCE_OPTIONS = ["Any", "0-2 years", "3-5 years", "5+ years", "10+ years"];
const LICENSE_OPTIONS = ["Class B", "Class C", "Class CE", "Class D"];
const AVAILABILITY_OPTIONS = ["Any", "Immediate", "Within 2 weeks", "Within a month"];

const DriverSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    experience: "Any",
    license: "Any",
    availability: "Any",
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

    setDrivers(filteredDrivers);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
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
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" className="mr-2">Reset</Button>
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
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium">{driver.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" /> 
                      {driver.location}
                    </div>
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
