import { MediaImage } from "@/components/ui/MediaImage";

export function HeroBackground() {
  return (
    <>
      <MediaImage
        src="/images/bg-hero-new.jpg"
        variant="full"
        priority="high"
        alt=""
        width={1024}
        height={576}
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-hero-overlay" />
    </>
  );
}
