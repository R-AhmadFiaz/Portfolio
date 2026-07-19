import type { LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

export type Icon = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  role: string;
  year: string;
  featured: boolean;
  coverImage: string;
  images: string[];
  tags: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  metrics?: { label: string; value: string }[];
  size?: "sm" | "md" | "lg" | "wide" | "tall";
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  coverImage: string;
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "database" | "devops" | "tools";
  level: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  achievements: string[];
  type: "work" | "education" | "project";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: Icon;
}
