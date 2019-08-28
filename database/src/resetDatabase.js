const MongoClient = require('mongodb').MongoClient
const setupDb = require('./setupDb')

async function resetDatabase (databaseUrl) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Unsafe to reset database in production.')
  }

  const mongoClient = MongoClient(databaseUrl || process.env.DATABASE_URL)
  await mongoClient.connect()

  try {
    const followDatabase = mongoClient.db('follow')
    await followDatabase.dropDatabase()
    await setupDb(followDatabase)
  } finally {
    mongoClient.close()
  }
}

module.exports = resetDatabase
