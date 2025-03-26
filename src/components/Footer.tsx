
import { Truck, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Truck className="h-8 w-8" />
              <span className="font-bold text-xl tracking-tight">DriverMatch</span>
            </div>
            
            <p className="text-secondary-foreground/80 mb-6">
              Connecting qualified drivers with the right logistics companies through intelligent matching.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#for-drivers" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  For Drivers
                </a>
              </li>
              <li>
                <a href="#for-companies" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  For Companies
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5 mr-3 text-primary" />
                <span className="text-secondary-foreground/80">
                  123 Logistics Way, Transport City, TC 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 shrink-0 mr-3 text-primary" />
                <a href="tel:+11234567890" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 shrink-0 mr-3 text-primary" />
                <a href="mailto:contact@drivermatch.com" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  contact@drivermatch.com
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-secondary-foreground/80 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded-lg bg-secondary-foreground/10 border border-secondary-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-secondary-foreground/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-foreground/70 text-sm">
            © {currentYear} DriverMatch. All rights reserved.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
