import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { villageOrigin } from "@/data/village";
import { CultureSection } from "@/sections/CultureSection";
import { FeaturesSection } from "@/sections/FeaturesSection";
import { LeaderSection } from "@/sections/LeaderSection";
import { OfficialsSection } from "@/sections/OfficialsSection";

export const metadata: Metadata = {
  title: "Profil Desa",
  description: "Profil dan informasi seputar Desa Pendil.",
};

export default function ProfilePage() {
  return (
    <>
      <PageHero
        title="Profil Desa Pendil"
        description="Profil dan informasi seputar Desa Pendil"
      />

      {/* Figma "CardSambutan": textured panel, radius 24, shadow 0 8 30 */}
      <section
        id="asal-usul"
        aria-labelledby="asal-usul-title"
        className="relative z-10 -mt-24 lg:-mt-32"
      >
        <Container size="wide">
          <div className="relative isolate overflow-hidden rounded-3xl px-6 py-12 shadow-[0_8px_30px_rgba(0,0,0,0.1)] lg:px-12 lg:py-[60px]">
            <Image
              src="/images/bg-event.png"
              alt=""
              fill
              sizes="100vw"
              quality={60}
              className="-z-10 object-cover"
            />
            <div className="mx-auto flex max-w-[1238px] flex-col gap-8 lg:gap-[42px]">
              <div className="relative h-[251px] overflow-hidden rounded-2xl bg-canvas sm:h-[360px] lg:h-[537px]">
                <Image
                  src={villageOrigin.image}
                  alt="Pemandangan Desa Pendil"
                  fill
                  sizes="(min-width: 1280px) 1238px, 90vw"
                  className="object-cover"
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
