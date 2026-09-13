# Testes e fluxo TDD

## Ferramentas

Jest com `next/jest` (transformação TypeScript/React pelo compilador do Next),
jsdom, React Testing Library, user-event e jest-dom. Não há mocks das funções
de cálculo na integração: os campos, o hook, o serviço e o resultado trabalham
juntos. Não são usados snapshots de HTML como prova de comportamento.

## Executar

```bash
npm test
npm run test:watch
npm run test:coverage
npm test -- tests/unit/dates.test.ts
npm test -- tests/integration/calculator.test.tsx
```

Os scripts fixam `TZ=America/Sao_Paulo` antes de iniciar o Jest. Isso torna
reproduzível o problema de datas HTML interpretadas como UTC. Os testes
unitários constroem suas datas no horário local.

A cobertura é medida sobre cálculos, regras, serviço, hook e componentes da
calculadora. Os limites são 90% para linhas, instruções e funções e 80% para
ramificações. Seções estáticas e estilos não entram nessa métrica. O relatório
HTML fica em `coverage/lcov-report/index.html`.

## O que é verificado

- Meses com 14 e 15 dias, admissão e saída no mesmo mês, virada de ano e fevereiro bissexto.
- Aniversário do contrato e anos completos.
- Parcelas proporcionais, saldo de salário, taxas configuradas de FGTS e teto do aviso.
- Composição do total e parcelas configuradas para as seis modalidades.
- Preenchimento do formulário, datas locais, resultado, aviso informativo e limpeza dos campos.
- Bloqueio do envio com campos vazios ou desligamento anterior à admissão.

## Ciclo aplicado nesta alteração

O código já existia. Os testes das funções existentes são testes de
caracterização e regressão, não desenvolvimento original guiado por testes.
As duas correções seguiram TDD:

1. **Red:** executar a suíte antes de editar a implementação. Resultado:
   34 testes passaram e 2 falharam.
2. **Problema de calendário:** 10/01/2026 a 23/01/2026 contava um mês,
   apesar de o intervalo ter apenas 14 dias inclusivos.
3. **Problema de fuso:** o formulário de 01/01/2026 a 15/01/2026 mostrava
   saldo de R$ 1.400,00, pois a data de saída passava ao dia anterior em São Paulo.
4. **Green:** contar os dias inclusivos de cada mês dentro do intervalo e
   converter os campos HTML para meia-noite local com `T00:00:00`.
5. **Refactor:** manter a contagem na função de calendário e a conversão no
   hook, sem levar regras de negócio aos componentes.

Para novas correções: escreva um teste com entrada e resultado esperado,
execute e confira a falha, faça a menor correção necessária e rode a suíte
completa. Nunca ajuste o resultado esperado apenas para aceitar um bug.

## Limites

Jest/jsdom não verifica aparência, responsividade ou o comportamento de todos
os navegadores reais. A suíte não é auditoria jurídica/contábil. As
simplificações do domínio estão descritas em [architecture.md](architecture.md).

## Resultado da validação

Após as correções: 4 suítes e 36 testes aprovados. Cobertura de 100% em
linhas, instruções, funções e ramificações dentro do escopo configurado.
ESLint e TypeScript também passaram.

No ambiente restrito de desenvolvimento, o carregamento do Jest pelo Next
não conseguiu capturar a saída de um subprocesso TypeScript. As execuções
do Jest foram realizadas com a permissão de execução fora do sandbox.
