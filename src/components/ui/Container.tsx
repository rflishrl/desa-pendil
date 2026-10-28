import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  as?: ElementType;
  /**
   * `default`: page content (Figma: 36px side padding on mobile, 1248px inner on desktop).
   * `wide`: white panels (Figma: 324px wide on a 375px screen, 1488px on desktop).
   */
  size?: "default" | "wide";
  className?: string;
  children: ReactNode;
}

export function Container({
  as: Tag = "div",
  size = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full",
        size === "default"
          ? "max-w-[1328px] px-9 sm:px-8 lg:px-10"
          : "max-w-[1608px] px-[25px] sm:px-8 xl:px-[60px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
