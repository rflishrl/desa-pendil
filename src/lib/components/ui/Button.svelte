<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import {
		buttonStyles,
		type ButtonSize,
		type ButtonVariant
	} from '#lib/components/ui/button-styles.js';

	interface Props extends HTMLButtonAttributes {
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		children: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		type = 'button',
		class: className,
		children,
		...rest
	}: Props = $props();
</script>

<button {type} class={buttonStyles({ variant, size, className })} {...rest}>
	{@render children()}
</button>
