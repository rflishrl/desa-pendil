import { PiArrowUpRight } from "react-icons/pi";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { ButtonLink } from "@/components/ui/Button";
import { CardRail } from "@/components/ui/CardRail";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Article } from "@/types";

export function LatestNewsSection({ articles }: { articles: Article[] }) {
  return (
    <section aria-labelledby="berita-title" className="relative z-10 -mt-24 sm:-mt-28">
      <Container size="wide">
        <Panel>
          <SectionHeading
            id="berita-title"
            title="Berita Terkini"
            action={
              <ButtonLink href="/article" variant="outline">
                Selengkapnya
                <PiArrowUpRight aria-hidden />
              </ButtonLink>
            }
          />
          {articles.length > 0 ? (
            <div className="mt-12">
              <CardRail
                label="Berita terkini"
                itemWidth="[&>li]:w-[276px]"
                columns="md:grid-cols-2 lg:grid-cols-3"
              >
                {articles.map((article) => (
                  <li key={article.id}>
                    <ArticleCard article={article} href={`/article/${article.id}`} />
                  </li>
                ))}
              </CardRail>
            </div>
          ) : (
            <EmptyState
              className="mt-12"
              title="Berita belum tersedia"
              description="Berita belum dapat dimuat. Silakan coba lagi nanti."
            />
          )}
        </Panel>
      </Container>
    </section>
  );
}
