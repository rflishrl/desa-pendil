<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/cn.js';

	interface Props {
		size?: 'default' | 'wide';
		class?: string;
		children: Snippet;
	}

	let { size = 'default', class: className, children }: Props = $props();
</script>

<div
	class={cn(
		'mx-auto w-full',
		size === 'default'
			? 'max-w-[1328px] px-9 sm:px-8 lg:px-10'
			: 'max-w-[1608px] px-[25px] sm:px-8 xl:px-[60px]',
		className
	)}
>
	{@render children()}
</div>
