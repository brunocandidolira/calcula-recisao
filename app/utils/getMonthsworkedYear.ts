export function getMonthsWorkedInYear(
  admissionDate: Date,
  terminationDate: Date
): number {
  const year = terminationDate.getFullYear();
  const startMonth = admissionDate.getFullYear() === year
    ? admissionDate.getMonth()
    : 0;
  let months = 0;

  for (let month = startMonth; month <= terminationDate.getMonth(); month++) {
    const firstDay = admissionDate.getFullYear() === year && admissionDate.getMonth() === month
      ? admissionDate.getDate()
      : 1;
    const lastDay = terminationDate.getMonth() === month
      ? terminationDate.getDate()
      : new Date(year, month + 1, 0).getDate();

    // Limita cada mês ao intervalo efetivamente trabalhado, inclusive as pontas.
    if (lastDay - firstDay + 1 >= 15) {
      months++;
    }
  }

  return months;
}
