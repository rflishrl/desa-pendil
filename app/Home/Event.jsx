import React from "react";
import { PiArrowUpRight } from "react-icons/pi";
import Image from "next/image";

const EventData = [
  {
    id: 1,
    category: "Kategori",
    title: "Peringatan Hari Jadi Desa Pendil ke-120",
    time: "09:00-13:00 WIB",
    status: "Belum Dimulai",
  },
  {
    id: 2,
    category: "Kategori",
    title: "Peringatan Hari Jadi Desa Pendil ke-120",
    time: "09:00-13:00 WIB",
    status: "Belum Dimulai",
  },
  {
    id: 3,
    category: "Kategori",
    title: "Peringatan Hari Jadi Desa Pendil ke-120",
    time: "09:00-13:00 WIB",
    status: "Belum Dimulai",
  },
  {
    id: 4,
    category: "Kategori",
    title: "Peringatan Hari Jadi Desa Pendil ke-120",
    time: "09:00-13:00 WIB",
    status: "Belum Dimulai",
  },
];

const EventCard = ({ event }) => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="w-20 h-9 px-4 py-4 bg-amber-500 bg-opacity-10 rounded-lg justify-center items-center inline-flex mb-2">
        <div className="text-amber-500 text-xs font-semibold">
          {event.category}
        </div>
      </div>
      <h2 className="text-lg text-black font-bold mb-2">{event.title}</h2>
      <div className="flex justify-between items-center">
        <p className="text-xs text-neutral-500 font-medium">{event.time}</p>
        <p className="text-xs text-neutral-500 font-medium">{event.status}</p>
      </div>
    </div>
  );
};

const Event = () => {
  return (
    <div className="relative">
      <Image
        className="absolute inset-0 z-[-10] py-14"
        src="/images/bg-event.png"
        layout="fill"
        objectFit="cover"
        alt=""
        unoptimized
      />
      <div className="container py-14">
        <div className="lg:py-12 lg:mx-32 mx-8">
          <div className="flex flex-col items-center w-full mb-10 sm:flex-row sm:justify-between pt-12 sm:pt-0">
            <div className="lg:w-1/2 w-full lg:mb-0">
              <h1 className="flex lg:justify-start lg:pl-8 sm:text-3xl text-3xl font-bold justify-center">
                Agenda Hari Ini
              </h1>
              <h2 className="flex lg:justify-start lg:pl-8 sm:text-lg text-lg font-bold justify-center">
                Kamis, 27 Juni 2023
              </h2>
            </div>
            <div className="flex w-full lg:w-1/2 lg:pr-8 justify-center sm:justify-end items-end mt-4 sm:mt-0">
              <button className="inline-flex items-center py-3 px-5 ml-2 text-base font-semibold text-black  rounded-lg border-2 border-black hover:border-gray-300 hover:bg-gray-300 hover:text-white">
                Selengkapnya
                <div className="text-base font-semibold ml-2">
                  <PiArrowUpRight />
                </div>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap m-4">
            {EventData.map((event) => (
              <div key={event.id} className="xl:w-1/3 md:w-3/4 p-2">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
