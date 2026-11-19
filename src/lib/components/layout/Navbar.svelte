<script lang="ts">
	import { page } from '$app/state';
	import { Menu, X } from '@lucide/svelte';
	import { cn } from '#lib/cn.js';
	import { mainNav, siteConfig } from '#lib/config/site.js';

	const focusRing =
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0';

	let open = $state(false);
	let dialogEl = $state<HTMLDialogElement | null>(null);
	let triggerEl = $state<HTMLButtonElement | null>(null);

	let pathname = $derived(page.url.pathname);

	function isActive(href: string): boolean {
		return href === '/' ? pathname === '/' : pathname.startsWith(href);
	}

	function openMenu(): void {
		open = true;
		if (dialogEl && !dialogEl.open) {
			dialogEl.showModal();
		}
	}

	function closeMenu(): void {
		open = false;
		if (dialogEl?.open) {
			dialogEl.close();
		}
		triggerEl?.focus();
	}

	$effect(() => {
		void pathname;
		if (dialogEl?.open) {
			dialogEl.close();
		}
		open = false;
	});
</script>

<header class="absolute inset-x-0 top-0 z-30 bg-black/15 backdrop-blur-xs">
	<div
		class="mx-auto flex h-20 w-full max-w-[1608px] items-center justify-between px-9 xl:px-[60px]"
	>
		<a
			href="/"
			class={cn(
				'rounded-sm font-logo text-lg font-bold text-primary-100 italic lg:font-sans lg:text-2xl lg:font-black lg:not-italic',
				focusRing
			)}
		>
			{siteConfig.name}
		</a>

		<nav aria-label="Navigasi utama" class="hidden lg:block">
			<ul class="flex items-center gap-4">
				{#each mainNav as item (item.href)}
					<li>
						<a
							href={item.href}
							aria-current={isActive(item.href) ? 'page' : undefined}
							class={cn(
								'inline-flex min-h-[50px] items-center rounded-lg px-6 text-base font-semibold transition-colors duration-200 hover:bg-white/10 hover:text-primary xl:px-9',
								focusRing,
								isActive(item.href) ? 'bg-white/10 text-primary' : 'text-white'
							)}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<button
			bind:this={triggerEl}
			type="button"
			onclick={openMenu}
			aria-label="Buka menu navigasi"
			aria-expanded={open}
			aria-controls="mobile-nav-dialog"
			aria-haspopup="dialog"
			class={cn(
				'inline-flex size-11 cursor-pointer items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary/20 lg:hidden',
				focusRing
			)}
		>
			<Menu class="size-5" aria-hidden="true" />
		</button>
	</div>

	<dialog
		bind:this={dialogEl}
		id="mobile-nav-dialog"
		aria-labelledby="mobile-nav-title"
		onclose={() => {
			open = false;
		}}
		onclick={(e) => {
			if (e.target === dialogEl) closeMenu();
		}}
		class="fixed inset-x-[17px] top-[22px] m-0 w-[calc(100%-34px)] max-w-none rounded-xl bg-white p-3 text-ink shadow-card-hover backdrop:bg-black/40 lg:hidden"
	>
		<h2 id="mobile-nav-title" class="sr-only">Navigasi Seluler Desa Pendil</h2>
		<div class="mb-2 flex items-center justify-between pl-3">
			<span class="flex items-center gap-3 text-base font-bold">
				<img src="/images/dummy-logo.png" alt="" width={28} height={28} loading="lazy" />
				{siteConfig.name}
			</span>
			<button
				type="button"
				onclick={closeMenu}
				aria-label="Tutup menu navigasi"
				class={cn(
					'inline-flex size-11 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-primary/10',
					focusRing
				)}
			>
				<X class="size-6" aria-hidden="true" />
			</button>
		</div>
		<nav aria-label="Navigasi seluler">
			<ul class="space-y-2">
				{#each mainNav as item (item.href)}
					<li>
						<a
							href={item.href}
							onclick={closeMenu}
							aria-current={isActive(item.href) ? 'page' : undefined}
							class={cn(
								'flex min-h-[50px] items-center rounded-lg px-6 text-base font-semibold text-muted transition-colors hover:bg-primary/10',
								focusRing,
								isActive(item.href) && 'bg-primary/10 text-primary-700'
							)}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</dialog>
</header>
