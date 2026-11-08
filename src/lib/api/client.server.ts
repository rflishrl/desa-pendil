import type { z } from "zod";
import { getServerEnv } from "@/lib/env.server";

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
  allowNotFound?: boolean;
  timeoutMs?: number;
  tags?: string[];
}

/**
 * Standard fetch client talking HTTP to the backend. Adds timeout, validates response body.
 */
export async function apiGet<S extends z.ZodType>(
  path: string,
  { schema, allowNotFound = false, timeoutMs = 8000 }: RequestOptions<S>,
): Promise<z.infer<S> | null> {
  const url = `${getServerEnv().API_BASE_URL}${path}`;

  let response: Response;
  try {
    response = await fetch(url, {
      headers: { Accept: "application/json" },
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
