<script lang="ts">
	import type { PageProps } from './$types';
	import GalleryGrid from '#lib/components/sections/GalleryGrid.svelte';
	import Container from '#lib/components/ui/Container.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import HeadTags from '#lib/components/ui/HeadTags.svelte';
	import PageHero from '#lib/components/ui/PageHero.svelte';
	import Pagination from '#lib/components/ui/Pagination.svelte';
	import Panel from '#lib/components/ui/Panel.svelte';

	let { data }: PageProps = $props();
</script>

<HeadTags
	title="Galeri Desa - Desa Pendil"
	description="Kumpulan foto kegiatan Desa Pendil."
	path="/gallery"
/>

<PageHero
	title="Galeri Desa Pendil"
	description="Kumpulan foto kegiatan Desa Pendil"
	trail={[{ label: 'Layanan Publik', href: '/services' }, { label: 'Galeri Desa Pendil' }]}
/>
<section aria-label="Foto kegiatan" class="relative z-10 -mt-24 lg:-mt-32">
	<Container size="wide">
		<Panel class="space-y-12 lg:space-y-20">
			<h2 class="text-center text-[32px] font-bold md:sr-only">Semua Foto</h2>
			{#if data.images.length > 0}
				<GalleryGrid images={data.images} />
			{:else}
				<EmptyState title="Belum ada foto" description="Foto kegiatan akan tampil di sini." />
			{/if}
			<Pagination page={data.page} totalPages={data.totalPages} basePath="/gallery" />
		</Panel>
	</Container>
</section>
