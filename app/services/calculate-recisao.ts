import type { RescisaoInput, RescisaoResult } from '@/app/types/recisao';
import { rescisaoInputSchema } from '@/app/validation/rescisao-input';
import { terminationRules } from '@/app/rules/termination-rules';
import { calculateSalaryBalance } from '@/app/utils/calculate-salary-balance';
import { calculateThirteenthSalary } from '@/app/utils/calculate-salary-thirteenth-salary';
import { calculateVacation } from '@/app/utils/calculate-salary-vacation';
import { calculateVacationBonus } from '@/app/utils/calculate-salary-vacation-bonus';
import { calculateNoticePeriod } from '@/app/utils/calcule-salary-notice-period';
import { calculateFgtsPenalty } from '@/app/utils/calculate-salary-fgts';
import { getCompletedYears } from '@/app/utils/get-completed-years';
import { getMonthsWorkedInYear } from '@/app/utils/getMonthsworkedYear';
import { addDays, addMonths, localDateString, salaryDays, vacationMonths, vacationStart } from '@/app/utils/rescisao-calendar';

const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function calculateRescisao(input: RescisaoInput): RescisaoResult {
  const data = rescisaoInputSchema.parse(input);
  const rules = terminationRules[data.terminationType];
  const noticeType = data.noticeType ?? (rules.hasNoticePeriod ? 'indenizado' : 'dispensado');
  const calculationSalary = round(data.salary + data.variableAverage);
  const years = getCompletedYears(data.admissionDate, data.terminationDate);
  const noticeDays = noticeType === 'indenizado' && rules.hasNoticePeriod ? 30 + Math.min(years * 3, 60) : 0;
  const projectedEnd = addDays(data.terminationDate, noticeDays);
  const periodStart = data.vacationPeriodStart ?? vacationStart(data.admissionDate, data.terminationDate);
  if (addMonths(periodStart, 12) <= data.terminationDate) {
    throw new Error('Informe o início do período aquisitivo atual. Lance períodos anteriores nos dias de férias adquiridas.');
  }
  const months = vacationMonths(periodStart, projectedEnd);
  let thirteenthMonths = 0;
  for (let year = data.terminationDate.getFullYear(); year <= projectedEnd.getFullYear(); year++) {
    const end = year === projectedEnd.getFullYear() ? projectedEnd : new Date(year, 11, 31);
    thirteenthMonths += getMonthsWorkedInYear(data.admissionDate, end);
  }
  const salaryBalance = round(calculateSalaryBalance(calculationSalary, salaryDays(data.admissionDate, data.terminationDate)));
  const thirteenthSalary = rules.hasThirteenthSalary ? round(calculateThirteenthSalary(calculationSalary, thirteenthMonths)) : 0;
  const vacation = rules.hasProportionalVacation ? round(calculateVacation(calculationSalary, months)) : 0;
  const acquiredVacation = round(calculationSalary / 30 * data.acquiredVacationDays);
  const doubledVacation = round(calculationSalary / 30 * data.doubledVacationDays * 2);
  const vacationBonus = round(calculateVacationBonus(vacation + acquiredVacation + doubledVacation));
  const noticePeriod = noticeDays ? round(calculateNoticePeriod(calculationSalary, years) * (data.terminationType === 'rescisaoPorAcordo' ? 0.5 : 1)) : 0;
  const fgtsPenalty = round(calculateFgtsPenalty(data.fgtsBalance, rules.fgtsPenaltyRate));
  const noticeDeduction = noticeType === 'descontado' ? round(calculationSalary / 30 * data.unworkedNoticeDays) : 0;
  const inss = round(data.inss), irrf = round(data.irrf), otherDeductions = round(data.otherDeductions);
  const deductions = round(noticeDeduction + inss + irrf + otherDeductions);
  const grossTotal = round(salaryBalance + thirteenthSalary + vacation + acquiredVacation + doubledVacation + vacationBonus + noticePeriod + fgtsPenalty);
  const warnings = [
    'INSS e IRRF não são apurados automaticamente: apenas os valores informados foram descontados.',
    'O total inclui a multa do FGTS, mas não o saldo para saque. O recebimento pode ocorrer por canais diferentes.',
  ];
  if (!data.vacationPeriodStart) warnings.push('Período aquisitivo estimado pelo aniversário da admissão. Confira reinícios e férias coletivas.');
  if (noticeDays) warnings.push('13º e férias incluem a projeção integral do prazo de aviso. Confira a data projetada, especialmente em acordos.');
  if (deductions > grossTotal) warnings.push('Os descontos superam as parcelas estimadas. O saldo negativo não representa uma cobrança: confira os dados.');
  return {
    salaryBalance, thirteenthSalary, vacation, acquiredVacation, doubledVacation, vacationBonus,
    noticePeriod, fgtsPenalty, noticeDeduction, inss, irrf, otherDeductions, deductions,
    grossTotal, total: round(grossTotal - deductions), calculationSalary,
    projectedEndDate: localDateString(projectedEnd), noticeDays, vacationMonths: months, warnings,
  };
}
