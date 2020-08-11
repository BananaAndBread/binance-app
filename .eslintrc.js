module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'standard',
    'plugin:vue/recommended',
    'plugin:vue/base'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
  }
}
