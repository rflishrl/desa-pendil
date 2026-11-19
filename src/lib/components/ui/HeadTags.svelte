<script lang="ts">
	import { siteConfig } from '#lib/config/site.js';
	import { getSiteUrl } from '#lib/env.js';

	interface Props {
		title?: string;
		description?: string;
		path?: string;
		ogTitle?: string;
		ogType?: 'website' | 'article';
		image?: string;
	}

	let {
		title = `${siteConfig.name} | Informasi Publik Desa`,
		description = siteConfig.description,
		path = '/',
		ogTitle,
		ogType = 'website',
		image
	}: Props = $props();

	let baseUrl = $derived(getSiteUrl());
	let canonical = $derived(
		new URL(path, `${baseUrl}/`).toString().replace(/\/$/, path === '/' ? '/' : '')
	);
	let resolvedImage = $derived.by(() => {
		const raw = image ?? '/images/bg-hero-new.jpg';
		return /^https?:\/\//i.test(raw) ? raw : new URL(raw, `${baseUrl}/`).toString();
	});
	let resolvedOgTitle = $derived(ogTitle ?? title);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:title" content={resolvedOgTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content="id_ID" />
	<meta property="og:type" content={ogType} />
	<meta property="og:image" content={resolvedImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={resolvedImage} />
</svelte:head>
