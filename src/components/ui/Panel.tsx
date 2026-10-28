import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** White rounded surface used to group a section (Figma: card / radius 16). */
export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface px-6 py-12 shadow-card sm:px-10 lg:px-16 xl:px-[126px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
