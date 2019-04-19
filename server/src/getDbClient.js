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
// TODO: This is set even for review apps because the NODE_ENV set in app.json is not picked up.
if (process.env.NODE_ENV === 'production') {
  databaseUrl = process.env.MONGODB_URI
} else {
  databaseUrl = process.env.DATABASE_URL
}

const databaseClient = new DatabaseClient(databaseUrl, process.env.DATABASE_NAME)

module.exports = databaseClient
