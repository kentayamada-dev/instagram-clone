/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  collectCoverage: true,
  coverageDirectory: "../coverage",
  preset: "ts-jest",
  rootDir: "./src"
};

module.exports = config;
