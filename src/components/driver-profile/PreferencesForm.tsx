
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, X } from "lucide-react";

// Define schema for preferences form
const preferencesFormSchema = z.object({
  // Job Type Preferences
  jobTypes: z.array(z.string()).min(1, "Select at least one job type"),
  
  // Vehicle Type Preferences
  vehicleTypes: z.array(z.string()).min(1, "Select at least one vehicle type"),
  
  // Geographical Preferences
  location: z.object({
    city: z.string().min(1, "City is required"),
    region: z.string().min(1, "Region/County is required"),
    country: z.string().min(1, "Country is required"),
    radius: z.string().min(1, "Radius is required"),
  }),
  internationalTravel: z.boolean().optional(),
  
  // Work Schedule Preferences
  availability: z.string().min(1, "Select an availability option"),
  shiftPreferences: z.array(z.string()),
  overtimeInterest: z.boolean().optional(),
  
  // Employment Type
  employmentType: z.string().min(1, "Select an employment type"),
  
  // Special Permits/Licenses
  permits: z.array(z.string()),
  
  // Additional Preferences
  compensationType: z.string().min(1, "Select compensation type"),
  minimumRate: z.string().min(1, "Minimum rate is required"),
  currency: z.string().min(1, "Currency is required"),
});

type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

// Job types available in the system
const JOB_TYPES = [
  { value: "taxi", label: "Taxi Driver" },
  { value: "rideshare", label: "Rideshare (Uber/Lyft)" },
  { value: "delivery", label: "Delivery Services" },
  { value: "bus", label: "Bus Driver" },
  { value: "truck", label: "Truck/Lorry Driver" },
  { value: "courier", label: "Courier" },
  { value: "chauffeur", label: "Chauffeur/Private Driver" },
  { value: "moving", label: "Moving Services" },
];

// Vehicle types that can be driven
const VEHICLE_TYPES = [
  { value: "car", label: "Car" },
  { value: "van", label: "Van" },
  { value: "bus", label: "Bus" },
  { value: "minibus", label: "Mini-Bus" },
  { value: "truck", label: "Truck/Lorry" },
  { value: "motorbike", label: "Motorbike" },
  { value: "bicycle", label: "Bicycle" },
];

// Permit types that may be required
const PERMIT_TYPES = [
  { value: "cdl_a", label: "Commercial Driver's License Class A" },
  { value: "cdl_b", label: "Commercial Driver's License Class B" },
  { value: "cdl_c", label: "Commercial Driver's License Class C" },
  { value: "hazmat", label: "Hazardous Materials Endorsement" },
  { value: "passenger", label: "Passenger Transport Endorsement" },
  { value: "taxi", label: "Taxi/Rideshare Permit" },
  { value: "international", label: "International Driving Permit" },
];

// Shift preferences
const SHIFT_TYPES = [
  { value: "morning", label: "Morning Shifts" },
  { value: "afternoon", label: "Afternoon Shifts" },
  { value: "evening", label: "Evening Shifts" },
  { value: "night", label: "Night Shifts" },
  { value: "weekend", label: "Weekend Shifts" },
];

// Common European currencies
const CURRENCIES = [
  { value: "GBP", label: "British Pound (£)" },
  { value: "EUR", label: "Euro (€)" },
  { value: "PLN", label: "Polish Złoty (zł)" },
  { value: "SEK", label: "Swedish Krona (kr)" },
  { value: "NOK", label: "Norwegian Krone (kr)" },
  { value: "DKK", label: "Danish Krone (kr)" },
  { value: "CHF", label: "Swiss Franc (Fr)" },
  { value: "CZK", label: "Czech Koruna (Kč)" },
  { value: "HUF", label: "Hungarian Forint (Ft)" },
];

interface PreferencesFormProps {
  onSubmit: (data: PreferencesFormValues) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<PreferencesFormValues>;
}

export function PreferencesForm({ onSubmit, isSubmitting, defaultValues }: PreferencesFormProps) {
  // Default values for the form
  const formDefaultValues: Partial<PreferencesFormValues> = {
    jobTypes: [],
    vehicleTypes: [],
    location: {
      city: "",
      region: "",
      country: "United Kingdom",
      radius: "25",
    },
    internationalTravel: false,
    availability: "",
    shiftPreferences: [],
    overtimeInterest: false,
    employmentType: "",
    permits: [],
    compensationType: "hourly",
    minimumRate: "",
    currency: "GBP",
    ...defaultValues,
  };

  const form = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: formDefaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Job Types Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Job Types</h3>
          <FormField
            control={form.control}
            name="jobTypes"
            render={() => (
              <FormItem>
                <FormLabel>What type of driving work are you interested in?</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {JOB_TYPES.map((jobType) => (
                    <FormField
                      key={jobType.value}
                      control={form.control}
                      name="jobTypes"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={jobType.value}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(jobType.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, jobType.value])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== jobType.value)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{jobType.label}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Vehicle Types Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Vehicle Types</h3>
          <FormField
            control={form.control}
            name="vehicleTypes"
            render={() => (
              <FormItem>
                <FormLabel>What types of vehicles are you able to drive?</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {VEHICLE_TYPES.map((vehicleType) => (
                    <FormField
                      key={vehicleType.value}
                      control={form.control}
                      name="vehicleTypes"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={vehicleType.value}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(vehicleType.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, vehicleType.value])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== vehicleType.value)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{vehicleType.label}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Geographical Preferences */}
        <div>
          <h3 className="text-lg font-medium mb-4">Location Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region/County</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter region or county" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Spain">Spain</SelectItem>
                      <SelectItem value="Italy">Italy</SelectItem>
                      <SelectItem value="Netherlands">Netherlands</SelectItem>
                      <SelectItem value="Belgium">Belgium</SelectItem>
                      <SelectItem value="Poland">Poland</SelectItem>
                      <SelectItem value="Sweden">Sweden</SelectItem>
                      <SelectItem value="Other">Other European Country</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="mt-4">
            <FormField
              control={form.control}
              name="location.radius"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum distance willing to travel (km)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select distance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="10">10 km</SelectItem>
                      <SelectItem value="25">25 km</SelectItem>
                      <SelectItem value="50">50 km</SelectItem>
                      <SelectItem value="100">100 km</SelectItem>
                      <SelectItem value="200">200+ km</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="mt-4">
            <FormField
              control={form.control}
              name="internationalTravel"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I am interested in international driving opportunities
                    </FormLabel>
                    <FormDescription>
                      This may require additional permits and documentation
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Employment Type */}
        <div>
          <h3 className="text-lg font-medium mb-4">Employment Type</h3>
          <FormField
            control={form.control}
            name="employmentType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What type of employment are you looking for?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="permanent" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Permanent Employment (Company Employee)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="freelance" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Freelance/Self-Employed/Contractor
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="either" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Open to both options
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Work Schedule Preferences */}
        <div>
          <h3 className="text-lg font-medium mb-4">Work Schedule</h3>
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What is your preferred work schedule?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="full_time" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Full-time (40+ hours per week)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="part_time" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Part-time (Less than 40 hours per week)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="flexible" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Flexible (Varies week to week)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="weekends" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Weekends only
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Shift Type Preferences */}
          <div className="mt-6">
            <FormField
              control={form.control}
              name="shiftPreferences"
              render={() => (
                <FormItem>
                  <FormLabel>What shifts are you willing to work?</FormLabel>
                  <FormDescription>Select all that apply</FormDescription>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    {SHIFT_TYPES.map((shiftType) => (
                      <FormField
                        key={shiftType.value}
                        control={form.control}
                        name="shiftPreferences"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={shiftType.value}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(shiftType.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, shiftType.value])
                                      : field.onChange(
                                          field.value?.filter((value) => value !== shiftType.value)
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{shiftType.label}</FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Overtime Preference */}
          <div className="mt-4">
            <FormField
              control={form.control}
              name="overtimeInterest"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I am interested in overtime opportunities
                    </FormLabel>
                    <FormDescription>
                      This indicates you're willing to work additional hours beyond your regular schedule when needed
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Permits & Licenses */}
        <div>
          <h3 className="text-lg font-medium mb-4">Professional Permits & Licenses</h3>
          <FormField
            control={form.control}
            name="permits"
            render={() => (
              <FormItem>
                <FormLabel>Please select all permits and licenses you currently hold:</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {PERMIT_TYPES.map((permit) => (
                    <FormField
                      key={permit.value}
                      control={form.control}
                      name="permits"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={permit.value}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(permit.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, permit.value])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== permit.value)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{permit.label}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormDescription className="mt-2">
                  Note: You don't need to upload permit documentation now. Hiring companies will verify these during the application process.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

        {/* Compensation */}
        <div>
          <h3 className="text-lg font-medium mb-4">Compensation</h3>
          
          <FormField
            control={form.control}
            name="compensationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred compensation structure</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select compensation type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                    <SelectItem value="daily">Daily Rate</SelectItem>
                    <SelectItem value="annual">Annual Salary</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="minimumRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum expected rate</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter minimum rate"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This helps us match you with jobs that meet your compensation requirements
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CURRENCIES.map(currency => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" disabled={isSubmitting}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Check className="mr-2 h-4 w-4" /> Save Preferences
          </Button>
        </div>
      </form>
    </Form>
  );
}
