import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/ui/Container";
import { MediaImage } from "@/components/ui/MediaImage";
import { PageHero } from "@/components/ui/PageHero";
import { villageOrigin } from "@/data/village";
import { CultureSection } from "@/sections/CultureSection";
import { FeaturesSection } from "@/sections/FeaturesSection";
import { LeaderSection } from "@/sections/LeaderSection";
import { OfficialsSection } from "@/sections/OfficialsSection";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profil Desa - Desa Pendil" },
      {
        name: "description",
        content: "Profil dan informasi seputar Desa Pendil.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <>
      <PageHero title="Profil Desa Pendil" description="Profil dan informasi seputar Desa Pendil" />

      {/* Figma "CardSambutan": textured panel, radius 24, shadow 0 8 30 */}
      <section
        id="asal-usul"
        aria-labelledby="asal-usul-title"
        className="relative z-10 -mt-24 lg:-mt-32"
      >
        <Container size="wide">
          <div className="relative isolate overflow-hidden rounded-3xl px-6 py-12 shadow-[0_8px_30px_rgba(0,0,0,0.1)] lg:px-12 lg:py-[60px]">
            <MediaImage
              src="/images/bg-event.webp"
              alt=""
              width={1920}
              height={1920}
              aria-hidden="true"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="mx-auto flex max-w-[1238px] flex-col gap-8 lg:gap-[42px]">
              <div className="relative h-[251px] overflow-hidden rounded-2xl bg-canvas sm:h-[360px] lg:h-[537px]">
                <MediaImage
                  src={villageOrigin.image}
                  variant="full"
                  alt="Pemandangan Desa Pendil"
                  width={1600}
                  height={1200}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-lg font-semibold text-ink lg:text-xl">Asal Usul</p>
                <h2 id="asal-usul-title" className="text-2xl font-bold lg:text-[32px]">
                  Desa Pendil
                </h2>
                <p className="text-base leading-7 text-muted lg:text-xl lg:leading-8">
                  {villageOrigin.text}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <LeaderSection />
      <OfficialsSection />
      <FeaturesSection />
      <CultureSection />
    </>
  );
}
