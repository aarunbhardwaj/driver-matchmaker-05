
import * as z from "zod";

// Define the form schema with Zod
export const driverFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  licenseType: z.string().min(1, "License type is required"),
  experience: z.string().min(1, "Years of experience is required"),
  skills: z.string(),
  availability: z.string(),
  linkedinUrl: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  facebookUrl: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  instagramUrl: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  twitterUrl: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  cvFile: z.any().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type DriverFormValues = z.infer<typeof driverFormSchema>;

export const defaultValues: Partial<DriverFormValues> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  licenseType: "",
  experience: "",
  skills: "",
  availability: "",
  linkedinUrl: "",
  facebookUrl: "",
  instagramUrl: "",
  twitterUrl: "",
  termsAccepted: false,
};
