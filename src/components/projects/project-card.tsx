import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { GlowCard } from "@/components/shared/glow-card";
import { Badge } from "@/components/ui/badge";
import { getGradient } from "@/lib/gradients";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <GlowCard tilt className={cn("flex h-full flex-col", className)}>
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col">
        <div
          className={cn(
            "relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br",
            getGradient(project.coverImage)
          )}
        >
          <span className="select-none font-mono text-5xl font-bold text-white/25 sm:text-6xl">
            {project.title
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)}
          </span>
          <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute right-3 top-3 flex gap-2">
            {project.githubUrl && (
              <span className="flex size-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm">
                <SiGithub className="size-4" />
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 border-t border-border/60 bg-card/80 p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold tracking-tight">{project.title}</h3>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{project.summary}</p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.stack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="rounded-full text-[11px] font-normal">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </GlowCard>
  );
}
