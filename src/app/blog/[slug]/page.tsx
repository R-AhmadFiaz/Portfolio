import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MarkdownLite } from "@/components/blog/markdown-lite";
import { BlogCard } from "@/components/blog/blog-card";
import { Newsletter } from "@/components/blog/newsletter";
import { buildMetadata } from "@/lib/metadata";
import { getGradient } from "@/lib/gradients";
import { cn } from "@/lib/utils";
import { blogPosts, getPostBySlug } from "@/data/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return buildMetadata({ title: "Post Not Found", noIndex: true });

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="relative">
      <div
        className={cn(
          "relative flex h-[38vh] min-h-[280px] items-end justify-center overflow-hidden bg-gradient-to-br pt-32",
          getGradient(post.coverImage)
        )}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative mx-auto w-full max-w-3xl px-6 pb-12 text-white">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" /> Back to blog
          </Link>
          <Badge className="mt-5 border-white/30 bg-white/15 text-white backdrop-blur-sm">
            {post.category}
          </Badge>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-white/80">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" /> {post.readingTime}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <MarkdownLite content={post.content} />

        <div className="mt-10 flex flex-wrap gap-2 border-t border-border/60 pt-8">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full font-normal">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-20">
        <Newsletter />
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <h2 className="text-xl font-semibold">More articles</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
