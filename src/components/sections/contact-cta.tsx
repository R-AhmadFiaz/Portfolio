"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/magnetic-button";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { siteConfig } from "@/config/site";

export function ContactCTA() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 px-6 py-20 text-center sm:px-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(600px circle at 50% 0%, color-mix(in oklch, var(--brand) 20%, transparent), transparent 70%)",
          }}
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3.5 py-1.5 font-mono text-xs text-muted-foreground">
            <Mail className="size-3.5" />
            {siteConfig.status}
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            Got a project in mind? Let&apos;s build something worth shipping.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground sm:text-lg">
            Whether it&apos;s an internship, a freelance engagement, or just a technical
            question — I usually reply within a day.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Button asChild size="lg" className="group rounded-full pr-4">
                <Link href="/contact">
                  Get in touch
                  <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
