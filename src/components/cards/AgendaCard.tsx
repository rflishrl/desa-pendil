import type { AgendaItem } from "@/types";

/** Figma "AgendaCard": 400x169, padding 24, gap 8, radius 8. */
export function AgendaCard({ item }: { item: AgendaItem }) {
  return (
    <article className="flex h-full flex-col items-start gap-2 rounded-xl bg-white p-[18px] shadow-card sm:rounded-lg sm:p-6">
      <span className="inline-flex h-7 items-center rounded-lg bg-primary/10 px-3 text-xs sm:h-9 sm:px-4 font-semibold text-primary-700">
        {item.category}
      </span>
      <h3 className="text-[15px] font-bold leading-5 text-black sm:text-xl sm:leading-[26px]">{item.title}</h3>
      <div className="flex w-full items-center justify-between gap-3 text-xs font-medium text-muted sm:text-sm">
        <p>{item.time}</p>
        <p className="text-right">{item.status}</p>
      </div>
    </article>
  );
}
