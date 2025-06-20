import eslintPluginSecurity from "eslint-plugin-security";

export default [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
      },
    },
    plugins: {
      security: eslintPluginSecurity,
    },
    rules: {
      "no-unused-vars": "warn",
      ...eslintPluginSecurity.configs.recommended.rules,
    },
  },
];
