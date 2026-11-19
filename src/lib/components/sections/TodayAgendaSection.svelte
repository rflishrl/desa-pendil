<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import AgendaCard from '#lib/components/cards/AgendaCard.svelte';
	import ButtonLink from '#lib/components/ui/ButtonLink.svelte';
	import Container from '#lib/components/ui/Container.svelte';
	import MediaImage from '#lib/components/ui/MediaImage.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import { agenda } from '#lib/data/village.js';
	import { formatLongDate } from '#lib/format.js';

	const todayLabel = formatLongDate(new Date());
</script>

<section
	id="agenda"
	aria-labelledby="agenda-title"
	class="relative isolate my-8 overflow-hidden py-12 lg:my-[70px] lg:py-[60px]"
>
	<MediaImage
		src="/images/bg-event.webp"
		alt=""
		width={1920}
		height={1920}
		aria-hidden="true"
		class="absolute inset-0 -z-10 h-full w-full object-cover"
	/>
	<Container>
		<SectionHeading id="agenda-title" title="Agenda Hari Ini" subtitle={todayLabel}>
			{#snippet action()}
				<ButtonLink href="/services" variant="outline-dark">
					Selengkapnya
					<ArrowUpRight class="size-5" aria-hidden="true" />
				</ButtonLink>
			{/snippet}
		</SectionHeading>
		<ul class="mt-8 grid gap-4 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
			{#each agenda as item (item.id)}
				<li>
					<AgendaCard {item} />
				</li>
			{/each}
		</ul>
	</Container>
</section>
