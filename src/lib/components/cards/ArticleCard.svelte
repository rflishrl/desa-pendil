<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import MediaImage from '#lib/components/ui/MediaImage.svelte';
	import { formatArticleDate } from '#lib/format.js';
	import type { Article } from '#lib/types/index.js';

	interface Props {
		article: Article;
		href?: string;
	}

	let { article, href }: Props = $props();

	let dateLabel = $derived(formatArticleDate(article.date));
</script>

<article
	class="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-200 hover:shadow-card-hover"
>
	<div class="relative h-[177px] shrink-0 bg-canvas sm:h-[254px]">
		<MediaImage
			src={article.image}
			thumbSrc={article.thumbImage}
			variant="thumb"
			alt=""
			width={400}
			height={254}
			class="h-full w-full rounded-2xl object-cover"
		/>
	</div>
	<div class="flex flex-1 flex-col justify-between gap-6 p-6 lg:p-9">
		<div class="space-y-2">
			<h3
				class="line-clamp-3 text-[17px] leading-snug font-bold text-black lg:text-2xl lg:leading-8"
			>
				{article.title}
			</h3>
			<time datetime={article.date} class="block text-xs font-medium text-muted lg:text-base">
				{dateLabel}
			</time>
		</div>
		{#if href}
			<a
				{href}
				class="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg bg-primary/10 px-4 text-xs font-semibold text-primary-700 transition-colors hover:bg-primary/25 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none lg:min-h-9"
			>
				Selengkapnya
				<ArrowUpRight class="size-5" aria-hidden="true" />
			</a>
		{/if}
	</div>
</article>
