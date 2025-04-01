
import { Link } from "react-router-dom";
import { Truck, ArrowLeft, User } from "lucide-react";

export function RegistrationHeader() {
  return (
    <>
      <header className="p-4 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Truck className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">DriverMatch</span>
          </Link>
          <Link to="/" className="text-sm flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
        </div>
      </header>

      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <User className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Driver Registration</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Create your driver profile and get matched with the perfect logistics job opportunities.
        </p>
      </div>
    </>
  );
}
