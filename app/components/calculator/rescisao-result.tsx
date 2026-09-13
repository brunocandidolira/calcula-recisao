import type { RescisaoResult } from '@/app/types/recisao';

export function RescisaoResultPanel({ result }: { result: RescisaoResult }) {
  return (
    <div className="result-panel" role="status">
      <h2 className="text-xl font-semibold mb-4">
        Sua estimativa de rescisão
      </h2>

      <div className="space-y-2 text-zinc-300">
        <p>
          Saldo de salário: R${' '}
          {result.salaryBalance.toFixed(2)}
        </p>

        <p>
          13º salário: R${' '}
          {result.thirteenthSalary.toFixed(2)}
        </p>

        <p>
          Férias do período atual: R$ {result.vacation.toFixed(2)}
        </p>

        <p>
          1/3 de férias: R${' '}
          {result.vacationBonus.toFixed(2)}
        </p>

        <p>
          Aviso prévio: R${' '}
          {result.noticePeriod.toFixed(2)}
        </p>

        <p>
          Multa FGTS: R${' '}
          {result.fgtsPenalty.toFixed(2)}
        </p>
      </div>

      <div className="result-details">
        <p>Férias adquiridas simples: R$ {result.acquiredVacation.toFixed(2)}</p>
        <p>Férias em dobro: R$ {result.doubledVacation.toFixed(2)}</p>
        <p>Base salarial com média: R$ {result.calculationSalary.toFixed(2)}</p>
        <p>Avos de férias do período atual: {result.vacationMonths}</p>
        <p>Dias de projeção do aviso: {result.noticeDays}</p>
        <p>Data final considerada para proporcionais: {result.projectedEndDate.split('-').reverse().join('/')}</p>
        <p>Total bruto estimado: R$ {result.grossTotal.toFixed(2)}</p>
        <p>Desconto de aviso: R$ {result.noticeDeduction.toFixed(2)}</p>
        <p>INSS informado: R$ {result.inss.toFixed(2)}</p>
        <p>IRRF informado: R$ {result.irrf.toFixed(2)}</p>
        <p>Outros descontos: R$ {result.otherDeductions.toFixed(2)}</p>
        <p>Total de descontos: R$ {result.deductions.toFixed(2)}</p>
      </div>
      <ul className="result-warnings">{result.warnings.map(warning => <li key={warning}>{warning}</li>)}</ul>
      <p className="mt-5 text-2xl font-bold">
        Total estimado: R$ {result.total.toFixed(2)}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        Use este resultado como ponto de partida. Descontos, verbas
        pendentes e particularidades do contrato podem alterar o valor
        final. Confirme os valores com um contador ou profissional
        habilitado antes de tomar decisões sobre um acordo.
      </p>
    </div>
  );
}
