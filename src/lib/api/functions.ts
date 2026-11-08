import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getArticle, getArticles, getGalleryImages } from "./index";

export const getArticlesServerFn = createServerFn({ method: "GET" }).handler(async () => {
  return await getArticles();
});

export const getArticleServerFn = createServerFn({ method: "GET" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data: id }) => {
    return await getArticle(id);
  });

export const getGalleryImagesServerFn = createServerFn({ method: "GET" }).handler(async () => {
  return await getGalleryImages();
});
