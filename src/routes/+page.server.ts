import type { PageServerLoad } from './$types';
import { getArticles } from '#lib/server/api/index.js';

export const load: PageServerLoad = () => {
	return {
		articlesPromise: getArticles()
	};
};
