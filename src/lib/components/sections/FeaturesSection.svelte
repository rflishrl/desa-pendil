<script lang="ts">
	import FeatureCard from '#lib/components/cards/FeatureCard.svelte';
	import CardRail from '#lib/components/ui/CardRail.svelte';
	import Container from '#lib/components/ui/Container.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import { features } from '#lib/data/village.js';
</script>

<section id="keunggulan" aria-labelledby="keunggulan-title" class="py-8 lg:py-[70px]">
	<Container>
		<SectionHeading id="keunggulan-title" title="Keunggulan" class="md:items-end" />
		<div class="mt-12 md:mt-8">
			<CardRail
				label="Keunggulan desa"
				itemWidth="[&>li]:w-[294px]"
				columns="md:grid-cols-2 lg:grid-cols-3"
			>
				{#each features as feature (feature.title)}
					<li>
						<FeatureCard {feature} />
					</li>
				{/each}
			</CardRail>
		</div>
	</Container>
</section>
