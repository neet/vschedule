/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  globalSetup: '<rootDir>/test-utils/jest-global-setup.ts',
  projects: [
    {
      displayName: 'Unit',
      testEnvironment: 'node',
      transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest'],
      },
      testMatch: ['<rootDir>/src/**/*.spec.ts'],
      setupFilesAfterEnv: [
        '<rootDir>/test-utils/jest-setup-after-env-shared.ts',
      ],
    },
    {
      displayName: 'E2E',
      testEnvironment: '@quramy/jest-prisma-node/environment',
      transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest'],
      },
      testMatch: ['<rootDir>/test/**/*.spec.{ts,tsx}'],
      // testEnvironmentOptions: {
      //   verboseQuery: true,
      // },
      setupFilesAfterEnv: [
        '<rootDir>/test-utils/jest-setup-after-env-shared.ts',
        '<rootDir>/test-utils/jest-setup-after-env-e2e.ts',
        'jest-date-mock',
      ],
    },
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/generated/**',
    '!<rootDir>/src/**/__mocks__/**',
    '!<rootDir>/src/**/__fixtures__/**',
  ],
};
