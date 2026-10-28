import Image from "next/image";
import Link from "next/link";
import { PiArrowUpRight } from "react-icons/pi";
import type { Article } from "@/types";
import { formatLongDate } from "@/lib/format";

/** Figma "CardBerita": 254px photo on top, white text panel (padding 36) below. */
export function ArticleCard({ article, href }: { article: Article; href?: string }) {
  const date = new Date(article.date);
  const dateLabel = Number.isNaN(date.getTime()) ? article.date : formatLongDate(date);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-200 hover:shadow-card-hover">
      <div className="relative h-[177px] shrink-0 bg-canvas sm:h-[254px]">
        <Image
          src={article.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 45vw, 90vw"
          className="rounded-2xl object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-6 p-6 lg:p-9">
        <div className="space-y-2">
          <h3 className="line-clamp-3 text-[17px] font-bold leading-snug text-black lg:text-2xl lg:leading-8">
            {article.title}
          </h3>
          <time dateTime={article.date} className="block text-xs font-medium text-muted lg:text-base">
            {dateLabel}
          </time>
        </div>
        {href ? (
          <Link
            href={href}
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg bg-primary/10 px-4 text-xs font-semibold text-primary-700 transition-colors hover:bg-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:min-h-9"
          >
            Selengkapnya
            <PiArrowUpRight className="size-5" aria-hidden />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
