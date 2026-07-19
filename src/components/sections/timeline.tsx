"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

const typeIcon = { work: Briefcase, education: GraduationCap, project: Code } as const;

export function Timeline() {
  return (
    <section id="experience" className="relative mx-auto max-w-4xl px-6 py-28">
      <SectionHeading
        eyebrow="Experience"
        title="How I got here"
        description="A few years of self-directed learning, coursework, and shipping real projects."
      />

      <div className="relative mt-16 space-y-10">
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border/70 sm:left-[23px]" />
        {experience.map((item, i) => {
          const Icon = typeIcon[item.type];
          return (
            <motion.div
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ delay: i * 0.05 }}
              className="relative flex gap-6 pl-0"
            >
              <div
                className={cn(
                  "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-background sm:size-12",
                  "border-brand/50 text-brand"
                )}
              >
                <Icon className="size-4 sm:size-5" />
              </div>
              <div className="flex-1 pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-semibold sm:text-lg">{item.role}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{item.period}</span>
                </div>
                <p className="text-sm font-medium text-brand">{item.organization}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                <ul className="mt-3 space-y-1.5">
                  {item.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
