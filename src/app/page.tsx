import { Hero } from "@/components/sections/hero";
import { TechStackMarquee } from "@/components/sections/tech-stack-marquee";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Timeline } from "@/components/sections/timeline";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Statistics } from "@/components/sections/statistics";
import { GithubGraph } from "@/components/sections/github-graph";
import { Terminal } from "@/components/sections/terminal";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStackMarquee />
      <About />
      <Skills />
      <Timeline />
      <FeaturedProjects />
      <Statistics />
      <GithubGraph />
      <Terminal />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
