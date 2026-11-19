<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import {
		buttonStyles,
		type ButtonSize,
		type ButtonVariant
	} from '#lib/components/ui/button-styles.js';

	interface Props extends HTMLAnchorAttributes {
		href: string;
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		children: Snippet;
	}

	let {
		href,
		variant = 'primary',
		size = 'md',
		class: className,
		children,
		...rest
	}: Props = $props();
</script>

<a {href} class={buttonStyles({ variant, size, className })} {...rest}>
	{@render children()}
</a>
