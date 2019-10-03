module.exports = {
  plugins: ['cypress', 'prettier'],
  extends: [
    'standard',
    'plugin:cypress/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/standard'
  ],
  env: {
    'cypress/globals': true,
    jest: true
  },
  rules: {
    'object-curly-spacing': 'off'
  }
}
