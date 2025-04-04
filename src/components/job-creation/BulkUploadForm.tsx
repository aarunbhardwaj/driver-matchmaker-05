
import { useState } from "react";
import { FileUp, Download, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

export function BulkUploadForm() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadedJobs, setUploadedJobs] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Check if it's an Excel file
      if (selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
          selectedFile.type === "application/vnd.ms-excel") {
        setFile(selectedFile);
        setUploadStatus('idle');
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an Excel file (.xlsx or .xls)",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      // Simulate API call to process the Excel file
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate a successful upload with random number of jobs
      const jobCount = Math.floor(Math.random() * 10) + 1;
      setUploadedJobs(jobCount);
      setUploadStatus('success');
      
      toast({
        title: "Upload Successful!",
        description: `${jobCount} jobs have been uploaded successfully.`,
      });
    } catch (error) {
      console.error("Error uploading jobs:", error);
      setUploadStatus('error');
      
      toast({
        title: "Upload Failed",
        description: "There was a problem uploading your jobs.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const downloadTemplate = () => {
    // In a real application, this would download an Excel template file
    toast({
      title: "Template Downloaded",
      description: "Excel template has been downloaded.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-muted/50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">How to bulk upload jobs</h3>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Download our Excel template using the button below</li>
          <li>Fill in your job details following the format in the template</li>
          <li>Save your Excel file</li>
          <li>Upload your completed file using the upload button</li>
          <li>Review and confirm the upload</li>
        </ol>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={downloadTemplate}
        >
          <Download className="mr-2 h-4 w-4" /> Download Template
        </Button>
      </div>

      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          {file ? (
            <div className="flex items-center justify-center w-full">
              <Card className="w-full">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    {uploadStatus === 'success' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {uploadStatus === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              <FileUp className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">Drag and drop your Excel file</h3>
              <p className="text-sm text-muted-foreground">Or click to browse for files</p>
            </>
          )}

          <div className="flex gap-4">
            <label htmlFor="file-upload">
              <input
                id="file-upload"
                type="file"
                accept=".xlsx,.xls"
                className="sr-only"
                onChange={handleFileChange}
              />
              <Button 
                variant={file ? "outline" : "default"} 
                className="cursor-pointer"
                asChild
              >
                <span>
                  <FileUp className="mr-2 h-4 w-4" />
                  {file ? "Change File" : "Select File"}
                </span>
              </Button>
            </label>

            {file && (
              <Button 
                onClick={handleUpload} 
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Jobs"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {uploadStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
          <div className="flex gap-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <div>
              <h4 className="font-medium text-green-800">Upload successful!</h4>
              <p className="text-green-700">
                {uploadedJobs} job{uploadedJobs !== 1 ? 's' : ''} uploaded successfully. 
                <a href="/company-dashboard" className="font-medium underline ml-1">
                  View your jobs
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
          <div className="flex gap-3">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <div>
              <h4 className="font-medium text-red-800">Upload failed</h4>
              <p className="text-red-700">
                There was an error processing your file. Please check the format and try again.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
