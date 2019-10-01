const MongoClient = require('mongodb').MongoClient
const parseMongoDbUri = require('./parseMongoDbUri')

class DatabaseClient {
  constructor(uriConnectionString) {
    this.uriConnectionString = uriConnectionString
    const { hosts, database } = parseMongoDbUri(this.uriConnectionString)
    this.hosts = hosts
    this.database = database
    this.client = new MongoClient(this.uriConnectionString)
  }

  async connectAndGetDatabase() {
    await this.client.connect()
    console.log(`Successfully connected to database at ${this.hosts[0].host}`)
    return this.db
  }

  get db() {
    return this.client.db(this.database)
  }

  async close() {
    await this.client.close()
  }
}

module.exports = DatabaseClient
