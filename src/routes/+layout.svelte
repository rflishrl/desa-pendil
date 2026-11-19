<script lang="ts">
	import '../styles/globals.css';
	import type { Snippet } from 'svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import Navbar from '#lib/components/layout/Navbar.svelte';
	import TopProgressBar from '#lib/components/ui/TopProgressBar.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="font-sans">
	<TopProgressBar />
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:font-semibold focus:text-ink"
	>
		Lewati ke konten utama
	</a>
	<Navbar />
	<main id="main-content" tabindex="-1" class="focus:outline-none">
		{@render children()}
	</main>
	<Footer />
</div>
