require('dotenv').config({ path: '../.env' })
const dbClient = require('./getDbClient')
const setupDb = require('./setupDb')

async function getDb () {
  const db = await dbClient.connectAndGetDatabase()
  await setupDb(db)
  return db
}

module.exports = getDb
