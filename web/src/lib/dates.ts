const monthDay = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
});
const monthDayYear = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

/** "May 30 – June 7, 2025" (collapses the year and month when shared). */
export function formatDateRange(start: Date, end: Date): string {
  if (start.getTime() === end.getTime()) return monthDayYear.format(start);
  const sameYear = start.getFullYear() === end.getFullYear();
  const left = sameYear ? monthDay.format(start) : monthDayYear.format(start);
  return `${left} – ${monthDayYear.format(end)}`;
}

export function year(date: Date): number {
  return date.getFullYear();
}
