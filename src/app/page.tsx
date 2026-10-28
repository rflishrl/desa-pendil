import { HomeHero } from "@/sections/HomeHero";
import { LatestNewsSection } from "@/sections/LatestNewsSection";
import { LeaderSection } from "@/sections/LeaderSection";
import { OfficialsSection } from "@/sections/OfficialsSection";
import { TodayAgendaSection } from "@/sections/TodayAgendaSection";
import { VillageStatsSection } from "@/sections/VillageStatsSection";
import { FeaturesSection } from "@/sections/FeaturesSection";
import { CultureSection } from "@/sections/CultureSection";
import { getArticles } from "@/lib/api";

export const revalidate = 3600;

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <>
      <HomeHero />
      <LatestNewsSection articles={articles.slice(0, 3)} />
      <LeaderSection />
      <OfficialsSection />
      <TodayAgendaSection />
      <VillageStatsSection showMoreLink />
      <FeaturesSection />
      <CultureSection />
    </>
  );
}
