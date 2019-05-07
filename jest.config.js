module.exports = {
  projects: [
    {
      globals: {
        'ts-jest': {
          tsConfig: '<rootDir>/packages/server/tsconfig.json'
        },
      },
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      testEnvironment: 'node',
      collectCoverageFrom: [
        '<rootDir>/packages/server/**/*.{ts,tsx}',
        '!**/node_modules/**',
      ],
      testMatch: [
        '<rootDir>/packages/server/**/?(*.)+(spec|test).ts?(x)',
      ],
      moduleNameMapper: {
        'src/(.*)': '<rootDir>/packages/server/src/$1',
      },
    },

    {
      globals: {
        'ts-jest': {
          tsConfig: '<rootDir>/packages/client/tsconfig.json'
        },
      },
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: [
        '<rootDir>/packages/client/src/setup-test.ts',
      ],
      collectCoverageFrom: [
        '<rootDir>/packages/client/**/*.{ts,tsx}',
        '!**/node_modules/**',
      ],
      testMatch: [
        '<rootDir>/packages/client/**/?(*.)+(spec|test).ts?(x)',
      ],
      moduleNameMapper: {
        'src/(.*)': '<rootDir>/packages/client/src/$1',
      },
    },
  ]
}
