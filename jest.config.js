module.exports = {
  preset: 'ts-jest',
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 55,
      functions: 51,
      lines: 71,
      statements: 71
    },
  },
  projects: [
    "./__tests__/unit/"
  ],
};
