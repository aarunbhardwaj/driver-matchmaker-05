
import { cn } from "@/lib/utils";

// Array of trusted logistics companies with their logos
const companies = [
  {
    name: "DHL",
    logo: "/logos/dhl-logo.svg",
  },
  {
    name: "DB Schenker",
    logo: "/logos/db-schenker-logo.svg",
  },
  {
    name: "Uber Freight",
    logo: "/logos/uber-freight-logo.svg",
  },
  {
    name: "Maersk",
    logo: "/logos/maersk-logo.svg",
  },
  {
    name: "DSV",
    logo: "/logos/dsv-logo.svg",
  }
];

export function TrustedCompanies() {
  return (
    <div className="w-full">
      <p className="text-sm text-muted-foreground mb-6">Trusted by industry leaders</p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {companies.map((company) => (
          <div 
            key={company.name}
            className="flex items-center justify-center h-12"
          >
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
