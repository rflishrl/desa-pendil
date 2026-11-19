import { cn } from '#lib/cn.js';

export type ButtonVariant = 'primary' | 'outline' | 'outline-dark' | 'soft';
export type ButtonSize = 'sm' | 'md';

const base =
	'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
	primary: 'bg-primary text-ink hover:bg-primary-600',
	outline:
		'border-2 border-primary text-primary-700 hover:border-primary hover:bg-primary hover:text-ink',
	'outline-dark': 'border-2 border-ink text-ink hover:bg-ink hover:text-white',
	soft: 'bg-primary/10 text-primary-700 hover:bg-primary/25'
};

const sizes: Record<ButtonSize, string> = {
	sm: 'min-h-11 px-4 text-xs lg:min-h-9',
	md: 'min-h-[50px] px-6 text-base sm:px-9'
};

export function buttonStyles({
	variant = 'primary',
	size = 'md',
	className
}: {
	variant?: ButtonVariant;
	size?: ButtonSize;
	className?: string;
} = {}): string {
	return cn(base, variants[variant], sizes[size], className);
}
