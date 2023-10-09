module.exports = {
  parser: '@typescript-eslint/parser',
  globals: {
    __PATH_PREFIX__: true
  },
  env: {
    es2022: true
  },
  settings: {
    node: {
      version: '>=18.0.0'
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'prettier'
  ],
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  plugins: [],
  rules: {}
}
