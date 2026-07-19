"use client";

import { motion } from "framer-motion";
import { getTechIcon } from "@/lib/tech-icons";

const items = [
  { key: "react", top: "6%", left: "-8%", delay: 0, size: "size-11" },
  { key: "typescript", top: "70%", left: "-12%", delay: 1.2, size: "size-9" },
  { key: "nextjs", top: "-6%", left: "62%", delay: 0.6, size: "size-10" },
  { key: "tailwind", top: "78%", left: "68%", delay: 1.8, size: "size-9" },
  { key: "nodejs", top: "35%", left: "104%", delay: 0.9, size: "size-10" },
];

export function FloatingTechIcons() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {items.map((item) => {
        const Icon = getTechIcon(item.key);
        return (
          <motion.div
            key={item.key}
            className={`absolute flex ${item.size} items-center justify-center rounded-2xl border border-border/60 bg-card/80 text-foreground shadow-lg backdrop-blur-xl animate-float`}
            style={{ top: item.top, left: item.left, animationDelay: `${item.delay}s` }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.delay * 0.3, duration: 0.6, ease: "easeOut" }}
          >
            <Icon className="size-1/2" />
          </motion.div>
        );
      })}
    </div>
  );
}
