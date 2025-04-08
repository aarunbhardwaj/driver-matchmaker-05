
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DriverHeader } from "@/components/DriverHeader";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, MapPin, Truck, Clock, Briefcase, Building, FileText, CircleCheck, Star } from "lucide-react";
import { toast } from "sonner";

// Mock job data - in a real app, this would come from an API
const jobsData = [
  {
    id: "1",
    title: "Long-haul Truck Driver",
    company: "LogistiCorp Inc.",
    companyLogo: "/logos/dhl-logo.svg",
    location: "Chicago, IL to Denver, CO",
    pay: "$0.55/mile, est. $1,200",
    date: "Starting Oct 15",
    distance: "850 miles",
    match: "95%",
    description: "We are looking for an experienced long-haul truck driver to transport goods between our Chicago and Denver facilities. The ideal candidate will have a clean driving record, CDL Class A license, and experience with cross-country routes.",
    requirements: [
      "Valid Commercial Driver's License (CDL) Class A",
      "Minimum 2 years of long-haul driving experience",
      "Clean driving record with no major violations",
      "Ability to pass DOT physical and drug screening",
      "Knowledge of DOT regulations and Hours of Service rules",
      "Excellent time management and communication skills"
    ],
    benefits: [
      "Competitive pay with performance bonuses",
      "Health, dental, and vision insurance",
      "401(k) retirement plan with company match",
      "Paid time off and holidays",
      "Modern fleet with up-to-date equipment",
      "Regular home time with predictable schedules"
    ],
    companyDetails: "LogistiCorp Inc. is a leading logistics provider with operations across North America. We specialize in efficient and reliable transportation solutions for a wide range of industries including retail, manufacturing, and e-commerce."
  },
  {
    id: "2",
    title: "Regional Delivery Driver",
    company: "FastFreight Systems",
    companyLogo: "/logos/dsv-logo.svg",
    location: "Minneapolis Metro Area",
    pay: "$28/hour, est. $1,120/week",
    date: "Immediate Start",
    distance: "Local routes",
    match: "87%",
    description: "FastFreight Systems is seeking regional delivery drivers to handle routes within the Minneapolis Metro area. This position involves daily deliveries to businesses and distribution centers, with return to home base each evening.",
    requirements: [
      "Valid Commercial Driver's License (CDL) Class B or higher",
      "At least 1 year of commercial driving experience",
      "Knowledge of the Minneapolis Metro area",
      "Clean driving record and background check",
      "Ability to lift up to 50 lbs repeatedly throughout the day",
      "Customer service orientation and professional appearance"
    ],
    benefits: [
      "Hourly pay with overtime opportunities",
      "Health and dental insurance after 60 days",
      "Home daily - no overnight travel",
      "Paid training program",
      "Employee discount program",
      "Career advancement opportunities"
    ],
    companyDetails: "FastFreight Systems specializes in regional and local freight solutions with a focus on efficiency and customer satisfaction. Our modern fleet and technology-driven approach make us a preferred employer in the transportation industry."
  },
  {
    id: "3",
    title: "Refrigerated Truck Operator",
    company: "CoolHaul Logistics",
    companyLogo: "/logos/maersk-logo.svg",
    location: "Dallas, TX to St. Louis, MO",
    pay: "$0.60/mile, est. $900",
    date: "Starting Oct 18",
    distance: "630 miles",
    match: "82%",
    description: "CoolHaul Logistics is hiring refrigerated truck operators for our Dallas to St. Louis route. This position requires experience with temperature-controlled cargo and attention to detail in maintaining optimal conditions for perishable goods.",
    requirements: [
      "Valid CDL Class A with appropriate endorsements",
      "Minimum 2 years experience with refrigerated transport",
      "Knowledge of temperature monitoring systems",
      "Ability to maintain accurate logs and paperwork",
      "Flexible schedule for occasional weekend work",
      "Understanding of food safety best practices"
    ],
    benefits: [
      "Premium pay rate for specialized service",
      "Comprehensive benefits package",
      "Newer model refrigerated units",
      "24/7 dispatch support",
      "Quarterly safety bonuses",
      "Pet-friendly policy"
    ],
    companyDetails: "CoolHaul Logistics is a specialized carrier focusing on temperature-controlled transportation. We serve the food service, pharmaceutical, and specialty goods industries with our fleet of modern refrigerated trucks."
  }
];

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  
  // Find the job details from our mock data
  const job = jobsData.find(j => j.id === jobId);
  
  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <DriverHeader />
        <div className="container mx-auto px-4 py-8 pt-24">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
                <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist or has been removed.</p>
                <Button onClick={() => navigate('/driver-search')}>Back to Job Search</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const handleStartApplication = () => {
    setIsApplying(true);
    setApplicationStep(1);
    window.scrollTo(0, 0);
  };

  const handleSubmitApplication = () => {
    toast.success("Your application has been submitted successfully!");
    navigate('/driver-applications', {
      state: { 
        justApplied: true,
        jobId: job.id,
        jobTitle: job.title,
        companyName: job.company
      }
    });
  };
  
  const handleNextStep = () => {
    if (applicationStep < 3) {
      setApplicationStep(applicationStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (applicationStep > 1) {
      setApplicationStep(applicationStep - 1);
      window.scrollTo(0, 0);
    } else {
      setIsApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DriverHeader />
      <main className="container mx-auto px-4 py-8 pt-24">
        {!isApplying ? (
          <>
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => navigate('/driver-search')}
                className="mb-4"
              >
                &larr; Back to Search
              </Button>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{job.title}</h1>
                  <div className="flex items-center mt-2">
                    <img src={job.companyLogo} alt={job.company} className="h-6 mr-2" />
                    <span className="text-muted-foreground">{job.company}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Badge className="bg-primary/10 text-primary border-none mr-2">
                    <Star className="h-3 w-3 fill-primary mr-1" />
                    <span>{job.match} match</span>
                  </Badge>
                  <Button onClick={handleStartApplication}>Apply Now</Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{job.description}</p>
                    
                    <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-1 mb-6">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="text-muted-foreground">{req}</li>
                      ))}
                    </ul>
                    
                    <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                    <ul className="list-disc pl-5 space-y-1 mb-6">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="text-muted-foreground">{benefit}</li>
                      ))}
                    </ul>
                    
                    <h3 className="text-lg font-semibold mb-3">About the Company</h3>
                    <p className="text-muted-foreground">{job.companyDetails}</p>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground">{job.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Compensation</p>
                        <p className="text-muted-foreground">{job.pay}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Start Date</p>
                        <p className="text-muted-foreground">{job.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Distance</p>
                        <p className="text-muted-foreground">{job.distance}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleStartApplication} className="w-full">Apply Now</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Application - {job.title} at {job.company}</CardTitle>
              <CardDescription>Complete all steps to submit your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${applicationStep >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'} mr-2`}>1</div>
                    <span className={`${applicationStep === 1 ? 'font-medium' : ''}`}>Basic Information</span>
                  </div>
                  <div className="hidden md:flex items-center">
                    <div className={`h-1 w-16 ${applicationStep > 1 ? 'bg-primary' : 'bg-muted'}`}></div>
                  </div>
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${applicationStep >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'} mr-2`}>2</div>
                    <span className={`${applicationStep === 2 ? 'font-medium' : ''}`}>AI Feedback</span>
                  </div>
                  <div className="hidden md:flex items-center">
                    <div className={`h-1 w-16 ${applicationStep > 2 ? 'bg-primary' : 'bg-muted'}`}></div>
                  </div>
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${applicationStep >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'} mr-2`}>3</div>
                    <span className={`${applicationStep === 3 ? 'font-medium' : ''}`}>Review & Submit</span>
                  </div>
                </div>
              </div>

              {applicationStep === 1 && <JobApplicationBasicForm />}
              {applicationStep === 2 && <JobApplicationAIFeedback jobTitle={job.title} />}
              {applicationStep === 3 && (
                <div>
                  <div className="bg-muted/30 p-6 rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Application Summary</h3>
                      <CircleCheck className="h-6 w-6 text-green-500" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Job Title</p>
                          <p className="font-medium">{job.title}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Company</p>
                          <p className="font-medium">{job.company}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">AI Feedback Complete</p>
                        <p className="font-medium">Yes - Feedback saved</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Cover Letter</p>
                        <p className="font-medium">Included</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Resume</p>
                        <p className="font-medium">Current resume on file will be used</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg mb-6">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-primary">Application Ready for Submission</p>
                        <p className="text-muted-foreground">Please review all details before submitting. Once submitted, you can track the status in your applications dashboard.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                {applicationStep === 1 ? 'Cancel' : 'Previous Step'}
              </Button>
              {applicationStep < 3 ? (
                <Button onClick={handleNextStep}>Continue</Button>
              ) : (
                <Button onClick={handleSubmitApplication}>Submit Application</Button>
              )}
            </CardFooter>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

// Application step 1 component
const JobApplicationBasicForm = () => {
  return (
    <div className="space-y-6">
      <div className="bg-muted/30 p-6 rounded-lg">
        <div className="flex items-start gap-3 mb-4">
          <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Your Profile Information</p>
            <p className="text-muted-foreground">This information will be automatically included with your application.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="font-medium">Alex Johnson</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">alex.johnson@example.com</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">(555) 123-4567</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">License Type</p>
            <p className="font-medium">CDL Class A</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Experience</p>
            <p className="font-medium">4 years</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Resume</p>
            <div className="flex items-center">
              <p className="font-medium mr-2">resume_alex_johnson.pdf</p>
              <Button variant="outline" size="sm">Update</Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Additional Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Cover Letter (Optional)</label>
            <textarea 
              className="w-full h-32 p-3 border rounded-md resize-none"
              placeholder="Write a brief introduction highlighting why you're a good fit for this position..."
            ></textarea>
          </div>
          <div>
            <label className="block font-medium mb-1">Availability Date</label>
            <input 
              type="date"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Preferred Contact Method</label>
            <select className="w-full p-2 border rounded-md">
              <option>Email</option>
              <option>Phone</option>
              <option>Text Message</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

// Application step 2 component
const JobApplicationAIFeedback = ({ jobTitle }: { jobTitle: string }) => {
  return (
    <div className="space-y-6">
      <div className="bg-muted/30 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3">AI Application Feedback</h3>
        <p className="text-muted-foreground mb-4">
          Get personalized feedback on how to improve your application for this {jobTitle} position. 
          Our AI will analyze your profile and provide suggestions to increase your chances of success.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">What specific skills or experiences would you like to highlight for this position?</label>
            <textarea 
              className="w-full h-24 p-3 border rounded-md resize-none"
              placeholder="e.g., 'My experience with refrigerated freight' or 'My safety record'"
            ></textarea>
          </div>
          
          <div>
            <label className="block font-medium mb-1">Are there any specific challenges or concerns about this position?</label>
            <textarea 
              className="w-full h-24 p-3 border rounded-md resize-none"
              placeholder="e.g., 'The required experience is slightly above what I have' or 'I'm changing from local to long-haul routes'"
            ></textarea>
          </div>
          
          <div>
            <label className="block font-medium mb-1">What are your top career goals that this position would help you achieve?</label>
            <textarea 
              className="w-full h-24 p-3 border rounded-md resize-none"
              placeholder="e.g., 'Building experience for eventual owner-operator status' or 'Finding a stable position with a single company'"
            ></textarea>
          </div>
        </div>
      </div>
      
      <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-0.5">
            <svg width="20" height="20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M40 0C17.909 0 0 17.909 0 40C0 62.091 17.909 80 40 80C62.091 80 80 62.091 80 40C80 17.909 62.091 0 40 0Z" fill="currentColor"/>
              <path d="M52 64H28C26.4087 64 24.8826 63.3679 23.7574 62.2426C22.6321 61.1174 22 59.5913 22 58V22C22 20.4087 22.6321 18.8826 23.7574 17.7574C24.8826 16.6321 26.4087 16 28 16H44L58 30V58C58 59.5913 57.3679 61.1174 56.2426 62.2426C55.1174 63.3679 53.5913 64 52 64Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M44 16V30H58" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M34 38H46" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M34 46H46" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M38 54H42" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="font-medium">You'll receive personalized AI feedback</p>
            <p className="text-muted-foreground">Your responses will be analyzed by our AI to provide customized suggestions for strengthening your application. This feedback will be saved to your profile for future reference.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
