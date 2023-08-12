import React from "react";
import Image from "next/image";
import { PiArrowUpRight } from "react-icons/pi";

const Card = ({ image, title, category, date }) => (
  <div className="md:w-1/3 w-5/6 p-4">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Image
        className="mb-6 rounded-lg"
        src={image}
        width={1000}
        height={1000}
        alt=""
      />
      <h3 className="text-gray-500 text-xs font-medium mb-2 uppercase">
        {category}
      </h3>
      <h2 className="text-xl font-bold title-font mb-2">{title}</h2>
      <p className="text-xs text-gray-500 mb-11">{date}</p>
      <button className="inline-flex items-center py-2 px-2 text-xs font-semibold text-amber-500 bg-amber-500 bg-opacity-10 rounded-lg hover:bg-gray-300 hover:text-white">
        Selengkapnya
        <div className="text-xs font-semibold ml-2">
          <PiArrowUpRight />
        </div>
      </button>
    </div>
  </div>
);

export default Card;
