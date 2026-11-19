<script lang="ts">
	import Container from '#lib/components/ui/Container.svelte';
	import MediaImage from '#lib/components/ui/MediaImage.svelte';
	import { leader } from '#lib/data/village.js';
</script>

<section id="sambutan" aria-labelledby="sambutan-title" class="py-8 lg:py-[70px]">
	<Container>
		<div class="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-[42px]">
			<div
				class="relative mx-auto aspect-[592/537] w-full overflow-hidden rounded-xl bg-canvas md:rounded-3xl"
			>
				<MediaImage
					src={leader.image}
					variant="full"
					alt={`Kepala Desa ${leader.name}`}
					width={592}
					height={537}
					class="h-full w-full object-cover"
				/>
			</div>
			<div>
				<p class="mb-3 text-sm font-semibold text-ink lg:mb-4 lg:text-xl">Sambutan</p>
				<h2
					id="sambutan-title"
					class="mb-4 text-xl font-bold text-balance md:text-3xl lg:mb-6 lg:text-[32px]"
				>
					Kepala Desa <span class="font-extrabold text-primary-700">{leader.name}</span>
				</h2>
				<p class="text-sm leading-6 text-muted lg:text-xl lg:leading-8">{leader.speech}</p>
			</div>
		</div>
	</Container>
</section>
