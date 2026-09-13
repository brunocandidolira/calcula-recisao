# Responsabilidades e contrato interno

| Área | Responsabilidade |
| --- | --- |
| `app/page.tsx` | Compor a página e suas seções |
| `app/components/home`, `layout` | Conteúdo informativo e navegação |
| `app/components/calculator` | Formulário, resultado e composição interativa |
| `app/hooks/use-rescisao-calculator.ts` | Estado, conversão dos campos e chamada do serviço |
| `app/services/calculate-recisao.ts` | Orquestrar as parcelas da estimativa |
| `app/rules/termination-rules.ts` | Configuração das modalidades |
| `app/utils` | Funções de cálculo e calendário |
| `app/types/recisao.ts` | Tipos de entrada e saída |
| `app/styles` | Estilos por área e responsividade |

A página é um Server Component síncrono. A calculadora define a fronteira
cliente; somente ela precisa de estado React.

## `calculateRescisao(input): RescisaoResult`

Função síncrona, sem acesso à rede ou persistência.

Entrada (`RescisaoInput`):

- `salary`: salário bruto numérico em reais.
- `admissionDate`, `terminationDate`: objetos `Date` representando datas locais.
- `terminationType`: uma das seis modalidades de `TerminationType`.
- `fgtsBalance`: saldo numérico do FGTS em reais.

Saída: `salaryBalance`, `thirteenthSalary`, `vacation`, `vacationBonus`,
`noticePeriod`, `fgtsPenalty` e `total`, todos numéricos em reais.
A apresentação arredonda para duas casas; o serviço usa números JavaScript.

O formulário exige campos preenchidos, valores não negativos e desligamento
igual ou posterior à admissão. O serviço pressupõe entradas válidas: o tipo
TypeScript não é validação em tempo de execução. Não deve ser exposto como
API sem validação adicional.

## Swagger / OpenAPI

Não há endpoints HTTP ou Route Handlers neste projeto. Por isso não foi
adicionado Swagger: o contrato existente é uma função TypeScript.
Se houver uma API no futuro, documentar rotas, métodos, schemas, respostas e
erros em OpenAPI, mantendo testes de contrato junto da implementação.

## Limites da simulação

Os testes verificam comportamentos técnicos; não certificam exatidão jurídica
ou contábil. O modelo atual não distingue aviso trabalhado de indenizado,
não possui fator específico de aviso para acordo, usa os meses do ano também
para férias e não recebe histórico de períodos aquisitivos, férias vencidas,
descontos ou verbas variáveis. Essas áreas precisam de requisitos próprios e
validação profissional antes de ampliar a precisão prometida pelo site.
