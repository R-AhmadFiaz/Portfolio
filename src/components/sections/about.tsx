"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Sparkles, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlowCard } from "@/components/shared/glow-card";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { siteConfig } from "@/config/site";

const highlights = [
  {
    icon: GraduationCap,
    title: siteConfig.currentRole,
    description: "Studying computer science while shipping real production software.",
  },
  {
    icon: Rocket,
    title: "Full Stack Developer",
    description: "Comfortable owning a feature from database schema to pixel-perfect UI.",
  },
  {
    icon: MapPin,
    title: siteConfig.location,
    description: "Working with clients and teams across time zones, remote-first.",
  },
  {
    icon: Sparkles,
    title: siteConfig.status,
    description: "Looking for internships and freelance work that raise the bar.",
  },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="About Me"
        title="Engineering thoughtful software, one detail at a time"
        description="I care about the parts of a product most people never notice: the 60fps scroll, the accessible focus ring, the API response that comes back in milliseconds."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          <p>
            I&apos;m Rana Ahmad Fiaz, a full stack developer and computer science student based
            in Lahore, Pakistan. I started writing code out of curiosity and stayed for the
            craft &mdash; the satisfaction of turning an ambiguous idea into an interface that
            feels obvious in hindsight.
          </p>
          <p>
            My focus is the modern React ecosystem: Next.js on the frontend, Node.js and
            PostgreSQL on the backend, and TypeScript holding the whole thing together. I&apos;ve
            shipped SaaS dashboards, e-commerce storefronts, and real-time collaborative tools,
            and I care equally about the engineering underneath and the pixels on top.
          </p>
          <p>
            Outside of client and coursework, I&apos;m usually deep in a side project exploring
            something just out of reach &mdash; real-time sync, AI-assisted tooling, or whatever
            pattern I&apos;m trying to understand by building it myself.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {highlights.map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <GlowCard className="h-full p-5">
                <item.icon className="size-5 text-brand" />
                <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
