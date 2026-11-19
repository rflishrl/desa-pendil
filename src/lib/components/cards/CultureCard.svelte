<script lang="ts">
	import MediaImage from '#lib/components/ui/MediaImage.svelte';
	import type { CultureItem } from '#lib/types/index.js';

	interface Props {
		item: CultureItem;
	}

	let { item }: Props = $props();
</script>

<article class="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card">
	<div class="relative h-[188px] shrink-0 bg-canvas sm:h-[254px]">
		<MediaImage
			src={item.image}
			variant="thumb"
			alt={`Kesenian ${item.title}`}
			width={400}
			height={254}
			class="h-full w-full rounded-2xl object-cover"
		/>
	</div>
	<div class="space-y-3 p-[26px] lg:space-y-4 lg:p-9">
		<h3 class="text-lg font-bold text-black lg:text-2xl">{item.title}</h3>
		<p class="text-sm leading-5 text-muted lg:text-base lg:leading-[22px]">
			{item.description}
		</p>
	</div>
</article>
