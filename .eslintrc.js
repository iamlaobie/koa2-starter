module.exports = {
  "parserOptions": {
    "ecmaVersion": 6,
  },
  "parser": "babel-eslint",
  "extends": ["eslint:recommended", "airbnb-base/legacy"],
  "env": {
    "es6": true,
    "node": true,
  },
  rules: {
    "global-require": 0,
    "func-names": 0,
    "no-underscore-dangle": ['error', {allowAfterThis: true}],
    "max-len": [1, 300],
    "indent": [
      2,
      2
    ],
    "quotes": [
      2,
      "single"
    ],
    "linebreak-style": [
      2,
      "unix"
    ],
    "semi": [
      2,
      "never"
    ],
    "no-multi-spaces": [2],
    "no-trailing-spaces": ["error"],
    "space-infix-ops": ["error"],
    "arrow-spacing": ["error"],
    "space-before-blocks": ["error"],
    "keyword-spacing": ["error"],
    "comma-spacing": ["error"],
    "no-restricted-syntax": 0,
    "no-param-reassign": 0,
    "no-await-in-loop": 0,
    "camelcase": 0,
    "no-mixed-operators": 0,
    "comma-dangle": ["error", "always-multiline"],
    "consistent-return": 0,
  }
}
