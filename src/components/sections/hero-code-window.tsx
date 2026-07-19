"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

const lines: { tokens: { text: string; cls: string }[] }[] = [
  { tokens: [{ text: "const developer = {", cls: "text-foreground" }] },
  {
    tokens: [
      { text: "  name", cls: "text-sky-400" },
      { text: ": ", cls: "text-muted-foreground" },
      { text: `"Rana Ahmad Fiaz"`, cls: "text-emerald-400" },
      { text: ",", cls: "text-muted-foreground" },
    ],
  },
  {
    tokens: [
      { text: "  role", cls: "text-sky-400" },
      { text: ": ", cls: "text-muted-foreground" },
      { text: `"Full Stack Developer"`, cls: "text-emerald-400" },
      { text: ",", cls: "text-muted-foreground" },
    ],
  },
  {
    tokens: [
      { text: "  stack", cls: "text-sky-400" },
      { text: ": [", cls: "text-muted-foreground" },
      { text: `"Next.js"`, cls: "text-emerald-400" },
      { text: ", ", cls: "text-muted-foreground" },
      { text: `"TypeScript"`, cls: "text-emerald-400" },
      { text: ", ", cls: "text-muted-foreground" },
      { text: `"Node.js"`, cls: "text-emerald-400" },
      { text: "],", cls: "text-muted-foreground" },
    ],
  },
  {
    tokens: [
      { text: "  location", cls: "text-sky-400" },
      { text: ": ", cls: "text-muted-foreground" },
      { text: `"Lahore, PK"`, cls: "text-emerald-400" },
      { text: ",", cls: "text-muted-foreground" },
    ],
  },
  {
    tokens: [
      { text: "  available", cls: "text-sky-400" },
      { text: ": ", cls: "text-muted-foreground" },
      { text: "true", cls: "text-amber-400" },
      { text: ",", cls: "text-muted-foreground" },
    ],
  },
  { tokens: [{ text: "};", cls: "text-foreground" }] },
];

export function HeroCodeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="relative w-full max-w-md rounded-2xl border border-border/60 bg-card/80 shadow-2xl shadow-black/10 backdrop-blur-xl"
      style={{ transformPerspective: 1000 }}
    >
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
        <span className="size-3 rounded-full bg-red-400/80" />
        <span className="size-3 rounded-full bg-amber-400/80" />
        <span className="size-3 rounded-full bg-emerald-400/80" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">profile.ts</span>
      </div>
      <motion.pre
        variants={staggerContainer(0.09, 0.6)}
        initial="hidden"
        animate="show"
        className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed sm:text-sm"
      >
        {lines.map((line, i) => (
          <motion.div key={i} variants={fadeUp}>
            {line.tokens.map((t, j) => (
              <span key={j} className={t.cls}>
                {t.text}
              </span>
            ))}
          </motion.div>
        ))}
      </motion.pre>
      <motion.div
        className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-60 blur-2xl"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklch, var(--brand) 45%, transparent), transparent 60%)",
        }}
      />
    </motion.div>
  );
}
