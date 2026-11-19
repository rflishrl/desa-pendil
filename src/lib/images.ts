import { FALLBACK_NEWS_IMAGE, type ResolveMediaOptions, resolveMediaUrl } from '#lib/media-url.js';

export { FALLBACK_NEWS_IMAGE };

export function resolveImageSrc(
	src: string | null | undefined,
	options?: ResolveMediaOptions
): string {
	return resolveMediaUrl(src, options);
}
