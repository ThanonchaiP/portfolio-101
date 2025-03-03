import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "plugin:tailwindcss/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
    plugins: ["@tanstack/query"],
    rules: {
      "no-var": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "@tanstack/query/exhaustive-deps": "error",
      "@tanstack/query/no-deprecated-options": "error",
      "@tanstack/query/prefer-query-object-syntax": "error",
      "@tanstack/query/stable-query-client": "error",
    },
  }),
];

export default eslintConfig;
