import { generateContributions } from "@/lib/contribution-data";
import { GithubGraphGrid } from "@/components/sections/github-graph-grid";
import { SectionHeading } from "@/components/shared/section-heading";

export function GithubGraph() {
  const weeks = generateContributions(52);
  const totalContributions = weeks.flat().reduce((sum, day) => sum + day.count, 0);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Open Source"
        title="Building in public"
        description={`${totalContributions.toLocaleString()} contributions in the last year across personal projects and open source.`}
      />

      <div className="mt-14 overflow-x-auto rounded-2xl border border-border/60 bg-card/40 p-6">
        <GithubGraphGrid weeks={weeks} />
      </div>
    </section>
  );
}
