export type TerminationType =
  | 'demissaoSemJustaCausa'
  | 'pedidoDemissao'
  | 'rescisaoIndireta'
  | 'rescisaoPorJustaCausa'
  | 'rescisaoPorAcordo'
  | 'rescisaoPorFalecimento';

export interface RescisaoInput {
  salary: number;
  admissionDate: Date;
  terminationDate: Date;
  terminationType: TerminationType;
  fgtsBalance: number;
}

export interface RescisaoResult {
  salaryBalance: number;
  thirteenthSalary: number;
  vacation: number;
  vacationBonus: number;
  noticePeriod: number;
  fgtsPenalty: number;
  total: number;
}