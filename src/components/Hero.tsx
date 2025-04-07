
import { ArrowRight, Truck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustedCompanies } from "@/components/TrustedCompanies";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

export function Hero() {
  const testimonials = [
    {
      image: "/images/driver-testimonial-1.jpg",
      name: "Michael Schmidt",
      role: "Truck Driver",
      company: "Joined via DriverMatch",
      quote: "DriverMatch helped me find a job that aligns with my schedule and pays 20% more than my previous position."
    },
    {
      image: "/images/company-testimonial-1.jpg",
      name: "Sarah Anderson",
      role: "Recruitment Manager",
      company: "Fast Freight Europe",
      quote: "We've reduced our driver hiring time by 65% since using DriverMatch's intelligent matching system."
    },
    {
      image: "/images/driver-testimonial-2.jpg",
      name: "Thomas Weber",
      role: "Delivery Driver",
      company: "Joined via DriverMatch",
      quote: "The platform matched me with a company that offers the perfect work-life balance I was looking for."
    },
    {
      image: "/images/company-testimonial-2.jpg",
      name: "Jennifer Rogers",
      role: "Operations Director",
      company: "Express Logistics",
      quote: "DriverMatch's vetting process ensures we only interview qualified drivers, saving us countless hours."
    }
  ];

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 gradient-bg">
        <div className="saatosa-blob h-72 w-72 bg-purple-400/30 -top-20 -left-20 animate-float"></div>
        <div className="saatosa-blob h-96 w-96 bg-blue-400/20 top-40 right-0 animate-float animation-delay-1000"></div>
        <div className="saatosa-blob h-64 w-64 bg-pink-400/20 bottom-20 left-20 animate-float animation-delay-2000"></div>
      </div>
      
      <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
          The Smarter Way to Connect <span className="gradient-text">Drivers</span> with <span className="gradient-text">Logistics Companies</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
          DriverMatch uses intelligent matching to pair qualified drivers with the right logistics companies, 
          streamlining the hiring process for everyone involved.
        </p>
        
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Button size="lg" className="group gap-2 rounded-full hover-lift text-lg px-8 py-6 shadow-md" asChild>
            <Link to="/driver-registration">
              <User className="h-5 w-5" />
              <span>I'm a Driver</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 ml-1" />
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" className="group gap-2 bg-white hover-lift text-lg px-8 py-6 rounded-full shadow-sm" asChild>
            <Link to="/company-registration">
              <Truck className="h-5 w-5" />
              <span>I'm a Company</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 ml-1" />
            </Link>
          </Button>
        </div>
        
        <div className="pt-16">
          <TrustedCompanies />
        </div>

        {/* Testimonial Carousel */}
        <div className="pt-16 w-full">
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 p-2">
                  <div className="saatosa-card p-6 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-sm">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://placehold.co/200x200/primary/white?text=DM";
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-base">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                    <p className="italic text-muted-foreground">{testimonial.quote}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex">
              <CarouselPrevious className="ml-0 -left-4 bg-white/80 backdrop-blur-sm shadow-md" />
              <CarouselNext className="mr-0 -right-4 bg-white/80 backdrop-blur-sm shadow-md" />
            </div>
          </Carousel>
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
