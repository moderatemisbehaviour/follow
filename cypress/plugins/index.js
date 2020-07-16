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
const createPeople = require('./createPeople')
const PeopleDataSource = require('../../people/src/dataSources/peopleDataSource')

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
module.exports = async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const databaseClient = await new DatabaseClient(
    process.env.MONGODB_URI
  ).connect()
  const peopleCollection = databaseClient.db.collection('people')
  const peopleDataSource = new PeopleDataSource(databaseClient.db)
  const usersCollection = databaseClient.db.collection('users')

  on('task', {
    async resetDatabase() {
      await resetDatabase()
      return null // Tell Cypress we do not intend to yield a value.
    },
    async createPerson(fixture) {
      if (!fixture) {
        const dan = JSON.parse(
          fs.readFileSync('cypress/fixtures/dan.json', 'utf8')
        )
        fixture = dan
      }

      if (!fixture.popularity) fixture.popularity = 1

      const result = await peopleCollection.insertOne(fixture)
      const person = result.ops[0]

      return person
    },
    async createPersonApi() {
      const dan = JSON.parse(
        fs.readFileSync('cypress/fixtures/dan.json', 'utf8')
      )

      return peopleDataSource.createPerson(dan)
    },
    async createPeople() {
      return createPeople(databaseClient)
    },
    async findUser(email) {
      return usersCollection.findOne({ email })
    }
  })

  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'chrome') {
      args.push('--remote-debugging-port=9222')
      return args
    }
  })

  return config
}
