import React from "react";
import CultureList from "@/components/Cards/CultureList";

const Culture = () => {
  const CultureData = [
    {
      title: "Tari Kiprah",
      image: "/images/dummy-culture.jpg",
      description:
        "Tari Kiprah Glipang berfungsi sebagai tari penyambutan pada kesenian Glipang...",
    },
    {
      title: "Tari Remo",
      image: "/images/dummy-culture.jpg",
      description:
        "Tari Remo adalah salah satu tarian untuk penyambutan tamu yang ditampilkan baik oleh satu atau lebih...",
    },
    {
      title: "Ludruk",
      image: "/images/dummy-culture.jpg",
      description:
        "Ludruk adalah suatu kesenian drama tradisional dari Jawa Timur. Ludruk merupakan suatu drama tradisional...",
    },
  ];

  return (
    <div className="container md:px-32 px-14 py-14 mx-auto">
      <div className="flex flex-col md:text-start text-center w-full mb-20">
        <h1 className="sm:text-3xl text-3xl font-bold">Kesenian Khas</h1>
      </div>
      <div className="culture-list">
        <CultureList data={CultureData} />
      </div>
    </div>
  );
};

export default Culture;
