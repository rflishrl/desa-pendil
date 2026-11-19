<script lang="ts">
	import MediaImage from '#lib/components/ui/MediaImage.svelte';
	import type { Official } from '#lib/types/index.js';

	interface Props {
		official: Official;
	}

	let { official }: Props = $props();
</script>

<figure class="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card">
	<div class="relative aspect-square bg-canvas md:aspect-[291/389]">
		<MediaImage
			src={official.image}
			variant="thumb"
			alt={`Foto ${official.name}`}
			width={291}
			height={389}
			class="h-full w-full rounded-2xl object-cover"
		/>
	</div>
	<figcaption class="space-y-1 p-[34px] lg:p-9">
		<p
			class="text-[23px] leading-[30px] font-bold break-words text-black uppercase lg:text-2xl lg:leading-8"
		>
			{official.name}
		</p>
		<p class="text-[19px] font-medium text-muted lg:text-xl">{official.position}</p>
	</figcaption>
</figure>
