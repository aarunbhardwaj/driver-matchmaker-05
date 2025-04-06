
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Receipt, 
  Calendar, 
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  FileText,
  Download,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MembershipTiers } from "@/components/driver-membership/MembershipTiers";
import { DriverHeader } from "@/components/DriverHeader";
import { Footer } from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const DriverBilling = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the selected tier from navigation state or default to "free"
  const selectedTierFromNav = location.state?.selectedTier || "free";
  
  const [selectedTier, setSelectedTier] = useState(selectedTierFromNav);
  const [billingInterval, setBillingInterval] = useState("monthly");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock billing history
  const billingHistory = [
    { id: "INV-001", date: "2025-03-15", amount: "£4.99", status: "Paid", type: "Driver Plus (Monthly)" },
    { id: "INV-002", date: "2025-02-15", amount: "£4.99", status: "Paid", type: "Driver Plus (Monthly)" },
    { id: "INV-003", date: "2025-01-15", amount: "£4.99", status: "Paid", type: "Driver Plus (Monthly)" }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Subscription Updated",
        description: `Your membership has been upgraded to ${selectedTier === "plus" ? "Driver Plus" : "Driver Pro"}`,
      });
      
      navigate("/driver-membership");
    }, 1500);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${invoiceId} has been downloaded.`,
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <DriverHeader />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="mr-2 p-0 h-8 w-8" 
              onClick={() => navigate('/driver-membership')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold mb-2">Billing & Payments</h1>
              <p className="text-muted-foreground">Manage your payment methods and subscriptions</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="payment-methods">
          <TabsList className="mb-6">
            <TabsTrigger value="payment-methods">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Methods
            </TabsTrigger>
            <TabsTrigger value="subscription">
              <Calendar className="h-4 w-4 mr-2" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="billing-history">
              <Receipt className="h-4 w-4 mr-2" />
              Billing History
            </TabsTrigger>
          </TabsList>
          
          {/* Payment Methods Tab */}
          <TabsContent value="payment-methods">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Add or update your payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* No Payment Methods State */}
                    <div className="text-center py-6">
                      <div className="mx-auto bg-muted rounded-full p-3 inline-block mb-4">
                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No Payment Methods</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't added any payment methods yet
                      </p>
                      <Button>
                        Add Payment Method
                      </Button>
                    </div>
                    
                    {/* Form would go here in a real implementation */}
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Secure Payments</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      We use industry-standard encryption to protect your financial information. All payments are securely processed through Stripe.
                    </p>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">SSL Encrypted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">PCI DSS Compliant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Secure Payment Processing</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Subscription Tab */}
          <TabsContent value="subscription">
            {selectedTier === "free" ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Plan</CardTitle>
                      <CardDescription>
                        You are currently on the Free plan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Alert className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Limited Features</AlertTitle>
                        <AlertDescription>
                          Upgrade to unlock more features and improve your job prospects.
                        </AlertDescription>
                      </Alert>
                      <Button 
                        className="w-full" 
                        onClick={() => setSelectedTier("plus")}
                      >
                        Upgrade Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Choose a Plan</CardTitle>
                      <CardDescription>
                        Select a premium plan to unlock more features
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center bg-muted p-1 rounded-full">
                          <Button
                            variant={billingInterval === "monthly" ? "default" : "ghost"}
                            size="sm"
                            className="rounded-full"
                            onClick={() => setBillingInterval("monthly")}
                          >
                            Monthly
                          </Button>
                          <Button
                            variant={billingInterval === "yearly" ? "default" : "ghost"}
                            size="sm"
                            className="rounded-full"
                            onClick={() => setBillingInterval("yearly")}
                          >
                            Yearly
                            <Badge className="ml-2 bg-green-500 text-white">Save 30%</Badge>
                          </Button>
                        </div>
                      </div>
                      
                      <MembershipTiers 
                        currentTier={selectedTier} 
                        onSelectTier={setSelectedTier} 
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>
                          {selectedTier === "plus" ? "Driver Plus" : "Driver Pro"}
                        </CardTitle>
                        <Badge>
                          {billingInterval === "monthly" ? "Monthly" : "Yearly"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-2xl font-bold mb-1">
                        {selectedTier === "plus" 
                          ? (billingInterval === "monthly" ? "£4.99" : "£39") 
                          : (billingInterval === "monthly" ? "£9.99" : "£79")}
                        <span className="text-sm font-normal text-muted-foreground">
                          {billingInterval === "monthly" ? "/month" : "/year"}
                        </span>
                      </div>
                      {billingInterval === "yearly" && (
                        <p className="text-sm text-green-600 mb-4">
                          You save {selectedTier === "plus" ? "£20.88" : "£40.88"} with annual billing
                        </p>
                      )}
                      
                      <div className="border-t pt-4 mt-2 space-y-2">
                        <p className="text-sm font-medium">Selected Plan Includes:</p>
                        <ul className="space-y-1">
                          {selectedTier === "plus" ? (
                            <>
                              <li className="text-sm flex">
                                <CheckCircle2 className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                <span>Unlimited job applications</span>
                              </li>
                              <li className="text-sm flex">
                                <CheckCircle2 className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                <span>Priority matching</span>
                              </li>
                              <li className="text-sm flex">
                                <CheckCircle2 className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                <span>"Verified Driver" badge</span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="text-sm flex">
                                <CheckCircle2 className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                <span>All Driver Plus features</span>
                              </li>
                              <li className="text-sm flex">
                                <CheckCircle2 className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                <span>1-on-1 CV review</span>
                              </li>
                              <li className="text-sm flex">
                                <CheckCircle2 className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                <span>Featured profile placement</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setSelectedTier("free")}
                      >
                        Change Plan
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Details</CardTitle>
                      <CardDescription>
                        Complete your subscription
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="card-name">Name on Card</Label>
                            <Input id="card-name" placeholder="John Smith" required />
                          </div>
                          
                          <div>
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" required />
                            </div>
                            <div>
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" required />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="billing-interval">Billing Period</Label>
                            <RadioGroup 
                              defaultValue={billingInterval}
                              onValueChange={(value) => setBillingInterval(value)}
                              className="flex flex-col space-y-1 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="monthly" id="monthly" />
                                <Label htmlFor="monthly" className="cursor-pointer">
                                  Monthly - {selectedTier === "plus" ? "£4.99" : "£9.99"}/month
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yearly" id="yearly" />
                                <Label htmlFor="yearly" className="cursor-pointer flex items-center">
                                  Yearly - {selectedTier === "plus" ? "£39" : "£79"}/year
                                  <Badge className="ml-2 bg-green-500 text-white">Save 30%</Badge>
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>
                              {selectedTier === "plus" 
                                ? (billingInterval === "monthly" ? "£4.99" : "£39") 
                                : (billingInterval === "monthly" ? "£9.99" : "£79")}
                            </span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>
                              {selectedTier === "plus" 
                                ? (billingInterval === "monthly" ? "£4.99" : "£39") 
                                : (billingInterval === "monthly" ? "£9.99" : "£79")}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            You will be charged {billingInterval === "monthly" ? "monthly" : "annually"} until you cancel your subscription.
                          </p>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <Clock className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Complete Subscription
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Billing History Tab */}
          <TabsContent value="billing-history">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>
                    View and download your past invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {billingHistory.length > 0 ? (
                    <div className="border rounded-md divide-y">
                      {billingHistory.map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-4">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                            <div>
                              <p className="font-medium">{invoice.type}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(invoice.date).toLocaleDateString()} - {invoice.id}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge 
                              variant="outline" 
                              className={`mr-4 ${
                                invoice.status === "Paid" 
                                  ? "border-green-500 text-green-600" 
                                  : "border-amber-500 text-amber-600"
                              }`}
                            >
                              {invoice.status}
                            </Badge>
                            <div className="text-right mr-4">
                              <p className="font-medium">{invoice.amount}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDownloadInvoice(invoice.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto bg-muted rounded-full p-3 inline-block mb-4">
                        <Receipt className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No billing history</h3>
                      <p className="text-muted-foreground">
                        You don't have any invoices yet
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default DriverBilling;
