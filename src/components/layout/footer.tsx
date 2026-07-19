"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/data/social-links";

const footerColumns = [
  {
    title: "Sitemap",
    links: siteConfig.nav,
  },
  {
    title: "Connect",
    links: socialLinks.map((s) => ({ label: s.label, href: s.href })),
  },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border/60">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40 mask-fade-b" />
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-mono text-lg font-semibold tracking-tight">
              <span className="text-gradient">Rana Ahmad Fiaz</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              {siteConfig.status} · {siteConfig.location}
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Back to top"
          >
            Back to top <ArrowUp className="size-3.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
