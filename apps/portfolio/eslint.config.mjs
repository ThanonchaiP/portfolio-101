import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import eslintPluginImport from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },

  // Import plugin configuration
  {
    plugins: {
      import: eslintPluginImport,
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
// import { defineConfig, globalIgnores } from "eslint/config";
// import nextVitals from "eslint-config-next/core-web-vitals";

// const eslintConfig = defineConfig([
//   ...nextVitals,
//   {
//     files: ["**/*.{js,jsx,ts,tsx}"],
//     rules: {
//       "react/no-unescaped-entities": "off",
//       "@next/next/no-page-custom-font": "off",
//       "react-hooks/set-state-in-effect": "off",
//     },
//   },
//   globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
// ]);

// export default eslintConfig;
