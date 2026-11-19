import type { RequestHandler } from './$types';
import { getSiteUrl } from '#lib/env.js';

export const GET: RequestHandler = () => {
	const baseUrl = getSiteUrl();
	const content = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};
