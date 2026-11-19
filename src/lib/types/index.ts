export type VillageIconName = 'family' | 'health' | 'city';

export type SocialIconName = 'facebook' | 'x' | 'instagram' | 'youtube';

export interface Article {
	id: string;
	title: string;
	/** ISO date string */
	date: string;
	image: string;
	thumbImage?: string;
	/** Body text, when the API provides it. */
	content?: string;
	author?: string;
}

export interface Official {
	name: string;
	position: string;
	image: string;
}

export interface Stat {
	icon: VillageIconName;
	title: string;
	description: string;
}

export interface Feature {
	icon: VillageIconName;
	title: string;
	description: string;
}

export interface CultureItem {
	title: string;
	description: string;
	image: string;
}

export interface AgendaItem {
	id: number;
	category: string;
	title: string;
	time: string;
	status: string;
}

export interface GalleryImage {
	src: string;
	thumbSrc?: string;
	alt: string;
}

export interface NavItem {
	label: string;
	href: string;
}
