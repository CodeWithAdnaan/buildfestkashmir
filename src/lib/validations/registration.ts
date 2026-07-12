import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email"),
  college: z.string().trim().min(2, "Enter your college name").max(100),
  branch: z.string().trim().min(2, "Enter your branch / course").max(80),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"], {
    message: "Select your experience level",
  }),
  teamName: z.string().trim().max(60).optional().or(z.literal("")),
  githubUrl: z
    .string()
    .trim()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  linkedinUrl: z
    .string()
    .trim()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  discordHandle: z.string().trim().max(40).optional().or(z.literal("")),
});

export type RegistrationValues = z.infer<typeof registrationSchema>;

export const registrationStepFields: Record<number, (keyof RegistrationValues)[]> = {
  0: ["fullName", "email"],
  1: ["college", "branch", "experienceLevel"],
  2: ["teamName", "githubUrl", "linkedinUrl", "discordHandle"],
};

export const registrationDefaultValues: RegistrationValues = {
  fullName: "",
  email: "",
  college: "",
  branch: "",
  experienceLevel: "beginner",
  teamName: "",
  githubUrl: "",
  linkedinUrl: "",
  discordHandle: "",
};
