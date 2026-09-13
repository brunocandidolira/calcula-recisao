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
