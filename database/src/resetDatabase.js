const MongoClient = require('mongodb').MongoClient
const setupDatabase = require('./setupDatabase')

async function resetDatabase (databaseUrl) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Unsafe to reset database in production.')
  }

  const mongoClient = MongoClient(databaseUrl || process.env.DATABASE_URL)
  await mongoClient.connect()

  try {
    const followDatabase = mongoClient.db('follow')
    await followDatabase.dropDatabase()
    await setupDatabase(followDatabase)
  } finally {
    mongoClient.close()
  }
}

module.exports = resetDatabase
