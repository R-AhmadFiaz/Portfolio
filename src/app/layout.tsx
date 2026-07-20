import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import "./globals.css";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CursorGlow } from "@/components/layout/cursor-glow";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { CommandPalette } from "@/components/layout/command-palette";
import { PageTransition } from "@/components/layout/page-transition";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  url: siteConfig.url,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location,
  },
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col relative">
        <Script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={150}>
            <LoadingScreen />
            <ScrollProgress />
            <CursorGlow />
            <CommandPalette />
            <Navbar />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <Toaster position="bottom-right" richColors closeButton />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
