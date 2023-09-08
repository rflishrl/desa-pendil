import React from "react";
import {
  MdFamilyRestroom,
  MdHealthAndSafety,
  MdOutlineLocationCity,
} from "react-icons/md";
import Image from "next/image";
import DataList from "@/components/Cards/DataList";

const StatData = [
  {
    icon: <MdFamilyRestroom />,
    title: "1234 Keluarga",
    description: "Total KK",
  },
  {
    icon: <MdHealthAndSafety />,
    title: "12.345 Jiwa",
    description: "Total Penduduk",
  },
  {
    icon: <MdOutlineLocationCity />,
    title: "120 KM",
    description: "Luas Desa",
  },
];

const Service = () => {
  return (
    <div>
      <Image
        className="absolute -z-10 pb-[300px] lg:pb-[300px]"
        src="/images/bg-hero-new.jpg"
        layout="fill"
        objectFit="cover"
        alt=""
      />
      <div className="container mx-auto flex lg:px-60 px-5 py-14 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start text-left mb-16 md:mb-0 items-start">
          <h2 className="mb-10 text-white text-base font-medium">
            Beranda / Layanan Publik
          </h2>
          <h1 className="sm:w-[709px] mb-4 text-white sm:text-3xl text-3xl font-bold">
            Layanan Publik
          </h1>
          <p className="text-white text-opacity-80 text-base font-medium">
            Kumpulan data dari Desa Pendil
          </p>
        </div>
      </div>
      <div className="container pb-24">
        <div className="lg:py-12 bg-cover bg-center bg-opacity-70 bg-[url('/images/bg-event.png')] rounded-2xl lg:mx-32 mx-8 shadow-2xl">
          <div className="flex flex-col items-center w-full mb-10 sm:flex-row sm:justify-between pt-12 sm:pt-0">
            <div className="lg:w-1/2 w-full lg:mb-0">
              <h1 className="flex lg:justify-start lg:pl-20 sm:text-3xl text-3xl font-bold justify-center">
                Data Desa
              </h1>
            </div>
          </div>
          <div className="data-list">
            <div className="px-10">
              <DataList data={StatData} />
            </div>
          </div>
        </div>
      </div>
      <div className="container pb-14">
        <div className="bg-white shadow-lg rounded-xl py-20 px-5 mx-10 lg:py-20 lg:px-20 lg:mx-24">
          <div className="flex flex-col items-center w-full mb-10 sm:flex-row sm:justify-between sm:pt-0">
            <div className="lg:w-1/2 w-full lg:mb-0">
              <h1 className="flex lg:justify-start sm:text-3xl text-3xl font-bold justify-center">
                Data Dusun
              </h1>
            </div>
          </div>
          <div className="data-list">
            <div>
              <h1 className="flex lg:justify-start lg:pl-5 lg:pt-5 sm:text-xl text-xl font-bold justify-center">
                Dusun A
              </h1>
            </div>
            <DataList data={StatData} />
          </div>
          <div className="data-list">
            <div>
              <h1 className="flex lg:justify-start md:mt-0 mt-10 lg:pl-5 lg:pt-16 sm:text-xl text-xl font-bold justify-center">
                Dusun B
              </h1>
            </div>
            <DataList data={StatData} />
          </div>
          <div className="data-list">
            <div>
              <h1 className="flex lg:justify-start md:mt-0 mt-10 lg:pl-5 lg:pt-16 sm:text-xl text-xl font-bold justify-center">
                Dusun C
              </h1>
            </div>
            <DataList data={StatData} />
          </div>
        </div>
      </div>
      <div className="container pb-24">
        <div className="lg:py-12 lg:mx-32 mx-8">
          <div className="flex flex-col items-center w-full mb-10 sm:flex-row sm:justify-between sm:pt-0">
            <div className="lg:w-1/2 w-full lg:mb-0">
              <h1 className="flex lg:justify-start sm:text-3xl text-3xl font-bold justify-center">
                Galeri Desa
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap -m-4 justify-center">
            <div className="md:w-1/4 w-3/4 p-2">
              <div className="rounded-lg shadow-lg">
                <Image
                  className="rounded-lg"
                  src="/images/dummy-people.jpg"
                  width={1000}
                  height={1000}
                  alt=""
                />
              </div>
            </div>
            <div className="md:w-1/4 w-3/4 p-2">
              <div className="rounded-lg shadow-lg">
                <Image
                  className="rounded-lg"
                  src="/images/dummy-people.jpg"
                  width={1000}
                  height={1000}
                  alt=""
                />
              </div>
            </div>
            <div className="md:w-1/4 w-3/4 p-2">
              <div className="rounded-lg shadow-lg">
                <Image
                  className="rounded-lg"
                  src="/images/dummy-people.jpg"
                  width={1000}
                  height={1000}
                  alt=""
                />
              </div>
            </div>
            <div className="md:w-1/4 w-3/4 p-2">
              <div className="rounded-lg shadow-lg">
                <Image
                  className="rounded-lg"
                  src="/images/dummy-people.jpg"
                  width={1000}
                  height={1000}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
