import React from "react";
import {
  MdFamilyRestroom,
  MdHealthAndSafety,
  MdOutlineLocationCity,
} from "react-icons/md";
import ExcellList from "@/components/Cards/ExcellList";

const Excellence = () => {
  const ExcellData = [
    {
      icon: <MdFamilyRestroom />,
      title: "Desa adiwiyata",
      description:
        "Our aim is to provide cost-effective and top-notch services for web and mobile application development.",
    },
    {
      icon: <MdHealthAndSafety />,
      title: "Desa adiwiyata",
      description:
        "Our aim is to provide cost-effective and top-notch services for web and mobile application development.",
    },
    {
      icon: <MdOutlineLocationCity />,
      title: "Desa adiwiyata",
      description:
        "Our aim is to provide cost-effective and top-notch services for web and mobile application development.",
    },
  ];

  return (
    <div className="container md:px-32 px-14 py-14 mx-auto">
      <div className="flex flex-col md:text-start text-center w-full mb-20">
        <h1 className="sm:text-3xl text-3xl font-bold">Keunggulan</h1>
      </div>
      <div className="excellence-list">
        <ExcellList data={ExcellData} />
      </div>
    </div>
  );
};

export default Excellence;
