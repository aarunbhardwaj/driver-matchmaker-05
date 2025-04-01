
import { useState } from "react";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { DriverFormValues } from "./DriverRegistrationSchema";

interface CVUploadSectionProps {
  form: UseFormReturn<DriverFormValues>;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
}

export function CVUploadSection({ form, selectedFile, setSelectedFile }: CVUploadSectionProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      form.setValue("cvFile", file);
    }
  };

  return (
    <div className="space-y-2">
      <FormLabel>Resume/CV Upload</FormLabel>
      <div className="border rounded-md p-4 flex flex-col items-center justify-center gap-4 bg-muted/30">
        <div className="bg-primary/10 p-3 rounded-full">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium mb-1">Upload your resume or CV</p>
          <p className="text-xs text-muted-foreground mb-2">PDF, DOC, or DOCX up to 5MB</p>
        </div>
        <div className="relative w-full">
          <Input 
            type="file" 
            id="cv-upload"
            accept=".pdf,.doc,.docx"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
          <Button 
            type="button" 
            variant="outline" 
            className="w-full relative z-10"
          >
            {selectedFile ? 'Change File' : 'Select File'}
          </Button>
        </div>
        {selectedFile && (
          <p className="text-sm text-primary mt-2 w-full truncate text-center">
            {selectedFile.name}
          </p>
        )}
      </div>
    </div>
  );
}
