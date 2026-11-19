<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from '#lib/components/ui/Container.svelte';
	import HeroBackground from '#lib/components/ui/HeroBackground.svelte';

	export interface Crumb {
		label: string;
		href?: string;
	}

	interface Props {
		title: string;
		description?: string;
		trail?: Crumb[];
		children?: Snippet;
	}

	let { title, description, trail, children }: Props = $props();

	let crumbs = $derived<Crumb[]>(trail ?? [{ label: title }]);
</script>

<header
	class="relative isolate overflow-hidden bg-ink pt-32 pb-40 text-white md:pb-44 lg:pt-[160px]"
>
	<HeroBackground />
	<Container>
		<nav aria-label="Breadcrumb" class="mb-8 text-base font-semibold lg:mb-10">
			<ol class="flex flex-wrap items-center gap-x-2 gap-y-1">
				<li>
					<a
						href="/"
						class="rounded text-[#F7F7F7] underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
					>
						Beranda
					</a>
				</li>
				{#each crumbs as crumb, index (crumb.label)}
					{@const last = index === crumbs.length - 1}
					<li class="flex items-center gap-2">
						<span aria-hidden="true">/</span>
						{#if crumb.href && !last}
							<a
								href={crumb.href}
								class="rounded underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
							>
								{crumb.label}
							</a>
						{:else}
							<span aria-current={last ? 'page' : undefined} class="line-clamp-1">
								{crumb.label}
							</span>
						{/if}
					</li>
				{/each}
			</ol>
		</nav>
		<div class="max-w-[770px] space-y-4">
			<h1 class="text-2xl leading-snug font-bold text-balance sm:text-[32px] sm:leading-[46px]">
				{title}
			</h1>
			{#if description}
				<p class="text-base font-medium text-white/80">{description}</p>
			{/if}
			{#if children}
				{@render children()}
			{/if}
		</div>
	</Container>
</header>
