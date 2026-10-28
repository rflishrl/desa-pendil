/** Hosts allowed by `images.remotePatterns` in next.config.ts. */
const ALLOWED_IMAGE_HOSTS = ["ik.imagekit.io"];
const BLOB_HOST_SUFFIX = ".public.blob.vercel-storage.com";

export const FALLBACK_NEWS_IMAGE = "/images/dummy-news.jpg";

/**
 * next/image throws for remote hosts that are not configured.
 * Return a safe src so one bad thumbnail from the API cannot break the page.
 */
export function resolveImageSrc(src: string | null | undefined): string {
  if (!src) return FALLBACK_NEWS_IMAGE;
  if (src.startsWith("/")) return src;

  try {
    const { protocol, hostname, port } = new URL(src);
    if (protocol === "https:" && (ALLOWED_IMAGE_HOSTS.includes(hostname) || hostname.endsWith(BLOB_HOST_SUFFIX))) {
      return src;
    }
    if (protocol === "http:" && hostname === "localhost" && port === "4000") return src;
  } catch {
    // fall through to the fallback image
  }
  return FALLBACK_NEWS_IMAGE;
}
