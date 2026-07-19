"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Home,
  FolderGit2,
  Newspaper,
  Mail,
  Sun,
  Moon,
  Laptop,
  ArrowRight,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog-posts";
import { siteConfig } from "@/config/site";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || event.key === "/") {
        const target = event.target as HTMLElement;
        if (event.key === "/" && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder="Search pages, projects, posts..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => run(() => router.push("/"))}>
              <Home /> Home
            </CommandItem>
            <CommandItem onSelect={() => run(() => router.push("/projects"))}>
              <FolderGit2 /> Projects
            </CommandItem>
            <CommandItem onSelect={() => run(() => router.push("/blog"))}>
              <Newspaper /> Blog
            </CommandItem>
            <CommandItem onSelect={() => run(() => router.push("/contact"))}>
              <Mail /> Contact
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {projects.slice(0, 5).map((project) => (
              <CommandItem
                key={project.slug}
                onSelect={() => run(() => router.push(`/projects/${project.slug}`))}
              >
                <ArrowRight /> {project.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Blog">
            {blogPosts.slice(0, 5).map((post) => (
              <CommandItem
                key={post.slug}
                onSelect={() => run(() => router.push(`/blog/${post.slug}`))}
              >
                <ArrowRight /> {post.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => run(() => setTheme("light"))}>
              <Sun /> Light
            </CommandItem>
            <CommandItem onSelect={() => run(() => setTheme("dark"))}>
              <Moon /> Dark
            </CommandItem>
            <CommandItem onSelect={() => run(() => setTheme("system"))}>
              <Laptop /> System
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Connect">
            <CommandItem
              onSelect={() => run(() => window.open(siteConfig.links.github, "_blank"))}
            >
              <SiGithub /> GitHub
              <CommandShortcut>↗</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => run(() => window.open(siteConfig.links.linkedin, "_blank"))}
            >
              <FaLinkedin /> LinkedIn
              <CommandShortcut>↗</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
