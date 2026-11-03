import { createHash, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { CACHE_TAGS } from "@/lib/api";

/**
 * Called by the backend after an admin saves or deletes content, so the change shows up
 * without waiting for the cache to expire.
 *
 *   POST /api/revalidate
 *   Authorization: Bearer <REVALIDATE_SECRET>
 *   { "tags": ["news"] }
 */

const knownTags: string[] = Object.values(CACHE_TAGS);
const bodySchema = z.object({ tags: z.array(z.string()).min(1).max(10) });

function hash(value: string) {
  return createHash("sha256").update(value).digest();
}

/** Constant-time comparison, so response timing does not leak the secret. */
function isAuthorized(request: Request, secret: string) {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return timingSafeEqual(hash(token), hash(secret));
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ error: "REVALIDATE_SECRET is not set." }, { status: 503 });
  }
  if (!isAuthorized(request, secret)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = bodySchema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const tags = body.data.tags.filter((tag) => knownTags.includes(tag));
  for (const tag of tags) revalidateTag(tag);

  return NextResponse.json({ revalidated: tags });
}
