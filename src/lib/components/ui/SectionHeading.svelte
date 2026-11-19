<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/cn.js';

	interface Props {
		id: string;
		title: string;
		eyebrow?: string;
		subtitle?: string;
		action?: Snippet;
		class?: string;
	}

	let { id, title, eyebrow, subtitle, action, class: className }: Props = $props();
</script>

<div
	class={cn(
		'flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left',
		className
	)}
>
	<div>
		{#if eyebrow}
			<p class="mb-2 text-lg font-semibold text-primary-700">{eyebrow}</p>
		{/if}
		<h2 {id} class="text-[32px] leading-tight font-bold text-balance text-ink">
			{title}
		</h2>
		{#if subtitle}
			<div class="mt-2 text-xl font-semibold text-ink lg:text-2xl">{subtitle}</div>
		{/if}
	</div>
	{#if action}
		<div class="shrink-0">
			{@render action()}
		</div>
	{/if}
</div>
