
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Linkedin, Facebook, Instagram, Twitter } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { DriverFormValues } from "./DriverRegistrationSchema";

interface SocialMediaSectionProps {
  form: UseFormReturn<DriverFormValues>;
}

export function SocialMediaSection({ form }: SocialMediaSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Social Media Links (Optional)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebookUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Facebook className="h-4 w-4" />
                Facebook
              </FormLabel>
              <FormControl>
                <Input placeholder="https://facebook.com/yourprofile" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagramUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                Instagram
              </FormLabel>
              <FormControl>
                <Input placeholder="https://instagram.com/yourprofile" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitterUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter
              </FormLabel>
              <FormControl>
                <Input placeholder="https://twitter.com/yourprofile" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
