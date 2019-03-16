module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/client/ui/setup-test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['<rootDir>/**/*.{ts,tsx}', '!**/node_modules/**'],
  testMatch: ['<rootDir>/client/**/?(*.)+(spec|test).ts?(x)'],
  moduleNameMapper: {
    'client/(.*)': '<rootDir>/client/$1',
    'shared/(.*)': '<rootDir>/shared/$1',
  },
};
