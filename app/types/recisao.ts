export type TerminationType =
  | 'demissaoSemJustaCausa'
  | 'pedidoDemissao'
  | 'rescisaoIndireta'
  | 'rescisaoPorJustaCausa'
  | 'rescisaoPorAcordo'
  | 'rescisaoPorFalecimento';

export type NoticeType = 'indenizado' | 'trabalhado' | 'dispensado' | 'descontado';

export interface RescisaoInput {
  salary: number;
  admissionDate: Date;
  terminationDate: Date;
  terminationType: TerminationType;
  fgtsBalance: number;
  noticeType?: NoticeType;
  unworkedNoticeDays?: number;
  vacationPeriodStart?: Date;
  acquiredVacationDays?: number;
  doubledVacationDays?: number;
  variableAverage?: number;
  inss?: number;
  irrf?: number;
  otherDeductions?: number;
}

export interface RescisaoResult {
  salaryBalance: number;
  thirteenthSalary: number;
  vacation: number;
  vacationBonus: number;
  noticePeriod: number;
  fgtsPenalty: number;
  total: number;
  grossTotal: number;
  acquiredVacation: number;
  doubledVacation: number;
  noticeDeduction: number;
  deductions: number;
  inss: number;
  irrf: number;
  otherDeductions: number;
  calculationSalary: number;
  projectedEndDate: string;
  noticeDays: number;
  vacationMonths: number;
  warnings: string[];
}