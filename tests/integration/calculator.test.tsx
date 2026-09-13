import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RescisaoCalculator } from '@/app/components/calculator/rescisao-calculator';

async function fillForm(terminationDate = '2026-01-15') {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Salário bruto'), '3000');
  fireEvent.change(screen.getByLabelText('Data de admissão'), { target: { value: '2026-01-01' } });
  fireEvent.change(screen.getByLabelText('Data de desligamento'), { target: { value: terminationDate } });
  await user.selectOptions(screen.getByLabelText('Tipo de rescisão'), 'pedidoDemissao');
  await user.type(screen.getByLabelText('Saldo FGTS'), '10000');
  return user;
}

test('simula com as datas locais escolhidas, mostra parcelas e limpa o formulário', async () => {
  render(<RescisaoCalculator />);
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  const user = await fillForm();
  await user.click(screen.getByRole('button', { name: 'Simular minha rescisão' }));
  const result = within(screen.getByRole('status'));
  expect(result.getByText('Saldo de salário: R$ 1500.00')).toBeInTheDocument();
  expect(result.getByText('13º salário: R$ 250.00')).toBeInTheDocument();
  expect(result.getByText('Total estimado: R$ 2083.33')).toBeInTheDocument();
  expect(result.getByText(/Confirme os valores com um contador/)).toBeInTheDocument();
  expect(screen.getByLabelText('Salário bruto')).toHaveValue(null);
  expect(screen.getByLabelText('Data de admissão')).toHaveValue('');
  expect(screen.getByLabelText('Data de desligamento')).toHaveValue('');
  expect(screen.getByLabelText('Saldo FGTS')).toHaveValue(null);
  expect(screen.getByLabelText('Tipo de rescisão')).toHaveValue('demissaoSemJustaCausa');
});

test('não calcula sem preencher os campos obrigatórios', async () => {
  render(<RescisaoCalculator />);
  await userEvent.setup().click(screen.getByRole('button', { name: 'Simular minha rescisão' }));
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  expect(screen.getByLabelText('Salário bruto')).toBeInvalid();
});

test('não calcula quando o desligamento antecede a admissão', async () => {
  render(<RescisaoCalculator />);
  const user = await fillForm('2025-12-31');
  expect(screen.getByLabelText('Data de desligamento')).toBeInvalid();
  await user.click(screen.getByRole('button', { name: 'Simular minha rescisão' }));
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});

test('inclui dados complementares e descontos informados no resultado', async () => {
  render(<RescisaoCalculator />);
  const user = await fillForm();
  await user.type(screen.getByLabelText('Média mensal de verbas variáveis (R$)'), '600');
  await user.type(screen.getByLabelText('Dias de férias adquiridas a pagar (simples)'), '15');
  await user.type(screen.getByLabelText('Dias de férias a pagar em dobro'), '30');
  await user.type(screen.getByLabelText('INSS informado (R$)'), '100');
  await user.type(screen.getByLabelText('IRRF informado (R$)'), '50');
  await user.type(screen.getByLabelText('Outros descontos e adiantamentos (R$)'), '25');
  fireEvent.change(screen.getByLabelText('Início do período aquisitivo atual'), { target: { value: '2026-01-01' } });
  await user.selectOptions(screen.getByLabelText('Como será o aviso prévio?'), 'descontado');
  await user.type(screen.getByLabelText('Dias de aviso não cumpridos a descontar'), '10');
  await user.click(screen.getByRole('button', { name: 'Simular minha rescisão' }));
  expect(screen.getByText('Total de descontos: R$ 1375.00')).toBeInTheDocument();
  expect(screen.getByText('Férias adquiridas simples: R$ 1800.00')).toBeInTheDocument();
  expect(screen.getByText('Férias em dobro: R$ 7200.00')).toBeInTheDocument();
});

test('mostra erro de modalidade incompatível e permite corrigir sem apagar dados', async () => {
  render(<RescisaoCalculator />);
  const user = await fillForm();
  await user.selectOptions(screen.getByLabelText('Como será o aviso prévio?'), 'indenizado');
  await user.click(screen.getByRole('button', { name: 'Simular minha rescisão' }));
  expect(screen.getByRole('alert')).toHaveTextContent('aviso compatível');
  expect(screen.getByLabelText('Salário bruto')).toHaveValue(3000);
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  await user.selectOptions(screen.getByLabelText('Como será o aviso prévio?'), 'dispensado');
  await user.click(screen.getByRole('button', { name: 'Simular minha rescisão' }));
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toBeInTheDocument();
});

test('mostra erro de período antigo antes de exibir estimativa', async () => {
  render(<RescisaoCalculator />);
  const user = await fillForm();
  fireEvent.change(screen.getByLabelText('Data de admissão'), { target: { value: '2024-01-01' } });
  fireEvent.change(screen.getByLabelText('Início do período aquisitivo atual'), { target: { value: '2024-01-01' } });
  await user.click(screen.getByRole('button', { name: 'Simular minha rescisão' }));
  expect(screen.getByRole('alert')).toHaveTextContent('período aquisitivo atual');
});
