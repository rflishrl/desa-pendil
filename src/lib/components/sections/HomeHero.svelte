<script lang="ts">
	import { Search } from '@lucide/svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Container from '#lib/components/ui/Container.svelte';
	import HeroBackground from '#lib/components/ui/HeroBackground.svelte';
	import { popularSearches } from '#lib/config/site.js';
</script>

<section
	aria-labelledby="hero-title"
	class="relative isolate overflow-hidden bg-ink pt-[140px] pb-36 text-white md:pb-48 lg:pt-56"
>
	<HeroBackground />
	<Container>
		<div class="max-w-4xl space-y-9 lg:space-y-[60px]">
			<h1
				id="hero-title"
				class="text-4xl leading-tight font-bold text-balance [overflow-wrap:anywhere] uppercase"
			>
				Menjawab Kebutuhan Informasi Publik warga desa Pendil
			</h1>

			<div class="space-y-4">
				<p class="text-base font-medium text-pretty">Temukan informasi yang kamu cari di sini</p>
				<search>
					<form
						action="/article"
						method="get"
						class="flex max-w-[620px] flex-col gap-2 sm:flex-row"
					>
						<div class="relative flex-1">
							<label for="hero-search" class="sr-only">Cari informasi</label>
							<Search
								aria-hidden="true"
								class="pointer-events-none absolute top-1/2 left-4 size-6 -translate-y-1/2 text-muted"
							/>
							<input
								id="hero-search"
								type="search"
								name="q"
								autocomplete="off"
								placeholder="Cari informasi Anda"
								class="min-h-[50px] w-full rounded-lg bg-white pr-3 pl-12 text-xs font-semibold text-ink placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:min-h-[60px] sm:text-base"
							/>
						</div>
						<Button type="submit" class="w-fit bg-primary-400 hover:bg-primary sm:min-h-[60px]">
							Cari
						</Button>
					</form>
				</search>
			</div>

			<div class="space-y-6">
				<p class="text-base font-medium">Pencarian terpopuler</p>
				<ul class="flex gap-2 sm:gap-4">
					{#each popularSearches as term (term)}
						<li class="flex-1 sm:flex-none">
							<a
								href={`/article?q=${encodeURIComponent(term)}`}
								class="flex min-h-11 items-center justify-center rounded-lg bg-primary/10 px-4 text-xs font-semibold text-primary-700 transition-colors hover:bg-primary hover:text-ink focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:min-h-[60px] sm:px-9 sm:text-base"
							>
								{term}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</Container>
</section>
