// Blog dates are stored as display strings ("Oct 18, 2026"). Converts one to an
// ISO calendar date ("2026-10-18") for <time dateTime>, meta tags and JSON-LD.
// Uses the local date parts, not toISOString(), so the day never shifts by timezone.
export function toIsoDate(dateString?: string): string | undefined {
  if (!dateString) return undefined;
  if (/^\d{4}-\d{2}-\d{2}/.test(dateString)) return dateString.slice(0, 10);
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return undefined;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Blog dates carry no time of day. Schema.org and article meta want a full timestamp
// with a timezone, so posts are stamped 09:00 IST, e.g. "2026-10-30T09:00:00+05:30".
export function toIsoDateTime(dateString?: string): string | undefined {
  const day = toIsoDate(dateString);
  return day ? `${day}T09:00:00+05:30` : undefined;
}
