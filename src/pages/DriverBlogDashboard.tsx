
import { useState } from "react";
import { DriverHeader } from "@/components/DriverHeader";
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
  AlertCircle
} from "lucide-react";

// Mock data for saved and bookmarked articles
const savedArticles = [
  {
    id: 1,
    title: "The Future of Logistics: How AI is Transforming Driver Matching",
    excerpt: "Discover how artificial intelligence is revolutionizing the way drivers and logistics companies connect...",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
    author: "Sarah Johnson",
    date: "April 5, 2024",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "Navigating European Logistics Regulations in 2024",
    excerpt: "Stay compliant with the latest regulatory changes affecting logistics companies and drivers...",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600",
    author: "Emma Weber",
    date: "March 28, 2024",
    readTime: "8 min read"
  },
  {
    id: 5,
    title: "Work-Life Balance: Managing Long Hauls and Home Life",
    excerpt: "Practical strategies for professional drivers to maintain a healthy balance between...",
    image: "https://images.unsplash.com/photo-1580177092247-7a6ef19dd20e?w=600",
    author: "Sophia Martinez",
    date: "March 22, 2024",
    readTime: "7 min read"
  }
];

// Mock data for driver's contributed articles
const contributedArticles = [
  {
    id: 101,
    title: "My Experience as a Long-Haul Driver in Eastern Europe",
    status: "published",
    date: "April 1, 2024",
    views: 284,
    likes: 37,
    comments: 8
  },
  {
    id: 102,
    title: "Tips for Staying Healthy on the Road",
    status: "draft",
    date: "March 25, 2024",
    lastEdited: "April 2, 2024"
  },
  {
    id: 103,
    title: "How I Found My Perfect Logistics Company with DriverMatch",
    status: "published",
    date: "February 18, 2024",
    views: 1056,
    likes: 124,
    comments: 23
  }
];

// Mock data for recommended articles
const recommendedArticles = [
  {
    id: 2,
    title: "5 Tips for Drivers to Improve Their Professional Profile",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600",
    date: "April 2, 2024",
    readTime: "4 min read"
  },
  {
    id: 4,
    title: "The Rise of Green Logistics: Impact on Driver Demand",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600",
    date: "March 25, 2024",
    readTime: "5 min read"
  },
  {
    id: 6,
    title: "Tech Tools Every Driver Should Master",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600",
    date: "March 18, 2024",
    readTime: "6 min read"
  }
];

const DriverBlogDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("bookmarks");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);

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

  return (
    <div className="min-h-screen bg-background">
      <DriverHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Blog Dashboard</h1>
            <p className="text-muted-foreground">Manage your saved articles and contributions</p>
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
              <Link to="/driver-blog-new">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Article
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="bookmarks" className="space-y-6" onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            <TabsTrigger value="my-articles">My Articles</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>
          
          {/* Bookmarked Articles */}
          <TabsContent value="bookmarks" className="space-y-5">
            {searchTerm && (
              <div className="text-sm text-muted-foreground mb-4">
                Showing results for "{searchTerm}"
              </div>
            )}
            
            {savedArticles
              .filter(article => 
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((article, index) => (
                <Card key={article.id} className="overflow-hidden animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="md:flex">
                    <div className="md:w-1/4 h-48 md:h-auto">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/600x400/primary/white?text=Article";
                        }}
                      />
                    </div>
                    <div className="p-6 md:w-3/4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{article.readTime}</span>
                          <span className="mx-2">•</span>
                          <span>{article.date}</span>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <BookOpen className="h-4 w-4 mr-2" />
                              <span>Remove from bookmarks</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/blog/${article.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                <span>View article</span>
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <Link to={`/blog/${article.id}`}>
                        <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                      </Link>
                      
                      <p className="text-muted-foreground line-clamp-2 mb-4">{article.excerpt}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">By {article.author}</span>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/blog/${article.id}`}>
                            Read Article
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            
            {savedArticles.filter(article => 
              article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
              article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 && (
              <Card className="py-12 text-center">
                <CardContent>
                  <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No bookmarked articles found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm ? 
                      `No articles matching "${searchTerm}" in your bookmarks.` : 
                      "You haven't bookmarked any articles yet."}
                  </p>
                  <Button asChild>
                    <Link to="/blog">Browse Articles</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* My Articles */}
          <TabsContent value="my-articles">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Contributed Articles</CardTitle>
                  <Button asChild>
                    <Link to="/driver-blog-new">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      New Article
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%]">Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden md:table-cell">Stats</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contributedArticles
                      .filter(article => 
                        article.title.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((article) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium">{article.title}</TableCell>
                          <TableCell>
                            {article.status === "published" ? (
                              <Badge className="bg-green-500/80">Published</Badge>
                            ) : (
                              <Badge variant="outline">Draft</Badge>
                            )}
                          </TableCell>
                          <TableCell>
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
                                <Link to={`/driver-blog-edit/${article.id}`}>
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
                    
                    {contributedArticles.filter(article => 
                      article.title.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10">
                          <p className="text-muted-foreground">
                            {searchTerm ? `No articles matching "${searchTerm}" found.` : "You haven't created any articles yet."}
                          </p>
                          <Button className="mt-4" asChild>
                            <Link to="/driver-blog-new">Create Your First Article</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Recommended Articles */}
          <TabsContent value="recommended" className="space-y-5">
            <Card className="p-6 bg-muted/30">
              <div className="flex items-center gap-3 text-muted-foreground mb-4">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Recommended based on your profile and reading history</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedArticles
                  .filter(article => 
                    article.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((article, index) => (
                    <div 
                      key={article.id} 
                      className="blog-card hover-scale animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Link to={`/blog/${article.id}`}>
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://placehold.co/600x400/primary/white?text=Recommended";
                            }}
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center text-xs text-muted-foreground mb-2">
                            <Clock className="h-3 w-3 mr-1" />
                            {article.readTime}
                          </div>
                          <h3 className="font-medium line-clamp-2">
                            {article.title}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
              
              {recommendedArticles.filter(article => 
                article.title.toLowerCase().includes(searchTerm.toLowerCase())
              ).length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">
                    No recommended articles matching "{searchTerm}" found.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Articles for Drivers</CardTitle>
                <CardDescription>Popular content in the driver community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedArticles.map((article, index) => (
                    <Link 
                      key={article.id} 
                      to={`/blog/${article.id}`}
                      className="flex gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="font-bold text-2xl text-muted-foreground/50 w-8">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{article.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {article.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
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

export default DriverBlogDashboard;
