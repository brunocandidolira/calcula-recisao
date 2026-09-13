'use client'

import { useState } from 'react'

type ResultadoSeguro = {
  mediaSalarial: number
  mesesTrabalhados: number
  parcelas: number
  valorParcela: number
  valorTotal: number
}

export function CalcSeguro() {
  const [salario1, setSalario1] = useState('')
  const [salario2, setSalario2] = useState('')
  const [salario3, setSalario3] = useState('')
  const [solicitacao, setSolicitacao] = useState('')
  const [resultado, setResultado] =
    useState<ResultadoSeguro | null>(null)
  const [erro, setErro] = useState('')
  const [dateAdmission, setDateAdmission] = useState('')
  const [dateTermination, setDateTermination] = useState('')

  function getWorkedMonths(
    admissionDate: Date,
    terminationDate: Date
  ): number {
    let months =
      (terminationDate.getFullYear() -
        admissionDate.getFullYear()) *
      12

    months +=
      terminationDate.getMonth() -
      admissionDate.getMonth()

    if (
      terminationDate.getDate() <
      admissionDate.getDate()
    ) {
      months--
    }

    return Math.max(months, 0)
  }

  function getInstallments(
    monthsWorked: number,
    request: string
  ): number {
    if (request === 'primeira') {
      if (monthsWorked >= 24) return 5
      if (monthsWorked >= 12) return 4

      return 0
    }

    if (request === 'segunda') {
      if (monthsWorked >= 24) return 5
      if (monthsWorked >= 12) return 4
      if (monthsWorked >= 9) return 3

      return 0
    }

    if (request === 'terceira') {
      if (monthsWorked >= 24) return 5
      if (monthsWorked >= 12) return 4
      if (monthsWorked >= 6) return 3

      return 0
    }

    return 0
  }

  function calculateInstallment(
    averageSalary: number
  ): number {
    const minimumWage = 1621
    const firstLimit = 2222.17
    const secondLimit = 3703.99
    const maximumBenefit = 2518.65

    let benefit: number

    if (averageSalary <= firstLimit) {
      benefit = averageSalary * 0.8
    } else if (averageSalary <= secondLimit) {
      const excess =
        averageSalary - firstLimit

      benefit =
        1777.74 + excess * 0.5
    } else {
      benefit = maximumBenefit
    }

    if (benefit < minimumWage) {
      benefit = minimumWage
    }

    return benefit
  }

  function handleCalculate() {
    setErro('')
    setResultado(null)

    if (
      !salario1 ||
      !salario2 ||
      !salario3 ||
      !solicitacao ||
      !dateAdmission ||
      !dateTermination
    ) {
      setErro(
        'Por favor, preencha todos os campos.'
      )
      return
    }

    const salary1 = Number(salario1)
    const salary2 = Number(salario2)
    const salary3 = Number(salario3)

    if (
      salary1 <= 0 ||
      salary2 <= 0 ||
      salary3 <= 0
    ) {
      setErro(
        'Os salários precisam ser maiores que zero.'
      )
      return
    }

    const admissionDate =
      new Date(`${dateAdmission}T00:00:00`)

    const terminationDate =
      new Date(`${dateTermination}T00:00:00`)

    const today = new Date()

    if (terminationDate < admissionDate) {
      setErro(
        'A data de desligamento não pode ser anterior à data de admissão.'
      )
      return
    }

    if (terminationDate > today) {
      setErro(
        'A data de desligamento não pode estar no futuro.'
      )
      return
    }

    const totalSalaries =
      salary1 + salary2 + salary3

    const averageSalary =
      totalSalaries / 3

    const monthsWorked =
      getWorkedMonths(
        admissionDate,
        terminationDate
      )

    const installments =
      getInstallments(
        monthsWorked,
        solicitacao
      )

    if (installments === 0) {
      if (solicitacao === 'primeira') {
        setErro(
          'Na primeira solicitação, são necessários pelo menos 12 meses de trabalho.'
        )
      }

      if (solicitacao === 'segunda') {
        setErro(
          'Na segunda solicitação, são necessários pelo menos 9 meses de trabalho.'
        )
      }

      if (solicitacao === 'terceira') {
        setErro(
          'Na terceira solicitação ou posteriores, são necessários pelo menos 6 meses de trabalho.'
        )
      }

      return
    }

    const installmentValue =
      calculateInstallment(averageSalary)

    const totalBenefit =
      installmentValue * installments

    setResultado({
      mediaSalarial: averageSalary,
      mesesTrabalhados: monthsWorked,
      parcelas: installments,
      valorParcela: installmentValue,
      valorTotal: totalBenefit,
    })
  }

  return (
    <section
      className="insurance-calculator"
      aria-labelledby="insurance-title"
    >
      <h2 id="insurance-title">
        Seguro-desemprego
      </h2>

      <p>
        Calcule uma estimativa com base nos
        últimos salários e no número da
        solicitação.
      </p>

      <form
        className="insurance-calculator-form"
        onSubmit={(event) => {
          event.preventDefault()
          handleCalculate()
        }}
      >
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Salário 1"
          value={salario1}
          onChange={(event) =>
            setSalario1(event.target.value)
          }
        />

        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Salário 2"
          value={salario2}
          onChange={(event) =>
            setSalario2(event.target.value)
          }
        />

        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Salário 3"
          value={salario3}
          onChange={(event) =>
            setSalario3(event.target.value)
          }
        />

        <select
          value={solicitacao}
          onChange={(event) =>
            setSolicitacao(event.target.value)
          }
        >
          <option value="">
            Número da solicitação
          </option>

          <option value="primeira">
            Primeira
          </option>

          <option value="segunda">
            Segunda
          </option>

          <option value="terceira">
            Terceira ou mais
          </option>
        </select>

        <div>
          <label htmlFor="dateAdmission">
            Data de admissão
          </label>

          <input
            type="date"
            id="dateAdmission"
            value={dateAdmission}
            onChange={(event) =>
              setDateAdmission(
                event.target.value
              )
            }
          />
        </div>

        <div>
          <label htmlFor="dateTermination">
            Data de desligamento
          </label>

          <input
            type="date"
            id="dateTermination"
            value={dateTermination}
            onChange={(event) =>
              setDateTermination(
                event.target.value
              )
            }
          />
        </div>

        <button type="submit">
          Calcular
        </button>
      </form>

      {erro && (
        <p className="calculator-error">
          {erro}
        </p>
      )}

      {resultado && (
        <div className="result-panel">
          <h3>
            Resultado
          </h3>

          <p>
            Média salarial:{' '}
            {resultado.mediaSalarial.toLocaleString(
              'pt-BR',
              {
                style: 'currency',
                currency: 'BRL',
              }
            )}
          </p>

          <p>
            Tempo trabalhado:{' '}
            {resultado.mesesTrabalhados}{' '}
            meses
          </p>

          <p>
            Quantidade de parcelas:{' '}
            {resultado.parcelas}
          </p>

          <p>
            Valor de cada parcela:{' '}
            {resultado.valorParcela.toLocaleString(
              'pt-BR',
              {
                style: 'currency',
                currency: 'BRL',
              }
            )}
          </p>

          <p>
            Total estimado:{' '}
            {resultado.valorTotal.toLocaleString(
              'pt-BR',
              {
                style: 'currency',
                currency: 'BRL',
              }
            )}
          </p>
        </div>
      )}
    </section>
  )
}