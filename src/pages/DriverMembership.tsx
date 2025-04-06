
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  AlertCircle, 
  Calendar, 
  CreditCard, 
  Gauge, 
  BarChart3,
  Star,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MembershipTiers } from "@/components/driver-membership/MembershipTiers";
import { DriverHeader } from "@/components/DriverHeader";
import { Footer } from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const DriverMembership = () => {
  const navigate = useNavigate();
  const [currentTier, setCurrentTier] = useState("free");
  const [showAllTiers, setShowAllTiers] = useState(false);
  
  // Mock data - in a real app, this would come from an API
  const membershipData = {
    tier: "free",
    jobApplicationsUsed: 2,
    jobApplicationsTotal: 3,
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    features: [
      "Profile visible to employers",
      "Can apply to 3 jobs/month",
      "Basic AI matches"
    ]
  };

  const handleUpgradeClick = (tier: string) => {
    setCurrentTier(tier);
    navigate("/driver-billing", { state: { selectedTier: tier } });
  };

  return (
    <div className="min-h-screen bg-background">
      <DriverHeader />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Driver Membership</h1>
            <p className="text-muted-foreground">Manage your membership plan and benefits</p>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={() => navigate('/driver-dashboard')} variant="outline">
              Back to Dashboard
            </Button>
            <Button onClick={() => navigate('/driver-billing')}>
              <CreditCard className="mr-2 h-4 w-4" /> Billing Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Plan Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your membership details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{membershipData.tier === "free" ? "Free Plan" : "Driver Plus"}</h3>
                    {membershipData.tier !== "free" && (
                      <p className="text-sm text-muted-foreground">
                        Renews on {membershipData.renewalDate.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <Badge variant={membershipData.tier === "free" ? "outline" : "default"}>
                    {membershipData.tier === "free" ? "Free" : "Active"}
                  </Badge>
                </div>
                
                {membershipData.tier === "free" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Job Applications</span>
                      <span>{membershipData.jobApplicationsUsed}/{membershipData.jobApplicationsTotal} used this month</span>
                    </div>
                    <Progress 
                      value={(membershipData.jobApplicationsUsed / membershipData.jobApplicationsTotal) * 100} 
                      className="h-2"
                    />
                  </div>
                )}
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Your Benefits:</h4>
                  <ul className="space-y-1">
                    {membershipData.features.map((feature, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {membershipData.tier === "free" && (
                  <Alert className="bg-primary/10 border-primary mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Upgrade your plan</AlertTitle>
                    <AlertDescription>
                      Unlock more benefits by upgrading to one of our premium plans.
                    </AlertDescription>
                  </Alert>
                )}
                
                {membershipData.tier === "free" && (
                  <Button 
                    className="w-full mt-2" 
                    onClick={() => setShowAllTiers(true)}
                  >
                    Upgrade Membership
                  </Button>
                )}
              </CardContent>
            </Card>
            
            <div className="mt-6 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Job Applications</p>
                      <p className="text-sm text-muted-foreground">
                        {membershipData.jobApplicationsUsed} used this month
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">AI Matches</p>
                      <p className="text-sm text-muted-foreground">
                        5 new matches this week
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Gauge className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Profile Strength</p>
                      <p className="text-sm text-muted-foreground">
                        75% - Add more details to improve
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Membership Tiers or Upgrade Benefits */}
          <div className="lg:col-span-2">
            {showAllTiers ? (
              <Card>
                <CardHeader>
                  <CardTitle>Choose a Plan</CardTitle>
                  <CardDescription>
                    Select the plan that best fits your needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MembershipTiers 
                    currentTier={membershipData.tier} 
                    onSelectTier={handleUpgradeClick}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Upgrade Benefits</CardTitle>
                  <CardDescription>
                    Discover what you get with our premium plans
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium">Unlimited Applications</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Apply to as many jobs as you want without any monthly limits.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Badge className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium">Verified Driver Badge</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Stand out to employers with a verified badge after ID/CPC check.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Star className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium">Featured Profile</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Get more visibility with a featured profile placement on employer searches.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium">Early Access to Jobs</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Get early access to premium job listings before other drivers.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button size="lg" onClick={() => setShowAllTiers(true)}>
                      View All Plans & Pricing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DriverMembership;
