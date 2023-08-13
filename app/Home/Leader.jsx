import React from "react";
import Image from "next/image";

const Leader = () => {
  return (
    <div className="container mx-auto flex lg:px-60 px-5 py-24 md:flex-row flex-col items-center">
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
        <Image
          className="rounded-lg"
          src="/images/dummy-profile.jpg"
          width={1000}
          height={1000}
          alt=""
        />
      </div>
      <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
        <h2 className="text-lg font-semibold mb-2">Sambutan</h2>
        <h1 className="title-font sm:text-3xl text-3xl mb-4 font-bold">
          Kepala Desa
        </h1>
        <p>
          Lörem ipsum låbel minidator, tesade bese telestat. Krosat. Sysäst man.
          Latret gektig. Prelabel viligen, i vidat misk om dertad. Hojat
          diprerat efterföljarskap att parade. Dekapp nede om suska. Bende
          digur: en megagens. Fanuning mikrokade. Berat spepås spektigt, spesa
          respektive nilaning. Pseudolig trekaskade. Arade
        </p>
      </div>
    </div>
  );
};

export default Leader;
