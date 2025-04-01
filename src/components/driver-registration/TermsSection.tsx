
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { DriverFormValues } from "./DriverRegistrationSchema";

interface TermsSectionProps {
  form: UseFormReturn<DriverFormValues>;
}

export function TermsSection({ form }: TermsSectionProps) {
  return (
    <FormField
      control={form.control}
      name="termsAccepted"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md border">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              I agree to the{" "}
              <a href="#" className="text-primary underline">
                terms of service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary underline">
                privacy policy
              </a>
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
