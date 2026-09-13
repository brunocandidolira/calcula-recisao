import type { NoticeType, TerminationType } from '@/app/types/recisao';
import type { useRescisaoCalculator } from '@/app/hooks/use-rescisao-calculator';

type RescisaoFormProps = Omit<ReturnType<typeof useRescisaoCalculator>, 'result' | 'error'>;

export function RescisaoForm({
  salary, setSalary, admissionDate, setAdmissionDate,
  terminationDate, setTerminationDate, terminationType, setTerminationType,
  fgtsBalance, setFgtsBalance, handleCalculate,
  noticeType, setNoticeType, vacationPeriodStart, setVacationPeriodStart,
  adjustments, updateAdjustment,
}: RescisaoFormProps) {
  return (
    <form className="calculator-form" onSubmit={(event) => { event.preventDefault(); handleCalculate(); }}>
      <div>
        <label htmlFor="salary" className="block mb-2 text-sm">
          Salário bruto
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          id="salary"
          required
          value={salary}
          onChange={(event) => setSalary(event.target.value)}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 p-3 outline-none"
          placeholder="Ex: 3000"
        />
      </div>

      <div>
        <label htmlFor="admission" className="block mb-2 text-sm">
          Data de admissão
        </label>

        <input
          type="date"
          id="admission"
          required
          value={admissionDate}
          onChange={(event) => setAdmissionDate(event.target.value)}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 p-3 outline-none"
        />
      </div>

      <div>
        <label htmlFor="termination" className="block mb-2 text-sm">
          Data de desligamento
        </label>

        <input
          type="date"
          min={admissionDate || undefined}
          id="termination"
          required
          value={terminationDate}
          onChange={(event) => setTerminationDate(event.target.value)}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 p-3 outline-none"
        />
      </div>

      <div>
        <label htmlFor="type" className="block mb-2 text-sm">
          Tipo de rescisão
        </label>

        <select
          id="type"
          required
          value={terminationType}
          onChange={(event) =>
            setTerminationType(
              event.target.value as TerminationType
            )
          }
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 p-3"
        >
          <option value="demissaoSemJustaCausa">
            Demissão sem justa causa
          </option>

          <option value="pedidoDemissao">
            Pedido de demissão
          </option>

          <option value="rescisaoIndireta">
            Rescisão indireta
          </option>

          <option value="rescisaoPorJustaCausa">
            Justa causa
          </option>

          <option value="rescisaoPorAcordo">
            Rescisão por acordo
          </option>

          <option value="rescisaoPorFalecimento">
            Falecimento
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="fgts" className="block mb-2 text-sm">
          Saldo FGTS
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          id="fgts"
          required
          value={fgtsBalance}
          onChange={(event) => setFgtsBalance(event.target.value)}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 p-3"
          placeholder="Ex: 10000"
        />
      </div>

      <fieldset className="calculator-adjustments">
        <legend>Detalhes do contrato</legend>
        <label htmlFor="notice-type">Como será o aviso prévio?</label>
        <select id="notice-type" value={noticeType} onChange={event => setNoticeType(event.target.value as NoticeType | '')}>
          <option value="">Padrão: indenizado quando devido</option>
          <option value="indenizado">Indenizado a receber</option>
          <option value="trabalhado">Trabalhado (incluído nas datas)</option>
          <option value="dispensado">Dispensado, sem pagamento nem desconto</option>
          <option value="descontado">Não cumprido no pedido de demissão</option>
        </select>
        <p>Informe o último dia efetivo do contrato. No aviso trabalhado, inclua seu cumprimento na data de desligamento. No indenizado, a projeção será acrescentada uma única vez.</p>
        <label htmlFor="vacation-period">Início do período aquisitivo atual</label>
        <input id="vacation-period" type="date" min={admissionDate || undefined} max={terminationDate || undefined}
          value={vacationPeriodStart} onChange={event => setVacationPeriodStart(event.target.value)} />
        <p>Deixe vazio para usar o último aniversário da admissão. Confira com o RH se houve reinício do período. Férias anteriores já pagas ou gozadas não devem ser lançadas abaixo.</p>
        {([
          ['variableAverage', 'Média mensal de verbas variáveis (R$)', 100000000, '0.01'],
          ['acquiredVacationDays', 'Dias de férias adquiridas a pagar (simples)', 3600, '1'],
          ['doubledVacationDays', 'Dias de férias a pagar em dobro', 3600, '1'],
          ['unworkedNoticeDays', 'Dias de aviso não cumpridos a descontar', 30, '1'],
          ['inss', 'INSS informado (R$)', 100000000, '0.01'],
          ['irrf', 'IRRF informado (R$)', 100000000, '0.01'],
          ['otherDeductions', 'Outros descontos e adiantamentos (R$)', 100000000, '0.01'],
        ] as const).map(([name, label, max, step]) => (
          <div key={name}>
            <label htmlFor={name}>{label}</label>
            <input id={name} type="number" min="0" max={max} step={step} placeholder="0"
              value={adjustments[name]} onChange={event => updateAdjustment(name, event.target.value)} />
          </div>
        ))}
        <p>INSS e IRRF não são calculados automaticamente. Informe os valores conferidos com o RH ou contador. Não repita férias nos dois campos nem descontos de aviso em outros descontos. A média informada será usada em todas as parcelas salariais.</p>
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-lg bg-white text-black font-semibold p-3 hover:bg-zinc-200 transition"
      >
        Simular minha rescisão
      </button>
    </form>
  );
}
