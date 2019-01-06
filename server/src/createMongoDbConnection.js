const MongoClient = require('mongodb').MongoClient

async function createMongoDbConnection () {
  const url = 'mongodb://localhost:27017'
  const dbName = 'follow'
  const client = new MongoClient(url)

  await client.connect()
  console.log('Connected successfully to server')
  const db = client.db(dbName)
  return db
}

module.exports = createMongoDbConnection
