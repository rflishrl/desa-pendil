import Image from "next/image";

/** Full-bleed hero photo with the Figma gradient overlay. Place inside a `relative isolate` parent. */
export function HeroBackground() {
  return (
    <>
      <Image
        src="/images/bg-hero-new.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-overlay" />
    </>
  );
}
