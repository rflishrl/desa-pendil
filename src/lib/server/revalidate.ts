import { createHash, timingSafeEqual } from 'node:crypto';
import { REVALIDATE_SECRET } from '$app/env/private';
import { z } from 'zod';
import { CACHE_TAGS } from '#lib/server/api/index.js';

const knownTags: string[] = Object.values(CACHE_TAGS);
const bodySchema = z.object({ tags: z.array(z.string()).min(1).max(10) });

function hash(value: string) {
	return createHash('sha256').update(value).digest();
}

function isAuthorized(request: Request, secret: string) {
	const header = request.headers.get('authorization') ?? '';
	const token = header.startsWith('Bearer ') ? header.slice(7) : '';
	return timingSafeEqual(hash(token), hash(secret));
}

export async function handleRevalidate(request: Request): Promise<Response> {
	const secret = (
		(process.env.VITEST
			? process.env.REVALIDATE_SECRET
			: REVALIDATE_SECRET || process.env.REVALIDATE_SECRET) ?? ''
	).trim();
	if (!secret) {
		return Response.json({ error: 'REVALIDATE_SECRET is not set.' }, { status: 503 });
	}
	if (!isAuthorized(request, secret)) {
		return Response.json({ error: 'Unauthorized.' }, { status: 401 });
	}

	const body = bodySchema.safeParse(await request.json().catch(() => null));
	if (!body.success) {
		return Response.json({ error: 'Invalid request body.' }, { status: 400 });
	}

	const tags = body.data.tags.filter((tag) => knownTags.includes(tag));
	return Response.json({ revalidated: tags });
}
