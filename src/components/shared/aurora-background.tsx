import { cn } from "@/lib/utils";

export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div
        className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 animate-aurora rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand), var(--brand-2) 55%, transparent 100%)",
        }}
      />
      <div
        className="absolute right-[-10%] top-[20%] h-[420px] w-[420px] animate-aurora rounded-full opacity-30 blur-[110px]"
        style={{
          background: "radial-gradient(closest-side, oklch(0.7 0.16 220), transparent 100%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[-5%] h-[420px] w-[420px] animate-aurora rounded-full opacity-25 blur-[110px]"
        style={{
          background: "radial-gradient(closest-side, oklch(0.68 0.19 320), transparent 100%)",
          animationDelay: "-11s",
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-[0.15] mask-fade-b" />
    </div>
  );
}
