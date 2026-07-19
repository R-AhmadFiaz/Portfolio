"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BentoGrid, sizeToSpan } from "@/components/projects/bento-grid";
import { ProjectCard } from "@/components/projects/project-card";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

export function ProjectsGrid({ projects, tags }: { projects: Project[]; tags: string[] }) {
  const [activeTag, setActiveTag] = useState<string>("All");

  const filtered = useMemo(
    () =>
      activeTag === "All" ? projects : projects.filter((p) => p.tags.includes(activeTag)),
    [projects, activeTag]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {["All", ...tags].map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              activeTag === tag
                ? "border-brand bg-brand/10 text-foreground"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-12">
        <BentoGrid>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.95 }}
                className={sizeToSpan[project.size ?? "sm"]}
              >
                <ProjectCard project={project} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </BentoGrid>
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">
          No projects found for &ldquo;{activeTag}&rdquo;.
        </p>
      )}
    </div>
  );
}
