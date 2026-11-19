import { afterEach, describe, expect, it, vi } from 'vitest';
import { handleRevalidate } from '#lib/server/revalidate.js';

afterEach(() => {
	vi.unstubAllEnvs();
});

describe('POST /api/revalidate', () => {
	it('returns 503 when REVALIDATE_SECRET is unset', async () => {
		vi.stubEnv('REVALIDATE_SECRET', '');
		const res = await handleRevalidate(
			new Request('http://localhost/api/revalidate', { method: 'POST' })
		);
		expect(res.status).toBe(503);
	});

	it('returns 401 for missing or invalid Bearer token', async () => {
		vi.stubEnv('REVALIDATE_SECRET', 'super-secret-value');
		const res = await handleRevalidate(
			new Request('http://localhost/api/revalidate', {
				method: 'POST',
				headers: { authorization: 'Bearer wrong' },
				body: JSON.stringify({ tags: ['news'] })
			})
		);
		expect(res.status).toBe(401);
	});

	it('returns 400 on invalid payload and 200 filtering known tags when authorized', async () => {
		vi.stubEnv('REVALIDATE_SECRET', 'super-secret-value');

		const bad = await handleRevalidate(
			new Request('http://localhost/api/revalidate', {
				method: 'POST',
				headers: { authorization: 'Bearer super-secret-value' },
				body: JSON.stringify({ tags: [] })
			})
		);
		expect(bad.status).toBe(400);

		const ok = await handleRevalidate(
			new Request('http://localhost/api/revalidate', {
				method: 'POST',
				headers: { authorization: 'Bearer super-secret-value' },
				body: JSON.stringify({ tags: ['news', 'gallery', 'unknown'] })
			})
		);
		expect(ok.status).toBe(200);
		expect(await ok.json()).toEqual({ revalidated: ['news', 'gallery'] });
	});
});
