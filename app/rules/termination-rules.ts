import type { TerminationType } from '../types/recisao';

export type TerminationRules = {
  hasThirteenthSalary: boolean;
  hasProportionalVacation: boolean;
  hasNoticePeriod: boolean;
  fgtsPenaltyRate: number;
};

export const terminationRules: Record<
  TerminationType,
  TerminationRules
> = {
  demissaoSemJustaCausa: {
    hasThirteenthSalary: true,
    hasProportionalVacation: true,
    hasNoticePeriod: true,
    fgtsPenaltyRate: 0.4,
  },

  pedidoDemissao: {
    hasThirteenthSalary: true,
    hasProportionalVacation: true,
    hasNoticePeriod: false,
    fgtsPenaltyRate: 0,
  },

  rescisaoIndireta: {
    hasThirteenthSalary: true,
    hasProportionalVacation: true,
    hasNoticePeriod: true,
    fgtsPenaltyRate: 0.4,
  },

  rescisaoPorJustaCausa: {
    hasThirteenthSalary: false,
    hasProportionalVacation: false,
    hasNoticePeriod: false,
    fgtsPenaltyRate: 0,
  },

  rescisaoPorAcordo: {
    hasThirteenthSalary: true,
    hasProportionalVacation: true,
    hasNoticePeriod: true,
    fgtsPenaltyRate: 0.2,
  },

  rescisaoPorFalecimento: {
    hasThirteenthSalary: true,
    hasProportionalVacation: true,
    hasNoticePeriod: false,
    fgtsPenaltyRate: 0,
  },
};