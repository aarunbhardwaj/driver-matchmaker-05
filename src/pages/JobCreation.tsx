
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SingleJobForm } from "@/components/job-creation/SingleJobForm";
import { BulkUploadForm } from "@/components/job-creation/BulkUploadForm";
import { CompanyHeader } from "@/components/CompanyHeader";

const JobCreation = () => {
  const [activeTab, setActiveTab] = useState("single");

  return (
    <div className="min-h-screen bg-muted/40">
      <CompanyHeader />
      
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create Job Listings</h1>
          <p className="text-muted-foreground mt-2">
            Post new job opportunities to find the perfect drivers for your company
          </p>
        </div>

        <Tabs 
          defaultValue="single" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
            <TabsTrigger value="single">Single Job</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">Create a Single Job Listing</h2>
              <SingleJobForm />
            </div>
          </TabsContent>
          
          <TabsContent value="bulk" className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">Bulk Upload Job Listings</h2>
              <BulkUploadForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default JobCreation;
