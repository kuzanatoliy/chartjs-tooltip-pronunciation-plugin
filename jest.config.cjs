module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': '<rootDir>/node_modules/ts-jest',
  },
  moduleNameMapper: {
    '^(\\..*)\\.js$': '$1',
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: ['index.ts', 'test-utils', 'constants'],
};
