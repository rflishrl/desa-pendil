import type { PageServerLoad } from './$types';
import { galleryImages as placeholderImages } from '#lib/data/village.js';
import { getGalleryImages } from '#lib/server/api/index.js';

export const load: PageServerLoad = async () => {
	const images = await getGalleryImages();
	return {
		galleryImages: images ?? placeholderImages
	};
};
