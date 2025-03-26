
import { CheckCircle, BarChart3, Zap, Award, Users, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Smart Matching Algorithm",
    description: "Our AI-powered system connects drivers with the right opportunities based on qualifications, experience, and preferences.",
    icon: Zap,
  },
  {
    title: "Streamlined Hiring",
    description: "Reduce time-to-hire by up to 75% with our efficient screening and matching process.",
    icon: BarChart3,
  },
  {
    title: "Verified Profiles",
    description: "All driver profiles are verified and include background checks for your peace of mind.",
    icon: Shield,
  },
  {
    title: "Skilled Driver Network",
    description: "Access a growing community of professional drivers with specialized logistics expertise.",
    icon: Users,
  },
  {
    title: "Quality Assurance",
    description: "Our rating system ensures accountability and high standards for both drivers and companies.",
    icon: Award,
  },
  {
    title: "Compliance Management",
    description: "Stay on top of industry regulations with our built-in compliance tracking features.",
    icon: CheckCircle,
  },
];

export function Features() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How DriverMatch Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform streamlines the logistics recruitment process with advanced technology and industry expertise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass p-8 rounded-xl hover-lift hover:glass-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
