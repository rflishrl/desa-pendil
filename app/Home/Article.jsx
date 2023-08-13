"use client";
import React from "react";
import ButtonMore from "@/components/Buttons/ButtonMore";
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
];

const Article = () => {
  return (
    <div className="container">
      <div className="lg:py-12 bg-white rounded-2xl lg:mx-32 mx-8 shadow-2xl">
        <div className="flex flex-col items-center w-full mb-10 sm:flex-row sm:justify-between pt-12 sm:pt-0">
          <div className="lg:w-1/2 w-full lg:mb-0">
            <h1 className="flex lg:justify-start lg:pl-20 sm:text-3xl text-3xl font-bold justify-center">
              Berita Terkini
            </h1>
          </div>
          <div className="flex w-full lg:pr-16 lg:w-1/2 justify-center sm:justify-end items-end mt-4 sm:mt-0">
            <ButtonMore />
          </div>
        </div>
        <div className="news-list">
          <CardList data={ArticleData} />
        </div>
      </div>
    </div>
  );
};

export default Article;
