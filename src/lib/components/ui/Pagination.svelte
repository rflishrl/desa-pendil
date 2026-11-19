<script lang="ts">
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { cn } from '#lib/cn.js';

	interface Props {
		page: number;
		totalPages: number;
		basePath: string;
		params?: Record<string, string>;
	}

	let { page, totalPages, basePath, params = {} }: Props = $props();

	let pages = $derived(Array.from({ length: totalPages }, (_, i) => i + 1));

	function hrefFor(n: number): string {
		const search = new SvelteURLSearchParams(params);
		if (n > 1) search.set('page', String(n));
		const qs = search.toString();
		return qs ? `${basePath}?${qs}` : basePath;
	}
</script>

{#if totalPages > 1}
	<nav aria-label="Halaman">
		<ul class="flex flex-wrap items-center justify-center gap-6">
			{#each pages as n (n)}
				{@const active = n === page}
				<li>
					<a
						href={hrefFor(n)}
						aria-label={`Halaman ${n}`}
						aria-current={active ? 'page' : undefined}
						class={cn(
							'inline-flex size-11 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none',
							active
								? 'bg-primary-300 text-[#040F0F]'
								: 'bg-[#F0F0F0] text-muted hover:bg-primary-100'
						)}
					>
						{n}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
