const DatabaseClient = require('./DatabaseClient')
const setupDatabase = require('./setupDatabase')

async function getDatabaseClient() {
  const database = await new DatabaseClient(
    process.env.MONGODB_URI
  ).connectAndGetDatabase()
  await setupDatabase(database)
  return database
}

module.exports = getDatabaseClient
