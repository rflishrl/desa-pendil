import React from "react";
import Image from "next/image";

const PeopleCard = ({ image, title, position }) => (
  <div className="md:w-1/4 w-3/4 p-2">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Image
        className="mb-6 rounded-lg"
        src={image}
        width={1000}
        height={1000}
        alt=""
      />
      <h2 className="text-xl font-bold mb-2 uppercase">{title}</h2>
      <p className="text-base text-gray-500 mb-11">{position}</p>
    </div>
  </div>
);

export default PeopleCard;
