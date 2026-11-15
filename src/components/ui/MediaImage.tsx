import type { ComponentProps } from "react";
import { type MediaVariant, resolveMediaUrl } from "@/lib/media-url";

export interface MediaImageProps
  extends Omit<ComponentProps<"img">, "src" | "loading" | "decoding" | "fetchPriority"> {
  src: string | null | undefined;
  thumbSrc?: string | null | undefined;
  variant?: MediaVariant;
  priority?: "high" | "low";
  fallback?: string;
  alt: string;
}

/**
 * Standard `<img>` component with centralized host validation, R2 `thumb`/`full`
 * variant selection, async decoding, and explicit priority/lazy loading controls.
 */
export function MediaImage({
  src,
  thumbSrc,
  variant = "full",
  priority,
  fallback,
  alt,
  onError,
  ...props
}: MediaImageProps) {
  const resolvedSrc = resolveMediaUrl(src, {
    thumbUrl: thumbSrc,
    variant,
    fallback,
  });

  const handleError: ComponentProps<"img">["onError"] = (event) => {
    onError?.(event);
    if (fallback && event.currentTarget.dataset.fallbackApplied !== "true") {
      event.currentTarget.dataset.fallbackApplied = "true";
      event.currentTarget.src = fallback;
    }
  };

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      loading={priority === "high" ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority}
      onError={fallback ? handleError : onError}
      {...props}
    />
  );
}
