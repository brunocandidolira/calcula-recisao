import { calculateSalaryBalance } from '@/app/utils/calculate-salary-balance';
import { calculateFgtsPenalty } from '@/app/utils/calculate-salary-fgts';
import { calculateThirteenthSalary } from '@/app/utils/calculate-salary-thirteenth-salary';
import { calculateVacation } from '@/app/utils/calculate-salary-vacation';
import { calculateVacationBonus } from '@/app/utils/calculate-salary-vacation-bonus';
import { calculateNoticePeriod } from '@/app/utils/calcule-salary-notice-period';

test('saldo de salário proporcional a 10 dias na base de 30 dias', () => {
  expect(calculateSalaryBalance(3000, 10)).toBe(1000);
  expect(calculateSalaryBalance(3000, 0)).toBe(0);
});

test.each([[0.4, 4000], [0.2, 2000], [0, 0]])('multa do FGTS à taxa %s', (rate, expected) => {
  expect(calculateFgtsPenalty(10000, rate)).toBe(expected);
});

test('13º e férias proporcionais a seis meses', () => {
  expect(calculateThirteenthSalary(3000, 6)).toBe(1500);
  expect(calculateVacation(3000, 6)).toBe(1500);
  expect(calculateVacationBonus(1500)).toBe(500);
});

test('valores zerados não geram parcelas adicionais', () => {
  expect(calculateThirteenthSalary(3000, 0)).toBe(0);
  expect(calculateVacation(3000, 0)).toBe(0);
  expect(calculateVacationBonus(0)).toBe(0);
  expect(calculateFgtsPenalty(0, 0.4)).toBe(0);
});

test.each([[0, 3000], [1, 3300], [20, 9000], [30, 9000]])('aviso com %i anos respeita o limite configurado', (years, expected) => {
  expect(calculateNoticePeriod(3000, years)).toBe(expected);
});
