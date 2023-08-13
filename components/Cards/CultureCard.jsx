import React from "react";
import Image from "next/image";

const CultureCard = ({ image, title, description }) => {
  return (
    <div className="p-6 md:w-1/3">
      <div className="h-full bg-white shadow-lg rounded-lg overflow-hidden">
        <Image className="mb-4" src={image} width={1000} height={1000} alt="" />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-3">{title}</h1>
          <p className="text-neutral-500 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CultureCard;
