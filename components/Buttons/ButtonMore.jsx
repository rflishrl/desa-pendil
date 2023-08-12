import React from "react";
import { PiArrowUpRight } from "react-icons/pi";

const ButtonMore = () => {
  return (
    <button
      className="inline-flex items-center py-3 px-5 ml-2 text-base font-semibold text-amber-500 bg-white rounded-lg border-2 border-amber-500 hover:bg-amber-500 hover:text-white"
    >
      Selengkapnya
      <div className="text-base font-semibold ml-2">
        <PiArrowUpRight />
      </div>
    </button>
  );
};

export default ButtonMore;
