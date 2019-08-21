const MongoClient = require('mongodb').MongoClient

async function resetDatabase (databaseUrl) {
  if (process.env.NODE_ENV === 'prod') {
    throw new Error('Unsafe to clean database in production.')
  }

  const mongoClient = MongoClient(databaseUrl || process.env.DATABASE_URL)
  await mongoClient.connect()

  try {
    const followDatabase = mongoClient.db('follow')
    const result = await followDatabase.dropDatabase()
    console.log(`Dropped database 'follow' with result: ${result}`)

    const admin = mongoClient.db().admin()
    const databases = await admin.listDatabases()
    console.log('Remaining databases are:\n', databases)

    const peopleCollection = await followDatabase.createCollection('people')
    await peopleCollection.createIndex({name: 'text', profiles: 'text'})
  } finally {
    mongoClient.close()
  }
}

module.exports = resetDatabase
