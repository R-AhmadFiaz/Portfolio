"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/shared/aurora-background";
import { HeroCodeWindow } from "@/components/sections/hero-code-window";
import { FloatingTechIcons } from "@/components/sections/floating-tech-icons";
import { Magnetic } from "@/components/shared/magnetic-button";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      <AuroraBackground />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.15fr_1fr]">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.span
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3.5 py-1.5 font-mono text-xs text-muted-foreground"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {siteConfig.status}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient">Rana Ahmad Fiaz</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl"
          >
            A {siteConfig.currentRole.toLowerCase()} and{" "}
            <span className="font-medium text-foreground">full stack developer</span> who
            designs and builds fast, accessible, production-grade web experiences with Next.js
            and TypeScript.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button asChild size="lg" className="group rounded-full pr-4">
                <Link href="/projects">
                  View My Work
                  <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href="/resume/Rana_Ahmad_Fiaz_Resume.pdf" download>
                  <Download className="mr-1.5 size-4" />
                  Download Resume
                </a>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex items-center gap-6 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="size-4 text-brand" />
              {siteConfig.location}
            </span>
            <span className="h-4 w-px bg-border" />
            <span>{siteConfig.currentRole}</span>
          </motion.div>
        </motion.div>

        <div className="relative hidden items-center justify-center lg:flex">
          <FloatingTechIcons />
          <HeroCodeWindow />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
