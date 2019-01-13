module.exports = {
  "plugins": [
    "cypress"
  ],
  "extends": [
    "standard",
    "plugin:react/recommended",
    "plugin:cypress/recommended"
  ],
  "env": {
    "cypress/globals": true,
    "jest": true
  }
};