
import { useState } from "react";
import { CompanyHeader } from "@/components/CompanyHeader";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  BookOpen,
  PlusCircle,
  Clock,
  Filter,
  Search,
  ChevronDown,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  BarChart3,
  TrendingUp,
  FileText
} from "lucide-react";

// Mock data for company blog analytics
const blogAnalytics = {
  views: 8734,
  viewsTrend: "+12%",
  articles: 24,
  articlesTrend: "+3",
  engagement: "9.7%",
  engagementTrend: "+1.2%",
  topPerformer: {
    title: "How We Reduced Driver Turnover by 35% in 6 Months",
    views: 2145,
    engagement: "12.3%"
  }
};

// Mock data for company blog posts
const companyArticles = [
  {
    id: 201,
    title: "How We Reduced Driver Turnover by 35% in 6 Months",
    status: "published",
    author: "Jane Smith, HR Director",
    date: "April 2, 2024",
    views: 2145,
    likes: 186,
    comments: 32
  },
  {
    id: 202,
    title: "Implementing Green Logistics: Our Journey to Carbon Neutrality",
    status: "published",
    author: "Thomas Weber, Sustainability Lead",
    date: "March 20, 2024",
    views: 1862,
    likes: 142,
    comments: 27
  },
  {
    id: 203,
    title: "Announcing Our New Driver Wellness Program",
    status: "draft",
    author: "Sarah Reynolds, Operations Manager",
    date: "April 5, 2024",
    lastEdited: "April 8, 2024"
  },
  {
    id: 204,
    title: "The Technology Driving Our Fleet Forward",
    status: "published",
    author: "Michael Chen, IT Director",
    date: "March 15, 2024",
    views: 1548,
    likes: 94,
    comments: 16
  },
  {
    id: 205,
    title: "Q2 Logistics Industry Outlook",
    status: "draft",
    author: "Robert Alvarez, Strategy Director",
    date: "April 7, 2024",
    lastEdited: "April 10, 2024"
  }
];

// Mock data for industry articles worth sharing
const industryArticles = [
  {
    id: 1,
    title: "The Future of Logistics: How AI is Transforming Driver Matching",
    source: "DriverMatch Blog",
    date: "April 5, 2024",
    shared: false
  },
  {
    id: 3,
    title: "Navigating European Logistics Regulations in 2024",
    source: "European Transport Weekly",
    date: "March 28, 2024",
    shared: true
  },
  {
    id: 4,
    title: "The Rise of Green Logistics: Impact on Driver Demand",
    source: "Sustainable Supply Chain Magazine",
    date: "March 25, 2024",
    shared: false
  }
];

const CompanyBlogDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("analytics");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);
  const [sharedArticles, setSharedArticles] = useState<number[]>(
    industryArticles.filter(article => article.shared).map(article => article.id)
  );

  const handleDeleteConfirm = () => {
    console.log("Deleting article:", articleToDelete);
    // In a real app, this would call an API to delete the article
    setDeleteDialogOpen(false);
    setArticleToDelete(null);
  };

  const openDeleteDialog = (articleId: number) => {
    setArticleToDelete(articleId);
    setDeleteDialogOpen(true);
  };
  
  const handleShareToggle = (articleId: number) => {
    if (sharedArticles.includes(articleId)) {
      setSharedArticles(sharedArticles.filter(id => id !== articleId));
    } else {
      setSharedArticles([...sharedArticles, articleId]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Company Blog Management</h1>
            <p className="text-muted-foreground">Publish content, share insights, and track engagement</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search articles..." 
                className="pl-9 w-[180px] md:w-[280px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button asChild>
              <Link to="/company-blog-new">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Article
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="analytics" className="space-y-6" onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="industry">Industry News</TabsTrigger>
          </TabsList>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Article Views</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{blogAnalytics.views.toLocaleString()}</div>
                    <div className="flex items-center text-green-500 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {blogAnalytics.viewsTrend}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Published Articles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{blogAnalytics.articles}</div>
                    <div className="flex items-center text-green-500 text-sm">
                      {blogAnalytics.articlesTrend}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Engagement Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{blogAnalytics.engagement}</div>
                    <div className="flex items-center text-green-500 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {blogAnalytics.engagementTrend}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Content Calendar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-sm text-muted-foreground">Scheduled articles</div>
                    <Button size="sm" variant="link" className="p-0 mt-1 h-auto justify-start" asChild>
                      <Link to="#">View calendar</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Article views over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="w-full h-full bg-muted/20 rounded-md flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted" />
                    <span className="sr-only">Chart showing article views over time</span>
                    {/* In a real app, this would be a chart component */}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Content</CardTitle>
                  <CardDescription>Most viewed and engaged with articles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold truncate">{blogAnalytics.topPerformer.title}</h3>
                      <div className="flex justify-between mt-2 mb-1">
                        <span className="text-sm text-muted-foreground">Views</span>
                        <span className="font-medium">{blogAnalytics.topPerformer.views.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      
                      <div className="flex justify-between mt-3 mb-1">
                        <span className="text-sm text-muted-foreground">Engagement</span>
                        <span className="font-medium">{blogAnalytics.topPerformer.engagement}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="#">View All Analytics</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Content Strategy Insights</CardTitle>
                <CardDescription>AI-powered recommendations based on your audience engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                      Trending Topics
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on your audience engagement, articles about "driver retention strategies" and "sustainable logistics" 
                      are performing 45% better than other content. Consider creating more content in these areas.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-amber-500" />
                      Optimal Posting Times
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your content receives the most engagement when published on Tuesday mornings (8-10 AM) and Thursday afternoons (2-4 PM).
                      Consider scheduling your next articles during these times.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                      Engagement Opportunities
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Articles with case studies and real examples receive 3x more comments. Include more practical examples in your content to increase reader engagement.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Articles Tab */}
          <TabsContent value="articles">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Company Articles</CardTitle>
                  <Button asChild>
                    <Link to="/company-blog-new">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      New Article
                    </Link>
                  </Button>
                </div>
                <CardDescription>
                  Manage all articles created by your company
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                  <div className="flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter by Status
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>All Articles</DropdownMenuItem>
                        <DropdownMenuItem>Published</DropdownMenuItem>
                        <DropdownMenuItem>Draft</DropdownMenuItem>
                        <DropdownMenuItem>Scheduled</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="text" 
                      placeholder="Search articles..." 
                      className="pl-9 w-full md:w-[280px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%]">Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden md:table-cell">Performance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companyArticles
                      .filter(article => 
                        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (article.author && article.author.toLowerCase().includes(searchTerm.toLowerCase()))
                      )
                      .map((article) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium">{article.title}</TableCell>
                          <TableCell>{article.author}</TableCell>
                          <TableCell>
                            {article.status === "published" ? (
                              <Badge className="bg-green-500/80">Published</Badge>
                            ) : (
                              <Badge variant="outline">Draft</Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {article.status === "published" ? article.date : (
                              <div className="text-xs text-muted-foreground">
                                <div>Created: {article.date}</div>
                                <div>Last edited: {article.lastEdited}</div>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {article.status === "published" ? (
                              <div className="flex items-center gap-3">
                                <span className="flex items-center text-muted-foreground text-xs">
                                  <Eye className="h-3.5 w-3.5 mr-1" />
                                  {article.views}
                                </span>
                                <span className="flex items-center text-muted-foreground text-xs">
                                  <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                  {article.likes}
                                </span>
                                <span className="flex items-center text-muted-foreground text-xs">
                                  <MessageSquare className="h-3.5 w-3.5 mr-1" />
                                  {article.comments}
                                </span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" asChild>
                                <Link to={`/company-blog-edit/${article.id}`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => openDeleteDialog(article.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                              {article.status === "published" && (
                                <Button variant="ghost" size="icon" asChild>
                                  <Link to={`/blog/${article.id}`}>
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    
                    {companyArticles.filter(article => 
                      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (article.author && article.author.toLowerCase().includes(searchTerm.toLowerCase()))
                    ).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                          <p className="text-muted-foreground">
                            {searchTerm ? `No articles matching "${searchTerm}" found.` : "No articles have been created yet."}
                          </p>
                          <Button className="mt-4" asChild>
                            <Link to="/company-blog-new">Create Your First Article</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Content Calendar</CardTitle>
                  <CardDescription>Upcoming scheduled articles</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="px-6 py-4 border-b">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">Announcing Our New Driver Wellness Program</h4>
                      <Badge>Apr 15</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">By Sarah Reynolds, Operations Manager</p>
                  </div>
                  <div className="px-6 py-4 border-b">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">Q2 Logistics Industry Outlook</h4>
                      <Badge>Apr 22</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">By Robert Alvarez, Strategy Director</p>
                  </div>
                  <div className="px-6 py-6 text-center">
                    <Button variant="outline" asChild>
                      <Link to="#">View Full Calendar</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Content Guidelines</CardTitle>
                  <CardDescription>Resources for creating effective articles</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="px-6 py-4 border-b flex gap-3">
                    <FileText className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Company Voice Guidelines</h4>
                      <p className="text-sm text-muted-foreground">
                        Learn how to maintain our brand voice in all content
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-b flex gap-3">
                    <FileText className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Article Templates</h4>
                      <p className="text-sm text-muted-foreground">
                        Download templates for different article formats
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-4 flex gap-3">
                    <FileText className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">SEO Best Practices</h4>
                      <p className="text-sm text-muted-foreground">
                        Optimize your content for better visibility
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Industry News Tab */}
          <TabsContent value="industry">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Industry News & Insights</CardTitle>
                  <CardDescription>Share relevant industry content on your company profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {industryArticles.map((article) => (
                      <div key={article.id} className="flex gap-4 border-b last:border-0 pb-6 last:pb-0">
                        <div className="w-full">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{article.title}</h3>
                            <Button 
                              variant={sharedArticles.includes(article.id) ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleShareToggle(article.id)}
                              className="whitespace-nowrap ml-4"
                            >
                              {sharedArticles.includes(article.id) ? "Shared" : "Share"}
                            </Button>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <span className="font-medium">{article.source}</span>
                            <span className="mx-2">•</span>
                            <span>{article.date}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/blog/${article.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                Read Article
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Content Recommendations</CardTitle>
                  <CardDescription>Topics your audience may be interested in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-1">Sustainable Logistics Practices</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Content about sustainability is trending in your industry.
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        Create Article
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-1">Driver Wellness Programs</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Companies showcasing wellness initiatives see higher engagement.
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        Create Article
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-1">Technology Integration</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Share how your company uses technology to improve operations.
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        Create Article
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-3">Trending Industry Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-primary/5">Electric Vehicles</Badge>
                      <Badge variant="outline" className="bg-primary/5">Last-Mile Delivery</Badge>
                      <Badge variant="outline" className="bg-primary/5">AI in Logistics</Badge>
                      <Badge variant="outline" className="bg-primary/5">Supply Chain Resilience</Badge>
                      <Badge variant="outline" className="bg-primary/5">Driver Shortage</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this article? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete Article
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyBlogDashboard;
