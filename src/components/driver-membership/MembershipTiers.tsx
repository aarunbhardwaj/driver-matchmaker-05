
import { CheckCircle2 } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MembershipTierProps {
  currentTier?: string;
  onSelectTier?: (tier: string) => void;
  showButtons?: boolean;
}

export const MembershipTiers = ({ 
  currentTier, 
  onSelectTier,
  showButtons = true 
}: MembershipTierProps) => {
  const isCurrentTier = (tier: string) => currentTier === tier;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Free Tier */}
      <Card className={`border-2 ${isCurrentTier('free') ? 'border-primary' : 'border-muted'}`}>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Free</span>
            {isCurrentTier('free') && (
              <Badge variant="outline" className="bg-primary/10 text-primary">Current Plan</Badge>
            )}
          </CardTitle>
          <CardDescription>
            <div className="mt-2">
              <span className="text-2xl font-bold">£0</span>
              <span className="text-muted-foreground"> / month</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Profile visible to employers</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Can apply to 3 jobs/month</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Basic AI matches</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          {showButtons && (
            <Button 
              variant={isCurrentTier('free') ? "outline" : "default"} 
              className="w-full"
              onClick={() => onSelectTier && onSelectTier('free')}
              disabled={isCurrentTier('free')}
            >
              {isCurrentTier('free') ? 'Current Plan' : 'Select Plan'}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Driver Plus Tier */}
      <Card className={`border-2 ${isCurrentTier('plus') ? 'border-primary' : 'border-muted'}`}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>
              Driver Plus
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge className="bg-primary">Popular</Badge>
                {isCurrentTier('plus') && (
                  <Badge variant="outline" className="bg-primary/10 text-primary">Current Plan</Badge>
                )}
              </div>
            </CardTitle>
          </div>
          <CardDescription>
            <div className="mt-2">
              <span className="text-2xl font-bold">£4.99</span>
              <span className="text-muted-foreground"> / month</span>
            </div>
            <div className="text-sm text-muted-foreground">or £39/year (save £20.88)</div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Unlimited job applications</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Priority matching</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>"Verified Driver" badge (after ID/CPC check)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Enhanced profile visibility</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Access to salary insights & top employer reviews</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          {showButtons && (
            <Button 
              variant={isCurrentTier('plus') ? "outline" : "default"} 
              className="w-full"
              onClick={() => onSelectTier && onSelectTier('plus')}
              disabled={isCurrentTier('plus')}
            >
              {isCurrentTier('plus') ? 'Current Plan' : 'Select Plan'}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Driver Pro Tier */}
      <Card className={`border-2 ${isCurrentTier('pro') ? 'border-primary' : 'border-muted'}`}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>
              Driver Pro
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge className="bg-indigo-600">Premium</Badge>
                {isCurrentTier('pro') && (
                  <Badge variant="outline" className="bg-primary/10 text-primary">Current Plan</Badge>
                )}
              </div>
            </CardTitle>
          </div>
          <CardDescription>
            <div className="mt-2">
              <span className="text-2xl font-bold">£9.99</span>
              <span className="text-muted-foreground"> / month</span>
            </div>
            <div className="text-sm text-muted-foreground">or £79/year (save £40.88)</div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>All Driver Plus features</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>1-on-1 CV review or profile boost</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>SMS alerts for matching jobs</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Early access to premium jobs</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Featured profile placement</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          {showButtons && (
            <Button 
              variant={isCurrentTier('pro') ? "outline" : "default"} 
              className="w-full"
              onClick={() => onSelectTier && onSelectTier('pro')}
              disabled={isCurrentTier('pro')}
            >
              {isCurrentTier('pro') ? 'Current Plan' : 'Select Plan'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
