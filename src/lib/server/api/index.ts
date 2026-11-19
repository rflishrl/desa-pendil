import { resolveImageSrc } from '#lib/images.js';
import { ApiClientError, apiGet } from '#lib/server/api/client.js';
import {
	galleryItemSchema,
	galleryListSchema,
	type NewsItemDto,
	newsDetailSchema,
	newsItemSchema,
	newsListSchema
} from '#lib/server/api/schemas.js';
import type { Article, GalleryImage } from '#lib/types/index.js';

const NEWS_TAG = 'news';
const GALLERY_TAG = 'gallery';

/** Cache tags the backend may ask to refresh (see /api/revalidate). */
export const CACHE_TAGS = { news: NEWS_TAG, gallery: GALLERY_TAG } as const;

function toArticle(dto: NewsItemDto): Article {
	return {
		id: dto.id,
		title: dto.title,
		date: dto.publishedAt ?? dto.createdAt,
		image: resolveImageSrc(dto.thumbnail),
		thumbImage: resolveImageSrc(dto.thumbnail, {
			thumbUrl: dto.thumbUrl,
			variant: 'thumb'
		}),
		content: dto.content ?? undefined,
		author: dto.author ?? undefined
	};
}

function rethrowUnlessApiError(error: unknown): void {
	if (!(error instanceof ApiClientError)) throw error;
}

function parseItems<T>(items: unknown[], parse: (item: unknown) => T | null, label: string): T[] {
	const out: T[] = [];
	for (const item of items) {
		const value = parse(item);
		if (value) out.push(value);
		else console.warn(`[api] skipped an invalid ${label} item`);
	}
	return out;
}

export async function getArticles(): Promise<Article[]> {
	try {
		const result = await apiGet('/news/v1?limit=50', { schema: newsListSchema, tags: [NEWS_TAG] });
		return parseItems(
			result?.data.items ?? [],
			(item) => {
				const parsed = newsItemSchema.safeParse(item);
				return parsed.success ? toArticle(parsed.data) : null;
			},
			'news'
		);
	} catch (error) {
		rethrowUnlessApiError(error);
		console.error('[getArticles]', error);
		return [];
	}
}

export async function getArticle(id: string): Promise<Article | undefined> {
	try {
		const result = await apiGet(`/news/v1/${encodeURIComponent(id)}`, {
			schema: newsDetailSchema,
			tags: [NEWS_TAG],
			allowNotFound: true
		});
		return result ? toArticle(result.data) : undefined;
	} catch (error) {
		rethrowUnlessApiError(error);
		console.error('[getArticle]', error);
		return undefined;
	}
}

export async function getGalleryImages(): Promise<GalleryImage[] | null> {
	try {
		const result = await apiGet('/gallery/v1?limit=50', {
			schema: galleryListSchema,
			tags: [GALLERY_TAG]
		});
		return parseItems(
			result?.data.items ?? [],
			(item) => {
				const parsed = galleryItemSchema.safeParse(item);
				return parsed.success
					? {
							src: resolveImageSrc(parsed.data.url),
							thumbSrc: resolveImageSrc(parsed.data.url, {
								thumbUrl: parsed.data.thumbUrl,
								variant: 'thumb'
							}),
							alt: parsed.data.alt
						}
					: null;
			},
			'gallery'
		);
	} catch (error) {
		rethrowUnlessApiError(error);
		console.error('[getGalleryImages]', error);
		return null;
	}
}
