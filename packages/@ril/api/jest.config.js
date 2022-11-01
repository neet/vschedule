const esModules = ['nanoid'].join('|');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
  transformIgnorePatterns: [`/node_modules/(?!(${esModules}))`],
  setupFilesAfterEnv: ['<rootDir>/test-utils/setup.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
};

// TODO: runInBand しないと重い。
// これ無効化するとか？
// https://kulshekhar.github.io/ts-jest/docs/getting-started/options/diagnostics
// runInBandはCLI引数渡さないと渡らないから、maxWorkers: 1?みたいなjest.configで設定できるやつ探す
