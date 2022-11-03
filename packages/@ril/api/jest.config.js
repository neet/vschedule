/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  projects: [
    {
      displayName: 'Unit',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/*.spec.ts'],
      setupFilesAfterEnv: ['<rootDir>/test-utils/setup-unit.ts'],
    },
    {
      displayName: 'E2E',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/test/**/*.spec.{ts,tsx}'],
      setupFilesAfterEnv: ['<rootDir>/test-utils/setup-e2e.ts'],
    },
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.spec.ts',
    '!src/**/__mocks__/**',
    '!src/**/__fixtures__/**',
  ],
};
