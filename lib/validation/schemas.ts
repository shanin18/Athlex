import { z } from "zod";

/** Shared Zod schemas — reused on the client (forms) and server (actions). */

export const signUpSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
  role: z.enum(["athlete", "sponsor"]),
});
export type SignUpInput = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

export const athleteProfileSchema = z.object({
  displayName: z.string().min(2).max(80),
  headline: z.string().max(120).optional(),
  bio: z.string().max(2000).optional(),
  sportId: z.string().uuid().optional(),
  location: z.string().max(120).optional(),
  careerStage: z.enum(["amateur", "semi_pro", "pro"]).optional(),
  campaignRate: z.coerce.number().min(0).optional(),
});

export const sponsorProfileSchema = z.object({
  companyName: z.string().min(2).max(120),
  description: z.string().max(2000).optional(),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  budgetMin: z.coerce.number().min(0).optional(),
  budgetMax: z.coerce.number().min(0).optional(),
});

export const inquirySchema = z.object({
  recipientId: z.string().uuid(),
  subject: z.string().min(2).max(160),
  message: z.string().min(10).max(4000),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  message: z.string().min(10).max(4000),
});
