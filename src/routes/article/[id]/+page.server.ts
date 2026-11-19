import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getArticle, getArticles } from '#lib/server/api/index.js';

export const load: PageServerLoad = async ({ params }) => {
	const [article, all] = await Promise.all([getArticle(params.id), getArticles()]);

	if (!article) {
		error(404, 'Berita tidak ditemukan');
	}

	const related = all.filter((a) => a.id !== article.id).slice(0, 3);
	return { article, related };
};
