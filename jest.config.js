const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    'chatbot/tests/helpers.ts',
    'chatbot/tests/mock.client.ts',
    'chatbot/src/audios.ts',
    'chatbot/.eslintrc.js',
    'chatbot/src/typings.ts',
    'chatbot/src/constants.ts',
    'chatbot/main.ts',
  ],
  coveragePathIgnorePatterns: [
    'chatbot/tests/helpers.ts',
    'chatbot/tests/mock.client.ts',
    'chatbot/src/audios.ts',
    'chatbot/.eslintrc.js',
    'chatbot/src/typings.ts',
    'chatbot/src/constants.ts',
    'chatbot/main.ts',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
//   coverageThreshold: {
//     global: {
//       branches: 95,
//       functions: 95,
//       lines: 95,
//       statements: 95,
//     },
//   },
};
