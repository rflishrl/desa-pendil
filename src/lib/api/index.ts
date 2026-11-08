import type { Article, GalleryImage } from "@/types";
import { resolveImageSrc } from "@/lib/images";
import { ApiClientError, apiGet } from "./client.server";
import {
  galleryItemSchema,
  galleryListSchema,
  newsDetailSchema,
  newsItemSchema,
  newsListSchema,
  type NewsItemDto,
} from "./schemas";

const NEWS_TAG = "news";
const GALLERY_TAG = "gallery";

/** Cache tags the backend may ask to refresh (see app/api/revalidate). */
export const CACHE_TAGS = { news: NEWS_TAG, gallery: GALLERY_TAG } as const;

/** Backend DTO -> the shape components use. The only place that knows API field names. */
function toArticle(dto: NewsItemDto): Article {
  return {
    id: dto.id,
    title: dto.title,
    date: dto.publishedAt ?? dto.createdAt,
    image: resolveImageSrc(dto.thumbnail),
    content: dto.content ?? undefined,
    author: dto.author ?? undefined,
  };
}

/** Network/API problems degrade to an empty state; programming or config errors must surface. */
function rethrowUnlessApiError(error: unknown): void {
  if (!(error instanceof ApiClientError)) throw error;
}

/** Parses each item on its own; invalid ones are logged and skipped. */
function parseItems<T>(items: unknown[], parse: (item: unknown) => T | null, label: string): T[] {
  const out: T[] = [];
  for (const item of items) {
    const value = parse(item);
    if (value) out.push(value);
    else console.warn(`[api] skipped an invalid ${label} item`);
  }
  return out;
}

/**
 * Latest published news. Never throws: on failure it logs and returns [] so pages show
 * an empty state instead of crashing.
 */
export async function getArticles(): Promise<Article[]> {
  try {
    const result = await apiGet("/news/v1?limit=50", { schema: newsListSchema, tags: [NEWS_TAG] });
    return parseItems(
      result?.data.items ?? [],
      (item) => {
        const parsed = newsItemSchema.safeParse(item);
        return parsed.success ? toArticle(parsed.data) : null;
      },
      "news",
    );
  } catch (error) {
    rethrowUnlessApiError(error);
    console.error("[getArticles]", error);
    return [];
  }
}

/** One article by id or slug, or undefined when it does not exist (or the API is down). */
export async function getArticle(id: string): Promise<Article | undefined> {
  try {
    const result = await apiGet(`/news/v1/${encodeURIComponent(id)}`, {
      schema: newsDetailSchema,
      tags: [NEWS_TAG],
      allowNotFound: true,
    });
    return result ? toArticle(result.data) : undefined;
  } catch (error) {
    rethrowUnlessApiError(error);
    console.error("[getArticle]", error);
    return undefined;
  }
}

/**
 * Gallery photos. Returns null when the API is unreachable so callers can fall back to
 * placeholders; an empty array means "no photos yet".
 */
export async function getGalleryImages(): Promise<GalleryImage[] | null> {
  try {
    const result = await apiGet("/gallery/v1?limit=50", { schema: galleryListSchema, tags: [GALLERY_TAG] });
    return parseItems(
      result?.data.items ?? [],
      (item) => {
        const parsed = galleryItemSchema.safeParse(item);
        return parsed.success ? { src: resolveImageSrc(parsed.data.url), alt: parsed.data.alt } : null;
      },
      "gallery",
    );
  } catch (error) {
    rethrowUnlessApiError(error);
    console.error("[getGalleryImages]", error);
    return null;
  }
}

export {
  getArticlesServerFn,
  getArticleServerFn,
  getGalleryImagesServerFn,
} from "./functions";

