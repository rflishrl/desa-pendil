<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { Stat } from '#lib/types/index.js';

	interface Props {
		stat: Stat;
	}

	let { stat }: Props = $props();
</script>

<div
	class="flex h-full items-center gap-[17px] rounded-2xl bg-white p-[26px] shadow-card lg:gap-6 lg:p-9"
>
	<Icon name={stat.icon} class="size-11 shrink-0 text-primary lg:size-[60px]" />
	<div>
		<p class="text-[17px] font-bold text-black lg:text-2xl">{stat.title}</p>
		<p class="text-xs font-medium text-body lg:text-base">{stat.description}</p>
	</div>
</div>
