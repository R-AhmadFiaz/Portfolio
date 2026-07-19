"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { BentoGrid, sizeToSpan } from "@/components/projects/bento-grid";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { getFeaturedProjects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects I'm proud of"
        description="A mix of client work and self-directed builds — each one solving a real problem end to end."
      />

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-16"
      >
        <BentoGrid>
          {featured.map((project) => (
            <motion.div
              key={project.slug}
              variants={fadeUp}
              className={sizeToSpan[project.size ?? "sm"]}
            >
              <ProjectCard project={project} className="h-full" />
            </motion.div>
          ))}
        </BentoGrid>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 flex justify-center"
      >
        <Button asChild variant="outline" size="lg" className="group rounded-full">
          <Link href="/projects">
            View all projects
            <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
