
import React from "react";
import { DriverHeader } from "@/components/DriverHeader";
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
  jobId: z.string().optional(),
  companyName: z.string().optional(),
  relevanceRating: z.enum(["1", "2", "3", "4", "5"]),
  compensationRating: z.enum(["1", "2", "3", "4", "5"]),
  scheduleRating: z.enum(["1", "2", "3", "4", "5"]),
  locationRating: z.enum(["1", "2", "3", "4", "5"]),
  overallMatchRating: z.enum(["1", "2", "3", "4", "5"]),
  jobPreferences: z.array(z.string()).optional(),
  otherPreferences: z.string().optional(),
  mismatchReasons: z.string().optional(),
  improvementSuggestions: z.string().optional(),
  additionalNotes: z.string().optional(),
  permissionToUseData: z.boolean().default(true)
});

const jobPreferenceOptions = [
  { id: "local", label: "Local routes only" },
  { id: "long-haul", label: "Long-haul routes" },
  { id: "international", label: "International routes" },
  { id: "hazmat", label: "Hazardous materials transport" },
  { id: "refrigerated", label: "Refrigerated transport" },
  { id: "weekday-only", label: "Weekday shifts only" },
  { id: "flexible-hours", label: "Flexible hours" },
  { id: "consistent-schedule", label: "Consistent schedule" },
  { id: "benefits", label: "Comprehensive benefits" },
  { id: "career-growth", label: "Career growth opportunities" },
];

const DriverFeedback = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      relevanceRating: "3",
      compensationRating: "3",
      scheduleRating: "3",
      locationRating: "3",
      overallMatchRating: "3",
      jobPreferences: [],
      permissionToUseData: true
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback! It will help improve our AI job matching.",
    });
    form.reset({
      relevanceRating: "3",
      compensationRating: "3",
      scheduleRating: "3",
      locationRating: "3",
      overallMatchRating: "3",
      jobPreferences: [],
      permissionToUseData: true
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DriverHeader />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Match Feedback</h1>
            <p className="text-gray-600 mb-6">
              Help us improve our AI job matching system by providing feedback on the quality of job matches.
              This information will only be used to train our AI and won't be shared with the companies.
            </p>
            
            <Alert className="mb-6 bg-purple-50 border-purple-200">
              <AlertCircle className="h-4 w-4 text-purple-600" />
              <AlertTitle className="text-purple-800">Privacy Notice</AlertTitle>
              <AlertDescription className="text-purple-700">
                Your feedback is confidential and will only be used to improve our AI matching algorithm.
                It will not be shared with companies or other drivers. You can view and modify your feedback at any time.
              </AlertDescription>
            </Alert>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="jobId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job ID (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter job ID" {...field} />
                        </FormControl>
                        <FormDescription>
                          If you're providing feedback about a specific job, enter its ID.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormDescription>
                          If you're providing feedback about a specific company, enter its name.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="relevanceRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Job Relevance</FormLabel>
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
                          How relevant was the job to your skills and experience?
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="compensationRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Compensation Match</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div key={rating} className="flex items-center space-x-2">
                                <RadioGroupItem value={rating.toString()} id={`compensation-${rating}`} />
                                <label htmlFor={`compensation-${rating}`} className="text-sm">
                                  {rating}: {getRatingLabel(rating)}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          How well did the compensation align with your expectations?
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="scheduleRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Schedule/Hours Match</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div key={rating} className="flex items-center space-x-2">
                                <RadioGroupItem value={rating.toString()} id={`schedule-${rating}`} />
                                <label htmlFor={`schedule-${rating}`} className="text-sm">
                                  {rating}: {getRatingLabel(rating)}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          How well did the schedule/hours match your preferences?
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="locationRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Location/Route Match</FormLabel>
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
                          How suitable was the job location or route?
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
                        How would you rate the overall job match quality? (1: Poor, 5: Excellent)
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobPreferences"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Job Preferences Not Considered</FormLabel>
                        <FormDescription>
                          Select any preferences that you feel weren't properly considered in the matching.
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {jobPreferenceOptions.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="jobPreferences"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value || [], item.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="otherPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other Preferences</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any other job preferences that weren't considered"
                          {...field}
                          className="min-h-[80px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mismatchReasons"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Reasons for Mismatch</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Why was this job not a good match for you?"
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

export default DriverFeedback;
