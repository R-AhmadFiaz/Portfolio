import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "rendering-strategies-nextjs-15",
    title: "Rendering Strategies in Next.js 15: A Practical Guide",
    excerpt:
      "Server Components, streaming, ISR, and when to reach for each one — with real trade-offs instead of buzzwords.",
    date: "2026-06-02",
    readingTime: "8 min read",
    category: "Next.js",
    tags: ["Next.js", "React", "Performance"],
    coverImage: "violet-blue",
    featured: true,
    content: `Modern Next.js gives you more rendering knobs than ever, and picking the wrong one quietly taxes your users. This is the mental model I use on every project.

## Start from the data, not the framework

Before reaching for a rendering mode, ask how often the underlying data changes. Content that changes per-request wants dynamic rendering. Content that changes per-deploy wants static rendering. Everything in between wants incremental static regeneration.

## Server Components are the default, not a feature flag

With the App Router, every component is a Server Component unless you opt into \`"use client"\`. This isn't just an implementation detail — it changes how you should structure data fetching. Fetch as close to the component that needs the data as possible and let React's request memoization deduplicate the network calls.

\`\`\`tsx
async function ProjectList() {
  const projects = await getProjects();
  return <ul>{projects.map((p) => <ProjectCard key={p.slug} project={p} />)}</ul>;
}
\`\`\`

## Streaming changes how you think about loading states

Instead of a single loading spinner blocking the whole page, wrap slow data fetches in \`Suspense\` boundaries so the shell paints immediately and slow sections stream in independently.

> The best loading state is the one the user never notices because the rest of the page was already interactive.

## When to reach for ISR

Incremental Static Regeneration is the right call for pages like blog posts and marketing pages: content that changes occasionally but doesn't need to be dynamic per-request. Set a \`revalidate\` window that matches how stale you're willing to let the page get.

Getting this right is less about memorizing APIs and more about being honest with yourself about how fresh your data actually needs to be.`,
  },
  {
    slug: "designing-with-motion",
    title: "Designing With Motion: Framer Motion Patterns That Feel Premium",
    excerpt:
      "The difference between an animation that feels expensive and one that feels gratuitous usually comes down to three things.",
    date: "2026-05-14",
    readingTime: "6 min read",
    category: "Design Engineering",
    tags: ["Framer Motion", "UI/UX", "Animation"],
    coverImage: "orange-pink",
    featured: true,
    content: `Great motion design is invisible when it works and distracting when it doesn't. Here's what separates the two.

## Easing is doing more work than duration

Most developers reach for duration first, but easing curves are what make motion feel physical. A spring with the right stiffness and damping communicates weight in a way that a linear tween never will.

\`\`\`tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ type: "spring", stiffness: 120, damping: 20 }}
/>
\`\`\`

## Stagger children, don't animate them together

When a group of elements enters the viewport at once, staggering their entrance by 40-80ms creates a sense of choreography instead of everything popping in simultaneously.

## Respect reduced motion

Every animation should have a reduced-motion fallback. It's not just an accessibility checkbox — users with vestibular disorders can experience real discomfort from large parallax or scale animations.

> If an animation can't be turned off gracefully, it's a decoration, not a design decision.

Treat motion as a layer of information, not a layer of decoration, and it will hold up under scrutiny.`,
  },
  {
    slug: "type-safe-forms-zod-rhf",
    title: "Type-Safe Forms With React Hook Form and Zod",
    excerpt:
      "A pattern for forms that catches bad data at compile time and at submit time, without writing validation logic twice.",
    date: "2026-04-22",
    readingTime: "7 min read",
    category: "Engineering",
    tags: ["TypeScript", "Forms", "Zod"],
    coverImage: "emerald-teal",
    featured: false,
    content: `Forms are where a lot of type safety quietly breaks down. This is the setup I reach for on every project that needs a contact form, a checkout flow, or a settings page.

## Define the schema once

Zod schemas double as your runtime validation and your TypeScript types via \`z.infer\`. There's no separate interface to keep in sync.

\`\`\`ts
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type ContactValues = z.infer<typeof contactSchema>;
\`\`\`

## Wire it into React Hook Form with the resolver

\`@hookform/resolvers/zod\` bridges the two libraries so validation errors surface through RHF's existing \`formState.errors\` API — no custom error handling required.

## Validate on the server too

Client-side validation is a UX layer, not a security boundary. Every API route that accepts form data should re-parse the payload through the same Zod schema before touching a database or sending an email.

> If your server route trusts the client's validation, it isn't validation — it's a suggestion.

This pattern scales from a two-field contact form to a multi-step checkout without changing shape.`,
  },
  {
    slug: "building-a-command-palette",
    title: "Building a Command Palette (⌘K) From Scratch",
    excerpt:
      "How keyboard-first navigation changes the way power users perceive your product's speed.",
    date: "2026-03-30",
    readingTime: "5 min read",
    category: "Design Engineering",
    tags: ["Accessibility", "UX", "React"],
    coverImage: "amber-rose",
    featured: false,
    content: `Command palettes went from a Raycast/Linear novelty to a baseline expectation for serious products. Here's the shape of a good one.

## Global keyboard listener, scoped correctly

Bind \`⌘K\` / \`Ctrl+K\` at the document level, but make sure it doesn't fire while the user is typing inside another input field, and that it's properly cleaned up on unmount.

## Fuzzy search over a flat command list

Flatten every navigable page and action into a single list of commands with labels, keywords, and handlers, then filter with a simple fuzzy match rather than exact substring matching so typos still find the right result.

## Group and prioritize

Group results by type (Pages, Projects, Actions) and always show a small set of default suggestions when the query is empty, so the palette feels useful even before the user starts typing.

> A command palette should make your whole site feel like it's two keystrokes away.

Once it's wired up, most users won't use the mouse to navigate your site again.`,
  },
  {
    slug: "lighthouse-95-checklist",
    title: "My Checklist for Hitting a 95+ Lighthouse Score",
    excerpt:
      "The unglamorous, repeatable checklist I run through before shipping any production page.",
    date: "2026-02-18",
    readingTime: "6 min read",
    category: "Performance",
    tags: ["Performance", "SEO", "Next.js"],
    coverImage: "blue-cyan",
    featured: false,
    content: `Performance work is mostly about removing things, not adding them. This is the checklist I run before every launch.

## Images

Use \`next/image\` everywhere, serve AVIF/WebP, and set explicit width and height to avoid layout shift. Lazy-load anything below the fold.

## Fonts

Self-host fonts with \`next/font\`, subset to the character sets you actually use, and set \`display: swap\` so text renders immediately in a fallback font.

## JavaScript

Dynamically import anything that isn't needed for the first paint — modals, charts, command palettes — and audit your bundle with \`next build\` output regularly, not just once at the end of the project.

\`\`\`tsx
const CommandPalette = dynamic(() => import("./command-palette"), {
  ssr: false,
});
\`\`\`

## Metadata

Every page needs a unique title, description, canonical URL, and Open Graph image. This is free SEO and social-share quality that costs almost nothing to implement.

> Performance isn't a sprint before launch — it's a constraint you design against from the first commit.

Run this list before every deploy and a 95+ score stops being an event and starts being the default.`,
  },
  {
    slug: "offline-first-pwa-lessons",
    title: "What I Learned Building an Offline-First PWA",
    excerpt:
      "Notes from shipping a workout tracker that has to work with zero signal, mid-set, in a basement gym.",
    date: "2026-01-09",
    readingTime: "7 min read",
    category: "Engineering",
    tags: ["PWA", "Offline", "Mobile"],
    coverImage: "fuchsia-purple",
    featured: false,
    content: `Building Orbit Fitness taught me more about network reliability than any tutorial could. Some notes from the trenches.

## Assume the network is a bonus, not a dependency

Every write in the app happens against IndexedDB first, and syncs to the server opportunistically. The UI never waits on a network round-trip to feel responsive.

## Background Sync is not universally supported

Not every browser supports the Background Sync API, so I built a fallback that retries pending writes on \`online\` events and on app focus, which covers the gap on iOS Safari.

## Conflict resolution has to be boring

When two devices sync the same workout log, the simplest correct answer is usually last-write-wins with a visible timestamp, not a clever merge algorithm the user can't reason about.

> Offline-first isn't a checkbox feature — it's a constraint that should shape your data layer from day one, not get bolted on afterward.

If I started this project again, I'd design the sync engine before the UI, not after.`,
  },
];

export function getFeaturedPosts() {
  return blogPosts.filter((p) => p.featured);
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllCategories() {
  return Array.from(new Set(blogPosts.map((p) => p.category))).sort();
}
