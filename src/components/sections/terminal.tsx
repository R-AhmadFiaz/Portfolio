"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";

interface TerminalLine {
  prompt?: boolean;
  text: string;
  color?: string;
}

const script: TerminalLine[] = [
  { prompt: true, text: "whoami" },
  { text: "rana-ahmad-fiaz — full stack developer" },
  { prompt: true, text: "cat status.txt" },
  { text: "Open to Internship & Freelance work · Lahore, PK", color: "text-emerald-400" },
  { prompt: true, text: "ls skills/" },
  {
    text: "typescript  react  nextjs  nodejs  postgresql  tailwindcss",
    color: "text-sky-400",
  },
  { prompt: true, text: "npm run build-something-great" },
  { text: "✓ compiled successfully in 340ms", color: "text-emerald-400" },
];

const TYPE_SPEED = 32;
const LINE_PAUSE = 420;

export function Terminal() {
  const [visibleLines, setVisibleLines] = useState<{ line: TerminalLine; text: string }[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= script.length) return;
    const current = script[lineIndex];

    if (charIndex < current.text.length) {
      const timeout = setTimeout(() => setCharIndex((c) => c + 1), TYPE_SPEED);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setVisibleLines((prev) => [...prev, { line: current, text: current.text }]);
      setLineIndex((i) => (i + 1) % script.length);
      setCharIndex(0);
      if (lineIndex === script.length - 1) setVisibleLines([]);
    }, LINE_PAUSE);
    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex]);

  const current = script[lineIndex];
  const typedText = current?.text.slice(0, charIndex) ?? "";

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Terminal"
        title="A peek into how I think"
        description="Because every good developer portfolio needs a terminal."
      />

      <div className="mx-auto mt-14 max-w-2xl overflow-hidden rounded-2xl border border-border/60 bg-[#0b0b0f] shadow-2xl shadow-black/20">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-3 rounded-full bg-red-400/80" />
          <span className="size-3 rounded-full bg-amber-400/80" />
          <span className="size-3 rounded-full bg-emerald-400/80" />
          <span className="ml-2 font-mono text-xs text-white/50">
            ahmad@portfolio ~ zsh
          </span>
        </div>
        <div className="min-h-[280px] p-5 font-mono text-[13px] leading-relaxed text-white/80 sm:text-sm">
          {visibleLines.map((item, i) => (
            <div key={i} className={item.line.color}>
              {item.line.prompt && <span className="text-emerald-400">➜ </span>}
              {item.text}
            </div>
          ))}
          <div className={current?.color}>
            {current?.prompt && <span className="text-emerald-400">➜ </span>}
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] bg-white/70"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
