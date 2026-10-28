import { CultureCard } from "@/components/cards/CultureCard";
import { CardRail } from "@/components/ui/CardRail";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cultures } from "@/data/village";

export function CultureSection() {
  return (
    <section id="kesenian" aria-labelledby="kesenian-title" className="py-8 lg:py-[70px]">
      <Container>
        <SectionHeading id="kesenian-title" title="Kesenian Khas" />
        <div className="mt-12 md:mt-8">
          <CardRail
            label="Kesenian khas"
            itemWidth="[&>li]:w-[293px]"
            columns="md:grid-cols-2 lg:grid-cols-3"
          >
            {cultures.map((item) => (
              <li key={item.title}>
                <CultureCard item={item} />
              </li>
            ))}
          </CardRail>
        </div>
      </Container>
    </section>
  );
}
