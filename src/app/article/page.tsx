import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Pagination } from "@/components/ui/Pagination";
import { Panel } from "@/components/ui/Panel";
import { getArticles } from "@/lib/api";

export const metadata: Metadata = {
  title: "Berita Desa",
  description: "Kumpulan berita terbaru dari Desa Pendil.",
};

const PAGE_SIZE = 6;

type SearchParams = Promise<{ q?: string | string[]; page?: string | string[] }>;

const first = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value)?.trim() ?? "";

export default async function ArticlePage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const query = first(sp.q);

  const all = await getArticles();
  const filtered = query
    ? all.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
    : all;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(Math.max(Number.parseInt(first(sp.page), 10) || 1, 1), totalPages);
  const articles = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHero
        title="Berita Desa Pendil"
        description="Kumpulan berita terbaru dari Desa Pendil"
      />
      <section aria-labelledby="semua-berita-title" className="relative z-10 -mt-24 lg:-mt-32">
        <Container size="wide">
          <Panel className="space-y-12 lg:space-y-20">
            <div className="space-y-12">
              {/* Figma: heading shown on mobile only; visible on desktop when searching */}
              <div className={query ? "text-center sm:text-left" : "text-center md:sr-only"}>
                <h2 id="semua-berita-title" className="text-[32px] font-bold leading-tight">
                  {query ? `Hasil untuk “${query}”` : "Semua Berita"}
                </h2>
                {query ? (
                  <p className="mt-2 text-base font-medium text-muted">
                    {filtered.length} berita ditemukan.{" "}
                    <Link
                      href="/article"
                      className="font-semibold text-primary-700 underline underline-offset-4"
                    >
                      Hapus pencarian
                    </Link>
                  </p>
                ) : null}
              </div>

              {articles.length > 0 ? (
                <ul className="mx-auto grid max-w-[276px] gap-6 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
                  {articles.map((article) => (
                    <li key={article.id}>
                      <ArticleCard article={article} href={`/article/${article.id}`} />
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState
                  title={query ? "Berita tidak ditemukan" : "Berita belum tersedia"}
                  description={
                    query
                      ? "Coba gunakan kata kunci lain."
                      : "Berita belum dapat dimuat. Silakan coba lagi nanti."
                  }
                />
              )}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              basePath="/article"
              params={query ? { q: query } : {}}
            />
          </Panel>
        </Container>
      </section>
    </>
  );
}
