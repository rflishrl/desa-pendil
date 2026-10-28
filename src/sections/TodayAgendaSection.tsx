import Image from "next/image";
import { PiArrowUpRight } from "react-icons/pi";
import { AgendaCard } from "@/components/cards/AgendaCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { agenda } from "@/data/village";
import { formatLongDate } from "@/lib/format";

export function TodayAgendaSection() {
  return (
    <section
      id="agenda"
      aria-labelledby="agenda-title"
      className="relative isolate my-8 overflow-hidden py-12 lg:my-[70px] lg:py-[60px]"
    >
      <Image
        src="/images/bg-event.png"
        alt=""
        fill
        sizes="100vw"
        quality={60}
        className="-z-10 object-cover"
      />
      <Container>
        <SectionHeading
          id="agenda-title"
          title="Agenda Hari Ini"
          subtitle={formatLongDate(new Date())}
          action={
            <ButtonLink href="/services" variant="outline-dark">
              Selengkapnya
              <PiArrowUpRight aria-hidden />
            </ButtonLink>
          }
        />
        <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
          {agenda.map((item) => (
            <li key={item.id}>
              <AgendaCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
