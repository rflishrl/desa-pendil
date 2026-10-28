import Link from "next/link";
import { MdSearch } from "react-icons/md";
import { popularSearches } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroBackground } from "@/components/ui/HeroBackground";

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink pb-36 pt-[140px] text-white md:pb-48 lg:pt-56"
    >
      <HeroBackground />
      <Container>
        <div className="max-w-4xl space-y-9 lg:space-y-[60px]">
          <h1
            id="hero-title"
            className="text-4xl font-bold uppercase leading-tight [overflow-wrap:anywhere]"
          >
            Menjawab Kebutuhan Informasi Publik warga desa Pendil
          </h1>

          <div className="space-y-4">
            <p className="text-base font-medium">
              Temukan informasi yang kamu cari di sini
            </p>
            <form
              action="/article"
              method="get"
              role="search"
              className="flex max-w-[620px] flex-col gap-2 sm:flex-row"
            >
              <div className="relative flex-1">
                <label htmlFor="hero-search" className="sr-only">
                  Cari informasi
                </label>
                <MdSearch
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-1/2 size-6 -translate-y-1/2 text-muted"
                />
                <input
                  id="hero-search"
                  type="search"
                  name="q"
                  autoComplete="off"
                  placeholder="Cari informasi Anda"
                  className="min-h-[50px] w-full rounded-lg bg-white pl-12 pr-3 text-xs font-semibold text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:min-h-[60px] sm:text-base"
                />
              </div>
              <Button
                type="submit"
                className="w-fit bg-primary-400 hover:bg-primary sm:min-h-[60px]"
              >
                Cari
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <p className="text-base font-medium">Pencarian terpopuler</p>
            <ul className="flex gap-2 sm:gap-4">
              {popularSearches.map((term) => (
                <li key={term} className="flex-1 sm:flex-none">
                  <Link
                    href={`/article?q=${encodeURIComponent(term)}`}
                    className="flex min-h-11 items-center justify-center rounded-lg bg-primary/10 px-4 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:min-h-[60px] sm:px-9 sm:text-base"
                  >
                    {term}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
