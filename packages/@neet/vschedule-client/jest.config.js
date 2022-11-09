const nextJest = require('next/jest');

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.spec.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(css|png|jpe?g|svg)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/*.stories.tsx', '!**/*.d.ts'],
  setupFilesAfterEnv: ['<rootDir>/test-utils/setup.ts'],
};

const createJestConfig = nextJest();
module.exports = createJestConfig(config);
