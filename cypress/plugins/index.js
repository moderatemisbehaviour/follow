// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const resetDatabase = require('../../database/src/resetDatabase')
const DatabaseClient = require('../../database/src/DatabaseClient')
const fs = require('fs')

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    async resetDatabase () {
      await resetDatabase()
      return null // Tell Cypress we do not intend to yield a value.
    },
    async createPerson (fixture) {
      const dbClient = new DatabaseClient(process.env.MONGODB_URI)
      const db = await dbClient.connectAndGetDatabase()
      const peopleCollection = db.collection('people')
      fixture = fixture || JSON.parse(fs.readFileSync('cypress/fixtures/siobhan.json', 'utf8'))
      const result = await peopleCollection.insertOne(fixture)
      const person = result.ops[0]
      return person
    }
  })

  // config.env.DATABASE_URL = loadedEnvVars.parsed.DATABASE_URL
  return config
}
