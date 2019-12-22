const DatabaseClient = require('./DatabaseClient')
const setupDatabase = require('./setupDatabase')

async function setupDatabaseAndGetClient() {
  const databaseClient = await new DatabaseClient(process.env.MONGODB_URI)
  await databaseClient.connect()
  const { db } = databaseClient
  await setupDatabase(db)
  return databaseClient
}

module.exports = setupDatabaseAndGetClient
