import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardRailProps {
  label: string;
  /** Tailwind classes for the grid from `md` up, e.g. "md:grid-cols-2 lg:grid-cols-3". */
  columns: string;
  /** Tailwind arbitrary-variant class setting the mobile card width, e.g. "[&>li]:w-[276px]". */
  itemWidth: string;
  children: ReactNode;
}

/**
 * Mobile: horizontal swipe rail (as designed in Figma). md and up: normal grid.
 * The rail is focusable so keyboard users can scroll it with the arrow keys.
 */
export function CardRail({ label, columns, itemWidth, children }: CardRailProps) {
  return (
    <ul
      tabIndex={0}
      aria-label={label}
      className={cn(
        "flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [&>li]:shrink-0 [&>li]:snap-start",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        "md:grid md:gap-6 md:overflow-visible md:pb-0 md:[&>li]:w-auto",
        itemWidth,
        columns,
      )}
    >
      {children}
    </ul>
  );
}
