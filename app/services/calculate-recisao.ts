import type {
  RescisaoInput,
  RescisaoResult,
} from '@/app/types/recisao';

import { calculateSalaryBalance } from '@/app/utils/calculate-salary-balance';
import { calculateThirteenthSalary } from '@/app/utils/calculate-salary-thirteenth-salary';
import { calculateVacation } from '../utils/calculate-salary-vacation';
import { calculateNoticePeriod } from '../utils/calcule-salary-notice-period';
import { calculateVacationBonus } from '../utils/calculate-salary-vacation-bonus';
import { calculateFgtsPenalty } from '../utils/calculate-salary-fgts';

import { getCompletedYears } from '../utils/get-completed-years';
import { getMonthsWorkedInYear } from '../utils/getMonthsworkedYear';

import { terminationRules } from '../rules/termination-rules';

export function calculateRescisao(
  input: RescisaoInput
): RescisaoResult {

  const rules =
    terminationRules[input.terminationType];

  const workedDays =
    input.terminationDate.getDate();

  const salaryBalance =
    calculateSalaryBalance(
      input.salary,
      workedDays
    );

  const monthsWorked =
    getMonthsWorkedInYear(
      input.admissionDate,
      input.terminationDate
    );

  const yearsWorked =
    getCompletedYears(
      input.admissionDate,
      input.terminationDate
    );

  const thirteenthSalary =
    rules.hasThirteenthSalary
      ? calculateThirteenthSalary(
          input.salary,
          monthsWorked
        )
      : 0;

  const vacation =
    rules.hasProportionalVacation
      ? calculateVacation(
          input.salary,
          monthsWorked
        )
      : 0;

  const vacationBonus =
    calculateVacationBonus(vacation);

  const noticePeriod =
    rules.hasNoticePeriod
      ? calculateNoticePeriod(
          input.salary,
          yearsWorked
        )
      : 0;

  const fgtsPenalty =
    calculateFgtsPenalty(
      input.fgtsBalance,
      rules.fgtsPenaltyRate
    );

  const total =
    salaryBalance +
    thirteenthSalary +
    vacation +
    vacationBonus +
    noticePeriod +
    fgtsPenalty;

  return {
    salaryBalance,
    thirteenthSalary,
    vacation,
    vacationBonus,
    noticePeriod,
    fgtsPenalty,
    total,
  };
}