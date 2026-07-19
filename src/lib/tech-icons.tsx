import type { ComponentType } from "react";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiDocker,
  SiGithub,
  SiVercel,
  SiFigma,
  SiJest,
} from "react-icons/si";
import { Braces } from "lucide-react";

export type TechIcon = ComponentType<{ className?: string }>;

export const techIconMap: Record<string, TechIcon> = {
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  framer: SiFramer,
  redux: SiRedux,
  nodejs: SiNodedotjs,
  express: SiExpress,
  python: SiPython,
  api: Braces,
  graphql: SiGraphql,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,
  prisma: SiPrisma,
  docker: SiDocker,
  github: SiGithub,
  vercel: SiVercel,
  figma: SiFigma,
  jest: SiJest,
};

export function getTechIcon(key: string): TechIcon {
  return techIconMap[key] ?? Braces;
}
