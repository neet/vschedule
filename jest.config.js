module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['<rootDir>/client/**/?(*.)+(spec|test).ts?(x)'],
  moduleNameMapper: {
    'client/(.*)': '<rootDir>/client/$1',
    'shared/(.*)': '<rootDir>/shared/$1',
  },
};
