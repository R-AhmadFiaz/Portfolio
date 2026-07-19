import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Enter a valid email address").max(160),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
  company: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
