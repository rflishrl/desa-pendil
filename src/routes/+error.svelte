<script lang="ts">
	import { page } from '$app/state';
	import Button from '#lib/components/ui/Button.svelte';
	import ButtonLink from '#lib/components/ui/ButtonLink.svelte';
	import Container from '#lib/components/ui/Container.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import HeadTags from '#lib/components/ui/HeadTags.svelte';
	import PageHero from '#lib/components/ui/PageHero.svelte';
	import Panel from '#lib/components/ui/Panel.svelte';

	let isNotFound = $derived(page.status === 404);
	let isArticleRoute = $derived(page.url.pathname.startsWith('/article/'));
</script>

<HeadTags
	title={isNotFound
		? isArticleRoute
			? 'Berita tidak ditemukan - Desa Pendil'
			: 'Halaman tidak ditemukan - Desa Pendil'
		: 'Terjadi kesalahan - Desa Pendil'}
	path={page.url.pathname}
/>

{#if isNotFound && isArticleRoute}
	<PageHero
		title="Berita tidak ditemukan"
		trail={[{ label: 'Berita Desa Pendil', href: '/article' }, { label: 'Tidak Ditemukan' }]}
	/>
	<section class="relative z-10 -mt-24 lg:-mt-32">
		<Container size="wide">
			<Panel>
				<EmptyState
					title="Berita tidak ditemukan"
					description="Berita yang Anda cari tidak ditemukan atau telah dihapus."
				/>
				<div class="mt-8 text-center">
					<ButtonLink href="/article" variant="outline">Kembali ke Berita</ButtonLink>
				</div>
			</Panel>
		</Container>
	</section>
{:else if isNotFound}
	<Container class="flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
		<p class="mb-2 text-lg font-semibold text-primary-700">404</p>
		<h1 class="mb-3 text-3xl font-bold">Halaman tidak ditemukan</h1>
		<p class="mb-8 max-w-md text-muted">Halaman yang Anda cari tidak ada atau sudah dipindahkan.</p>
		<ButtonLink href="/">Kembali ke Beranda</ButtonLink>
	</Container>
{:else}
	<Container class="flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
		<h1 class="mb-3 text-3xl font-bold">Terjadi kesalahan</h1>
		<p class="mb-8 max-w-md text-muted">Halaman gagal dimuat. Silakan coba lagi.</p>
		<Button onclick={() => window.location.reload()}>Coba lagi</Button>
	</Container>
{/if}
