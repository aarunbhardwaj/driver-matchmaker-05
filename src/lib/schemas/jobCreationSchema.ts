
import * as z from "zod";

export const jobCreationSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters").max(100),
  location: z.string().min(2, "Location must be at least 2 characters"),
  jobType: z.enum(["full-time", "part-time", "contract", "temporary"]),
  employmentType: z.enum(["permanent", "temporary", "seasonal", "internship"]),
  vehicleTypes: z.array(z.string()).min(1, "Select at least one vehicle type"),
  drivingExperience: z.number().min(0, "Experience cannot be negative"),
  salaryMin: z.number().min(0, "Salary cannot be negative").optional(),
  salaryMax: z.number().min(0, "Salary cannot be negative").optional(),
  description: z.string().min(20, "Job description must be at least 20 characters"),
  requirements: z.string().min(10, "Requirements must be at least 10 characters"),
  benefits: z.string().optional(),
  applicationDeadline: z.date().optional(),
  startDate: z.date().optional(),
});

export type JobCreationValues = z.infer<typeof jobCreationSchema>;
