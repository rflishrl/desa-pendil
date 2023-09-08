import React from "react";
import Image from "next/image";
import PeopleList from "@/components/Cards/PeopleList";
import {
  MdFamilyRestroom,
  MdHealthAndSafety,
  MdOutlineLocationCity,
} from "react-icons/md";
import AdvanList from "@/components/Cards/AdvantageList";
import CultureList from "@/components/Cards/CultureList";

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

const PeopleData = [
  {
    title: "HJ.Syafi'i",
    image: "/images/dummy-people.jpg",
    position: "Kepala Desa",
  },
  {
    title: "HJ.Syafi'i",
    image: "/images/dummy-people.jpg",
    position: "Wakil Kades",
  },
  {
    title: "HJ.Syafi'i",
    image: "/images/dummy-people.jpg",
    position: "Sekretaris",
  },
  {
    title: "HJ.Syafi'i",
    image: "/images/dummy-people.jpg",
    position: "Bendahara",
  },
];

const InfoData = [
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

const Profile = () => {
  return (
    <div>
      <Image
        className="absolute -z-10 pb-[300px] lg:pb-[300px]"
        src="/images/bg-hero-new.jpg"
        layout="fill"
        objectFit="cover"
        alt=""
      />
      <div className="container mx-auto flex lg:px-60 px-5 py-14 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start text-left mb-16 md:mb-0 items-start">
          <h2 className="mb-10 text-white text-base font-medium">
            Beranda / Profil Desa Pendil
          </h2>
          <h1 className="sm:w-[709px] mb-4 text-white sm:text-3xl text-3xl font-bold">
            Profil Desa Pendil
          </h1>
          <p className="text-white text-opacity-80 text-base font-medium">
            Profil dan informasi seputar Desa Pendil
          </p>
        </div>
      </div>
      <div className="lg:mx-32 mx-8">
        <div className="mx-auto flex px-5 py-16 items-center justify-center flex-col bg-cover bg-center bg-opacity-70 bg-[url('/images/bg-event.png')] rounded-2xl">
          <div className="lg:w-1/2 md:w-1/2 w-5/6 mb-10 md:mb-0">
            <Image
              className="rounded-lg"
              src="/images/image-village.jpg"
              width={1000}
              height={1000}
              alt=""
            />
          </div>
          <div className="mx-auto flex px-5 pt-14 items-start justify-start flex-col">
            <h2 className="text-lg font-semibold mb-2">Asal Usul</h2>
            <h1 className="sm:text-3xl text-3xl mb-4 font-bold">Desa Pendil</h1>
            <p className="text-neutral-500">
              Lörem ipsum låbel minidator, tesade bese telestat. Krosat. Sysäst
              man. Latret gektig. Prelabel viligen, i vidat misk om dertad.
              Hojat diprerat efterföljarskap att parade. Dekapp nede om suska.
              Bende digur: en megagens. Fanuning mikrokade. Berat spepås
              spektigt, spesa respektive nilaning. Pseudolig trekaskade. Arade
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex lg:px-60 px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <Image
            className="rounded-lg"
            src="/images/image-leader.jpg"
            width={400}
            height={50}
            alt=""
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-1 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h2 className="text-lg font-semibold mb-2">Sambutan</h2>
          <h1 className="title-font sm:text-3xl text-3xl mb-4 font-bold">
            Kepala Desa H. Machfuds
          </h1>
          <p>
            Lörem ipsum låbel minidator, tesade bese telestat. Krosat. Sysäst
            man. Latret gektig. Prelabel viligen, i vidat misk om dertad. Hojat
            diprerat efterföljarskap att parade. Dekapp nede om suska. Bende
            digur: en megagens. Fanuning mikrokade. Berat spepås spektigt, spesa
            respektive nilaning. Pseudolig trekaskade. Arade
          </p>
        </div>
      </div>
      <div className="container">
        <div className="lg:py-12 bg-white sm:bg-none rounded-2xl lg:mx-32 mx-8 shadow-2xl sm:shadow-none">
          <div className="flex flex-col items-center w-full mb-8 sm:flex-row sm:justify-between pt-12 sm:pt-0">
            <div className="lg:w-1/2 w-full lg:mb-0">
              <h1 className="flex lg:justify-start lg:pl-16 sm:text-3xl text-3xl font-bold justify-center">
                Perangkat Desa
              </h1>
            </div>
          </div>
          <div className="people-list">
            <PeopleList data={PeopleData} />
          </div>
        </div>
      </div>
      <div className="container md:px-32 px-14 py-14 mx-auto">
        <div className="flex flex-col md:text-start text-center w-full mb-20">
          <h1 className="sm:text-3xl text-3xl font-bold">Keunggulan</h1>
        </div>
        <div className="excellence-list">
          <AdvanList data={InfoData} />
        </div>
      </div>
      <div className="container md:px-32 px-14 py-14 mx-auto">
        <div className="flex flex-col md:text-start text-center w-full mb-20">
          <h1 className="sm:text-3xl text-3xl font-bold">Kesenian Khas</h1>
        </div>
        <div className="culture-list">
          <CultureList data={CultureData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
