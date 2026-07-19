import { Marquee } from "@/components/shared/marquee";
import { getTechIcon } from "@/lib/tech-icons";

const featuredStack = [
  "typescript",
  "react",
  "nextjs",
  "tailwind",
  "nodejs",
  "postgresql",
  "prisma",
  "docker",
  "graphql",
  "vercel",
  "figma",
  "framer",
];

export function TechStackMarquee() {
  return (
    <section className="border-y border-border/60 bg-muted/20 py-8">
      <Marquee>
        {featuredStack.map((key) => {
          const Icon = getTechIcon(key);
          return (
            <div
              key={key}
              className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="size-6" />
              <span className="font-mono text-sm capitalize">{key}</span>
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}
