import { FeatureCard } from "@/components/cards/FeatureCard";
import { CardRail } from "@/components/ui/CardRail";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/data/village";

export function FeaturesSection() {
  return (
    <section id="keunggulan" aria-labelledby="keunggulan-title" className="py-8 lg:py-[70px]">
      <Container>
        <SectionHeading id="keunggulan-title" title="Keunggulan" className="md:items-end" />
        <div className="mt-12 md:mt-8">
          <CardRail
            label="Keunggulan desa"
            itemWidth="[&>li]:w-[294px]"
            columns="md:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <li key={index}>
                <FeatureCard feature={feature} />
              </li>
            ))}
          </CardRail>
        </div>
      </Container>
    </section>
  );
}
