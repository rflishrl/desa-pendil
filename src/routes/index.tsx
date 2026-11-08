import { Await, createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { CultureSection } from "@/sections/CultureSection";
import { FeaturesSection } from "@/sections/FeaturesSection";
import { HomeHero } from "@/sections/HomeHero";
import {
  LatestNewsSection,
  LatestNewsSectionSkeleton,
} from "@/sections/LatestNewsSection";
import { LeaderSection } from "@/sections/LeaderSection";
import { OfficialsSection } from "@/sections/OfficialsSection";
import { TodayAgendaSection } from "@/sections/TodayAgendaSection";
import { VillageStatsSection } from "@/sections/VillageStatsSection";
import { getArticlesServerFn } from "@/lib/api/functions";

export const Route = createFileRoute("/")({
  loader: () => {
    return {
      articlesPromise: getArticlesServerFn(),
    };
  },
  head: () => ({
    meta: [
      { title: "Desa Pendil" },
      {
        name: "description",
        content:
          "Website resmi Desa Pendil, Kecamatan Banyuanyar, Kabupaten Probolinggo. Berita, layanan publik, dan profil desa.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { articlesPromise } = Route.useLoaderData();

  return (
    <>
      <HomeHero />
      <Suspense fallback={<LatestNewsSectionSkeleton />}>
        <Await promise={articlesPromise}>
          {(articles) => <LatestNewsSection articles={articles.slice(0, 3)} />}
        </Await>
      </Suspense>
      <LeaderSection />
      <OfficialsSection />
      <TodayAgendaSection />
      <VillageStatsSection showMoreLink />
      <FeaturesSection />
      <CultureSection />
    </>
  );
}
