
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { DriverSection } from "@/components/DriverSection";
import { CompanySection } from "@/components/CompanySection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <DriverSection />
      <CompanySection />
      <Footer />
    </div>
  );
};

export default Index;
