"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlowCard } from "@/components/shared/glow-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Testimonials"
        title="What people say after working with me"
        description="A few words from founders, product leads, and mentors I've worked with."
      />

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-16 grid gap-5 sm:grid-cols-2"
      >
        {testimonials.map((t) => (
          <motion.div key={t.id} variants={fadeUp}>
            <GlowCard className="flex h-full flex-col gap-5 p-6">
              <Quote className="size-6 text-brand/60" />
              <p className="flex-1 text-pretty text-sm leading-relaxed text-foreground/90 sm:text-base">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="size-10 border border-border/60">
                  <AvatarFallback className="bg-brand/10 text-xs font-semibold text-brand">
                    {t.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
