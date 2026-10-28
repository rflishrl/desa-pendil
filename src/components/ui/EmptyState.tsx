import { cn } from "@/lib/cn";

/** Text shown when a list has nothing to display. */
export function EmptyState({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-muted/40 px-6 py-12 text-center",
        className,
      )}
    >
      <p className="text-lg font-bold">{title}</p>
      {description ? <p className="mt-1 text-muted">{description}</p> : null}
    </div>
  );
}
