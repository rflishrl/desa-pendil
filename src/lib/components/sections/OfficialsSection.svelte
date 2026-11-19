<script lang="ts">
	import OfficialCard from '#lib/components/cards/OfficialCard.svelte';
	import CardRail from '#lib/components/ui/CardRail.svelte';
	import Container from '#lib/components/ui/Container.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import { officials } from '#lib/data/village.js';
</script>

<section id="perangkat" aria-labelledby="perangkat-title" class="py-8 lg:py-[70px]">
	<Container size="wide" class="md:max-w-[1328px] md:!px-8 lg:!px-10">
		<div
			class="rounded-2xl bg-surface px-6 py-12 shadow-card md:rounded-none md:bg-transparent md:p-0 md:shadow-none"
		>
			<SectionHeading id="perangkat-title" title="Perangkat Desa" />
			<div class="mt-12 md:mt-8">
				<CardRail
					label="Perangkat desa"
					itemWidth="[&>li]:w-[276px]"
					columns="md:grid-cols-2 lg:grid-cols-4"
				>
					{#each officials as official, index (`${official.position}-${index}`)}
						<li>
							<OfficialCard {official} />
						</li>
					{/each}
				</CardRail>
			</div>
		</div>
	</Container>
</section>
