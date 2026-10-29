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
