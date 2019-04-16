const MongoClient = require('mongodb').MongoClient

class DatabaseClient {
  constructor (url, defaultDatabaseName) {
    this.url = url
    this.defaultDatabaseName = defaultDatabaseName
    this.client = new MongoClient(this.url)
  }

  async connectAndGetDatabase () {
    await this.connectToServer()
    const db = this.getDb(this.defaultDatabaseName)
    return db
  }

  async connectToServer () {
    await this.client.connect()
    console.log(`Successfully connected to database at ${this.url}`)
  }

  getDb (databaseName) {
    return this.client.db(databaseName)
  }

  async close () {
    await this.client.close()
  }
}

let databaseUrl

if (process.env.CI) {
  databaseUrl = process.env.DATABASE_URL
} else if (process.env.NODE_ENV === 'review') {
  databaseUrl = process.env.MONGODB_URI
} else {
  throw new Error(`Do not know which environment variable to use for the database connection string when NODE_ENV is ${process.env.NODE_ENV}`)
}

const databaseClient = new DatabaseClient(databaseUrl, process.env.DATABASE_NAME)

module.exports = databaseClient
