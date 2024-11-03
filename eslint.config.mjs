import eslintPluginAstro from "eslint-plugin-astro";
export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.all,
  ...eslintPluginAstro.configs["flat/jsx-a11y-strict"],
  {
    rules: {
      "sort-imports": [
        "error",
        {
          allowSeparatedGroups: true,
        },
      ],
    },
  },
];
