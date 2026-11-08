import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Pagination } from "@/components/ui/Pagination";
import { Panel } from "@/components/ui/Panel";
import { getArticlesServerFn } from "@/lib/api/functions";

const PAGE_SIZE = 6;

const articleSearchSchema = z.object({
  q: z.string().optional().catch(""),
  page: z.coerce.number().int().min(1).optional().catch(1),
});

export const Route = createFileRoute("/article/")({
  validateSearch: articleSearchSchema,
  loaderDeps: ({ search: { q, page } }) => ({ q, page }),
  loader: async ({ deps: { q, page } }) => {
    const all = await getArticlesServerFn();
    const query = (q ?? "").trim();
    const filtered = query
      ? all.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
      : all;

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(Math.max(page || 1, 1), totalPages);
    const articles = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return {
      articles,
      query,
      page: currentPage,
      totalPages,
      totalCount: filtered.length,
    };
  },
  head: () => ({
    meta: [
      { title: "Berita Desa - Desa Pendil" },
      {
        name: "description",
        content: "Kumpulan berita terbaru dari Desa Pendil.",
      },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { articles, query, page, totalPages, totalCount } = Route.useLoaderData();

  return (
    <>
      <PageHero title="Berita Desa Pendil" description="Kumpulan berita terbaru dari Desa Pendil" />
      <section aria-labelledby="semua-berita-title" className="relative z-10 -mt-24 lg:-mt-32">
        <Container size="wide">
          <Panel className="space-y-12 lg:space-y-20">
            <div className="space-y-12">
              <div className={query ? "text-center sm:text-left" : "text-center md:sr-only"}>
                <h2 id="semua-berita-title" className="text-[32px] font-bold leading-tight">
                  {query ? `Hasil untuk “${query}”` : "Semua Berita"}
                </h2>
                {query ? (
                  <p className="mt-2 text-base font-medium text-muted">
                    {totalCount} berita ditemukan.{" "}
                    <Link
                      to="/article"
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
