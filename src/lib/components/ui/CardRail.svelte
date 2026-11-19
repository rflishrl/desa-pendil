<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/cn.js';

	interface Props {
		label: string;
		columns: string;
		itemWidth: string;
		children: Snippet;
	}

	let { label, columns, itemWidth, children }: Props = $props();
</script>

<div class="relative">
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<ul
		tabindex="0"
		aria-label={label}
		class={cn(
			'flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [&>li]:shrink-0 [&>li]:snap-start',
			'focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none',
			'md:grid md:gap-6 md:overflow-visible md:pb-0 md:[&>li]:w-auto',
			itemWidth,
			columns
		)}
	>
		{@render children()}
	</ul>
	<div
		aria-hidden="true"
		class="pointer-events-none absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-surface/80 to-transparent md:hidden"
	></div>
</div>
