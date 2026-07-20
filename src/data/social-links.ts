import { Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import type { SocialLink } from "@/types";
import { siteConfig } from "@/config/site";

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: siteConfig.links.github, icon: SiGithub },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: FaLinkedin },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];
