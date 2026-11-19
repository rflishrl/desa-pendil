<script lang="ts">
	import Container from '#lib/components/ui/Container.svelte';
	import Panel from '#lib/components/ui/Panel.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
</script>

<section aria-labelledby="berita-title" class="relative z-10 -mt-24 sm:-mt-28">
	<Container size="wide">
		<Panel>
			<SectionHeading id="berita-title" title="Berita Terkini" />
			<div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each [1, 2, 3] as i (i)}
					<div class="h-[360px] animate-pulse rounded-2xl bg-[#F0F0F0]" aria-hidden="true"></div>
				{/each}
			</div>
		</Panel>
	</Container>
</section>
