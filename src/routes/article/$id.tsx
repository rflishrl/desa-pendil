import { createFileRoute, notFound } from "@tanstack/react-router";
import { LuCalendarDays, LuUser } from "react-icons/lu";
import { PiArrowUpRight } from "react-icons/pi";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShareButton } from "@/components/ui/ShareButton";
import { getArticleServerFn, getArticlesServerFn } from "@/lib/api/functions";
import { formatLongDate } from "@/lib/format";

export const Route = createFileRoute("/article/$id")({
  loader: async ({ params }) => {
    const [article, all] = await Promise.all([
      getArticleServerFn({ data: params.id }),
      getArticlesServerFn(),
    ]);

    if (!article) {
      throw notFound();
    }

    const related = all.filter((a) => a.id !== article.id).slice(0, 3);
    return { article, related };
  },
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    const title = article
      ? `${article.title} - Desa Pendil`
      : "Berita tidak ditemukan - Desa Pendil";
    const description = article?.content
      ? article.content.slice(0, 155).replace(/\s+/g, " ").trim()
      : "Kumpulan berita dan informasi terbaru dari Desa Pendil.";
    const image = article?.image ?? "/images/dummy-news.jpg";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
    };
  },
  notFoundComponent: ArticleNotFound,
  component: ArticleDetailPage,
});

function ArticleNotFound() {
  return (
    <>
      <PageHero
        title="Berita tidak ditemukan"
        trail={[
          { label: "Berita Desa Pendil", href: "/article" },
          { label: "Tidak Ditemukan" },
        ]}
      />
      <section className="relative z-10 -mt-24 lg:-mt-32">
        <Container size="wide">
          <Panel>
            <EmptyState
              title="Berita tidak ditemukan"
              description="Berita yang Anda cari tidak ditemukan atau telah dihapus."
            />
            <div className="mt-8 text-center">
              <ButtonLink href="/article" variant="outline">
                Kembali ke Berita
              </ButtonLink>
            </div>
          </Panel>
        </Container>
      </section>
    </>
  );
}

function ArticleDetailPage() {
  const { article, related } = Route.useLoaderData();

  const date = new Date(article.date);
  const paragraphs = (article.content ?? "").split(/\n{2,}/).filter(Boolean);

  return (
    <>
      <PageHero
        title={article.title}
        trail={[
          { label: "Berita Desa Pendil", href: "/article" },
          { label: "Preview Berita" },
        ]}
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base font-medium">
          <li className="flex items-center gap-2">
            <LuCalendarDays className="size-6" aria-hidden />
            <time dateTime={article.date}>
              {Number.isNaN(date.getTime())
                ? article.date
                : formatLongDate(date)}
            </time>
          </li>
          <li className="flex items-center gap-2">
            <LuUser className="size-6" aria-hidden />
            {article.author ?? "Admin"}
          </li>
        </ul>
      </PageHero>

      <div className="relative z-10 -mt-24 space-y-12 lg:-mt-32 lg:space-y-[140px]">
        <article>
          <Container size="wide">
            <Panel className="flex flex-col items-center gap-12 lg:gap-20 xl:px-[125px]">
              <div className="relative aspect-[1239/560] w-full overflow-hidden rounded-2xl bg-canvas">
                <img
                  src={article.image}
                  alt=""
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-full space-y-6 text-base leading-7 text-muted sm:text-justify lg:text-2xl lg:leading-9">
                {paragraphs.length > 0 ? (
                  paragraphs.map((text, i) => <p key={i}>{text}</p>)
                ) : (
                  <p>Isi lengkap berita ini belum tersedia.</p>
                )}
              </div>
              <ShareButton title={article.title} />
            </Panel>
          </Container>
        </article>

        {related.length > 0 ? (
          <section aria-labelledby="terkini-title">
            <Container size="wide">
              <Panel>
                <SectionHeading
                  id="terkini-title"
                  title="Berita Terkini"
                  action={
                    <ButtonLink href="/article" variant="outline">
                      Selengkapnya
                      <PiArrowUpRight aria-hidden />
                    </ButtonLink>
                  }
                />
                <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {related.map((item) => (
                    <li key={item.id}>
                      <ArticleCard
                        article={item}
                        href={`/article/${item.id}`}
                      />
                    </li>
                  ))}
                </ul>
              </Panel>
            </Container>
          </section>
        ) : null}
      </div>
    </>
  );
}
