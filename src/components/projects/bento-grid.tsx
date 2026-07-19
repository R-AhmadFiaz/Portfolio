import { cn } from "@/lib/utils";

export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid auto-rows-[260px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export const sizeToSpan: Record<string, string> = {
  lg: "sm:col-span-2 lg:col-span-2 lg:row-span-2 auto-rows-[260px]",
  wide: "sm:col-span-2 lg:col-span-2",
  tall: "lg:row-span-2",
  md: "lg:col-span-2",
  sm: "",
};
