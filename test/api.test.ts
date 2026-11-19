import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getArticle, getArticles, getGalleryImages } from '#lib/server/api/index.js';
import { resetServerEnvCache } from '#lib/server/env.js';

beforeEach(() => {
	resetServerEnvCache();
	vi.stubEnv('API_BASE_URL', 'https://api.desapendil.test/api');
	vi.stubEnv('PUBLIC_MEDIA_PUBLIC_DOMAIN', 'https://media-dp.example.test');
	vi.spyOn(console, 'error').mockImplementation(() => {});
	vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
	vi.restoreAllMocks();
	vi.unstubAllEnvs();
	resetServerEnvCache();
});

describe('#lib/server/api', () => {
	it('parses valid news items and skips invalid items without crashing', async () => {
		vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
			Response.json({
				success: true,
				data: {
					items: [
						{
							id: 'a1',
							title: 'Kerja Bakti Desa',
							createdAt: '2026-11-10T00:00:00Z',
							thumbnail: 'https://media-dp.example.test/abc.webp',
							author: 'Admin'
						},
						{ id: '', title: '' }
					]
				}
			})
		);

		const articles = await getArticles();
		expect(articles).toHaveLength(1);
		expect(articles[0]).toMatchObject({
			id: 'a1',
			title: 'Kerja Bakti Desa',
			image: 'https://media-dp.example.test/abc.webp',
			thumbImage: 'https://media-dp.example.test/abc-thumb.webp'
		});
	});

	it('returns undefined when article detail responds 404', async () => {
		vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response(null, { status: 404 }));
		const article = await getArticle('missing-id');
		expect(article).toBeUndefined();
	});

	it('returns null from getGalleryImages when API fails so pages can fall back to placeholders', async () => {
		vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('network down'));
		const images = await getGalleryImages();
		expect(images).toBeNull();
	});
});
