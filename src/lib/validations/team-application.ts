import { z } from "zod";

export const teamApplicationSchema = z.object({
  role: z.string().min(1),
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email"),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more — at least 20 characters")
    .max(1000, "Keep it under 1000 characters"),
});

export type TeamApplicationValues = z.infer<typeof teamApplicationSchema>;

export const teamApplicationDefaultValues: Omit<TeamApplicationValues, "role"> = {
  fullName: "",
  email: "",
  message: "",
};
