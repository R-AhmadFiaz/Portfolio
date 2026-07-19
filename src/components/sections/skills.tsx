"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlowCard } from "@/components/shared/glow-card";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { skills, skillCategories } from "@/data/skills";
import { getTechIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

export function Skills() {
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Skills"
        title="The stack I reach for"
        description="Tools I use often enough to have strong, hard-won opinions about."
      />

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActive("all")}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            active === "all"
              ? "border-brand bg-brand/10 text-foreground"
              : "border-border/60 text-muted-foreground hover:text-foreground"
          )}
        >
          All
        </button>
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === cat.id
                ? "border-brand bg-brand/10 text-foreground"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <motion.div
        layout
        variants={staggerContainer(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((skill) => {
            const Icon = getTechIcon(skill.icon);
            return (
              <motion.div
                key={skill.name}
                layout
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <GlowCard className="flex h-full flex-col gap-3 p-4">
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-5 text-brand" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={viewportOnce}
                      transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                    />
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
