const resetDatabase = require('../../server/src/resetDatabase')

before(() => {
  return new Cypress.Promise((resolve, reject) => {
    resetDatabase(Cypress.env('DATABASE_URL')).then(() => {
      resolve()
    })
  })
})
