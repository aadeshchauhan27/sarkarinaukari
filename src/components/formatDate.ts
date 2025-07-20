export function formatDate(date: Date | string, locale = 'en-IN', options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' }) {
  if (typeof date === 'string') date = new Date(date);
  return date.toLocaleDateString(locale, options);
} 