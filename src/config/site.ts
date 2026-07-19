// Resolves to a custom domain if set, otherwise falls back to whatever
// Vercel assigns the deployment, so canonical/OG URLs stay correct
// automatically until a custom domain is configured.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ??
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ??
  "https://ranaahmadfiaz.dev";

export const siteConfig = {
  name: "Rana Ahmad Fiaz",
  title: "Rana Ahmad Fiaz — Full Stack Developer",
  role: "Full Stack Developer",
  currentRole: "Computer Science Student",
  status: "Open to Internship & Freelance",
  location: "Lahore, Pakistan",
  email: "ahmadcloudarc@gmail.com",
  phone: "+92 339 0003684",
  url: siteUrl,
  description:
    "Full stack developer crafting fast, accessible, and beautifully engineered web experiences with Next.js, TypeScript, and modern tooling.",
  keywords: [
    "Rana Ahmad Fiaz",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Software Engineer Pakistan",
    "Web Developer Lahore",
  ],
  links: {
    github: "https://github.com/ranaahmadfiaz",
    linkedin: "https://linkedin.com/in/ranaahmadfiaz",
    twitter: "https://twitter.com/ranaahmadfiaz",
    instagram: "https://instagram.com/ranaahmadfiaz",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
