
import React from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Filter,
  Tag,
  Truck,
  BookOpen,
  HardHat,
  Warehouse,
  FileText,
  Heart,
  Globe,
  BarChart,
  BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Categories with additional metadata
const categories = [
  { 
    name: "Technology", 
    count: 12, 
    icon: <BookOpen className="h-5 w-5" />,
    description: "The latest technological advancements in logistics and transportation",
    featuredPost: {
      id: 1,
      title: "The Future of Logistics: How AI is Transforming Driver Matching",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600"
    }
  },
  { 
    name: "Industry News", 
    count: 8, 
    icon: <Globe className="h-5 w-5" />,
    description: "Breaking news and developments in the logistics and transportation sector",
    featuredPost: {
      id: 3,
      title: "Navigating European Logistics Regulations in 2024",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600"
    }
  },
  { 
    name: "Career Tips", 
    count: 15, 
    icon: <BadgeCheck className="h-5 w-5" />,
    description: "Advice and guidance for drivers looking to advance their careers",
    featuredPost: {
      id: 2,
      title: "5 Tips for Drivers to Improve Their Professional Profile",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600"
    }
  },
  { 
    name: "Regulations", 
    count: 9, 
    icon: <FileText className="h-5 w-5" />,
    description: "Stay informed about changing regulations affecting drivers and companies",
    featuredPost: {
      id: 3,
      title: "Navigating European Logistics Regulations in 2024",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600"
    }
  },
  { 
    name: "Sustainability", 
    count: 6, 
    icon: <Truck className="h-5 w-5" />,
    description: "Green initiatives and environmental practices in modern logistics",
    featuredPost: {
      id: 4,
      title: "The Rise of Green Logistics: Impact on Driver Demand",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600"
    }
  },
  { 
    name: "Driver Wellness", 
    count: 10, 
    icon: <Heart className="h-5 w-5" />,
    description: "Health, wellness, and work-life balance for professional drivers",
    featuredPost: {
      id: 5,
      title: "Work-Life Balance: Managing Long Hauls and Home Life",
      image: "https://images.unsplash.com/photo-1580177092247-7a6ef19dd20e?w=600"
    }
  },
  { 
    name: "Safety", 
    count: 7, 
    icon: <HardHat className="h-5 w-5" />,
    description: "Best practices and tips for maintaining safety on the road",
    featuredPost: {
      id: 2,
      title: "5 Tips for Drivers to Improve Their Professional Profile",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600"
    }
  },
  { 
    name: "Management", 
    count: 5, 
    icon: <BarChart className="h-5 w-5" />,
    description: "Strategies for effective logistics and fleet management",
    featuredPost: {
      id: 6,
      title: "Tech Tools Every Logistics Manager Should Be Using",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600"
    }
  },
  { 
    name: "Warehouse", 
    count: 4, 
    icon: <Warehouse className="h-5 w-5" />,
    description: "Innovations and best practices in warehouse operations",
    featuredPost: {
      id: 6,
      title: "Tech Tools Every Logistics Manager Should Be Using",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600"
    }
  }
];

// Popular tags
const tags = [
  { name: "AI", count: 8 },
  { name: "Logistics", count: 15 },
  { name: "Driver Safety", count: 7 },
  { name: "Technology", count: 12 },
  { name: "EU Regulations", count: 6 },
  { name: "Career Growth", count: 9 },
  { name: "Work-Life Balance", count: 5 },
  { name: "Electric Vehicles", count: 4 },
  { name: "Supply Chain", count: 7 },
  { name: "Driver Health", count: 6 },
  { name: "Automation", count: 5 },
  { name: "Route Optimization", count: 4 }
];

const BlogCategories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary/5 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Blog Categories & Tags</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse our articles by topic to find insights on logistics, driving careers, and industry trends.
          </p>
        </div>
      </section>
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Categories Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Browse by Category
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <div 
                  key={category.name}
                  className="blog-card hover-scale overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="relative h-48 overflow-hidden">
                      {category.featuredPost && (
                        <img 
                          src={category.featuredPost.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://placehold.co/600x400/primary/white?text=Category";
                          }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <div className="text-white">
                          <div className="flex items-center mb-2">
                            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                              {category.icon}
                            </div>
                            <h3 className="text-xl font-bold">{category.name}</h3>
                          </div>
                          <div className="text-sm text-white/80">{category.count} articles</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
          
          {/* Tags Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              Popular Tags
            </h2>
            
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <Link 
                  key={tag.name}
                  to={`/blog/tags/${tag.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between bg-muted px-3 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors group"
                >
                  <span className="font-medium">{tag.name}</span>
                  <span className="bg-white text-muted-foreground text-xs px-2 py-0.5 rounded-full ml-2 group-hover:bg-white">
                    {tag.count}
                  </span>
                </Link>
              ))}
            </div>
            
            {/* Popular Topics */}
            <div className="mt-12 bg-accent/20 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Popular Topics</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/blog/tags/ai">
                    <BookOpen className="h-4 w-4 mr-2" />
                    AI & Technology
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/blog/category/career-tips">
                    <BadgeCheck className="h-4 w-4 mr-2" />
                    Career Development
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/blog/category/safety">
                    <HardHat className="h-4 w-4 mr-2" />
                    Driver Safety
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/blog/category/regulations">
                    <FileText className="h-4 w-4 mr-2" />
                    Regulations
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogCategories;
