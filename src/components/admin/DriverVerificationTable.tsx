
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Shield, ShieldCheck, ShieldAlert, Clock, MoreHorizontal, FileText, UserCheck, UserX } from "lucide-react";
import { VerificationStatus } from "@/components/driver-profile/VerificationStatus";

// Mock data for demonstration
const verificationRequests = [
  { 
    id: 1, 
    name: "John Smith", 
    email: "john@example.com", 
    requestDate: "2024-04-01", 
    status: "pending" as VerificationStatus,
    documents: ["License", "Address Proof", "Driving Record"]
  },
  { 
    id: 2, 
    name: "Alice Johnson", 
    email: "alice@example.com", 
    requestDate: "2024-03-28", 
    status: "verified" as VerificationStatus,
    documents: ["License", "Address Proof", "Insurance", "Driving Record"]
  },
  { 
    id: 3, 
    name: "Mike Brown", 
    email: "mike@example.com", 
    requestDate: "2024-04-02", 
    status: "pending" as VerificationStatus,
    documents: ["License", "Address Proof"]
  },
  { 
    id: 4, 
    name: "Sarah Wilson", 
    email: "sarah@example.com", 
    requestDate: "2024-04-03", 
    status: "rejected" as VerificationStatus,
    documents: ["License", "Driving Record"]
  },
  { 
    id: 5, 
    name: "David Clark", 
    email: "david@example.com", 
    requestDate: "2024-03-30", 
    status: "pending" as VerificationStatus,
    documents: ["License", "Address Proof", "Driving Record", "Medical Certificate"]
  },
];

export const DriverVerificationTable = () => {
  const [requests, setRequests] = useState(verificationRequests);
  const [selectedRequest, setSelectedRequest] = useState<(typeof verificationRequests)[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleViewRequest = (request: (typeof verificationRequests)[0]) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };
  
  const handleUpdateStatus = (id: number, status: VerificationStatus) => {
    setRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === id ? { ...request, status } : request
      )
    );
    setIsDialogOpen(false);
  };
  
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Driver</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map(request => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.name}</TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>{request.requestDate}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    request.status === "verified" ? "default" : 
                    request.status === "pending" ? "outline" : 
                    request.status === "rejected" ? "destructive" : 
                    "secondary"
                  }
                  className="flex items-center space-x-1 w-fit"
                >
                  {request.status === "verified" && <ShieldCheck className="h-3 w-3 mr-1" />}
                  {request.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                  {request.status === "rejected" && <ShieldAlert className="h-3 w-3 mr-1" />}
                  {request.status === "unverified" && <Shield className="h-3 w-3 mr-1" />}
                  <span>
                    {request.status === "verified" && "Verified"}
                    {request.status === "pending" && "Pending"}
                    {request.status === "rejected" && "Rejected"}
                    {request.status === "unverified" && "Unverified"}
                  </span>
                </Badge>
              </TableCell>
              <TableCell>{request.documents.length} items</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleViewRequest(request)}
                    className="flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-1" /> View
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => handleUpdateStatus(request.id, "verified")}
                        className="flex items-center"
                      >
                        <UserCheck className="h-4 w-4 mr-2" /> Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleUpdateStatus(request.id, "rejected")}
                        className="flex items-center text-destructive"
                      >
                        <UserX className="h-4 w-4 mr-2" /> Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Verification details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle>Verification Request Details</DialogTitle>
                <DialogDescription>
                  Review the driver's verification documents and information.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{selectedRequest.name}</h3>
                  <Badge 
                    variant={
                      selectedRequest.status === "verified" ? "default" : 
                      selectedRequest.status === "pending" ? "outline" : 
                      selectedRequest.status === "rejected" ? "destructive" : 
                      "secondary"
                    }
                  >
                    {selectedRequest.status === "verified" && "Verified"}
                    {selectedRequest.status === "pending" && "Pending"}
                    {selectedRequest.status === "rejected" && "Rejected"}
                    {selectedRequest.status === "unverified" && "Unverified"}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Driver Information</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{selectedRequest.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Request Date:</span>
                        <span>{selectedRequest.requestDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Submitted Documents</h4>
                    <ul className="text-sm space-y-2">
                      {selectedRequest.documents.map((doc, index) => (
                        <li key={index} className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{doc}</span>
                          <Button variant="link" size="sm" className="ml-auto">
                            View
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button 
                  variant="secondary" 
                  onClick={() => setIsDialogOpen(false)}
                  className="sm:w-auto w-full"
                >
                  Close
                </Button>
                <Button 
                  onClick={() => handleUpdateStatus(selectedRequest.id, "verified")}
                  className="sm:w-auto w-full"
                >
                  Approve Verification
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleUpdateStatus(selectedRequest.id, "rejected")}
                  className="sm:w-auto w-full"
                >
                  Reject
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
