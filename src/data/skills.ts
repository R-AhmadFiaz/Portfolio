import type { SkillItem } from "@/types";

export const skills: SkillItem[] = [
  { name: "TypeScript", icon: "typescript", category: "frontend", level: 92 },
  { name: "React", icon: "react", category: "frontend", level: 95 },
  { name: "Next.js", icon: "nextjs", category: "frontend", level: 93 },
  { name: "Tailwind CSS", icon: "tailwind", category: "frontend", level: 96 },
  { name: "Framer Motion", icon: "framer", category: "frontend", level: 85 },
  { name: "Redux / Zustand", icon: "redux", category: "frontend", level: 80 },
  { name: "Node.js", icon: "nodejs", category: "backend", level: 88 },
  { name: "Express", icon: "express", category: "backend", level: 86 },
  { name: "Python", icon: "python", category: "backend", level: 78 },
  { name: "REST APIs", icon: "api", category: "backend", level: 90 },
  { name: "GraphQL", icon: "graphql", category: "backend", level: 72 },
  { name: "PostgreSQL", icon: "postgresql", category: "database", level: 84 },
  { name: "MongoDB", icon: "mongodb", category: "database", level: 82 },
  { name: "Redis", icon: "redis", category: "database", level: 68 },
  { name: "Prisma", icon: "prisma", category: "database", level: 85 },
  { name: "Docker", icon: "docker", category: "devops", level: 75 },
  { name: "Git & GitHub", icon: "github", category: "tools", level: 94 },
  { name: "Vercel", icon: "vercel", category: "devops", level: 90 },
  { name: "Figma", icon: "figma", category: "tools", level: 76 },
  { name: "Jest / Testing", icon: "jest", category: "tools", level: 70 },
];

export const skillCategories = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "devops", label: "DevOps" },
  { id: "tools", label: "Tools" },
] as const;
