import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  globalIgnores([
    ".agents/**",
    ".next/**",
    ".output/**",
    "dist/**",
    "node_modules/**",
    "public/**",
    "src/routeTree.gen.ts",
    "*.lock",
    "*.d.ts",
  ]),
  {
    files: ["src/**/*.{ts,tsx}", "*.{ts,js,mjs}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-undef": "off",
    },
  },
]);
