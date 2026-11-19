import { API_BASE_URL } from '$app/env/private';
import { z } from 'zod';
import { getSiteUrl } from '#lib/env.js';

export { getSiteUrl };

const serverSchema = z.object({
	API_BASE_URL: z
		.string()
		.url()
		.transform((v) => v.replace(/\/+$/, '')),
	SITE_URL: z
		.string()
		.url()
		.transform((v) => v.replace(/\/+$/, ''))
});

let cached: z.infer<typeof serverSchema> | undefined;

export function resetServerEnvCache(): void {
	cached = undefined;
}

export function getServerEnv() {
	if (cached) return cached;

	const isProd = process.env.NODE_ENV === 'production';
	const rawApiBase =
		(process.env.VITEST ? process.env.API_BASE_URL : API_BASE_URL || process.env.API_BASE_URL) ??
		'';
	const parsed = serverSchema.safeParse({
		API_BASE_URL: rawApiBase.trim() || (isProd ? undefined : 'http://localhost:4000/api'),
		SITE_URL: getSiteUrl()
	});

	if (!parsed.success) {
		throw new Error(`Invalid server environment: ${parsed.error.message}`);
	}
	cached = parsed.data;
	return cached;
}
