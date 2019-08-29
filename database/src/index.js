const client = require('./getDatabaseClient')
const setupDatabase = require('./setupDatabase')

async function getDatabaseClient () {
  const database = await client.connectAndGetDatabase()
  await setupDatabase(database)
  return database
}

module.exports = getDatabaseClient
