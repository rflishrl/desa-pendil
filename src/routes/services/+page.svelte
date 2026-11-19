<script lang="ts">
	import type { PageProps } from './$types';
	import { ArrowUpRight } from '@lucide/svelte';
	import StatCard from '#lib/components/cards/StatCard.svelte';
	import GalleryGrid from '#lib/components/sections/GalleryGrid.svelte';
	import ButtonLink from '#lib/components/ui/ButtonLink.svelte';
	import CardRail from '#lib/components/ui/CardRail.svelte';
	import Container from '#lib/components/ui/Container.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import HeadTags from '#lib/components/ui/HeadTags.svelte';
	import MediaImage from '#lib/components/ui/MediaImage.svelte';
	import PageHero from '#lib/components/ui/PageHero.svelte';
	import Panel from '#lib/components/ui/Panel.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import { hamlets, villageStats } from '#lib/data/village.js';

	let { data }: PageProps = $props();
</script>

<HeadTags
	title="Layanan Publik - Desa Pendil"
	description="Kumpulan data dari Desa Pendil."
	path="/services"
/>

{#snippet statList()}
	<ul class="mx-auto grid max-w-[276px] gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
		{#each villageStats as stat (stat.description)}
			<li>
				<StatCard {stat} />
			</li>
		{/each}
	</ul>
{/snippet}

<PageHero title="Layanan Publik" description="Kumpulan data dari Desa Pendil" />

<div class="relative z-10 -mt-24 space-y-20 lg:-mt-32 lg:space-y-[140px]">
	<section id="data-desa" aria-labelledby="data-desa-title">
		<Container size="wide">
			<div
				class="relative isolate overflow-hidden rounded-2xl px-6 py-12 shadow-card lg:px-12 lg:py-[60px]"
			>
				<MediaImage
					src="/images/bg-event.webp"
					alt=""
					width={1920}
					height={1920}
					aria-hidden="true"
					class="absolute inset-0 -z-10 h-full w-full object-cover"
				/>
				<div class="mx-auto max-w-[1248px] space-y-12 lg:space-y-6">
					<SectionHeading id="data-desa-title" title="Data Desa" />
					{@render statList()}
				</div>
			</div>
		</Container>
	</section>

	<section id="data-dusun" aria-labelledby="data-dusun-title">
		<Container size="wide">
			<Panel>
				<SectionHeading id="data-dusun-title" title="Data Dusun" />
				<div class="mt-12">
					<CardRail
						label="Data per dusun"
						itemWidth="[&>li]:w-[276px]"
						columns="md:grid-cols-1 md:gap-10"
					>
						{#each hamlets as hamlet (hamlet)}
							<li>
								<h3 class="mb-4 text-xl font-bold">{hamlet}</h3>
								{@render statList()}
							</li>
						{/each}
					</CardRail>
				</div>
			</Panel>
		</Container>
	</section>

	<section id="galeri" aria-labelledby="galeri-title">
		<Container size="wide" class="md:max-w-[1328px] md:!px-8 lg:!px-10">
			<div class="px-6 py-12 md:p-0">
				<SectionHeading id="galeri-title" title="Galeri Desa">
					{#snippet action()}
						<ButtonLink href="/gallery" variant="outline">
							Selengkapnya
							<ArrowUpRight class="size-5" aria-hidden="true" />
						</ButtonLink>
					{/snippet}
				</SectionHeading>
				<div class="mt-12 md:mt-6">
					{#if data.galleryImages.length > 0}
						<GalleryGrid images={data.galleryImages.slice(0, 3)} rail />
					{:else}
						<EmptyState title="Belum ada foto" />
					{/if}
				</div>
			</div>
		</Container>
	</section>
</div>
