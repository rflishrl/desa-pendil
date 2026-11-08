import { createFileRoute } from "@tanstack/react-router";
import { PiArrowUpRight } from "react-icons/pi";
import { StatCard } from "@/components/cards/StatCard";
import { ButtonLink } from "@/components/ui/Button";
import { CardRail } from "@/components/ui/CardRail";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { hamlets, galleryImages as placeholderImages, villageStats } from "@/data/village";
import { getGalleryImagesServerFn } from "@/lib/api/functions";
import { GalleryGrid } from "@/sections/GalleryGrid";

export const Route = createFileRoute("/services")({
  loader: async () => {
    const images = await getGalleryImagesServerFn();
    return {
      galleryImages: images ?? placeholderImages,
    };
  },
  head: () => ({
    meta: [
      { title: "Layanan Publik - Desa Pendil" },
      {
        name: "description",
        content: "Kumpulan data dari Desa Pendil.",
      },
    ],
  }),
  component: ServicesPage,
});

function StatList() {
  return (
    <ul className="mx-auto grid max-w-[276px] gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
      {villageStats.map((stat) => (
        <li key={stat.description}>
          <StatCard stat={stat} />
        </li>
      ))}
    </ul>
  );
}

function ServicesPage() {
  const { galleryImages } = Route.useLoaderData();

  return (
    <>
      <PageHero title="Layanan Publik" description="Kumpulan data dari Desa Pendil" />

      <div className="relative z-10 -mt-24 space-y-20 lg:-mt-32 lg:space-y-[140px]">
        {/* Data Desa: textured panel (Figma "bg" fill) */}
        <section id="data-desa" aria-labelledby="data-desa-title">
          <Container size="wide">
            <div className="relative isolate overflow-hidden rounded-2xl px-6 py-12 shadow-card lg:px-12 lg:py-[60px]">
              <img
                src="/images/bg-event.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="mx-auto max-w-[1248px] space-y-12 lg:space-y-6">
                <SectionHeading id="data-desa-title" title="Data Desa" />
                <StatList />
              </div>
            </div>
          </Container>
        </section>

        {/* Data Dusun: swipe rail on mobile (Figma), stacked groups from md */}
        <section id="data-dusun" aria-labelledby="data-dusun-title">
          <Container size="wide">
            <Panel>
              <SectionHeading id="data-dusun-title" title="Data Dusun" />
              <div className="mt-12">
                <CardRail
                  label="Data per dusun"
                  itemWidth="[&>li]:w-[276px]"
                  columns="md:grid-cols-1 md:gap-10"
                >
                  {hamlets.map((hamlet) => (
                    <li key={hamlet}>
                      <h3 className="mb-4 text-xl font-bold">{hamlet}</h3>
                      <StatList />
                    </li>
                  ))}
                </CardRail>
              </div>
            </Panel>
          </Container>
        </section>

        {/* Galeri: transparent 324px box on mobile with a swipe rail */}
        <section id="galeri" aria-labelledby="galeri-title">
          <Container size="wide" className="md:max-w-[1328px] md:!px-8 lg:!px-10">
            <div className="px-6 py-12 md:p-0">
              <SectionHeading
                id="galeri-title"
                title="Galeri Desa"
                action={
                  <ButtonLink href="/gallery" variant="outline">
                    Selengkapnya
                    <PiArrowUpRight aria-hidden />
                  </ButtonLink>
                }
              />
              <div className="mt-12 md:mt-6">
                {galleryImages.length > 0 ? (
                  <GalleryGrid images={galleryImages.slice(0, 3)} rail />
                ) : (
                  <EmptyState title="Belum ada foto" />
                )}
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
