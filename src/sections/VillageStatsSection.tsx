import { PiArrowUpRight } from "react-icons/pi";
import { StatCard } from "@/components/cards/StatCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { villageStats } from "@/data/village";

export function VillageStatsSection({ showMoreLink = false }: { showMoreLink?: boolean }) {
  return (
    <section id="data-desa" aria-labelledby="data-desa-title" className="py-8 lg:py-[70px]">
      <Container>
        <SectionHeading
          id="data-desa-title"
          title="Data Desa"
          action={
            showMoreLink ? (
              <ButtonLink href="/services#data-desa" variant="outline">
                Selengkapnya
                <PiArrowUpRight aria-hidden />
              </ButtonLink>
            ) : undefined
          }
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {villageStats.map((stat) => (
            <li key={stat.description}>
              <StatCard stat={stat} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
