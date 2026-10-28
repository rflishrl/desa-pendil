import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  id: string;
  title: string;
  eyebrow?: string;
  subtitle?: ReactNode;
  /** Optional element on the right (e.g. a "Selengkapnya" button). */
  action?: ReactNode;
  className?: string;
}

/** Centered and stacked on mobile (Figma mobile), left/right split from `sm`. */
export function SectionHeading({
  id,
  title,
  eyebrow,
  subtitle,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left",
        className,
      )}
    >
      <div>
        {eyebrow ? (
          <p className="mb-2 text-lg font-semibold text-primary-700">{eyebrow}</p>
        ) : null}
        <h2 id={id} className="text-balance text-[32px] font-bold leading-tight text-ink">
          {title}
        </h2>
        {subtitle ? (
          <div className="mt-2 text-xl font-semibold text-ink lg:text-2xl">{subtitle}</div>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
