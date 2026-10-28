import { OfficialCard } from "@/components/cards/OfficialCard";
import { CardRail } from "@/components/ui/CardRail";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { officials } from "@/data/village";

export function OfficialsSection() {
  return (
    <section id="perangkat" aria-labelledby="perangkat-title" className="py-8 lg:py-[70px]">
      <Container size="wide" className="md:max-w-[1328px] md:!px-8 lg:!px-10">
        {/* White panel on mobile only (Figma), plain on tablet/desktop */}
        <div className="rounded-2xl bg-surface px-6 py-12 shadow-card md:rounded-none md:bg-transparent md:p-0 md:shadow-none">
          <SectionHeading id="perangkat-title" title="Perangkat Desa" />
          <div className="mt-12 md:mt-8">
            <CardRail
              label="Perangkat desa"
              itemWidth="[&>li]:w-[276px]"
              columns="md:grid-cols-2 lg:grid-cols-4"
            >
              {officials.map((official, index) => (
                <li key={`${official.position}-${index}`}>
                  <OfficialCard official={official} />
                </li>
              ))}
            </CardRail>
          </div>
        </div>
      </Container>
    </section>
  );
}
