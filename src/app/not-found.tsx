import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/shared/aurora-background";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80svh] flex-col items-center justify-center px-6 text-center">
      <AuroraBackground className="opacity-50" />
      <span className="font-mono text-7xl font-bold text-gradient sm:text-8xl">404</span>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-3 max-w-sm text-muted-foreground">
        The page you&apos;re looking for may have been moved, renamed, or never existed.
      </p>
      <Button asChild size="lg" className="group mt-8 rounded-full">
        <Link href="/">
          <ArrowLeft className="mr-1.5 size-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>
      </Button>
    </div>
  );
}
