<script lang="ts">
	import { Share2 } from '@lucide/svelte';
	import Button from '#lib/components/ui/Button.svelte';

	interface Props {
		title: string;
	}

	let { title }: Props = $props();
	let status = $state('');

	async function handleShare(): Promise<void> {
		const url = window.location.href;
		try {
			if (navigator.share) {
				await navigator.share({ title, url });
				return;
			}
			await navigator.clipboard.writeText(url);
			status = 'Tautan disalin';
		} catch {
			status = '';
		}
	}
</script>

<div class="flex flex-col items-center gap-2">
	<Button variant="outline" onclick={handleShare}>
		Bagikan
		<Share2 class="size-6" aria-hidden="true" />
	</Button>
	<p role="status" aria-live="polite" class="min-h-5 text-sm text-muted">
		{status}
	</p>
</div>
