import React from "react";
import { PiArrowUpRight } from "react-icons/pi";
import {
  MdFamilyRestroom,
  MdHealthAndSafety,
  MdOutlineLocationCity,
} from "react-icons/md";
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

const VillageData = () => {
  return (
    <div className="container py-14">
      <div className="lg:py-12 lg:mx-32 mx-8">
        <div className="flex flex-col items-center w-full mb-10 sm:flex-row sm:justify-between sm:pt-0">
          <div className="lg:w-1/2 w-full lg:mb-0">
            <h1 className="flex lg:justify-start sm:text-3xl text-3xl font-bold justify-center">
              Data Desa
            </h1>
          </div>
          <div className="flex w-full lg:w-1/2 lg:pr-8 justify-center sm:justify-end items-end mt-4 sm:mt-0">
            <button className="inline-flex items-center py-3 px-5 ml-2 text-base font-semibold text-amber-500  rounded-lg border-2 border-amber-500 hover:border-gray-300 hover:bg-gray-300 hover:text-white">
              Selengkapnya
              <div className="text-base font-semibold ml-2">
                <PiArrowUpRight />
              </div>
            </button>
          </div>
        </div>
        <div className="data-list">
          <DataList data={StatData} />
        </div>
      </div>
    </div>
  );
};

export default VillageData;
