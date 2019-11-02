module.exports = {
  moduleFileExtensions: ['tsx', 'ts', 'js'],
  moduleDirectories: [
    'node_modules'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: ['**/__tests__/*.+(ts|tsx)'],
  roots: ['<rootDir>/components', '<rootDir>/pages'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsConfigFile: 'tsconfig.json'
    }
  }
}
