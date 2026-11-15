import { FALLBACK_NEWS_IMAGE, type ResolveMediaOptions, resolveMediaUrl } from "./media-url";

export { FALLBACK_NEWS_IMAGE };

/**
 * Resolves a safe image `src` against the allowed media hosts and local assets
 * so an unexpected URL from the API cannot break rendering.
 */
export function resolveImageSrc(
  src: string | null | undefined,
  options?: ResolveMediaOptions,
): string {
  return resolveMediaUrl(src, options);
}
