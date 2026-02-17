const SWEDISH_MONTHS = [
  "jan", "feb", "mar", "apr", "maj", "jun",
  "jul", "aug", "sep", "okt", "nov", "dec",
] as const;

/**
 * Formaterar ISO-datum (YYYY-MM-DD) till visningsformat, t.ex. "18 feb 2026".
 * Andra datumsträngar (t.ex. "2025-09") returneras oförändrade.
 */
export function formatGigDate(dateStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  const [y, m, d] = dateStr.split("-");
  const monthIndex = parseInt(m, 10) - 1;
  const month = SWEDISH_MONTHS[monthIndex] ?? dateStr;
  return `${parseInt(d, 10)} ${month} ${y}`;
}
