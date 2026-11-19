import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { galleryImages as placeholderImages } from '#lib/data/village.js';
import { getGalleryImages } from '#lib/server/api/index.js';

const PAGE_SIZE = 6;

const gallerySearchSchema = z.object({
	page: z.coerce.number().int().min(1).optional().catch(1)
});

export const load: PageServerLoad = async ({ url }) => {
	const parsed = gallerySearchSchema.parse({
		page: url.searchParams.get('page') ?? undefined
	});
	const fetched = await getGalleryImages();
	const allImages = fetched ?? placeholderImages;
	const totalPages = Math.max(1, Math.ceil(allImages.length / PAGE_SIZE));
	const currentPage = Math.min(Math.max(parsed.page || 1, 1), totalPages);
	const images = allImages.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	return {
		images,
		page: currentPage,
		totalPages
	};
};
