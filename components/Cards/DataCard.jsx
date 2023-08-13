import React from "react";

const DataCard = ({ icon, title, description }) => {
  return (
    <div className="xl:w-full md:w-60 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div className="text-5xl text-amber-500">{icon}</div>
        <div className="ml-4">
          <h2 className="text-lg text-black font-bold mb-2">{title}</h2>
          <p className="text-xs text-neutral-500 font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
