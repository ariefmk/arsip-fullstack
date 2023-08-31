module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'standard',
    'plugin:security/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
  },
  plugins: ['jest']
}
