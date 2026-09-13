import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

export default createJestConfig({
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  testMatch: ['<rootDir>/tests/**/*.test.{ts,tsx}'],
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'app/utils/**/*.ts', 'app/services/**/*.ts', 'app/rules/**/*.ts',
    'app/hooks/**/*.ts', 'app/components/calculator/**/*.tsx',
  ],
  coverageThreshold: { global: { statements: 90, branches: 80, functions: 90, lines: 90 } },
});
