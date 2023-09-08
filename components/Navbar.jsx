"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  const navbarList = [
    { id: 1, content: "Beranda", pathname: "/" },
    { id: 2, content: "Berita Desa", pathname: "/article" },
    { id: 3, content: "Layanan Publik", pathname: "/services" },
    { id: 4, content: "Profil Desa", pathname: "/profile" },
  ];

  return (
    <header className="relative isolate bg-black bg-opacity-20">
      <nav className="mx-auto flex max-w-7xl items-end justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/Home" className="flex items-center p-1.5">
            <p className="ml-2 text-white text-lg text-opacity-90 font-black">
              Desa Pendil
            </p>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-white hover:text-amber-500 hover:bg-amber-500 hover:bg-opacity-10"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navbarList.map((item) => {
            return (
              <Link
                key={item.id}
                href={item.pathname}
                className={`rounded-lg px-3 py-2 text-base font-semibold hover:text-amber-500 hover:bg-white hover:bg-opacity-10 ${
                  pathname === item.pathname
                    ? "text-amber-500 bg-white bg-opacity-10"
                    : "text-white"
                }`}
              >
                {item.content}
              </Link>
            );
          })}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center">
              <img className="h-8 w-auto" src="images/dummy-logo.png" alt="" />
              <p className="ml-2 text-gray-900 text-lg font-bold italic">
                Desa Pendil
              </p>
            </a>
            <button
              type="button"
              className="rounded-md text-black hover:bg-amber-500 hover:bg-opacity-10"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navbarList.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      href={item.pathname}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.content}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
