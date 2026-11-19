<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { Feature } from '#lib/types/index.js';

	interface Props {
		feature: Feature;
	}

	let { feature }: Props = $props();
</script>

<div class="flex h-full flex-col gap-6 rounded-2xl bg-white p-9 shadow-card">
	<Icon name={feature.icon} class="size-[60px] text-primary lg:size-[60px]" />
	<div class="space-y-4">
		<h3 class="text-xl font-bold text-black lg:text-2xl">{feature.title}</h3>
		<p class="text-sm leading-5 text-muted">{feature.description}</p>
	</div>
</div>
