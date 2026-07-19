import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, User } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { GlowCard } from "@/components/shared/glow-card";
import { buildMetadata } from "@/lib/metadata";
import { getGradient } from "@/lib/gradients";
import { cn } from "@/lib/utils";
import { projects, getProjectBySlug } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return buildMetadata({ title: "Project Not Found", noIndex: true });

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <article className="relative">
      <div
        className={cn(
          "relative flex h-[45vh] min-h-[320px] items-end justify-center overflow-hidden bg-gradient-to-br pt-32",
          getGradient(project.coverImage)
        )}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative mx-auto w-full max-w-5xl px-6 pb-14 text-white">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" /> Back to projects
          </Link>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-white/85 sm:text-lg">
            {project.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} className="rounded-full border-white/30 bg-white/10 text-white">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">The Problem</h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {project.problem}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">The Solution</h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {project.solution}
            </p>
          </section>

          {project.metrics && (
            <section className="grid grid-cols-3 gap-4">
              {project.metrics.map((metric) => (
                <GlowCard key={metric.label} className="p-5 text-center">
                  <p className="text-2xl font-semibold text-brand sm:text-3xl">{metric.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
                </GlowCard>
              ))}
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <GlowCard className="space-y-5 p-6">
            <div className="flex items-center gap-3 text-sm">
              <User className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">Role</span>
              <span className="ml-auto font-medium">{project.role}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">Year</span>
              <span className="ml-auto font-medium">{project.year}</span>
            </div>
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="rounded-full font-normal">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              {project.liveUrl && (
                <Button asChild className="rounded-full">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Visit Live Site <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline" className="rounded-full">
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <SiGithub className="size-4" /> View Source
                  </a>
                </Button>
              )}
            </div>
          </GlowCard>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <h2 className="text-xl font-semibold">More projects</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} className="h-[280px]" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
