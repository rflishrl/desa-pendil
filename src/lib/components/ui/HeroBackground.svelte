<script lang="ts">
	import MediaImage from '#lib/components/ui/MediaImage.svelte';
</script>

<MediaImage
	src="/images/bg-hero-new.jpg"
	variant="full"
	priority="high"
	alt=""
	width={1024}
	height={576}
	aria-hidden="true"
	class="absolute inset-0 -z-20 h-full w-full object-cover"
/>
<div aria-hidden="true" class="absolute inset-0 -z-10 bg-hero-overlay"></div>
