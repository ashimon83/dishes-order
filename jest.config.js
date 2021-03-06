module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['tsx', 'ts', 'js'],
  moduleDirectories: [
    'node_modules'
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest'
  },
  testMatch: ['**/__tests__/*.+(ts|tsx)'],
  roots: ['<rootDir>/pageTests', '<rootDir>/components'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsConfigFile: 'tsconfig.json'
    }
  }
}
