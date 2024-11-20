module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["react", "react-hooks", "prettier"],
  env: {
    es2022: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": ["error"],
    indent: "off",
    "linebreak-style": ["error", "unix"],
    quotes: [
      "error",
      "double",
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    semi: ["error", "never"],
    "no-console": "warn",
    "no-implicit-globals": "error",
    "no-warning-comments": ["error", { terms: ["fixme", "todo"] }],
    "newline-before-return": "error",
    curly: "error",
    "padded-blocks": ["error", "never"],
    "space-before-blocks": "error",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: [
          "break",
          "case",
          "cjs-export",
          "class",
          "continue",
          "do",
          "if",
          "switch",
          "try",
          "while",
          "return",
        ],
      },
      {
        blankLine: "always",
        prev: [
          "break",
          "case",
          "cjs-export",
          "class",
          "continue",
          "do",
          "if",
          "switch",
          "try",
          "while",
          "return",
        ],
        next: "*",
      },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
  settings: { react: { version: "detect" } },
}
