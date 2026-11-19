<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { type MediaVariant, resolveMediaUrl } from '#lib/media-url.js';

	interface Props extends Omit<
		HTMLImgAttributes,
		'src' | 'loading' | 'decoding' | 'fetchpriority'
	> {
		src: string | null | undefined;
		thumbSrc?: string | null | undefined;
		variant?: MediaVariant;
		priority?: 'high' | 'low';
		fallback?: string;
		alt: string;
	}

	let {
		src,
		thumbSrc,
		variant = 'full',
		priority,
		fallback,
		alt,
		onerror,
		...rest
	}: Props = $props();

	let resolvedSrc = $derived(
		resolveMediaUrl(src, {
			thumbUrl: thumbSrc,
			variant,
			fallback
		})
	);

	function handleError(event: Event & { currentTarget: EventTarget & Element }): void {
		const img = event.currentTarget as HTMLImageElement;
		if (typeof onerror === 'function') {
			onerror(event as Event & { currentTarget: EventTarget & HTMLImageElement });
		}
		if (fallback && img.dataset.fallbackApplied !== 'true') {
			img.dataset.fallbackApplied = 'true';
			img.src = fallback;
		}
	}
</script>

<img
	src={resolvedSrc}
	{alt}
	loading={priority === 'high' ? 'eager' : 'lazy'}
	decoding="async"
	fetchpriority={priority}
	onerror={fallback ? handleError : onerror}
	{...rest}
/>
