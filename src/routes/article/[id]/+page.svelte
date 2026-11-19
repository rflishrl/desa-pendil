<script lang="ts">
	import type { PageProps } from './$types';
	import { ArrowUpRight, CalendarDays, User } from '@lucide/svelte';
	import ArticleCard from '#lib/components/cards/ArticleCard.svelte';
	import ButtonLink from '#lib/components/ui/ButtonLink.svelte';
	import Container from '#lib/components/ui/Container.svelte';
	import HeadTags from '#lib/components/ui/HeadTags.svelte';
	import MediaImage from '#lib/components/ui/MediaImage.svelte';
	import PageHero from '#lib/components/ui/PageHero.svelte';
	import Panel from '#lib/components/ui/Panel.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import ShareButton from '#lib/components/ui/ShareButton.svelte';
	import { formatArticleDate } from '#lib/format.js';
	import { FALLBACK_NEWS_IMAGE } from '#lib/media-url.js';

	let { data }: PageProps = $props();

	let article = $derived(data.article);
	let related = $derived(data.related);
	let dateLabel = $derived(formatArticleDate(article.date));
	let paragraphs = $derived((article.content ?? '').split(/\n{2,}/).filter(Boolean));
	let metaTitle = $derived(`${article.title} - Desa Pendil`);
	let metaDescription = $derived(
		article.content
			? article.content.slice(0, 155).replace(/\s+/g, ' ').trim()
			: 'Kumpulan berita dan informasi terbaru dari Desa Pendil.'
	);
</script>

<HeadTags
	title={metaTitle}
	description={metaDescription}
	path={`/article/${article.id}`}
	ogType="article"
	image={article.image || FALLBACK_NEWS_IMAGE}
/>

<PageHero
	title={article.title}
	trail={[{ label: 'Berita Desa Pendil', href: '/article' }, { label: 'Preview Berita' }]}
>
	<ul class="flex flex-wrap gap-x-6 gap-y-2 text-base font-medium">
		<li class="flex items-center gap-2">
			<CalendarDays class="size-6" aria-hidden="true" />
			<time datetime={article.date}>{dateLabel}</time>
		</li>
		<li class="flex items-center gap-2">
			<User class="size-6" aria-hidden="true" />
			{article.author ?? 'Admin'}
		</li>
	</ul>
</PageHero>

<div class="relative z-10 -mt-24 space-y-12 lg:-mt-32 lg:space-y-[140px]">
	<article>
		<Container size="wide">
			<Panel class="flex flex-col items-center gap-12 lg:gap-20 xl:px-[125px]">
				<div class="relative aspect-[1239/560] w-full overflow-hidden rounded-2xl bg-canvas">
					<MediaImage
						src={article.image}
						variant="full"
						priority="high"
						alt=""
						width={1239}
						height={560}
						class="h-full w-full object-cover"
					/>
				</div>
				<div
					class="w-full space-y-6 text-base leading-7 text-muted sm:text-justify lg:text-2xl lg:leading-9"
				>
					{#if paragraphs.length > 0}
						{#each paragraphs as text, index (`p-${index}`)}
							<p>{text}</p>
						{/each}
					{:else}
						<p>Isi lengkap berita ini belum tersedia.</p>
					{/if}
				</div>
				<ShareButton title={article.title} />
			</Panel>
		</Container>
	</article>

	{#if related.length > 0}
		<section aria-labelledby="terkini-title">
			<Container size="wide">
				<Panel>
					<SectionHeading id="terkini-title" title="Berita Terkini">
						{#snippet action()}
							<ButtonLink href="/article" variant="outline">
								Selengkapnya
								<ArrowUpRight class="size-5" aria-hidden="true" />
							</ButtonLink>
						{/snippet}
					</SectionHeading>
					<ul class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{#each related as item (item.id)}
							<li>
								<ArticleCard article={item} href={`/article/${item.id}`} />
							</li>
						{/each}
					</ul>
				</Panel>
			</Container>
		</section>
	{/if}
</div>
