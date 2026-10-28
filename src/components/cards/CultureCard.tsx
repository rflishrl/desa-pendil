import Image from "next/image";
import type { CultureItem } from "@/types";

/** Figma "CardKesenian": 254px photo, text panel padding 36, 16/22 body text. */
export function CultureCard({ item }: { item: CultureItem }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="relative h-[188px] shrink-0 bg-canvas sm:h-[254px]">
        <Image
          src={item.image}
          alt={`Kesenian ${item.title}`}
          fill
          sizes="(min-width: 1024px) 410px, (min-width: 768px) 45vw, 90vw"
          className="rounded-2xl object-cover"
        />
      </div>
      <div className="space-y-3 p-[26px] lg:space-y-4 lg:p-9">
        <h3 className="text-lg font-bold text-black lg:text-2xl">{item.title}</h3>
        <p className="text-sm leading-5 text-muted lg:text-base lg:leading-[22px]">{item.description}</p>
      </div>
    </article>
  );
}
