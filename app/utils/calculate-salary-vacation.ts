export function calculateVacation(
  salary: number,
  monthsWorked: number
): number {
  return (salary / 12) * monthsWorked;
}