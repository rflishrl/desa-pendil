const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

const longDateFormatter = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

/** "2023-06-27T10:00:00Z" -> "27 Juni 2023". Returns the input if it is not a valid date. */
export function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
}

/** Date -> "Kamis, 27 Juni 2023" */
export function formatLongDate(date: Date): string {
  return longDateFormatter.format(date);
}
