import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,

  testEnvironment: "jest-environment-jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  collectCoverage: true,

  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}",
    "src/app/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
  ],

  coverageDirectory: "coverage",
  coverageProvider: "v8",

  coverageReporters: ["text", "html", "lcov"],
};

export default createJestConfig(config);
