import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/\\u2014/]",
          message:
            "Em-dashes are banned in LENS content. See Standards/WritingSOPs.md for the rule and recommended replacements.",
        },
        {
          selector: "TemplateElement[value.raw=/\\u2014/]",
          message:
            "Em-dashes are banned in LENS content. See Standards/WritingSOPs.md for the rule and recommended replacements.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
