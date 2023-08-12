import React from "react";

const Buttons = () => {
  const itembutton = [
    {
      name: "Desa Pendil",
      link: "/",
    },
    {
      name: "Tari Remo",
      link: "/",
    },
    {
      name: "Reog",
      link: "/",
    },
  ];

  return (
    <div className="flex justify-between">
      {itembutton.map((itembutton, index) => (
        <div
          key={index}
          className={`flex items-center justify-center text-center text-base font-semibold text-amber-500 bg-amber-500 bg-opacity-10 hover:bg-gray-300 hover:text-white rounded-lg px-3 py-3 md:px-8 md:py-4 mr-4`}
        >
          <p>{itembutton.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Buttons;
