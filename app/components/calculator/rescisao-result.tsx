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
          Férias: R$ {result.vacation.toFixed(2)}
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
