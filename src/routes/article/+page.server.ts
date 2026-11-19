import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { getArticles } from '#lib/server/api/index.js';

const PAGE_SIZE = 6;

const articleSearchSchema = z.object({
	q: z.string().optional().catch(''),
	page: z.coerce.number().int().min(1).optional().catch(1)
});

export const load: PageServerLoad = async ({ url }) => {
	const parsed = articleSearchSchema.parse({
		q: url.searchParams.get('q') ?? undefined,
		page: url.searchParams.get('page') ?? undefined
	});

	const all = await getArticles();
	const query = (parsed.q ?? '').trim();
	const filtered = query
		? all.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
		: all;

	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const currentPage = Math.min(Math.max(parsed.page || 1, 1), totalPages);
	const articles = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	return {
		articles,
		query,
		page: currentPage,
		totalPages,
		totalCount: filtered.length
	};
};
