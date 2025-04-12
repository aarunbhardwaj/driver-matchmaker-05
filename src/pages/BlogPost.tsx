
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  Calendar,
  ChevronLeft,
  MessageSquare,
  Share2,
  ThumbsUp,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Tag
} from "lucide-react";

// Mock data for a single blog post
const blogPost = {
  id: 1,
  title: "The Future of Logistics: How AI is Transforming Driver Matching",
  content: [
    `<p class="text-lg leading-relaxed mb-6">The logistics industry is undergoing a significant transformation as artificial intelligence (AI) technologies are increasingly integrated into various aspects of operations, particularly in driver matching and recruitment.</p>`,
    `<p class="leading-relaxed mb-6">For decades, the process of connecting qualified drivers with suitable logistics companies has been manual, time-consuming, and often inefficient. Hiring managers would spend hours sifting through applications, checking qualifications, and attempting to find drivers who matched not only the technical requirements of the job but also fit well with the company culture. Similarly, drivers seeking employment would spend considerable time applying to multiple companies without knowing if the positions truly matched their skills, preferences, and career goals.</p>`,
    `<h2 class="text-2xl font-bold mt-10 mb-4">The AI Revolution in Driver Matching</h2>`,
    `<p class="leading-relaxed mb-6">Enter AI-driven matching platforms like DriverMatch, which are revolutionizing how drivers and logistics companies connect. These intelligent systems utilize advanced algorithms, machine learning, and data analytics to create more precise, efficient, and satisfying matches between drivers and employers.</p>`,
    `<p class="leading-relaxed mb-6">Here's how AI is transforming the driver matching process:</p>`,
    `<h3 class="text-xl font-bold mt-8 mb-3">1. Intelligent Profile Analysis</h3>`,
    `<p class="leading-relaxed mb-6">AI systems can analyze driver profiles at a deeper level than traditional recruitment methods. Beyond basic qualifications like license types and years of experience, AI can identify patterns in a driver's work history, preferred routes, safety records, and even communication styles. This comprehensive analysis allows for more nuanced matching that considers both technical requirements and personal preferences.</p>`,
    `<h3 class="text-xl font-bold mt-8 mb-3">2. Predictive Matching</h3>`,
    `<p class="leading-relaxed mb-6">By analyzing historical data from thousands of successful driver-company relationships, AI platforms can predict which matches are likely to result in long-term satisfaction and retention. This predictive capability helps reduce turnover rates, which have traditionally been high in the logistics industry.</p>`,
    `<div class="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded-r-lg">
      <p class="italic text-lg">"AI doesn't just match drivers with jobs—it matches drivers with careers that align with their life goals and professional aspirations. That's why we're seeing a 45% increase in driver satisfaction and a 37% reduction in turnover when companies use our AI-powered platform."</p>
      <p class="mt-4 font-medium">— Maria Gonzalez, Chief Data Scientist at DriverMatch</p>
    </div>`,
    `<h3 class="text-xl font-bold mt-8 mb-3">3. Real-time Adaptation</h3>`,
    `<p class="leading-relaxed mb-6">Unlike static matching systems, AI platforms continuously learn and adapt based on feedback and outcomes. As drivers provide feedback on their experiences and companies rate driver performance, the matching algorithms become increasingly refined, leading to better matches over time.</p>`,
    `<img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800" class="w-full h-auto rounded-lg my-8" alt="AI technology illustration" />`,
    `<h3 class="text-xl font-bold mt-8 mb-3">4. Elimination of Bias</h3>`,
    `<p class="leading-relaxed mb-6">When properly designed, AI matching systems can help reduce human biases in the hiring process, focusing purely on qualifications, performance metrics, and compatibility factors. This creates a more equitable hiring environment and opens opportunities for drivers who might otherwise be overlooked.</p>`,
    `<h2 class="text-2xl font-bold mt-10 mb-4">Benefits for Drivers</h2>`,
    `<p class="leading-relaxed mb-6">For drivers, AI-powered matching platforms offer numerous advantages:</p>`,
    `<ul class="list-disc pl-6 space-y-2 mb-6">
      <li>Personalized job recommendations based on individual skills, experience, and preferences</li>
      <li>Reduced time spent applying for positions that aren't a good fit</li>
      <li>Access to opportunities that might not be advertised through traditional channels</li>
      <li>Transparency regarding company culture, routes, and expectations</li>
      <li>Career development pathways tailored to personal goals</li>
    </ul>`,
    `<h2 class="text-2xl font-bold mt-10 mb-4">Benefits for Logistics Companies</h2>`,
    `<p class="leading-relaxed mb-6">Logistics companies also realize significant benefits from AI-driven matching:</p>`,
    `<ul class="list-disc pl-6 space-y-2 mb-6">
      <li>Reduced time-to-hire, with some companies reporting 75% faster recruitment</li>
      <li>Higher quality matches leading to improved driver retention</li>
      <li>Cost savings from more efficient recruitment processes</li>
      <li>Access to a broader pool of qualified candidates</li>
      <li>Data-driven insights to improve company policies and driver satisfaction</li>
    </ul>`,
    `<h2 class="text-2xl font-bold mt-10 mb-4">The Road Ahead</h2>`,
    `<p class="leading-relaxed mb-6">As AI technology continues to evolve, we can expect even more sophisticated matching capabilities. Future developments may include:</p>`,
    `<ol class="list-decimal pl-6 space-y-2 mb-6">
      <li>Integration with IoT devices to incorporate real-time driving performance data</li>
      <li>Advanced sentiment analysis to better understand driver preferences and satisfaction</li>
      <li>Predictive analytics to forecast driver availability and company needs</li>
      <li>Virtual reality assessments to evaluate driver skills before formal interviews</li>
    </ol>`,
    `<p class="leading-relaxed mb-6">The logistics industry has always been essential to global commerce, but it faces challenges in driver recruitment and retention. AI-powered matching platforms are addressing these challenges head-on, creating more efficient connections between drivers and companies while improving satisfaction on both sides.</p>`,
    `<p class="text-lg font-medium mb-6">As this technology continues to mature, we can expect to see even more transformative changes in how the logistics workforce is organized and managed, ultimately leading to a more efficient and satisfying environment for everyone involved.</p>`,
  ].join(''),
  author: {
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Industry Analyst"
  },
  date: "April 5, 2024",
  readTime: "6 min read",
  tags: ["AI", "Logistics", "Technology", "Recruitment", "Driver Matching"],
  comments: [
    {
      id: 1,
      author: "Robert Chen",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "April 6, 2024",
      content: "Great article! As a logistics manager, I've seen firsthand how AI matching has improved our driver recruitment process. We've reduced time-to-hire by almost 60%."
    },
    {
      id: 2,
      author: "Maria Lopez",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      date: "April 6, 2024",
      content: "I'd be interested to know how these AI systems handle unique situations or special requirements that might not fit neatly into algorithm parameters. Is there still human oversight in the matching process?"
    },
    {
      id: 3,
      author: "James Wilson",
      avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      date: "April 7, 2024",
      content: "As someone who's been driving trucks for over 20 years, I was skeptical about AI matching, but I have to admit the job DriverMatch found for me is the best fit I've had in my career. The platform really did understand what I was looking for."
    }
  ],
  relatedPosts: [
    {
      id: 2,
      title: "5 Tips for Drivers to Improve Their Professional Profile",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600",
      date: "April 2, 2024"
    },
    {
      id: 6,
      title: "Tech Tools Every Logistics Manager Should Be Using",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600",
      date: "March 18, 2024"
    },
    {
      id: 3,
      title: "Navigating European Logistics Regulations in 2024",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600",
      date: "March 28, 2024"
    }
  ]
};

const BlogPost = () => {
  const { blogId } = useParams();
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleComment = () => {
    if (comment.trim()) {
      // In a real app, this would submit the comment to an API
      console.log("Comment submitted:", comment);
      setComment("");
      // Show success message or update comments list
    }
  };

  const handleShare = (platform: string) => {
    // In a real app, this would implement actual sharing functionality
    console.log(`Sharing to ${platform}`);
    setShowShareOptions(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Show success toast
    console.log("Link copied to clipboard");
    setShowShareOptions(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <div className="blog-container">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link to="/blog" className="flex items-center text-primary hover:underline">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Blog
            </Link>
          </div>
          
          {/* Post Header */}
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{blogPost.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {blogPost.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {blogPost.readTime}
              </div>
            </div>
            
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={blogPost.author.avatar} />
                <AvatarFallback>{blogPost.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{blogPost.author.name}</div>
                <div className="text-sm text-muted-foreground">{blogPost.author.role}</div>
              </div>
            </div>
          </header>
          
          {/* Post Content */}
          <article className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
          </article>
          
          {/* Tags */}
          <div className="mt-12 flex flex-wrap gap-2">
            {blogPost.tags.map((tag, index) => (
              <Link 
                key={index}
                to={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors flex items-center"
              >
                <Tag className="h-3.5 w-3.5 mr-1.5" />
                {tag}
              </Link>
            ))}
          </div>
          
          {/* Interaction Buttons */}
          <div className="flex items-center justify-between border-t border-b py-4 mt-8">
            <div className="flex items-center gap-4">
              <Button
                variant={liked ? "default" : "outline"}
                size="sm"
                className={`flex items-center gap-2 ${liked ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}`}
                onClick={() => setLiked(!liked)}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{liked ? "Liked" : "Like"}</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => window.location.href = "#comments"}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Comment</span>
              </Button>
              
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setShowShareOptions(!showShareOptions)}
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
                
                {showShareOptions && (
                  <div className="absolute top-full left-0 mt-2 p-2 bg-white shadow-lg rounded-md z-10 w-40 animate-fade-in">
                    <button 
                      className="flex items-center gap-2 hover:bg-primary/5 p-2 rounded w-full text-left"
                      onClick={() => handleShare("facebook")}
                    >
                      <Facebook className="h-4 w-4" />
                      <span>Facebook</span>
                    </button>
                    <button 
                      className="flex items-center gap-2 hover:bg-primary/5 p-2 rounded w-full text-left"
                      onClick={() => handleShare("twitter")}
                    >
                      <Twitter className="h-4 w-4" />
                      <span>Twitter</span>
                    </button>
                    <button 
                      className="flex items-center gap-2 hover:bg-primary/5 p-2 rounded w-full text-left"
                      onClick={() => handleShare("linkedin")}
                    >
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </button>
                    <button 
                      className="flex items-center gap-2 hover:bg-primary/5 p-2 rounded w-full text-left"
                      onClick={handleCopyLink}
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy Link</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          <section id="comments" className="mt-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Comments ({blogPost.comments.length})
            </h3>
            
            <div className="space-y-6 mb-8">
              {blogPost.comments.map(comment => (
                <div key={comment.id} className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{comment.author}</div>
                      <div className="text-xs text-muted-foreground">{comment.date}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{comment.content}</p>
                </div>
              ))}
            </div>
            
            {/* Comment Form */}
            <div className="bg-muted/30 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-4">Leave a Comment</h4>
              <Textarea 
                placeholder="Share your thoughts..." 
                className="mb-4" 
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={handleComment} disabled={!comment.trim()}>
                Post Comment
              </Button>
            </div>
          </section>
          
          {/* Related Posts */}
          <section className="mt-16">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPost.relatedPosts.map(post => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.id}`} 
                  className="blog-card hover-scale"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/600x400/primary/white?text=Related+Post";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
                    <h4 className="font-semibold">{post.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
