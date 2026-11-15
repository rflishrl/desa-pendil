export const FALLBACK_NEWS_IMAGE = "/images/dummy-news.jpg";

export type MediaVariant = "thumb" | "full";

export interface ResolveMediaOptions {
  thumbUrl?: string | null | undefined;
  variant?: MediaVariant;
  fallback?: string;
  mediaDomain?: string;
}

function readConfiguredDomain(explicitDomain?: string): string | undefined {
  if (explicitDomain !== undefined) {
    return explicitDomain.trim() || undefined;
  }

  const metaEnv = (import.meta as { env?: Record<string, string | undefined> }).env;
  const fromImportMeta = metaEnv?.VITE_MEDIA_PUBLIC_DOMAIN?.trim();
  if (fromImportMeta) return fromImportMeta;

  if (typeof process !== "undefined") {
    const fromProcess = process.env.VITE_MEDIA_PUBLIC_DOMAIN?.trim();
    if (fromProcess) return fromProcess;
  }

  return undefined;
}

/**
 * Returns normalized origin (e.g. `https://media-dp.example.com`) from `VITE_MEDIA_PUBLIC_DOMAIN`,
 * or `null` if unset or invalid.
 */
export function getConfiguredMediaOrigin(explicitDomain?: string): string | null {
  const raw = readConfiguredDomain(explicitDomain);
  if (!raw) return null;

  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return null;
    }
    return parsed.origin;
  } catch {
    return null;
  }
}

function isLocalDevApiAsset(url: URL): boolean {
  if (typeof process !== "undefined" && process.env.NODE_ENV === "production") {
    return false;
  }
  return url.protocol === "http:" && url.hostname === "localhost" && url.port === "4000";
}

/**
 * Strict allowlist for media URLs rendered in the frontend:
 * - Same-origin static assets starting with single `/` (excluding `//`)
 * - Exact origin configured via `VITE_MEDIA_PUBLIC_DOMAIN`
 * - Local API preview (`http://localhost:4000/...`) outside production
 */
export function isAllowedMediaUrl(src: string, explicitDomain?: string): boolean {
  const value = src.trim();
  if (!value) return false;

  if (value.startsWith("/")) {
    return !value.startsWith("//");
  }

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return false;
  }

  const configuredOrigin = getConfiguredMediaOrigin(explicitDomain);
  if (configuredOrigin && parsed.origin === configuredOrigin) {
    return true;
  }

  return isLocalDevApiAsset(parsed);
}

function isConfiguredR2Url(url: URL, explicitDomain?: string): boolean {
  const configuredOrigin = getConfiguredMediaOrigin(explicitDomain);
  return Boolean(configuredOrigin && url.origin === configuredOrigin);
}

/**
 * Deterministically converts an R2 full image URL (`<key>.webp`) to its thumbnail
 * sibling (`<key>-thumb.webp`). Only transforms URLs on the exact configured R2 origin;
 * non-R2 and local static URLs are returned unchanged.
 */
export function deriveThumbUrl(src: string, explicitDomain?: string): string {
  const value = src.trim();
  if (!value || value.startsWith("/")) return value;

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return value;
  }

  if (!isConfiguredR2Url(parsed, explicitDomain)) {
    return value;
  }

  const lowerPath = parsed.pathname.toLowerCase();
  if (!lowerPath.endsWith(".webp") || lowerPath.endsWith("-thumb.webp")) {
    return value;
  }

  parsed.pathname = `${parsed.pathname.slice(0, -".webp".length)}-thumb.webp`;
  return parsed.toString();
}

/**
 * Resolves the safe URL for `<img>` (`thumb` for grids/cards, `full` for hero/detail/og:image).
 * Disallowed hosts and invalid values safely fall back to `fallback`.
 */
export function resolveMediaUrl(
  src: string | null | undefined,
  options: ResolveMediaOptions = {},
): string {
  const { thumbUrl, variant = "full", fallback = FALLBACK_NEWS_IMAGE, mediaDomain } = options;

  if (variant === "thumb" && thumbUrl) {
    const trimmedThumb = thumbUrl.trim();
    if (isAllowedMediaUrl(trimmedThumb, mediaDomain)) {
      return trimmedThumb;
    }
  }

  if (!src) return fallback;
  const trimmed = src.trim();
  if (!isAllowedMediaUrl(trimmed, mediaDomain)) {
    return fallback;
  }

  if (variant === "thumb") {
    return deriveThumbUrl(trimmed, mediaDomain);
  }

  return trimmed;
}
