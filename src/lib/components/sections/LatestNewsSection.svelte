<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import ArticleCard from '#lib/components/cards/ArticleCard.svelte';
	import ButtonLink from '#lib/components/ui/ButtonLink.svelte';
	import CardRail from '#lib/components/ui/CardRail.svelte';
	import Container from '#lib/components/ui/Container.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import Panel from '#lib/components/ui/Panel.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import type { Article } from '#lib/types/index.js';

	interface Props {
		articles: Article[];
	}

	let { articles }: Props = $props();
</script>

<section aria-labelledby="berita-title" class="relative z-10 -mt-24 sm:-mt-28">
	<Container size="wide">
		<Panel>
			<SectionHeading id="berita-title" title="Berita Terkini">
				{#snippet action()}
					<ButtonLink href="/article" variant="outline">
						Selengkapnya
						<ArrowUpRight class="size-5" aria-hidden="true" />
					</ButtonLink>
				{/snippet}
			</SectionHeading>
			{#if articles.length > 0}
				<div class="mt-12">
					<CardRail
						label="Berita terkini"
						itemWidth="[&>li]:w-[276px]"
						columns="md:grid-cols-2 lg:grid-cols-3"
					>
						{#each articles as article (article.id)}
							<li>
								<ArticleCard {article} href={`/article/${article.id}`} />
							</li>
						{/each}
					</CardRail>
				</div>
			{:else}
				<EmptyState
					class="mt-12"
					title="Berita belum tersedia"
					description="Berita belum dapat dimuat. Silakan coba lagi nanti."
				/>
			{/if}
		</Panel>
	</Container>
</section>
