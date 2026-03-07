import eslintPluginAstro from "eslint-plugin-astro";
import perfectionist from "eslint-plugin-perfectionist";

export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-imports": "error",
    },
  },
];
