import Image from "next/image";
import type { Official } from "@/types";

/** Figma "PerangkatDesa": tall photo (291x389), text panel with padding 36. */
export function OfficialCard({ official }: { official: Official }) {
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="relative aspect-square md:aspect-[291/389] bg-canvas">
        <Image
          src={official.image}
          alt={`Foto ${official.name}`}
          fill
          sizes="(min-width: 1024px) 300px, 45vw"
          className="rounded-2xl object-cover"
        />
      </div>
      <figcaption className="space-y-1 p-[34px] lg:p-9">
        <p className="break-words text-[23px] font-bold uppercase leading-[30px] text-black lg:text-2xl lg:leading-8">
          {official.name}
        </p>
        <p className="text-[19px] font-medium text-muted lg:text-xl">
          {official.position}
        </p>
      </figcaption>
    </figure>
  );
}
