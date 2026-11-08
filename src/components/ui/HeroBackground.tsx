export function HeroBackground() {
  return (
    <>
      <img
        src="/images/bg-hero-new.jpg"
        alt=""
        loading="eager"
        fetchPriority="high"
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-hero-overlay" />
    </>
  );
}
