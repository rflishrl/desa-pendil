import type { Stat } from "@/types";

/** Figma "CardJumlah": padding 36, gap 24, 60px icon, 24px bold title. */
export function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;
  return (
    <div className="flex h-full items-center gap-[17px] rounded-2xl bg-white p-[26px] shadow-card lg:gap-6 lg:p-9">
      <Icon aria-hidden className="size-11 shrink-0 text-primary lg:size-[60px]" />
      <div>
        <p className="text-[17px] font-bold text-black lg:text-2xl">{stat.title}</p>
        <p className="text-xs font-medium text-body lg:text-base">{stat.description}</p>
      </div>
    </div>
  );
}
