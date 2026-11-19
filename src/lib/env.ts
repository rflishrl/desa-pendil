import { PUBLIC_SITE_URL } from '$app/env/public';

export function getSiteUrl(): string {
	const raw = PUBLIC_SITE_URL?.trim() || 'https://desapendil.id';
	return raw.replace(/\/+$/, '');
}
