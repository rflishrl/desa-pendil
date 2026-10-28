import "server-only";
import type { z } from "zod";
import { getServerEnv } from "@/lib/env";

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    options?: { cause?: unknown },
  ) {
    super(message, options);
    this.name = "ApiClientError";
  }
}

interface RequestOptions<S extends z.ZodType> {
  schema: S;
  /** Seconds before Next.js refetches in the background. */
  revalidate?: number;
  /** Cache tags, so a webhook can call revalidateTag() later. */
  tags?: string[];
  /** Return null instead of throwing on HTTP 404. */
  allowNotFound?: boolean;
  timeoutMs?: number;
}

/**
 * The only place that talks HTTP to the backend. It adds a timeout, checks the status,
 * and validates the response body so the rest of the app can trust the types.
 */
export async function apiGet<S extends z.ZodType>(
  path: string,
  { schema, revalidate = 300, tags, allowNotFound = false, timeoutMs = 8000 }: RequestOptions<S>,
): Promise<z.infer<S> | null> {
  const url = `${getServerEnv().API_BASE_URL}${path}`;

  let response: Response;
  try {
    response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate, tags },
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    throw new ApiClientError(`Request to ${path} failed`, undefined, { cause: error });
  }

  if (response.status === 404 && allowNotFound) return null;
  if (!response.ok) throw new ApiClientError(`${path} responded with ${response.status}`, response.status);

  let body: unknown;
  try {
    body = await response.json();
  } catch (error) {
    throw new ApiClientError(`${path} returned invalid JSON`, response.status, { cause: error });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    throw new ApiClientError(`${path} returned an unexpected shape: ${parsed.error.message}`, response.status);
  }
  return parsed.data;
}
