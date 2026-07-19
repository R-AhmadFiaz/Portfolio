import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlogSearch } from "@/components/blog/blog-search";
import { Newsletter } from "@/components/blog/newsletter";
import { AuroraBackground } from "@/components/shared/aurora-background";
import { buildMetadata } from "@/lib/metadata";
import { blogPosts, getAllCategories } from "@/data/blog-posts";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Writing on Next.js, design engineering, and building production-grade web applications.",
  path: "/blog",
});

export default function BlogPage() {
  const categories = getAllCategories();

  return (
    <div className="relative">
      <div className="relative mx-auto max-w-6xl px-6 pt-40 pb-8">
        <AuroraBackground className="opacity-70" />
        <SectionHeading
          eyebrow="Writing"
          title="Blog"
          description="Notes on the things I learn while building — mostly Next.js, performance, and design engineering."
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <BlogSearch posts={blogPosts} categories={categories} />
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-28">
        <Newsletter />
      </div>
    </div>
  );
}
