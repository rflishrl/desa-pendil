import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { footerGroups, siteConfig, socialLinks } from "@/config/site";
import { Container } from "@/components/ui/Container";

const socialIcons: Record<(typeof socialLinks)[number]["icon"], IconType> = {
  facebook: FaFacebookF,
  x: FaXTwitter,
  instagram: FaInstagram,
  youtube: FaYoutube,
};

export function Footer() {
  return (
    <footer className="mt-16 bg-white lg:mt-[100px]">
      <Container className="py-[42px] lg:py-[120px]">
        <div className="grid gap-9 lg:grid-cols-[auto_1fr] lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-9 lg:justify-between">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-3.5 rounded">
                <Image src="/images/dummy-logo-2.png" alt="" width={38} height={47} />
                <span className="font-logo text-2xl font-bold italic text-primary-700">
                  {siteConfig.name}
                </span>
              </Link>
              <address className="max-w-[248px] text-sm font-semibold not-italic">
                {siteConfig.address}
              </address>
            </div>
            <ul className="flex gap-4" aria-label="Media sosial">
              {socialLinks.map(({ label, href, icon }) => {
                const Icon = socialIcons[icon];
                return (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      className="inline-flex size-[50px] items-center justify-center rounded-lg bg-primary text-ink transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                    >
                      <Icon className="size-5" aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav
            aria-label="Peta situs"
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:justify-self-end lg:gap-[60px]"
          >
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-xl font-bold text-ink">{group.title}</h3>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-9 items-center rounded text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </Container>
      <div className="bg-primary py-[26px]">
        <p className="px-9 text-center font-logo text-xl font-medium text-ink">
          © {new Date().getFullYear()} {siteConfig.copyright}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
