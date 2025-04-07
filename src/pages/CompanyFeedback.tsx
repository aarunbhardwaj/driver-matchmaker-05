
import React from "react";
import { CompanyHeader } from "@/components/CompanyHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const formSchema = z.object({
  applicantId: z.string().optional(),
  relevanceRating: z.enum(["1", "2", "3", "4", "5"]),
  skillsMatchRating: z.enum(["1", "2", "3", "4", "5"]),
  experienceMatchRating: z.enum(["1", "2", "3", "4", "5"]),
  locationMatchRating: z.enum(["1", "2", "3", "4", "5"]),
  overallMatchRating: z.enum(["1", "2", "3", "4", "5"]),
  missingSkills: z.string().optional(),
  irrelevantSkills: z.string().optional(),
  improvementSuggestions: z.string().optional(),
  additionalNotes: z.string().optional(),
  permissionToUseData: z.boolean().default(true)
});

const CompanyFeedback = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      relevanceRating: "3",
      skillsMatchRating: "3",
      experienceMatchRating: "3",
      locationMatchRating: "3",
      overallMatchRating: "3",
      permissionToUseData: true
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback! It will help improve our AI matching system.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CompanyHeader />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Applicant Match Feedback</h1>
            <p className="text-gray-600 mb-6">
              Help us improve our AI matching system by providing feedback on the quality of driver matches.
              This information will only be used to train our AI and won't be shared with the drivers.
            </p>
            
            <Alert className="mb-6 bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Privacy Notice</AlertTitle>
              <AlertDescription className="text-blue-700">
                Your feedback is confidential and will only be used to improve our AI matching algorithm.
                It will not be shared with drivers or other companies. You can view and modify your feedback at any time.
              </AlertDescription>
            </Alert>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="applicantId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver ID or Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter driver ID or name" {...field} />
                      </FormControl>
                      <FormDescription>
                        If you're providing feedback about a specific driver, enter their ID or name.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="relevanceRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Overall Relevance</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div key={rating} className="flex items-center space-x-2">
                                <RadioGroupItem value={rating.toString()} id={`relevance-${rating}`} />
                                <label htmlFor={`relevance-${rating}`} className="text-sm">
                                  {rating}: {getRatingLabel(rating)}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          How relevant was the match to your job posting?
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skillsMatchRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Skills Match</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div key={rating} className="flex items-center space-x-2">
                                <RadioGroupItem value={rating.toString()} id={`skills-${rating}`} />
                                <label htmlFor={`skills-${rating}`} className="text-sm">
                                  {rating}: {getRatingLabel(rating)}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          How well did the driver's skills match your requirements?
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="experienceMatchRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Experience Match</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div key={rating} className="flex items-center space-x-2">
                                <RadioGroupItem value={rating.toString()} id={`experience-${rating}`} />
                                <label htmlFor={`experience-${rating}`} className="text-sm">
                                  {rating}: {getRatingLabel(rating)}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          How suitable was the driver's experience level?
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="locationMatchRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Location/Availability Match</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div key={rating} className="flex items-center space-x-2">
                                <RadioGroupItem value={rating.toString()} id={`location-${rating}`} />
                                <label htmlFor={`location-${rating}`} className="text-sm">
                                  {rating}: {getRatingLabel(rating)}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          How well did the driver's location and availability match your needs?
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="overallMatchRating"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Overall AI Match Quality</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row space-x-3"
                        >
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <div key={rating} className="flex flex-col items-center space-y-1">
                              <RadioGroupItem value={rating.toString()} id={`overall-${rating}`} />
                              <label htmlFor={`overall-${rating}`} className="text-sm">
                                {rating}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        How would you rate the overall match quality? (1: Poor, 5: Excellent)
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Detailed Feedback</h3>
                  
                  <FormField
                    control={form.control}
                    name="missingSkills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Important Skills That Were Missing</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List any important skills that were missing from the match"
                            {...field}
                            className="min-h-[80px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="irrelevantSkills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Irrelevant Skills That Were Emphasized</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List any irrelevant skills that were emphasized in the match"
                            {...field}
                            className="min-h-[80px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="improvementSuggestions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Suggestions to Improve Matching</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What factors should our AI consider more or less in matching?"
                            {...field}
                            className="min-h-[100px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any other feedback about the matching process"
                            {...field}
                            className="min-h-[100px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="permissionToUseData"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 border-t border-gray-200 pt-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I allow DriverMatch to use this feedback to improve the AI matching system
                        </FormLabel>
                        <FormDescription>
                          Your feedback will be kept confidential and only used for AI training purposes.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">Submit Feedback</Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

function getRatingLabel(rating: number) {
  switch (rating) {
    case 1: return "Very Poor";
    case 2: return "Poor";
    case 3: return "Average";
    case 4: return "Good";
    case 5: return "Excellent";
    default: return "";
  }
}

export default CompanyFeedback;
