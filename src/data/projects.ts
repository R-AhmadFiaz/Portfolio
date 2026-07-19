import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "nimbus-analytics",
    title: "Nimbus Analytics",
    summary: "A real-time analytics dashboard for SaaS founders.",
    description:
      "Nimbus is a self-serve analytics platform that lets SaaS founders track revenue, churn, and product usage in one place, without wiring up a data warehouse.",
    problem:
      "Early-stage founders were stitching together spreadsheets and three different tools just to answer 'are we growing?'. Existing analytics suites were built for enterprise data teams, not solo founders.",
    solution:
      "I designed and built a lightweight event-ingestion pipeline paired with a dashboard that renders sub-second charts over millions of rows using edge caching and incremental static regeneration.",
    role: "Lead Full Stack Developer",
    year: "2025",
    featured: true,
    coverImage: "violet-blue",
    images: [],
    tags: ["SaaS", "Analytics", "Dashboard"],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Recharts"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/ranaahmadfiaz/nimbus-analytics",
    metrics: [
      { label: "Query Latency", value: "-68%" },
      { label: "Active Dashboards", value: "1.2k" },
      { label: "Lighthouse Score", value: "98" },
    ],
    size: "lg",
  },
  {
    slug: "driftwood-commerce",
    title: "Driftwood Commerce",
    summary: "A headless storefront with a fully custom checkout flow.",
    description:
      "A performance-obsessed e-commerce storefront built on a headless architecture, with a checkout flow designed to minimize drop-off on mobile networks.",
    problem:
      "The client's previous storefront took 6+ seconds to become interactive on 4G, and cart abandonment on mobile was above 80%.",
    solution:
      "Rebuilt the storefront with Next.js App Router, streaming server components, and an optimistic-UI cart that persists across sessions, cutting time-to-interactive to under 1.5s.",
    role: "Full Stack Developer",
    year: "2025",
    featured: true,
    coverImage: "orange-pink",
    images: [],
    tags: ["E-commerce", "Performance"],
    stack: ["Next.js", "TypeScript", "Stripe", "Sanity CMS", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/ranaahmadfiaz/driftwood-commerce",
    metrics: [
      { label: "Time to Interactive", value: "1.4s" },
      { label: "Conversion Lift", value: "+31%" },
      { label: "Mobile Score", value: "96" },
    ],
    size: "wide",
  },
  {
    slug: "pulsegrid",
    title: "PulseGrid",
    summary: "A real-time collaborative task board with presence and offline sync.",
    description:
      "PulseGrid is a Linear-inspired task board built to explore real-time collaboration patterns: multiplayer cursors, optimistic updates, and offline-first sync.",
    problem:
      "I wanted to understand how tools like Linear achieve near-instant perceived latency across collaborators, and apply those patterns to a project of my own.",
    solution:
      "Built a CRDT-backed data layer with WebSocket presence channels, keyboard-first navigation, and a command palette, all wrapped in a UI that stays responsive even offline.",
    role: "Solo Developer",
    year: "2024",
    featured: true,
    coverImage: "emerald-teal",
    images: [],
    tags: ["Real-time", "Collaboration", "Side Project"],
    stack: ["React", "TypeScript", "WebSockets", "Node.js", "Redis"],
    githubUrl: "https://github.com/ranaahmadfiaz/pulsegrid",
    metrics: [
      { label: "Sync Latency", value: "<80ms" },
      { label: "GitHub Stars", value: "310+" },
    ],
    size: "tall",
  },
  {
    slug: "versecraft",
    title: "VerseCraft",
    summary: "An AI-assisted writing tool for poets and lyricists.",
    description:
      "VerseCraft pairs a distraction-free editor with an AI co-writer tuned for rhyme, meter, and tone, helping writers stay in flow instead of hunting for the right word.",
    problem:
      "General-purpose AI writing tools produce generic prose and break rhythm and rhyme, which matters most for poetry and lyric writing.",
    solution:
      "Built a custom prompt-engineering layer on top of an LLM API with rhyme-scheme and syllable-count constraints, plus a keyboard-driven editor with inline suggestions.",
    role: "Full Stack Developer",
    year: "2024",
    featured: false,
    coverImage: "amber-rose",
    images: [],
    tags: ["AI", "Editor", "Side Project"],
    stack: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/ranaahmadfiaz/versecraft",
    size: "md",
  },
  {
    slug: "orbit-fitness",
    title: "Orbit Fitness",
    summary: "A workout tracking PWA with offline-first architecture.",
    description:
      "A progressive web app for logging workouts that works fully offline in the gym and syncs automatically once back online.",
    problem:
      "Gyms are notorious for poor connectivity, and most fitness trackers fail silently or lose data when the network drops.",
    solution:
      "Implemented an offline-first PWA with IndexedDB-backed local storage, background sync, and installable app shell, so logging never depends on signal strength.",
    role: "Full Stack Developer",
    year: "2023",
    featured: false,
    coverImage: "blue-cyan",
    images: [],
    tags: ["PWA", "Mobile", "Offline-first"],
    stack: ["React", "TypeScript", "IndexedDB", "Service Workers"],
    githubUrl: "https://github.com/ranaahmadfiaz/orbit-fitness",
    size: "md",
  },
  {
    slug: "campusconnect",
    title: "CampusConnect",
    summary: "A capstone platform for discovering and RSVPing to campus events.",
    description:
      "A university-wide platform that centralizes event discovery, RSVPs, and society management, built as a final-year capstone project with a 4-person team.",
    problem:
      "Event information across campus was scattered across WhatsApp groups, posters, and Instagram stories, with no single source of truth.",
    solution:
      "Led the frontend architecture and built the event-discovery feed, RSVP flow, and admin dashboard for society leads to manage events end to end.",
    role: "Team Lead & Full Stack Developer",
    year: "2023",
    featured: false,
    coverImage: "fuchsia-purple",
    images: [],
    tags: ["Team Project", "Education"],
    stack: ["Next.js", "TypeScript", "MongoDB", "Express", "Tailwind CSS"],
    githubUrl: "https://github.com/ranaahmadfiaz/campusconnect",
    size: "sm",
  },
];

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectTags() {
  return Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
}
