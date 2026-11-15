import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { mainNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0";

export function Navbar() {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = useLocation({ select: (location) => location.pathname });
  const menuId = useId();
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const open = openPath === pathname;

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const closeMenu = () => {
    setOpenPath(null);
    triggerRef.current?.focus();
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="absolute inset-x-0 top-0 z-30 bg-black/15 backdrop-blur-xs">
      {/* Figma: 36px side padding on mobile, 120px on desktop (1728 wide) */}
      <div className="mx-auto flex h-20 w-full max-w-[1608px] items-center justify-between px-9 xl:px-[60px]">
        <Link
          to="/"
          className={cn(
            "rounded-sm font-logo text-lg font-bold italic text-primary-100 lg:font-sans lg:text-2xl lg:font-black lg:not-italic",
            focusRing,
          )}
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-4">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  viewTransition
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-[50px] items-center rounded-lg px-6 text-base font-semibold transition-colors duration-200 hover:bg-white/10 hover:text-primary xl:px-9",
                    focusRing,
                    isActive(item.href) ? "bg-white/10 text-primary" : "text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpenPath(open ? null : pathname)}
          aria-label="Buka menu navigasi"
          aria-expanded={open}
          aria-controls={menuId}
          aria-haspopup="dialog"
          className={cn(
            "inline-flex size-11 cursor-pointer items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary/20 lg:hidden",
            focusRing,
          )}
        >
          <HiBars3 className="size-5" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu: dropdown card under the bar (Figma NavbarMobile) */}
      {open ? (
        <div className="relative z-40 lg:hidden">
          <div aria-hidden="true" onClick={closeMenu} className="fixed inset-0 bg-black/40" />
          <div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-x-[17px] top-[22px] origin-top rounded-xl bg-white p-3 shadow-card-hover"
          >
            <h2 id={titleId} className="sr-only">
              Navigasi Seluler Desa Pendil
            </h2>
            <div className="mb-2 flex items-center justify-between pl-3">
              <span className="flex items-center gap-3 text-base font-bold">
                <img src="/images/dummy-logo.png" alt="" width={28} height={28} loading="lazy" />
                {siteConfig.name}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenu}
                aria-label="Tutup menu navigasi"
                className={cn(
                  "inline-flex size-11 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-primary/10",
                  focusRing,
                )}
              >
                <HiXMark className="size-6" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Navigasi seluler">
              <ul className="space-y-2">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      viewTransition
                      onClick={() => setOpenPath(null)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "flex min-h-[50px] items-center rounded-lg px-6 text-base font-semibold text-muted transition-colors hover:bg-primary/10",
                        focusRing,
                        isActive(item.href) && "bg-primary/10 text-primary-700",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
