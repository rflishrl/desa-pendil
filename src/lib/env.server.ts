import { z } from "zod";
import { getSiteUrl } from "./env";

export { getSiteUrl };

const serverSchema = z.object({
  API_BASE_URL: z
    .string()
    .url()
    .transform((v) => v.replace(/\/+$/, "")),
  SITE_URL: z
    .string()
    .url()
    .transform((v) => v.replace(/\/+$/, "")),
});

let cached: z.infer<typeof serverSchema> | undefined;

export function getServerEnv() {
  if (cached) return cached;

  const isProd = process.env.NODE_ENV === "production";
  const parsed = serverSchema.safeParse({
    API_BASE_URL: process.env.API_BASE_URL ?? (isProd ? undefined : "http://localhost:4000/api"),
    SITE_URL:
      process.env.SITE_URL ??
      process.env.VITE_SITE_URL ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://desapendil.id",
  });

  if (!parsed.success) {
    throw new Error(`Invalid server environment: ${parsed.error.message}`);
  }
  cached = parsed.data;
  return cached;
}
