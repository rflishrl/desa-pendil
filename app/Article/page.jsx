import React from "react";
import Image from "next/image";
import CardList from "@/components/Cards/CardList";

const ArticleData = [
  {
    title: "Kegiatan Posyandu Remaja Desa Pendil...",
    image: "/images/dummy-news.jpg",
    category: "Sosial",
    date: "Selasa, 22 Juli 2023 | Author Web",
  },
  {
    title: "Kegiatan Posyandu Remaja Desa Pendil...",
    image: "/images/dummy-news.jpg",
    category: "Sosial",
    date: "Selasa, 22 Juli 2023 | Author Web",
  },
  {
    title: "Kegiatan Posyandu Remaja Desa Pendil...",
    image: "/images/dummy-news.jpg",
    category: "Sosial",
    date: "Selasa, 22 Juli 2023 | Author Web",
  },
  {
    title: "Kegiatan Posyandu Remaja Desa Pendil...",
    image: "/images/dummy-news.jpg",
    category: "Sosial",
    date: "Selasa, 22 Juli 2023 | Author Web",
  },
  {
    title: "Kegiatan Posyandu Remaja Desa Pendil...",
    image: "/images/dummy-news.jpg",
    category: "Sosial",
    date: "Selasa, 22 Juli 2023 | Author Web",
  },
  {
    title: "Kegiatan Posyandu Remaja Desa Pendil...",
    image: "/images/dummy-news.jpg",
    category: "Sosial",
    date: "Selasa, 22 Juli 2023 | Author Web",
  },
];

const ArticlePage = () => {
  return (
    <div>
      <Image
        className="absolute inset-0 -z-10 w-full"
        src="/images/bg-image.jpg"
        width={1000}
        height={0}
        alt=""
      />
      <div className="container mx-auto flex lg:px-60 px-5 py-14 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start text-left mb-16 md:mb-0 items-start">
          <h2 className="mb-10 text-white text-base font-medium">
            Beranda / Berita Desa Pendil
          </h2>
          <h1 className="sm:w-[709px] mb-4 text-white sm:text-3xl text-3xl font-bold">
            Berita Desa Pendil
          </h1>
          <p className="text-white text-opacity-80 text-base font-medium">
            Kumpulan berita terbaru dari Desa Pendil
          </p>
        </div>
      </div>
      <div className="container pb-24">
        <div className="lg:py-12 bg-white rounded-2xl lg:mx-32 mx-8 shadow-2xl">
          <div className="flex flex-col items-center w-full mb-10 sm:flex-row sm:justify-between pt-12 sm:pt-0">
            <div className="lg:w-1/2 w-full lg:mb-0">
              <h1 className="flex lg:justify-start lg:pl-20 sm:text-3xl text-3xl font-bold justify-center">
                Semua Berita
              </h1>
            </div>
          </div>
          <div className="news-list">
            <CardList data={ArticleData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
