<script lang="ts">
	import type { AgendaItem } from '#lib/types/index.js';

	interface Props {
		item: AgendaItem;
	}

	let { item }: Props = $props();
</script>

<article
	class="flex h-full flex-col items-start gap-2 rounded-xl bg-white p-[18px] shadow-card sm:rounded-lg sm:p-6"
>
	<span
		class="inline-flex h-7 items-center rounded-lg bg-primary/10 px-3 text-xs font-semibold text-primary-700 sm:h-9 sm:px-4"
	>
		{item.category}
	</span>
	<h3 class="text-[15px] leading-5 font-bold text-black sm:text-xl sm:leading-[26px]">
		{item.title}
	</h3>
	<div
		class="flex w-full items-center justify-between gap-3 text-xs font-medium text-muted sm:text-sm"
	>
		<p>{item.time}</p>
		<p class="text-right">{item.status}</p>
	</div>
</article>
