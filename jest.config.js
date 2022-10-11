module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/', '<rootDir>/dist/', '<rootDir>/coverage/'],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/', '<rootDir>/dist/', '<rootDir>/coverage/'],
  setupFiles: ['<rootDir>/setupTests.js'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '@constants(.*)': '<rootDir>/src/constants/$1',
    '@models(.*)': '<rootDir>/src/db/models/$1',
    '@api(.*)': '<rootDir>/src/api/$1',
    '@middleware(.*)': '<rootDir>/src/middleware/$1',
    '@utils(.*)': '<rootDir>/src/utils/$1',
    '@helpers(.*)': '<rootDir>/src/helpers/$1',
    '@dbConfig(.*)': '<rootDir>/src/db/dbConfig/$1',
    '@app': '<rootDir>/src/app',
    '@swaggerDocs': '<rootDir>/src/swaggerDocs',
    '@testData(.*)': '<rootDir>/src/testData/$1',
    '@services': '<rootDir>/src/services/$1',
    '@interfaces(.*)': '<rootDir>/src/interfaces/$1',
    '@types(.*)': '<rootDir>/src/types/$1',
  },
  modulePaths: ['<rootDir>/src', '<rootDir>/src/db'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 80,
      statements: -120,
    },
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
};
