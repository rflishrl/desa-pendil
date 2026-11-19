const longDateFormatter = new Intl.DateTimeFormat('id-ID', {
	weekday: 'long',
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	timeZone: 'Asia/Jakarta'
});

/** Date -> "Kamis, 27 Juni 2023" */
export function formatLongDate(date: Date): string {
	return longDateFormatter.format(date);
}

/** ISO date string -> "Kamis, 27 Juni 2023". Returns the input if invalid. */
export function formatArticleDate(value: string): string {
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? value : longDateFormatter.format(date);
}
