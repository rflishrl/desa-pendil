import React from "react";
import Image from "next/image";
import { MdSearch } from "react-icons/md";
import Buttons from "@/components/Buttons/Buttons";

const Hero = () => {
  return (
    <div>
      <Image
        className="absolute inset-0 -z-10"
        src="/images/bg-hero.jpg"
        layout="fill"
        objectFit="cover"
        alt=""
      />
      <div className="container mx-auto flex lg:px-60 px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start text-left mb-16 md:mb-0 items-center">
          <h1 className="sm:w-[709px] mb-[60px] text-white sm:text-3xl text-2xl font-bold uppercase">
            Menjawab Kebutuhan Informasi Publik warga desa Pendil
          </h1>
          <p className="mb-4 text-white text-base font-medium">
            Temukan informasi yang kamu cari di sini
          </p>
          <div className="flex md:justify-start justify-center items-end">
            <form className="flex items-center">
              <div className="relative md:w-96">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <div className="text-2xl text-neutral-400 mr-2">
                    <MdSearch />
                  </div>
                </div>
                <input
                  type="text"
                  id="voice-search"
                  className="md:w-full w-full bg-gray-50 text-neutral-400 text-base font-semibold rounded-lg pl-14 p-2.5"
                  placeholder="Cari Informasi Anda"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-24 items-center ml-2 py-2.5 text-base font-medium text-center text-white bg-amber-500 rounded-lg  hover:bg-gray-300"
              >
                Cari
              </button>
            </form>
          </div>
          <p className="mt-[60px] mb-6 text-white text-base font-medium">
            Pencarian terpopuler
          </p>
          <Buttons />
        </div>
      </div>
    </div>
  );
};

export default Hero;
