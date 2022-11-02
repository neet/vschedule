// const esModules = ['nanoid'].join('|');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/api/**/*.{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/test-utils/setup.ts'],
  collectCoverageFrom: ['<rootDir>/api/**/*.{ts,tsx}'],

  // https://jestjs.io/docs/configuration#testtimeout-number
  testTimeout: 1000 * 60,
};
