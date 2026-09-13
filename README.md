# Calcula Rescisão

Simulador informativo de rescisão CLT em Next.js e React. Os valores são
aproximados, não substituem contador ou profissional habilitado e não se
destinam a fins processuais.

## Executar

```bash
npm ci
npm run dev
```

Acesse http://localhost:3000. Para produção: `npm run build` e `npm start`.

## Verificar

```bash
npm test
npm run test:watch
npm run test:coverage
npm run lint
npx tsc --noEmit
```

Os scripts de teste usam o fuso `America/Sao_Paulo` e a sintaxe de ambiente
POSIX (Linux/macOS/WSL). O relatório HTML fica em `coverage/lcov-report/index.html`.

Consulte [a estratégia de testes e TDD](docs/testing.md) e
[a arquitetura e o contrato do serviço](docs/architecture.md).
