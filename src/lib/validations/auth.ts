import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// What the server's `authorize()` callback actually receives: the form fields
// plus the reCAPTCHA token obtained client-side at submit time. Kept separate
// from `loginSchema` so the token (not a user-entered field) doesn't leak into
// the React Hook Form-managed shape.
export const credentialsSchema = loginSchema.extend({
  recaptchaToken: z.string().min(1, "reCAPTCHA verification is required"),
});

export type CredentialsValues = z.infer<typeof credentialsSchema>;
