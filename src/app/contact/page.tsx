import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { GlowCard } from "@/components/shared/glow-card";
import { AuroraBackground } from "@/components/shared/aurora-background";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/data/social-links";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Rana Ahmad Fiaz for internships, freelance work, or a technical question.",
  path: "/contact",
});

const contactDetails = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s+/g, "")}` },
  { icon: MapPin, label: "Location", value: siteConfig.location },
  { icon: Clock, label: "Availability", value: siteConfig.status },
];

export default function ContactPage() {
  return (
    <div className="relative">
      <div className="relative mx-auto max-w-6xl px-6 pt-40 pb-8">
        <AuroraBackground className="opacity-70" />
        <SectionHeading
          eyebrow="Get in Touch"
          title="Let's build something together"
          description="Whether it's an internship, freelance project, or just a question — drop a message and I'll reply within a day."
        />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-28 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {contactDetails.map((item) => (
            <GlowCard key={item.label} className="flex items-center gap-4 p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <item.icon className="size-4.5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="truncate text-sm font-medium hover:text-brand"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="truncate text-sm font-medium">{item.value}</p>
                )}
              </div>
            </GlowCard>
          ))}

          <GlowCard className="p-4">
            <p className="mb-3 text-xs text-muted-foreground">Find me elsewhere</p>
            <div className="flex flex-wrap gap-2">
              {socialLinks
                .filter((s) => s.label !== "Email")
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    <social.icon className="size-4" />
                  </a>
                ))}
            </div>
          </GlowCard>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
