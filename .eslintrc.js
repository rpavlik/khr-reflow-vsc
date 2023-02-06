/* eslint-disable @typescript-eslint/naming-convention */
/**@type {import('eslint').Linter.Config} */
// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/naming-convention": "warn",
    "@typescript-eslint/semi": "warn",
    curly: "warn",
    eqeqeq: "warn",
    "no-throw-literal": "warn",
    semi: "off",
  },
  ignorePatterns: ["out", "dist", "**/*.d.ts"],
};
