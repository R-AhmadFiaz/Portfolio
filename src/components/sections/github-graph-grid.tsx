"use client";

import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ContributionDay } from "@/lib/contribution-data";
import { cn } from "@/lib/utils";

const levelClasses: Record<ContributionDay["level"], string> = {
  0: "bg-muted",
  1: "bg-brand/25",
  2: "bg-brand/50",
  3: "bg-brand/75",
  4: "bg-brand",
};

export function GithubGraphGrid({ weeks }: { weeks: ContributionDay[][] }) {
  return (
    <div className="min-w-[720px]">
      <div className="flex gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <Tooltip key={day.date}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.25, delay: wi * 0.006 }}
                    className={cn("size-[11px] rounded-[2px]", levelClasses[day.level])}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    {day.count} contribution{day.count === 1 ? "" : "s"} on {day.date}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
        Less
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <span key={level} className={cn("size-[11px] rounded-[2px]", levelClasses[level])} />
        ))}
        More
      </div>
    </div>
  );
}
