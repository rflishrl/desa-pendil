import { z } from "zod";

/*
 * Response contracts of the backend (desa-pendil-backend). Only the fields the site
 * reads are listed; extra fields are ignored, missing optional ones are tolerated.
 */

export const newsItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  publishedAt: z.string().nullish(),
  createdAt: z.string(),
  thumbnail: z.string().nullish(),
  content: z.string().nullish(),
  author: z.string().nullish(),
});

/** Items are parsed one by one later, so a single bad row cannot blank the whole list. */
export const newsListSchema = z.object({
  success: z.literal(true),
  data: z.object({ items: z.array(z.unknown()) }),
});
export const newsDetailSchema = z.object({ success: z.literal(true), data: newsItemSchema });

export const galleryItemSchema = z.object({
  url: z.string().nullish(),
  alt: z.string().min(1),
});
export const galleryListSchema = z.object({
  success: z.literal(true),
  data: z.object({ items: z.array(z.unknown()) }),
});

export type NewsItemDto = z.infer<typeof newsItemSchema>;
export type GalleryItemDto = z.infer<typeof galleryItemSchema>;
