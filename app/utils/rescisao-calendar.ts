export function addMonths(date: Date, months: number): Date {
  const first = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  first.setDate(Math.min(date.getDate(), lastDay));
  return first;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  result.setDate(result.getDate() + days);
  return result;
}

export function calendarDays(start: Date, end: Date): number {
  return Math.round((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / 86400000);
}

export function vacationStart(admission: Date, end: Date): Date {
  let years = end.getFullYear() - admission.getFullYear();
  if (addMonths(admission, years * 12) > end) years--;
  return addMonths(admission, years * 12);
}

// Meses de serviço ancorados no início do período, não no ano civil.
export function vacationMonths(start: Date, end: Date): number {
  const exclusiveEnd = addDays(end, 1);
  let months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  if (addMonths(start, months) > exclusiveEnd) months--;
  while (addMonths(start, months + 1) <= exclusiveEnd) months++;
  return months + (calendarDays(addMonths(start, months), exclusiveEnd) >= 15 ? 1 : 0);
}

export function salaryDays(admission: Date, end: Date): number {
  const first = admission.getFullYear() === end.getFullYear() && admission.getMonth() === end.getMonth() ? admission.getDate() : 1;
  const last = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
  if (first === 1 && end.getDate() === last) return 30;
  return Math.min(30, end.getDate() - first + 1);
}

export function localDateString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
