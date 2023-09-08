import React from "react";
import Image from "next/image";
import Card from "@/components/Cards/ArticleCard";
import axios from "axios";

async function getArticle() {
  const { data, error } = await axios.get(
    "https://api-web-desa-pendil.vercel.app/v1/news"
  );

  console.log(error);

  return data;
}

const ArticlePage = async () => {
  const article = await getArticle();

  console.log(article);

  return (
    <div>
      <Image
        className="absolute -z-10 pb-[200px] lg:pb-[300px]"
        src="/images/bg-hero-new.jpg"
        layout="fill"
        objectFit="cover"
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
        <div className="lg:pt-12 pb-14 sm:pb-12 bg-white rounded-2xl lg:mx-32 mx-8 shadow-2xl">
          <div className="flex flex-col items-center w-full mb-10 sm:flex-row sm:justify-between pt-12 sm:pt-0">
            <div className="lg:w-1/2 w-full lg:mb-0">
              <h1 className="flex lg:justify-start lg:pl-20 sm:text-3xl text-3xl font-bold justify-center">
                Semua Berita
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap lg:mx-10 justify-center items-center">
            {article.data.slice(0, 6).map((item) => {
              return (
                <Card
                  key={item.id}
                  title={item.judul}
                  date={item.createdAt}
                  image={item.thumbnail}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
