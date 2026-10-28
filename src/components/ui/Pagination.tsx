import Link from "next/link";
import { cn } from "@/lib/cn";

interface PaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
  /** Extra query params kept on every link (e.g. the search term). */
  params?: Record<string, string>;
}

/** Figma "Page Number/Active-round": 40px circles, active #F6C866, others #F0F0F0. */
export function Pagination({ page, totalPages, basePath, params = {} }: PaginationProps) {
  if (totalPages <= 1) return null;

  const hrefFor = (n: number) => {
    const search = new URLSearchParams(params);
    if (n > 1) search.set("page", String(n));
    const qs = search.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <nav aria-label="Halaman">
      <ul className="flex flex-wrap items-center justify-center gap-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
          const active = n === page;
          return (
            <li key={n}>
              <Link
                href={hrefFor(n)}
                aria-label={`Halaman ${n}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  active
                    ? "bg-primary-300 text-[#040F0F]"
                    : "bg-[#F0F0F0] text-muted hover:bg-primary-100",
                )}
              >
                {n}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
