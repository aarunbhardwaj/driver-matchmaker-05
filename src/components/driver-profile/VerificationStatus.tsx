
import { Shield, ShieldCheck, ShieldAlert, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

interface VerificationStatusProps {
  status: VerificationStatus;
  isProfileOwner?: boolean;
}

export const VerificationStatusCard = ({ status, isProfileOwner = true }: VerificationStatusProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleVerificationRequest = () => {
    setIsSubmitting(true);
    // In a real app, this would make an API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Would update status in a real implementation
      alert("Verification request submitted successfully!");
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          {status === "verified" && <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />}
          {status === "pending" && <Clock className="h-5 w-5 text-amber-500 mr-2" />}
          {status === "rejected" && <ShieldAlert className="h-5 w-5 text-red-500 mr-2" />}
          {status === "unverified" && <Shield className="h-5 w-5 text-gray-400 mr-2" />}
          Driver Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Status:</span>
          <Badge 
            variant={
              status === "verified" ? "default" : 
              status === "pending" ? "outline" : 
              status === "rejected" ? "destructive" : 
              "secondary"
            }
          >
            {status === "verified" && "Verified"}
            {status === "pending" && "Pending Verification"}
            {status === "rejected" && "Verification Failed"}
            {status === "unverified" && "Not Verified"}
          </Badge>
        </div>
        
        {status === "verified" && (
          <div className="text-sm text-muted-foreground">
            <p>Your driver account has been verified. This gives you higher visibility to employers and improves your chances of getting hired.</p>
          </div>
        )}
        
        {status === "pending" && (
          <div className="text-sm text-muted-foreground">
            <p>Your verification is being processed. This usually takes 1-2 business days. We'll notify you once it's complete.</p>
          </div>
        )}
        
        {status === "rejected" && (
          <div className="text-sm text-muted-foreground">
            <p>Your verification was not successful. This could be due to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Incomplete documentation</li>
              <li>Unreadable license image</li>
              <li>Information mismatch</li>
            </ul>
            <p className="mt-2">Please update your information and try again.</p>
            
            {isProfileOwner && (
              <Button 
                onClick={handleVerificationRequest} 
                disabled={isSubmitting}
                className="w-full mt-4"
              >
                {isSubmitting ? "Submitting..." : "Try Again"}
              </Button>
            )}
          </div>
        )}
        
        {status === "unverified" && (
          <div className="text-sm text-muted-foreground">
            <p>Verified drivers receive 3x more job offers and are 70% more likely to be hired.</p>
            <p className="mt-2">To get verified, you'll need to provide:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Valid driver's license</li>
              <li>Proof of address</li>
              <li>Driving record</li>
            </ul>
            
            {isProfileOwner && (
              <Button 
                onClick={handleVerificationRequest} 
                disabled={isSubmitting}
                className="w-full mt-4"
              >
                {isSubmitting ? "Submitting..." : "Request Verification"}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
