<script lang="ts">
	import type { PageProps } from './$types';
	import CultureSection from '#lib/components/sections/CultureSection.svelte';
	import FeaturesSection from '#lib/components/sections/FeaturesSection.svelte';
	import HomeHero from '#lib/components/sections/HomeHero.svelte';
	import LatestNewsSection from '#lib/components/sections/LatestNewsSection.svelte';
	import LatestNewsSectionSkeleton from '#lib/components/sections/LatestNewsSectionSkeleton.svelte';
	import LeaderSection from '#lib/components/sections/LeaderSection.svelte';
	import OfficialsSection from '#lib/components/sections/OfficialsSection.svelte';
	import TodayAgendaSection from '#lib/components/sections/TodayAgendaSection.svelte';
	import VillageStatsSection from '#lib/components/sections/VillageStatsSection.svelte';
	import HeadTags from '#lib/components/ui/HeadTags.svelte';
	import { siteConfig } from '#lib/config/site.js';

	let { data }: PageProps = $props();
</script>

<HeadTags
	title="Desa Pendil"
	ogTitle={siteConfig.name}
	description={siteConfig.description}
	path="/"
/>

<HomeHero />
{#await data.articlesPromise}
	<LatestNewsSectionSkeleton />
{:then articles}
	<LatestNewsSection articles={articles.slice(0, 3)} />
{:catch}
	<LatestNewsSection articles={[]} />
{/await}
<LeaderSection />
<OfficialsSection />
<TodayAgendaSection />
<VillageStatsSection showMoreLink />
<FeaturesSection />
<CultureSection />
