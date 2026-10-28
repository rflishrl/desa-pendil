import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LuCalendarDays, LuUser } from "react-icons/lu";
import { PiArrowUpRight } from "react-icons/pi";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShareButton } from "@/components/ui/ShareButton";
import { getArticle, getArticles } from "@/lib/api";
import { formatLongDate } from "@/lib/format";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  return { title: article?.title ?? "Berita tidak ditemukan" };
}

export default async function ArticleDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const [article, all] = await Promise.all([getArticle(id), getArticles()]);
  if (!article) notFound();

  const date = new Date(article.date);
  const paragraphs = (article.content ?? "").split(/\n{2,}/).filter(Boolean);
  const related = all.filter((a) => a.id !== article.id).slice(0, 3);

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
              {Number.isNaN(date.getTime()) ? article.date : formatLongDate(date)}
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
                <Image
                  src={article.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1280px) 1239px, 90vw"
                  className="object-cover"
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
                      <ArticleCard article={item} href={`/article/${item.id}`} />
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
