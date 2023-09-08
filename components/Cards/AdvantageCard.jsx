import React from "react";

const AdvanCard = ({ icon, title, description }) => {
  return (
    <div className="p-4 md:w-1/3">
      <div className="flex rounded-lg h-full bg-white shadow-lg p-8 flex-col">
        <div className="mb-3">
          <div className="inline-flex justify-center text-5xl text-amber-500 flex-shrink-0">
            {icon}
          </div>
        </div>
        <div className="flex-grow">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-neutral-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AdvanCard;
