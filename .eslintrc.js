/* eslint-disable */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "settings": {
      "react": {
          'version': '17.0.2'
      }
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/no-children-prop": 'off',
        "@typescript-eslint/explicit-module-boundary-types": 'off',
        "@typescript-eslint/no-explicit-any": 'off',
        "@typescript-eslint/no-var-requires": 'off',
        "@typescript-eslint/no-empty-function": 'warn',
    }
};
