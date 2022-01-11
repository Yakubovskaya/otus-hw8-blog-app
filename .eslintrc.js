module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  plugins: ["jest"],
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  rules: {
    "import/prefer-default-export": "off",
    "max-len": [
      "error",
      {
        ignoreComments: true,
      },
    ],
    "no-use-before-define": [
      "error",
      {
        functions: false,
      },
    ],
  },
};
