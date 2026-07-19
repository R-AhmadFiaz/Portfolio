"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";
import { stats } from "@/data/stats";

export function Statistics() {
  return (
    <section className="relative border-y border-border/60 bg-muted/20 py-20">
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="flex flex-col items-center gap-2 text-center"
          >
            <stat.icon className="size-5 text-brand" />
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            />
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
