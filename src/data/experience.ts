import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "exp-5",
    role: "Freelance Full Stack Developer",
    organization: "Self-Employed",
    period: "2024 — Present",
    description:
      "Building production web applications for clients using Next.js, TypeScript, and modern cloud infrastructure.",
    achievements: [
      "Delivered 6+ client projects spanning SaaS dashboards, marketing sites, and internal tools",
      "Reduced average page load time by 40% through image optimization and code splitting",
      "Set up CI/CD pipelines and automated deployments on Vercel for every engagement",
    ],
    type: "work",
  },
  {
    id: "exp-4",
    role: "Open Source Contributor",
    organization: "Independent",
    period: "2023 — Present",
    description:
      "Contributing to developer tooling and UI libraries in the React ecosystem.",
    achievements: [
      "Merged pull requests improving accessibility across community component libraries",
      "Authored reusable animation utilities adopted in several side projects",
    ],
    type: "project",
  },
  {
    id: "exp-3",
    role: "Frontend Developer Intern",
    organization: "Local Tech Startup",
    period: "Summer 2023",
    description:
      "Worked within a small product team shipping features for a B2B analytics platform.",
    achievements: [
      "Built a reusable component library that cut new feature development time by 25%",
      "Implemented dark mode and responsive layouts across the entire dashboard",
    ],
    type: "work",
  },
  {
    id: "exp-2",
    role: "BS Computer Science",
    organization: "University",
    period: "2022 — 2026 (Expected)",
    description:
      "Coursework in data structures, algorithms, databases, and distributed systems.",
    achievements: [
      "Maintained a strong academic record while building production side projects",
      "Led a 4-person team to build a campus event platform as a capstone project",
    ],
    type: "education",
  },
  {
    id: "exp-1",
    role: "First Lines of Code",
    organization: "Self-Taught",
    period: "2021",
    description:
      "Started programming with Python and JavaScript, quickly moving into web development.",
    achievements: [
      "Built and shipped first static website within the first month",
      "Discovered a passion for turning designs into interactive, performant interfaces",
    ],
    type: "project",
  },
];
