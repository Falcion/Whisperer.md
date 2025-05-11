// jest.config.mjs
/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // requires `npm install --save-dev jest-environment-jsdom`
  moduleNameMapper: {
    '^obsidian$': '<rootDir>/__mocks__/obsidian.ts',
    '^source/(.*)$': '<rootDir>/source/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  extensionsToTreatAsEsm: ['.ts'] // if you need to treat .ts as ESM :contentReference[oaicite:3]{index=3}
}
