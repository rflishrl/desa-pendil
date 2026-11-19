import type { RequestHandler } from './$types';
import { getSiteUrl } from '#lib/env.js';

const routes = [
	{ path: '', changeFrequency: 'weekly', priority: '1.0' },
	{ path: '/article', changeFrequency: 'monthly', priority: '0.8' },
	{ path: '/services', changeFrequency: 'monthly', priority: '0.8' },
	{ path: '/profile', changeFrequency: 'monthly', priority: '0.8' },
	{ path: '/gallery', changeFrequency: 'monthly', priority: '0.8' }
];

export const GET: RequestHandler = () => {
	const baseUrl = getSiteUrl();
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		(r) => `  <url>
    <loc>${baseUrl}${r.path}</loc>
    <changefreq>${r.changeFrequency}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
};
