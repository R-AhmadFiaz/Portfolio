import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { AuroraBackground } from "@/components/shared/aurora-background";
import { buildMetadata } from "@/lib/metadata";
import { projects, getAllProjectTags } from "@/data/projects";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "A collection of full stack projects — SaaS dashboards, e-commerce storefronts, and real-time collaborative tools built by Rana Ahmad Fiaz.",
  path: "/projects",
});

export default function ProjectsPage() {
  const tags = getAllProjectTags();

  return (
    <div className="relative">
      <div className="relative mx-auto max-w-6xl px-6 pt-40 pb-8">
        <AuroraBackground className="opacity-70" />
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects"
          description="Every project here shipped to real users — client work, side projects, and everything in between."
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-28">
        <ProjectsGrid projects={projects} tags={tags} />
      </div>
    </div>
  );
}
