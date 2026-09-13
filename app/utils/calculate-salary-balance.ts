export function calculateSalaryBalance(
  salary: number,
  workedDays: number
): number {
  const dailySalary = salary / 30;

  return dailySalary * workedDays;
}