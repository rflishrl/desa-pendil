<script lang="ts">
	import { navigating } from '$app/state';
</script>

{#if navigating.to}
	<div
		role="progressbar"
		aria-valuemin={0}
		aria-valuemax={100}
		aria-label="Memuat halaman"
		class="fixed inset-x-0 top-0 z-50 h-[3px] overflow-hidden bg-primary/20"
	>
		<div
			class="h-full w-full origin-left animate-[top-loader_1.2s_ease-in-out_infinite] bg-primary"
		></div>
	</div>
{/if}
