<script lang="ts">
	import Container from '#lib/components/ui/Container.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import { footerGroups, siteConfig, socialLinks } from '#lib/config/site.js';

	const currentYear = new Date().getFullYear();
</script>

<footer class="mt-16 bg-white lg:mt-[100px]">
	<Container class="py-[42px] lg:py-[120px]">
		<div class="grid gap-9 lg:grid-cols-[auto_1fr] lg:justify-between lg:gap-16">
			<div class="flex flex-col gap-9 lg:justify-between">
				<div class="space-y-4">
					<a href="/" class="inline-flex items-center gap-3.5 rounded">
						<img src="/images/dummy-logo-2.png" alt="" width={38} height={47} loading="lazy" />
						<span class="font-logo text-2xl font-bold text-primary-700 italic">
							{siteConfig.name}
						</span>
					</a>
					<address class="max-w-[280px] space-y-1 text-sm font-semibold not-italic">
						<p>{siteConfig.address}</p>
						<p class="text-xs font-medium text-muted">{siteConfig.hours}</p>
					</address>
				</div>
				<ul class="flex gap-4" aria-label="Media sosial">
					{#each socialLinks as social (social.label)}
						<li>
							<a
								href={social.href}
								aria-label={social.label}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex size-[50px] items-center justify-center rounded-lg bg-primary text-ink transition-colors hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:outline-none"
							>
								<Icon name={social.icon} class="size-5" />
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<nav
				aria-label="Peta situs"
				class="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-[60px] lg:justify-self-end"
			>
				{#each footerGroups as group (group.title)}
					<div>
						<h3 class="mb-4 text-xl font-bold text-ink">{group.title}</h3>
						<ul>
							{#each group.links as link (link.href)}
								<li>
									<a
										href={link.href}
										class="inline-flex min-h-9 items-center rounded text-sm font-semibold underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</nav>
		</div>
	</Container>
	<div class="bg-primary py-[26px]">
		<p class="px-9 text-center font-logo text-xl font-medium text-ink">
			© {currentYear}
			{siteConfig.copyright}. All rights reserved.
		</p>
	</div>
</footer>
