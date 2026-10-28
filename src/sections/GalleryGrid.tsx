import Image from "next/image";
import { CardRail } from "@/components/ui/CardRail";
import type { GalleryImage } from "@/types";

interface GalleryGridProps {
  images: GalleryImage[];
  /** Mobile swipe rail instead of a single stacked column (Figma "Layanan Publik"). */
  rail?: boolean;
}

/** Figma gallery tiles are tall (397x525 desktop, 278x368 mobile, radius 16). */
export function GalleryGrid({ images, rail = false }: GalleryGridProps) {
  const items = images.map((image, index) => (
    <li
      key={`${image.src}-${index}`}
      className="relative mx-auto aspect-[278/368] w-full max-w-[278px] overflow-hidden rounded-2xl bg-canvas shadow-card sm:aspect-[397/525] sm:max-w-none"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 278px"
        className="object-cover transition-transform duration-300 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
      />
    </li>
  ));

  if (rail) {
    return (
      <CardRail
        label="Galeri desa"
        itemWidth="[&>li]:w-[278px]"
        columns="md:grid-cols-2 lg:grid-cols-3"
      >
        {items}
      </CardRail>
    );
  }

  return <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items}</ul>;
}
