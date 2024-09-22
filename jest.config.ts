/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports =  {
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^Categories/(.*)$': '<rootDir>/src/Categories/$1',
    '^OrderDetaill/(.*)$': '<rootDir>/src/OrderDetaill/$1',
    '^Order/(.*)$': '<rootDir>/src/Order/$1',
    '^Products/(.*)$': '<rootDir>/src/Products/$1',
    // Agrega aquí más rutas si es necesario
  },
};