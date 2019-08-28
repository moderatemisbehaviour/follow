async function jestGlobalSetup () {
  require('dotenv').config({ path: '../.env' })
};

module.exports = jestGlobalSetup
