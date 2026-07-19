"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  tilt?: boolean;
}

export function GlowCard({ children, className, tilt = false, ...props }: GlowCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const relY = event.clientY - rect.top;
    mouseX.set(relX);
    mouseY.set(relY);
    if (tilt) {
      rotateY.set(((relX / rect.width) - 0.5) * 8);
      rotateX.set((0.5 - relY / rect.height) * 8);
    }
  };

  const handleLeave = () => {
    if (tilt) {
      rotateX.set(0);
      rotateY.set(0);
    }
  };

  const background = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, color-mix(in oklch, var(--brand) 18%, transparent), transparent 70%)`;

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm transition-colors duration-300 hover:border-border",
        className
      )}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
