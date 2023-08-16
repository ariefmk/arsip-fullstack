module.exports = {
  "env": {
    "jest/globals": true,
    "commonjs": true,
    "es2021": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "overrides": [
    {
      "files": ["__test__/**"],
      "plugins": ["jest"],
      "extends": ["plugin:jest/recommended"],
      "rules": { "jest/prefer-expect-assertions": "off" }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "indent" : ["error", 2]
  },
}
