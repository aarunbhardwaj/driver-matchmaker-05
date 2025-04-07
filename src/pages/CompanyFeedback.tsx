
import React from "react";
import { CompanyHeader } from "@/components/CompanyHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    <div className="min-h-screen flex flex-col bg-[#f9f9fe]">
      <CompanyHeader />
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
            <h1 className="text-3xl font-bold text-[#3a1078] mb-4">Applicant Match Feedback</h1>
            <div className="h-1 w-24 bg-[#3a1078] mb-8 rounded-full"></div>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Help us improve our AI matching system by providing feedback on the quality of driver matches.
              This information will only be used to train our AI and won't be shared with the drivers.
            </p>
            
            <Alert className="mb-8 bg-[#f0eafc] border-[#d4c7f9] rounded-xl">
              <AlertCircle className="h-5 w-5 text-[#3a1078]" />
              <AlertTitle className="text-[#3a1078] font-semibold text-lg">Privacy Notice</AlertTitle>
              <AlertDescription className="text-[#6048ba]">
                Your feedback is confidential and will only be used to improve our AI matching algorithm.
                It will not be shared with drivers or other companies. You can view and modify your feedback at any time.
              </AlertDescription>
            </Alert>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="applicantId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#3a1078] text-base font-medium">Driver ID or Name (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter driver ID or name" 
                          {...field} 
                          className="rounded-xl border-[#d4c7f9] focus-visible:ring-[#3a1078]"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        If you're providing feedback about a specific driver, enter their ID or name.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="relevanceRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3 bg-[#f9f9fe] p-6 rounded-xl border border-[#eeeefe]">
                        <FormLabel className="text-[#3a1078] text-base font-medium">Overall Relevance</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div key={rating} className="flex items-center space-x-3">
                                <RadioGroupItem 
                                  value={rating.toString()} 
                                  id={`relevance-${rating}`}
                                  className="text-[#3a1078] border-[#d4c7f9]"
                                />
                                <label htmlFor={`relevance-${rating}`} className="text-base font-medium">
                                  {rating}: {getRatingLabel(rating)}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          How relevant was the match to your job posting?
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skillsMatchRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3 bg-[#f9f9fe] p-6 rounded-xl border border-[#eeeefe]">
                        <FormLabel className="text-[#3a1078] text-base font-medium">Skills Match</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div key={rating} className="flex items-center space-x-3">
                                <RadioGroupItem 
                                  value={rating.toString()} 
                                  id={`skills-${rating}`}
                                  className="text-[#3a1078] border-[#d4c7f9]"
                                />
                                <label htmlFor={`skills-${rating}`} className="text-base font-medium">
                                  {rating}: {getRatingLabel(rating)}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          How well did the driver's skills match your requirements?
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="experienceMatchRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3 bg-[#f9f9fe] p-6 rounded-xl border border-[#eeeefe]">
                        <FormLabel className="text-[#3a1078] text-base font-medium">Experience Match</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div key={rating} className="flex items-center space-x-3">
                                <RadioGroupItem 
                                  value={rating.toString()} 
                                  id={`experience-${rating}`}
                                  className="text-[#3a1078] border-[#d4c7f9]"
                                />
                                <label htmlFor={`experience-${rating}`} className="text-base font-medium">
                                  {rating}: {getRatingLabel(rating)}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          How suitable was the driver's experience level?
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="locationMatchRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3 bg-[#f9f9fe] p-6 rounded-xl border border-[#eeeefe]">
                        <FormLabel className="text-[#3a1078] text-base font-medium">Location/Availability Match</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div key={rating} className="flex items-center space-x-3">
                                <RadioGroupItem 
                                  value={rating.toString()} 
                                  id={`location-${rating}`}
                                  className="text-[#3a1078] border-[#d4c7f9]"
                                />
                                <label htmlFor={`location-${rating}`} className="text-base font-medium">
                                  {rating}: {getRatingLabel(rating)}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormDescription className="text-gray-500">
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
                    <FormItem className="space-y-4 bg-[#f0eafc] p-6 rounded-xl border border-[#d4c7f9]">
                      <FormLabel className="text-[#3a1078] text-xl font-semibold">Overall AI Match Quality</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row justify-between space-x-2 max-w-md mx-auto"
                        >
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <div key={rating} className="flex flex-col items-center space-y-2">
                              <RadioGroupItem 
                                value={rating.toString()} 
                                id={`overall-${rating}`}
                                className="h-12 w-12 text-[#3a1078] border-[#d4c7f9] before:w-8 before:h-8"
                              />
                              <label htmlFor={`overall-${rating}`} className="text-lg font-medium text-[#3a1078]">
                                {rating}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormDescription className="text-center text-[#6048ba] text-base">
                        How would you rate the overall match quality? (1: Poor, 5: Excellent)
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <div className="space-y-6 bg-white p-6 rounded-xl border border-[#eeeefe]">
                  <h3 className="text-xl font-semibold text-[#3a1078]">Detailed Feedback</h3>
                  
                  <FormField
                    control={form.control}
                    name="missingSkills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#3a1078] text-base font-medium">Important Skills That Were Missing</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List any important skills that were missing from the match"
                            {...field}
                            className="min-h-[120px] rounded-xl border-[#d4c7f9] focus-visible:ring-[#3a1078]"
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
                        <FormLabel className="text-[#3a1078] text-base font-medium">Irrelevant Skills That Were Emphasized</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List any irrelevant skills that were emphasized in the match"
                            {...field}
                            className="min-h-[120px] rounded-xl border-[#d4c7f9] focus-visible:ring-[#3a1078]"
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
                        <FormLabel className="text-[#3a1078] text-base font-medium">Suggestions to Improve Matching</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What factors should our AI consider more or less in matching?"
                            {...field}
                            className="min-h-[120px] rounded-xl border-[#d4c7f9] focus-visible:ring-[#3a1078]"
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
                        <FormLabel className="text-[#3a1078] text-base font-medium">Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any other feedback about the matching process"
                            {...field}
                            className="min-h-[120px] rounded-xl border-[#d4c7f9] focus-visible:ring-[#3a1078]"
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 border-t border-[#eeeefe] pt-8">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="text-[#3a1078] border-[#d4c7f9]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-base">
                          I allow DriverMatch to use this feedback to improve the AI matching system
                        </FormLabel>
                        <FormDescription>
                          Your feedback will be kept confidential and only used for AI training purposes.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-[#3a1078] hover:bg-[#4f2f9f] text-lg py-6 rounded-xl"
                >
                  Submit Feedback
                </Button>
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
