<script lang="ts">
	import type { PageProps } from './$types';
	import ArticleCard from '#lib/components/cards/ArticleCard.svelte';
	import Container from '#lib/components/ui/Container.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import HeadTags from '#lib/components/ui/HeadTags.svelte';
	import PageHero from '#lib/components/ui/PageHero.svelte';
	import Pagination from '#lib/components/ui/Pagination.svelte';
	import Panel from '#lib/components/ui/Panel.svelte';

	let { data }: PageProps = $props();
</script>

<HeadTags
	title="Berita Desa - Desa Pendil"
	description="Kumpulan berita terbaru dari Desa Pendil."
	path="/article"
/>

<PageHero title="Berita Desa Pendil" description="Kumpulan berita terbaru dari Desa Pendil" />
<section aria-labelledby="semua-berita-title" class="relative z-10 -mt-24 lg:-mt-32">
	<Container size="wide">
		<Panel class="space-y-12 lg:space-y-20">
			<div class="space-y-12">
				<div class={data.query ? 'text-center sm:text-left' : 'text-center md:sr-only'}>
					<h2 id="semua-berita-title" class="text-[32px] leading-tight font-bold">
						{data.query ? `Hasil untuk “${data.query}”` : 'Semua Berita'}
					</h2>
					{#if data.query}
						<p class="mt-2 text-base font-medium text-muted">
							{data.totalCount} berita ditemukan.
							<a
								href="/article"
								class="font-semibold text-primary-700 underline underline-offset-4"
							>
								Hapus pencarian
							</a>
						</p>
					{/if}
				</div>

				{#if data.articles.length > 0}
					<ul
						class="mx-auto grid max-w-[276px] gap-6 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3"
					>
						{#each data.articles as article (article.id)}
							<li>
								<ArticleCard {article} href={`/article/${article.id}`} />
							</li>
						{/each}
					</ul>
				{:else}
					<EmptyState
						title={data.query ? 'Berita tidak ditemukan' : 'Berita belum tersedia'}
						description={data.query
							? 'Coba gunakan kata kunci lain.'
							: 'Berita belum dapat dimuat. Silakan coba lagi nanti.'}
					/>
				{/if}
			</div>

			<Pagination
				page={data.page}
				totalPages={data.totalPages}
				basePath="/article"
				params={data.query ? { q: data.query } : {}}
			/>
		</Panel>
	</Container>
</section>
