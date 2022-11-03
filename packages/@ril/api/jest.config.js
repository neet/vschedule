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
      globals: {
        'ts-jest': {
          isolatedModules: true,
        },
      },
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
