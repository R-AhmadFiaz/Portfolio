"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Script from "next/script";
import { Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const ERROR_MESSAGES: Record<string, string> = {
  rate_limited: "Too many login attempts. Please wait 15 minutes and try again.",
  recaptcha_failed: "We couldn't verify you're human. Please try again.",
};

function getRecaptchaToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!RECAPTCHA_SITE_KEY) {
      reject(new Error("reCAPTCHA is not configured."));
      return;
    }
    if (typeof window === "undefined" || !window.grecaptcha) {
      reject(new Error("reCAPTCHA has not loaded yet."));
      return;
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "login" }).then(resolve, reject);
    });
  });
}

export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let recaptchaToken: string;
      try {
        recaptchaToken = await getRecaptchaToken();
      } catch {
        toast.error("We couldn't verify you're human. Please refresh the page and try again.");
        return;
      }

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        recaptchaToken,
        redirect: false,
      });

      if (result?.error) {
        const message = (result.code && ERROR_MESSAGES[result.code]) || "Invalid email or password.";
        toast.error(message);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Admin login</CardTitle>
          <CardDescription>Sign in to view contact submissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-busy={isSubmitting}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p role="alert" className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              {errors.password && (
                <p role="alert" className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Signing in...
                </>
              ) : (
                <>
                  <LogIn className="size-4" /> Sign in
                </>
              )}
            </Button>

            {RECAPTCHA_SITE_KEY && (
              <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
                This site is protected by reCAPTCHA and the Google{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </>
  );
}
