export function getCompletedYears(
  admissionDate: Date,
  terminationDate: Date
): number {
  let years =
    terminationDate.getFullYear() -
    admissionDate.getFullYear();

  const anniversary = new Date(
    terminationDate.getFullYear(),
    admissionDate.getMonth(),
    admissionDate.getDate()
  );

  if (terminationDate < anniversary) {
    years--;
  }

  return Math.max(years, 0);
}