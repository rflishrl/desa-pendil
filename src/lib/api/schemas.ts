import { z } from "zod";

/*
 * Response contracts of the backend (desa-pendil-backend). Only the fields the site
 * reads are listed; extra fields are ignored, missing optional ones are tolerated.
 */

export const newsItemSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  judul: z.string().min(1),
  createdAt: z.string(),
  thumbnail: z.string().nullish(),
  isi: z.string().nullish(),
  author: z.string().nullish(),
});

/** Items are parsed one by one later, so a single bad row cannot blank the whole list. */
export const newsListSchema = z.object({ data: z.array(z.unknown()) });
export const newsDetailSchema = z.object({ data: newsItemSchema });

export const galleryItemSchema = z.object({
  src: z.string().nullish(),
  alt: z.string().min(1),
});
export const galleryListSchema = z.object({ data: z.array(z.unknown()) });

export type NewsItemDto = z.infer<typeof newsItemSchema>;
export type GalleryItemDto = z.infer<typeof galleryItemSchema>;
