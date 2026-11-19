import { z } from 'zod';
import { isAllowedMediaUrl } from '#lib/media-url.js';

const allowedMediaUrlSchema = z
	.string()
	.refine((value) => value === '' || isAllowedMediaUrl(value), {
		message: 'Host URL media tidak diizinkan.'
	});

export const newsItemSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1),
	publishedAt: z.string().nullish(),
	createdAt: z.string(),
	thumbnail: allowedMediaUrlSchema.nullish(),
	thumbUrl: allowedMediaUrlSchema.nullish(),
	content: z.string().nullish(),
	author: z.string().nullish()
});

export const newsListSchema = z.object({
	success: z.literal(true),
	data: z.object({ items: z.array(z.unknown()) })
});

export const newsDetailSchema = z.object({
	success: z.literal(true),
	data: newsItemSchema
});

export const galleryItemSchema = z.object({
	url: allowedMediaUrlSchema.nullish(),
	thumbUrl: allowedMediaUrlSchema.nullish(),
	alt: z.string().min(1)
});

export const galleryListSchema = z.object({
	success: z.literal(true),
	data: z.object({ items: z.array(z.unknown()) })
});

export type NewsItemDto = z.infer<typeof newsItemSchema>;
export type GalleryItemDto = z.infer<typeof galleryItemSchema>;
