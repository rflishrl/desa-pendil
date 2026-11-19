import type { RequestHandler } from './$types';
import { handleRevalidate } from '#lib/server/revalidate.js';

export const POST: RequestHandler = ({ request }) => {
	return handleRevalidate(request);
};
