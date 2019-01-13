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

const databaseClient = new DatabaseClient(process.env.DATABASE_URL, process.env.DATABASE_NAME)

module.exports = databaseClient
