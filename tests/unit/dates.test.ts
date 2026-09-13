import { getMonthsWorkedInYear } from '@/app/utils/getMonthsworkedYear';
import { getCompletedYears } from '@/app/utils/get-completed-years';

const date = (value: string) => new Date(`${value}T00:00:00`);

describe('meses com pelo menos 15 dias trabalhados no ano', () => {
  test.each([
    ['2026-01-01', '2026-12-31', 12],
    ['2024-06-01', '2026-03-15', 3],
    ['2026-01-17', '2026-03-14', 2],
    ['2026-01-18', '2026-03-14', 1],
    ['2026-01-10', '2026-01-23', 0],
    ['2026-01-10', '2026-01-24', 1],
    ['2026-01-20', '2026-01-31', 0],
    ['2024-02-15', '2024-02-29', 1],
    ['2025-02-15', '2025-02-28', 0],
  ])('%s até %s = %i meses', (start, end, expected) => {
    expect(getMonthsWorkedInYear(date(start), date(end))).toBe(expected);
  });
});

describe('anos completos de contrato', () => {
  test.each([
    ['2024-09-13', '2026-09-12', 1],
    ['2024-09-13', '2026-09-13', 2],
    ['2026-01-01', '2026-01-01', 0],
    ['2026-09-13', '2026-01-01', 0],
  ])('%s até %s = %i anos', (start, end, expected) => {
    expect(getCompletedYears(date(start), date(end))).toBe(expected);
  });
});
