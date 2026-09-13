export function calculateNoticePeriod(
  salary: number,
  yearsWorked: number
): number {
  const extraDays = Math.min(yearsWorked * 3, 60);

  const noticeDays = 30 + extraDays;

  const dailySalary = salary / 30;

  return dailySalary * noticeDays;
}