<script lang="ts">
	import CardRail from '#lib/components/ui/CardRail.svelte';
	import MediaImage from '#lib/components/ui/MediaImage.svelte';
	import type { GalleryImage } from '#lib/types/index.js';

	interface Props {
		images: GalleryImage[];
		rail?: boolean;
	}

	let { images, rail = false }: Props = $props();
</script>

{#snippet tileList()}
	{#each images as image, index (`${image.src}-${index}`)}
		<li
			class="relative mx-auto aspect-[278/368] w-full max-w-[278px] overflow-hidden rounded-2xl bg-canvas shadow-card sm:aspect-[397/525] sm:max-w-none"
		>
			<MediaImage
				src={image.src}
				thumbSrc={image.thumbSrc}
				variant="thumb"
				alt={image.alt}
				width={397}
				height={525}
				class="h-full w-full object-cover transition-transform duration-300 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
			/>
		</li>
	{/each}
{/snippet}

{#if rail}
	<CardRail
		label="Galeri desa"
		itemWidth="[&>li]:w-[278px]"
		columns="md:grid-cols-2 lg:grid-cols-3"
	>
		{@render tileList()}
	</CardRail>
{:else}
	<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{@render tileList()}
	</ul>
{/if}
