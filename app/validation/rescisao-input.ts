import { z } from 'zod';

const money = z.number().finite().min(0).max(100_000_000);
const date = z.date().refine(value => value.getFullYear() >= 1900 && value.getFullYear() <= 2100, 'Use datas entre 1900 e 2100.');
export const rescisaoInputSchema = z.object({
  salary: money, fgtsBalance: money,
  admissionDate: date, terminationDate: date,
  terminationType: z.enum(['demissaoSemJustaCausa', 'pedidoDemissao', 'rescisaoIndireta', 'rescisaoPorJustaCausa', 'rescisaoPorAcordo', 'rescisaoPorFalecimento']),
  noticeType: z.enum(['indenizado', 'trabalhado', 'dispensado', 'descontado']).optional(),
  unworkedNoticeDays: z.number().int().min(0).max(30).default(0),
  vacationPeriodStart: date.optional(),
  acquiredVacationDays: z.number().int().min(0).max(3600).default(0),
  doubledVacationDays: z.number().int().min(0).max(3600).default(0),
  variableAverage: money.default(0), inss: money.default(0), irrf: money.default(0), otherDeductions: money.default(0),
}).superRefine((data, ctx) => {
  const issue = (path: string, message: string) => ctx.addIssue({ code: 'custom', path: [path], message });
  if (data.terminationDate < data.admissionDate) issue('terminationDate', 'O desligamento não pode anteceder a admissão.');
  if (data.vacationPeriodStart && (data.vacationPeriodStart < data.admissionDate || data.vacationPeriodStart > data.terminationDate)) {
    issue('vacationPeriodStart', 'O período de férias deve começar entre a admissão e o desligamento.');
  }
  if (data.noticeType === 'descontado' && data.terminationType !== 'pedidoDemissao') issue('noticeType', 'Desconto de aviso só está disponível para pedido de demissão.');
  if (data.noticeType === 'indenizado' && ['pedidoDemissao', 'rescisaoPorJustaCausa', 'rescisaoPorFalecimento'].includes(data.terminationType)) issue('noticeType', 'Esta modalidade não admite aviso indenizado a receber no simulador.');
  if (data.unworkedNoticeDays > 0 && data.noticeType !== 'descontado') issue('unworkedNoticeDays', 'Selecione aviso descontado para informar dias não cumpridos.');
});
