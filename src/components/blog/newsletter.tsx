"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { newsletterSchema, type NewsletterValues } from "@/lib/validations/newsletter";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (values: NewsletterValues) => {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      toast.success("You're subscribed! Welcome aboard.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-8 text-center sm:p-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(500px circle at 50% 0%, color-mix(in oklch, var(--brand) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">
        <Mail className="mx-auto size-6 text-brand" />
        <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Get new articles in your inbox
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Occasional writing on Next.js, performance, and design engineering. No spam.
        </p>

        {submitted ? (
          <p className="mt-6 text-sm font-medium text-brand">
            Thanks for subscribing — check your inbox to confirm.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mx-auto mt-6 flex max-w-sm flex-col gap-3 sm:flex-row"
          >
            <div className="flex-1 text-left">
              <Input
                type="email"
                placeholder="you@example.com"
                className="rounded-full"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 pl-3 text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isSubmitting} className="rounded-full">
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : "Subscribe"}
            </Button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
