// functions/.eslintrc.js
module.exports = {
  root: true,
  env: { es6: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    // Note: no `project:` here — avoids type-aware lint & resolver issues
  },
  ignorePatterns: [
    "lib/**",
    "node_modules/**",
    "generated/**",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
    indent: ["error", 2],
    // Relax a few noisy rules
    "@typescript-eslint/no-explicit-any": "warn",
    "max-len": "off",
    "no-multi-spaces": "off",
    "object-curly-spacing": ["error", "always"],
  },
};
