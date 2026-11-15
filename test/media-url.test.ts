import { afterEach, describe, expect, it } from "bun:test";
import { galleryItemSchema, newsItemSchema } from "../src/lib/api/schemas";
import {
  deriveThumbUrl,
  FALLBACK_NEWS_IMAGE,
  isAllowedMediaUrl,
  resolveMediaUrl,
} from "../src/lib/media-url";

const TEST_DOMAIN = "https://media-dp.example.test";
const UUID = "550e8400-e29b-41d4-a716-446655440000";

describe("media-url (desa-pendil)", () => {
  afterEach(() => {
    delete process.env.VITE_MEDIA_PUBLIC_DOMAIN;
  });

  it("allows configured media domain and local assets only", () => {
    expect(isAllowedMediaUrl(`${TEST_DOMAIN}/${UUID}.webp`, TEST_DOMAIN)).toBe(true);
    expect(isAllowedMediaUrl(`${TEST_DOMAIN}/dev/${UUID}.webp`, TEST_DOMAIN)).toBe(true);
    expect(isAllowedMediaUrl("/images/dummy-news.jpg", TEST_DOMAIN)).toBe(true);

    expect(isAllowedMediaUrl("https://evil.example.com/photo.webp", TEST_DOMAIN)).toBe(false);
    expect(isAllowedMediaUrl("//evil.example.com/photo.webp", TEST_DOMAIN)).toBe(false);
    expect(isAllowedMediaUrl("javascript:alert(1)", TEST_DOMAIN)).toBe(false);
  });

  it("derives deterministic -thumb.webp only for configured R2 host", () => {
    expect(deriveThumbUrl(`${TEST_DOMAIN}/${UUID}.webp`, TEST_DOMAIN)).toBe(
      `${TEST_DOMAIN}/${UUID}-thumb.webp`,
    );
    expect(deriveThumbUrl(`${TEST_DOMAIN}/dev/${UUID}.webp`, TEST_DOMAIN)).toBe(
      `${TEST_DOMAIN}/dev/${UUID}-thumb.webp`,
    );
    expect(deriveThumbUrl(`${TEST_DOMAIN}/${UUID}-thumb.webp`, TEST_DOMAIN)).toBe(
      `${TEST_DOMAIN}/${UUID}-thumb.webp`,
    );
    expect(deriveThumbUrl("https://other.example.com/photo.webp", TEST_DOMAIN)).toBe(
      "https://other.example.com/photo.webp",
    );
    expect(deriveThumbUrl("/images/dummy-news.jpg", TEST_DOMAIN)).toBe("/images/dummy-news.jpg");
  });

  it("resolves thumb vs full cleanly and falls back for disallowed hosts", () => {
    const full = `${TEST_DOMAIN}/${UUID}.webp`;
    const thumb = `${TEST_DOMAIN}/${UUID}-thumb.webp`;

    expect(
      resolveMediaUrl(full, { variant: "thumb", thumbUrl: thumb, mediaDomain: TEST_DOMAIN }),
    ).toBe(thumb);
    expect(resolveMediaUrl(full, { variant: "thumb", mediaDomain: TEST_DOMAIN })).toBe(thumb);
    expect(resolveMediaUrl(full, { variant: "full", mediaDomain: TEST_DOMAIN })).toBe(full);
    expect(
      resolveMediaUrl("https://evil.example.com/x.webp", {
        variant: "full",
        mediaDomain: TEST_DOMAIN,
      }),
    ).toBe(FALLBACK_NEWS_IMAGE);
  });

  it("validates API DTO image hosts in Zod schemas", () => {
    process.env.VITE_MEDIA_PUBLIC_DOMAIN = TEST_DOMAIN;

    expect(
      newsItemSchema.safeParse({
        id: "n1",
        title: "Berita Desa",
        createdAt: "2026-11-15T00:00:00Z",
        thumbnail: `${TEST_DOMAIN}/${UUID}.webp`,
        thumbUrl: `${TEST_DOMAIN}/${UUID}-thumb.webp`,
      }).success,
    ).toBe(true);

    expect(
      newsItemSchema.safeParse({
        id: "n2",
        title: "Host Asing",
        createdAt: "2026-11-15T00:00:00Z",
        thumbnail: "https://untrusted.example.com/bad.jpg",
      }).success,
    ).toBe(false);

    expect(
      galleryItemSchema.safeParse({
        url: `${TEST_DOMAIN}/${UUID}.webp`,
        alt: "Foto galeri",
      }).success,
    ).toBe(true);
  });
});
