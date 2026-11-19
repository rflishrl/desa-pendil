<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/cn.js';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className, children }: Props = $props();
</script>

<div
	class={cn(
		'rounded-2xl bg-surface px-6 py-12 shadow-card sm:px-10 lg:px-16 xl:px-[126px]',
		className
	)}
>
	{@render children()}
</div>
