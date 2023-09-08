import React from "react";
import ButtonMore from "@/components/Buttons/ButtonMore";
import Card from "@/components/Cards/ArticleCard";
import axios from "axios";

async function getArticle() {
  const { data, error } = await axios.get(
    "https://api-web-desa-pendil.vercel.app/v1/news"
  );

  console.log(error);

  return data;
}

const Article = async () => {
  const article = await getArticle();

  console.log(article);

  return (
    <div className="container">
      <div className="lg:pt-12 pb-14 sm:pb-12 bg-white rounded-2xl lg:mx-32 mx-8 shadow-2xl">
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
        <div className="flex flex-wrap lg:mx-10 justify-center items-center">
          {article.data.slice(0, 3).map((item) => {
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
  );
};

export default Article;
