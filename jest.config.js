module.exports = {
  projects: [
    {
      displayName: 'e2e-test',
      testMatch: ['<rootDir>/e2e/**/*.test.js'],
      testEnvironment: 'jsdom',
    },
    {
      displayName: 'server-test',
      testMatch: ['<rootDir>/test/**/*.test.js'],
      testEnvironment: 'node',
    },
  ],
  testTimeout: 30000,
};
