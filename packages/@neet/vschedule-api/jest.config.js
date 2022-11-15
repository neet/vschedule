/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  projects: [
    {
      displayName: 'Unit',
      testEnvironment: 'node',
      transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest'],
      },
      testMatch: ['<rootDir>/src/**/*.spec.ts'],
      setupFilesAfterEnv: ['<rootDir>/test-utils/setup-unit.ts'],
    },
    {
      displayName: 'E2E',
      testEnvironment: '@quramy/jest-prisma-node/environment',
      transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest'],
      },
      testMatch: ['<rootDir>/test/**/*.spec.{ts,tsx}'],
      setupFilesAfterEnv: [
        '<rootDir>/test-utils/setup-e2e.ts',
        'jest-date-mock',
      ],
    },
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/__mocks__/**',
    '!<rootDir>/src/**/__fixtures__/**',
  ],
};
