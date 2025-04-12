
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Clock,
  Search,
  Tag,
  ChevronRight,
  Filter,
  ArrowRight
} from "lucide-react";

// Mock blog data
const featuredPost = {
  id: 1,
  title: "The Future of Logistics: How AI is Transforming Driver Matching",
  excerpt: "Discover how artificial intelligence is revolutionizing the way drivers and logistics companies connect, leading to more efficient operations and better job matches.",
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  author: "Sarah Johnson",
  date: "April 5, 2024",
  readTime: "6 min read",
  tags: ["AI", "Logistics", "Technology"]
};

const blogPosts = [
  {
    id: 2,
    title: "5 Tips for Drivers to Improve Their Professional Profile",
    excerpt: "Stand out from the crowd with these essential tips for creating a professional driver profile that catches employers' attention.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600",
    author: "Michael Rodriguez",
    date: "April 2, 2024",
    readTime: "4 min read",
    tags: ["Career Tips", "Professional Development"]
  },
  {
    id: 3,
    title: "Navigating European Logistics Regulations in 2024",
    excerpt: "Stay compliant with the latest regulatory changes affecting logistics companies and drivers across Europe.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600",
    author: "Emma Weber",
    date: "March 28, 2024",
    readTime: "8 min read",
    tags: ["Regulations", "Compliance", "EU"]
  },
  {
    id: 4,
    title: "The Rise of Green Logistics: Impact on Driver Demand",
    excerpt: "How sustainability initiatives are changing the skills and certifications drivers need in today's evolving market.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600",
    author: "Thomas Bergmann",
    date: "March 25, 2024",
    readTime: "5 min read",
    tags: ["Sustainability", "Green Logistics", "Skills Development"]
  },
  {
    id: 5,
    title: "Work-Life Balance: Managing Long Hauls and Home Life",
    excerpt: "Practical strategies for professional drivers to maintain a healthy balance between demanding routes and family commitments.",
    image: "https://images.unsplash.com/photo-1580177092247-7a6ef19dd20e?w=600",
    author: "Sophia Martinez",
    date: "March 22, 2024",
    readTime: "7 min read",
    tags: ["Wellness", "Work-Life Balance", "Driver Health"]
  },
  {
    id: 6,
    title: "Tech Tools Every Logistics Manager Should Be Using",
    excerpt: "From route optimization to driver communication apps, these tools are revolutionizing how logistics companies operate.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600",
    author: "David Chen",
    date: "March 18, 2024",
    readTime: "6 min read",
    tags: ["Technology", "Management", "Efficiency"]
  }
];

const categories = [
  { name: "Technology", count: 12 },
  { name: "Industry News", count: 8 },
  { name: "Career Tips", count: 15 },
  { name: "Regulations", count: 9 },
  { name: "Sustainability", count: 6 },
  { name: "Driver Wellness", count: 10 }
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || 
                          post.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary/5 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">DriverMatch Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tips, and industry news for drivers and logistics companies in the modern transportation landscape.
          </p>
          
          <div className="mt-8 max-w-lg mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search articles..."
              className="pl-10 py-6 text-lg rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Featured Article */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
            <div className="blog-card animate-fade-in">
              <Link to={`/blog/${featuredPost.id}`} className="group">
                <div className="md:flex">
                  <div className="md:w-1/2 h-64 md:h-auto">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/800x400/primary/white?text=Featured+Post";
                      }}
                    />
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-4 text-sm text-muted-foreground">
                        <span>{featuredPost.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredPost.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{featuredPost.author}</span>
                      <Button variant="link" className="flex items-center p-0 group-hover:text-primary">
                        Read more
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
          
          <div className="md:flex md:gap-8">
            {/* Main Content */}
            <div className="md:w-2/3">
              {/* Filter Section */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <div className="hidden md:flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="mr-3">Filter by:</span>
                  <select 
                    className="border rounded-md px-3 py-1.5"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <div 
                      key={post.id} 
                      className="blog-card animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Link to={`/blog/${post.id}`} className="group">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://placehold.co/600x400/primary/white?text=Blog+Post";
                            }}
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center mb-3 text-sm text-muted-foreground">
                            <span>{post.date}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 2).map((tag, index) => (
                              <span 
                                key={index}
                                className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs font-medium">
                                +{post.tags.length - 2} more
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">{post.author}</span>
                            <Button variant="ghost" size="sm" className="flex items-center p-0 group-hover:text-primary">
                              Read more
                              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-xl text-muted-foreground">No articles found matching your search.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("");
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
              
              {filteredPosts.length > 0 && (
                <div className="mt-12 text-center">
                  <Button size="lg">
                    Load More Articles
                  </Button>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="md:w-1/3 mt-12 md:mt-0">
              <div className="saatosa-card p-6 sticky top-24">
                {/* Mobile Filter */}
                <div className="md:hidden mb-6">
                  <h3 className="text-lg font-bold mb-3">Filter Articles</h3>
                  <select 
                    className="border rounded-md px-3 py-2 w-full"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Categories */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    Categories
                  </h3>
                  <ul className="space-y-2">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <button 
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left hover:bg-primary/5 transition-colors ${
                            selectedCategory === category.name ? 'bg-primary/10 text-primary font-medium' : ''
                          }`}
                          onClick={() => setSelectedCategory(
                            selectedCategory === category.name ? "" : category.name
                          )}
                        >
                          <span>{category.name}</span>
                          <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                            {category.count}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Popular Posts */}
                <div>
                  <h3 className="text-lg font-bold mb-3">Popular Posts</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <Link 
                        key={post.id} 
                        to={`/blog/${post.id}`} 
                        className="flex items-start gap-3 group"
                      >
                        <div className="w-16 h-16 flex-shrink-0">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover rounded-md"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://placehold.co/100x100/primary/white?text=Post";
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <Button variant="link" className="flex items-center mt-4" asChild>
                    <Link to="/blog/categories">
                      View all categories
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <section className="mt-16 bg-primary/5 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Stay Updated with DriverMatch</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest industry insights, driver tips, and logistics news.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow py-6"
              />
              <Button size="lg">Subscribe</Button>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
