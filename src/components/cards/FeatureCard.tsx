import type { Feature } from "@/types";

/** Figma "CardKeunggulan": padding 36, gap 24, 60px icon, 14/20 body text. */
export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl bg-white p-9 shadow-card">
      <Icon aria-hidden className="size-[60px] text-primary lg:size-[60px]" />
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-black lg:text-2xl">{feature.title}</h3>
        <p className="text-sm leading-5 text-muted">{feature.description}</p>
      </div>
    </div>
  );
}
