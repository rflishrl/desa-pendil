import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { HeroBackground } from "@/components/ui/HeroBackground";

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  /** Crumbs after "Beranda". Defaults to the page title. */
  trail?: Crumb[];
  /** Extra content under the title (e.g. date and author). */
  children?: ReactNode;
}

/** Inner-page hero (Figma: 480px, padding 120/240, gap 40, title 32/46). */
export function PageHero({ title, description, trail, children }: PageHeroProps) {
  const crumbs: Crumb[] = trail ?? [{ label: title }];

  return (
    <header className="relative isolate overflow-hidden bg-ink pb-40 pt-32 text-white md:pb-44 lg:pt-[160px]">
      <HeroBackground />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 text-base font-semibold lg:mb-10">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link
                href="/"
                className="rounded text-[#F7F7F7] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Beranda
              </Link>
            </li>
            {crumbs.map((crumb, index) => {
              const last = index === crumbs.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  {crumb.href && !last ? (
                    <Link
                      href={crumb.href}
                      className="rounded underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current={last ? "page" : undefined} className="line-clamp-1">
                      {crumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="max-w-[770px] space-y-4">
          <h1 className="text-balance text-2xl font-bold leading-snug sm:text-[32px] sm:leading-[46px]">
            {title}
          </h1>
          {description ? (
            <p className="text-base font-medium text-white/80">{description}</p>
          ) : null}
          {children}
        </div>
      </Container>
    </header>
  );
}
