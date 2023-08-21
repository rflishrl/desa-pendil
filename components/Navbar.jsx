"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative isolate bg-black bg-opacity-20">
      <nav className="mx-auto flex max-w-7xl items-end justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/Home" className="flex items-center p-1.5">
            <img className="h-8 w-auto" src="images/dummy-logo.png" alt="" />
            <p className="ml-2 text-white text-lg font-bold italic">
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
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-white text-base font-semibold hover:text-amber-500 hover:bg-white hover:bg-opacity-10 "
          >
            Beranda
          </Link>
          <a
            href="/Article"
            className="rounded-lg px-3 py-2 text-white text-base font-semibold hover:text-amber-500 hover:bg-white hover:bg-opacity-10 "
          >
            Berita Desa
          </a>
          <Link
            href="/Service"
            className="rounded-lg px-3 py-2 text-white text-base font-semibold hover:text-amber-500 hover:bg-white hover:bg-opacity-10 "
          >
            Layanan Publik
          </Link>
          <Link
            href="/Profile"
            className="rounded-lg px-3 py-2 text-white text-base font-semibold hover:text-amber-500 hover:bg-white hover:bg-opacity-10 "
          >
            Profil Desa
          </Link>
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
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Beranda
                </Link>
                <Link
                  href="/Article"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Berita Desa
                </Link>
                <Link
                  href="/Service"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Layanan Publik
                </Link>
                <Link
                  href="/Profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Profil Desa Pendil
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
