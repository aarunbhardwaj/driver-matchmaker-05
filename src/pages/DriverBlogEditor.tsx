
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DriverHeader } from "@/components/DriverHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Save,
  Image,
  Tag,
  AlertCircle,
  ChevronLeft,
  HelpCircle,
  FileText,
  Eye,
  CheckCircle,
  Heading1,
  Heading2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon
} from "lucide-react";

// Mock categories and tags
const categories = [
  { value: "experiences", label: "Driver Experiences" },
  { value: "tips", label: "Tips & Advice" },
  { value: "career", label: "Career Development" },
  { value: "lifestyle", label: "Driver Lifestyle" },
  { value: "industry", label: "Industry Insights" },
  { value: "technology", label: "Technology" }
];

const tags = [
  "Long Haul", "City Driving", "Health", "Work-Life Balance", "Safety",
  "Route Planning", "Career Growth", "Driver Rights", "Vehicle Maintenance",
  "Logistics Industry", "Technology", "Driver Community"
];

// Mock draft for editing an existing post
const existingDraft = {
  id: 102,
  title: "Tips for Staying Healthy on the Road",
  content: `As a professional driver with over 10 years of experience, I've learned that maintaining good health while constantly on the road can be challenging but is absolutely essential. Here are my top tips for staying healthy despite the challenges of life on the road.

## Nutrition on the Go

Finding healthy food options at truck stops and rest areas is getting easier, but still requires planning. I always pack:

1. Fresh fruits that don't require refrigeration
2. Nuts and seeds for protein
3. Water bottles (staying hydrated is crucial!)

## Exercise Routines That Work

You don't need a gym to stay active. During my mandatory breaks, I make sure to:
- Walk at least 10 minutes for every 2 hours of driving
- Keep resistance bands in my cab for quick strength workouts
- Practice simple stretches to prevent back and shoulder pain

## Sleep Optimization

Quality sleep is perhaps the most important factor for driver health and safety. I've found these practices helpful:
- Consistent sleep schedule even when crossing time zones
- Blackout curtains or a sleep mask to block light
- White noise app to mask disruptive sounds

Remember: your health is your most valuable asset as a professional driver. Taking care of yourself isn't just good for you—it's essential for safety on the road.`,
  excerpt: "Essential health tips for professional drivers who spend long hours on the road, covering nutrition, exercise, and sleep strategies.",
  category: "tips",
  tags: ["Health", "Long Haul", "Driver Lifestyle"],
  coverImage: null,
  status: "draft"
};

const DriverBlogEditor = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!articleId;
  
  // Initialize with existing draft if editing, otherwise empty fields
  const [articleData, setArticleData] = useState(isEditing ? existingDraft : {
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: [],
    coverImage: null,
    status: "draft"
  });
  
  const [selectedTags, setSelectedTags] = useState<string[]>(isEditing ? existingDraft.tags : []);
  const [discardDialogOpen, setDiscardDialogOpen] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        toast({
          title: "Maximum 5 tags allowed",
          description: "Please remove a tag before adding a new one.",
          variant: "destructive"
        });
      }
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticleData({
      ...articleData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setArticleData({
      ...articleData,
      [name]: value
    });
  };
  
  const handleSaveDraft = () => {
    // Include selected tags in the save operation
    const articleWithTags = {
      ...articleData,
      tags: selectedTags
    };
    
    // In a real app, this would save to an API
    console.log("Saving draft:", articleWithTags);
    
    toast({
      title: "Draft saved",
      description: "Your article has been saved as a draft.",
      duration: 3000
    });
  };
  
  const handlePublish = () => {
    // In a real app, this would submit to an API for review/publishing
    console.log("Publishing article:", {
      ...articleData,
      tags: selectedTags,
      status: "published"
    });
    
    setPublishDialogOpen(false);
    
    toast({
      title: "Article submitted",
      description: "Your article has been submitted for review.",
      duration: 5000
    });
    
    // Navigate back to the blog dashboard
    navigate("/driver-blog-dashboard");
  };
  
  const handleDiscard = () => {
    setDiscardDialogOpen(false);
    navigate("/driver-blog-dashboard");
  };
  
  // Insert formatting at cursor position
  const insertFormatting = (format: string) => {
    // In a real app, this would insert markdown or formatting at cursor
    let insertion = "";
    switch (format) {
      case "h1":
        insertion = "# Heading 1";
        break;
      case "h2":
        insertion = "## Heading 2";
        break;
      case "bold":
        insertion = "**Bold text**";
        break;
      case "italic":
        insertion = "*Italic text*";
        break;
      case "list":
        insertion = "\n- List item 1\n- List item 2\n- List item 3";
        break;
      case "ordered-list":
        insertion = "\n1. First item\n2. Second item\n3. Third item";
        break;
      case "quote":
        insertion = "\n> Blockquote text goes here";
        break;
      case "link":
        insertion = "[Link text](https://example.com)";
        break;
      default:
        break;
    }
    
    setArticleData({
      ...articleData,
      content: articleData.content + insertion
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DriverHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Editor Section */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="mr-3"
                  onClick={() => navigate("/driver-blog-dashboard")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold">
                  {isEditing ? "Edit Article" : "Create New Article"}
                </h1>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  className={previewMode ? "bg-muted" : ""}
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  {previewMode ? (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </>
                  )}
                </Button>
                
                <Button variant="outline" onClick={handleSaveDraft}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                
                <Button onClick={() => setPublishDialogOpen(true)}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {isEditing ? "Update" : "Publish"}
                </Button>
              </div>
            </div>
            
            {/* Article Title */}
            <div className="mb-6">
              <Input
                name="title"
                value={articleData.title}
                onChange={handleInputChange}
                placeholder="Article Title"
                className="text-2xl font-bold h-auto py-3"
                disabled={previewMode}
              />
            </div>
            
            {/* Formatting Toolbar (only in edit mode) */}
            {!previewMode && (
              <div className="bg-muted/30 border rounded-md p-2 mb-4 flex flex-wrap gap-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => insertFormatting("h1")}
                  title="Heading 1"
                >
                  <Heading1 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => insertFormatting("h2")}
                  title="Heading 2"
                >
                  <Heading2 className="h-4 w-4" />
                </Button>
                <div className="w-px h-9 bg-border mx-1" />
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => insertFormatting("bold")}
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => insertFormatting("italic")}
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <div className="w-px h-9 bg-border mx-1" />
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => insertFormatting("list")}
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => insertFormatting("ordered-list")}
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => insertFormatting("quote")}
                  title="Blockquote"
                >
                  <Quote className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => insertFormatting("link")}
                  title="Insert Link"
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
                <div className="w-px h-9 bg-border mx-1" />
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9"
                  title="Upload Image"
                >
                  <Image className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {/* Content Area */}
            {previewMode ? (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{articleData.title || "Untitled Article"}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTags.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  {articleData.content ? (
                    <div className="whitespace-pre-line">
                      {articleData.content}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No content yet. Switch to edit mode to write your article.</p>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="mb-6">
                <Textarea
                  name="content"
                  value={articleData.content}
                  onChange={handleInputChange}
                  placeholder="Write your article content here... Use Markdown formatting for headings, lists, etc."
                  className="h-[400px] font-mono text-base resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  <HelpCircle className="h-3 w-3 inline mr-1" />
                  Use Markdown for formatting or the toolbar above. Preview your article with the Preview button.
                </p>
              </div>
            )}
            
            {/* Excerpt */}
            <div className="mb-6">
              <Label htmlFor="excerpt" className="block mb-2">Article Excerpt (max 200 characters)</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={articleData.excerpt}
                onChange={handleInputChange}
                placeholder="Write a brief summary of your article to appear in previews..."
                className="h-20"
                maxLength={200}
                disabled={previewMode}
              />
              <div className="flex justify-end">
                <span className="text-xs text-muted-foreground mt-1">
                  {articleData.excerpt.length}/200 characters
                </span>
              </div>
            </div>
          </div>
          
          {/* Sidebar Section */}
          <div className="lg:w-1/3">
            <div className="space-y-6">
              {/* Category Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Category</CardTitle>
                  <CardDescription>Select the main topic of your article</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={articleData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                    disabled={previewMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
              
              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    Tags
                  </CardTitle>
                  <CardDescription>Select up to 5 relevant tags</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => !previewMode && handleTagToggle(tag)}
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          selectedTags.includes(tag)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        } transition-colors ${previewMode ? 'opacity-60 cursor-not-allowed' : ''}`}
                        disabled={previewMode}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Selected: {selectedTags.length}/5 tags
                  </p>
                </CardFooter>
              </Card>
              
              {/* Cover Image */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cover Image</CardTitle>
                  <CardDescription>Upload an image for your article</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center">
                    <Image className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      Drag and drop an image here, or click to browse
                    </p>
                    <Button variant="outline" disabled={previewMode}>
                      Upload Image
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Recommended: 1200 x 630px, max 2MB
                  </p>
                </CardFooter>
              </Card>
              
              {/* Publishing Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Publishing Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full"
                    onClick={() => setPublishDialogOpen(true)}
                    disabled={!articleData.title || !articleData.content || !articleData.category || selectedTags.length === 0}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {isEditing ? "Update Article" : "Submit for Publishing"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleSaveDraft}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-destructive hover:text-destructive"
                    onClick={() => setDiscardDialogOpen(true)}
                  >
                    Discard and Exit
                  </Button>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Articles will be reviewed by our team before publishing
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Publish Confirmation Dialog */}
      <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Article for Publishing</DialogTitle>
            <DialogDescription>
              Your article will be reviewed by our editorial team before being published on the DriverMatch blog.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Article Title:</h4>
                <p className="text-muted-foreground">{articleData.title}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Category:</h4>
                <p className="text-muted-foreground">
                  {categories.find(c => c.value === articleData.category)?.label || "Not selected"}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-md bg-muted/30 p-4 flex items-center gap-3 text-sm">
                <AlertCircle className="h-5 w-5 text-primary" />
                <div>
                  <p>Once submitted, you can still edit your article until it's approved by our editors.</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPublishDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePublish}>
              Submit for Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Discard Dialog */}
      <Dialog open={discardDialogOpen} onOpenChange={setDiscardDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Discard Changes?
            </DialogTitle>
            <DialogDescription>
              Any unsaved changes will be lost. Are you sure you want to exit?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDiscardDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDiscard}>
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriverBlogEditor;
