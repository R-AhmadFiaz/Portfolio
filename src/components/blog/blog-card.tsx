import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { GlowCard } from "@/components/shared/glow-card";
import { Badge } from "@/components/ui/badge";
import { getGradient } from "@/lib/gradients";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <GlowCard tilt className="h-full">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div
          className={cn(
            "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
            getGradient(post.coverImage),
            featured ? "h-56" : "h-40"
          )}
        >
          <Badge className="absolute left-3 top-3 border-white/30 bg-white/15 text-white backdrop-blur-sm">
            {post.category}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" /> {post.readingTime}
            </span>
          </div>
          <h3
            className={cn(
              "font-semibold tracking-tight",
              featured ? "text-xl" : "text-base"
            )}
          >
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-brand">
            Read article
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </GlowCard>
  );
}
