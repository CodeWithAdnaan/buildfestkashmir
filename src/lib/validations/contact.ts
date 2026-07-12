import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email"),
  subject: z.string().trim().min(2, "Enter a subject").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Message is a little short")
    .max(2000, "Keep it under 2000 characters"),
});

export type ContactValues = z.infer<typeof contactSchema>;
