<script lang="ts">
	import CultureCard from '#lib/components/cards/CultureCard.svelte';
	import CardRail from '#lib/components/ui/CardRail.svelte';
	import Container from '#lib/components/ui/Container.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import { cultures } from '#lib/data/village.js';
</script>

<section id="kesenian" aria-labelledby="kesenian-title" class="py-8 lg:py-[70px]">
	<Container>
		<SectionHeading id="kesenian-title" title="Kesenian Khas" />
		<div class="mt-12 md:mt-8">
			<CardRail
				label="Kesenian khas"
				itemWidth="[&>li]:w-[293px]"
				columns="md:grid-cols-2 lg:grid-cols-3"
			>
				{#each cultures as item (item.title)}
					<li>
						<CultureCard {item} />
					</li>
				{/each}
			</CardRail>
		</div>
	</Container>
</section>
