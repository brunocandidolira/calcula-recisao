import { calculateRescisao } from '@/app/services/calculate-recisao';
import type { RescisaoInput, TerminationType } from '@/app/types/recisao';

const input: RescisaoInput = {
  salary: 3000,
  admissionDate: new Date(2026, 0, 1),
  terminationDate: new Date(2026, 5, 15),
  terminationType: 'demissaoSemJustaCausa',
  fgtsBalance: 10000,
  noticeType: 'trabalhado',
};

test('integra as parcelas e soma o total da estimativa', () => {
  expect(calculateRescisao(input)).toMatchObject({
    salaryBalance: 1500, thirteenthSalary: 1500, vacation: 1500,
    vacationBonus: 500, noticePeriod: 0, fgtsPenalty: 4000, total: 9000,
  });
});

// Caracterização das parcelas previstas pelo modelo atual, não certificação jurídica.
test.each<[TerminationType, number, number]>([
  ['demissaoSemJustaCausa', 1500, 4000],
  ['pedidoDemissao', 1500, 0],
  ['rescisaoIndireta', 1500, 4000],
  ['rescisaoPorJustaCausa', 0, 0],
  ['rescisaoPorAcordo', 1500, 2000],
  ['rescisaoPorFalecimento', 1500, 0],
])('%s aplica as parcelas proporcionais e a taxa de FGTS configuradas', (terminationType, proportional, penalty) => {
  const result = calculateRescisao({ ...input, terminationType });
  expect(result.thirteenthSalary).toBe(proportional);
  expect(result.vacation).toBe(proportional);
  expect(result.vacationBonus).toBeCloseTo(proportional / 3);
  expect(result.fgtsPenalty).toBe(penalty);
});

test.each<TerminationType>(['pedidoDemissao', 'rescisaoPorJustaCausa', 'rescisaoPorFalecimento'])('%s não inclui aviso prévio no modelo atual', (terminationType) => {
  expect(calculateRescisao({ ...input, terminationType }).noticePeriod).toBe(0);
});
