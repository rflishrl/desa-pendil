import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { leader } from "@/data/village";

export function LeaderSection() {
  return (
    <section id="sambutan" aria-labelledby="sambutan-title" className="py-8 lg:py-[70px]">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-[42px]">
          <div className="relative mx-auto aspect-[592/537] w-full overflow-hidden rounded-xl bg-canvas md:rounded-3xl">
            <Image
              src={leader.image}
              alt={`Kepala Desa ${leader.name}`}
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-ink lg:mb-4 lg:text-xl">Sambutan</p>
            <h2 id="sambutan-title" className="mb-4 text-balance text-xl font-bold md:text-3xl lg:mb-6 lg:text-[32px]">
              Kepala Desa <span className="font-extrabold text-primary-700">{leader.name}</span>
            </h2>
            <p className="text-sm leading-6 text-muted lg:text-xl lg:leading-8">{leader.speech}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
