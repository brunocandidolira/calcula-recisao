export function getMonthsWorkedInYear(
  admissionDate: Date,
  terminationDate: Date
): number {

  const terminationYear =
    terminationDate.getFullYear();

  const admissionYear =
    admissionDate.getFullYear();

  const startMonth =
    admissionYear === terminationYear
      ? admissionDate.getMonth()
      : 0;

  const endMonth =
    terminationDate.getMonth();

  let months =
    endMonth - startMonth + 1;

  // Se foi admitido neste mesmo ano,
  // verifica se trabalhou pelo menos 15 dias
  // no mês da admissão.
  if (admissionYear === terminationYear) {
    const daysWorkedInAdmissionMonth =
      new Date(
        admissionYear,
        admissionDate.getMonth() + 1,
        0
      ).getDate() -
      admissionDate.getDate() +
      1;

    if (daysWorkedInAdmissionMonth < 15) {
      months--;
    }
  }

  // Mês da demissão só conta se
  // houver pelo menos 15 dias.
  if (terminationDate.getDate() < 15) {
    months--;
  }

  return Math.max(months, 0);
}