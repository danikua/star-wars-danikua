module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
  moduleNameMapper: {
    "^@testing-library/react-hooks$":
      "<rootDir>/node_modules/@testing-library/react-hooks/lib/index.js",
  },
};
