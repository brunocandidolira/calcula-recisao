import type { TerminationType } from '@/app/types/recisao';
import type { useRescisaoCalculator } from '@/app/hooks/use-rescisao-calculator';

type RescisaoFormProps = Omit<ReturnType<typeof useRescisaoCalculator>, 'result'>;

export function RescisaoForm({
  salary, setSalary, admissionDate, setAdmissionDate,
  terminationDate, setTerminationDate, terminationType, setTerminationType,
  fgtsBalance, setFgtsBalance, handleCalculate,
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

      <button
        type="submit"
        className="w-full rounded-lg bg-white text-black font-semibold p-3 hover:bg-zinc-200 transition"
      >
        Simular minha rescisão
      </button>
    </form>
  );
}
