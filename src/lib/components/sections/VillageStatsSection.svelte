<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import StatCard from '#lib/components/cards/StatCard.svelte';
	import ButtonLink from '#lib/components/ui/ButtonLink.svelte';
	import Container from '#lib/components/ui/Container.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import { villageStats } from '#lib/data/village.js';

	interface Props {
		showMoreLink?: boolean;
	}

	let { showMoreLink = false }: Props = $props();
</script>

<section id="data-desa" aria-labelledby="data-desa-title" class="py-8 lg:py-[70px]">
	<Container>
		{#if showMoreLink}
			<SectionHeading id="data-desa-title" title="Data Desa">
				{#snippet action()}
					<ButtonLink href="/services#data-desa" variant="outline">
						Selengkapnya
						<ArrowUpRight class="size-5" aria-hidden="true" />
					</ButtonLink>
				{/snippet}
			</SectionHeading>
		{:else}
			<SectionHeading id="data-desa-title" title="Data Desa" />
		{/if}
		<ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
			{#each villageStats as stat (stat.description)}
				<li>
					<StatCard {stat} />
				</li>
			{/each}
		</ul>
	</Container>
</section>
