<script lang="ts">
	import { cn } from '#lib/cn.js';

	interface Props {
		title: string;
		description?: string;
		class?: string;
	}

	let { title, description, class: className }: Props = $props();
</script>

<div
	class={cn('rounded-xl border border-dashed border-muted/40 px-6 py-12 text-center', className)}
>
	<p class="text-lg font-bold">{title}</p>
	{#if description}
		<p class="mt-1 text-muted">{description}</p>
	{/if}
</div>
