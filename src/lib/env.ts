import "server-only";
import { z } from "zod";

const schema = z.object({
  /** Base URL of the backend API, without a trailing slash. */
  API_BASE_URL: z
    .string()
    .url()
    .transform((v) => v.replace(/\/+$/, "")),
});

let cached: z.infer<typeof schema> | undefined;

/** Validated server environment. Fails loudly (once) if the API URL is missing or malformed. */
export function getServerEnv() {
  if (cached) return cached;

  const parsed = schema.safeParse({
    // Default only outside production, so a missing prod variable is caught early.
    API_BASE_URL:
      process.env.API_BASE_URL ??
      (process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000/v1"),
  });
  if (!parsed.success) {
    throw new Error(`Invalid environment: API_BASE_URL must be a valid URL (${parsed.error.message})`);
  }
  cached = parsed.data;
  return cached;
}
