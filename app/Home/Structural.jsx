import React from "react";
import PeopleList from "@/components/Cards/PeopleList";

const PeopleData = [
  {
    title: "HJ.Syafi'i",
    image: "/images/dummy-people.jpg",
    position: "Kepala Desa",
  },
  {
    title: "HJ.Syafi'i",
    image: "/images/dummy-people.jpg",
    position: "Wakil Kades",
  },
  {
    title: "HJ.Syafi'i",
    image: "/images/dummy-people.jpg",
    position: "Sekretaris",
  },
  {
    title: "HJ.Syafi'i",
    image: "/images/dummy-people.jpg",
    position: "Bendahara",
  },
];

const Structural = () => {
  return (
    <div className="container">
      <div className="lg:py-12 bg-white sm:bg-none rounded-2xl lg:mx-32 mx-8 shadow-2xl sm:shadow-none">
        <div className="flex flex-col items-center w-full mb-8 sm:flex-row sm:justify-between pt-12 sm:pt-0">
          <div className="lg:w-1/2 w-full lg:mb-0">
            <h1 className="flex lg:justify-start lg:pl-32 sm:text-3xl text-3xl font-bold justify-center">
              Perangkat Desa
            </h1>
          </div>
        </div>
        <div className="people-list">
          <PeopleList data={PeopleData} />
        </div>
      </div>
    </div>
  );
};

export default Structural;
