const MongoClient = require('mongodb').MongoClient

async function createMongoDbConnection () {
  const url = process.env.DATABASE_URL
  const dbName = 'follow'
  const client = new MongoClient(url)

  await client.connect()
  console.log(`Successfully connected to database at ${url}`)
  const db = client.db(dbName)
  return db
}

module.exports = createMongoDbConnection
