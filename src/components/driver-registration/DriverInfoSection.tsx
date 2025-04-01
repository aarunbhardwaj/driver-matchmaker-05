
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { DriverFormValues } from "./DriverRegistrationSchema";

interface DriverInfoSectionProps {
  form: UseFormReturn<DriverFormValues>;
}

export function DriverInfoSection({ form }: DriverInfoSectionProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="licenseType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver's License Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Class A, Class B, CDL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 5 years" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Skills</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe any special skills or certifications (hazmat, tanker, etc.)" 
                className="resize-none h-20"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="availability"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Availability & Preferences</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your availability and job preferences (full-time, part-time, regional, long-haul, etc.)" 
                className="resize-none h-20"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
