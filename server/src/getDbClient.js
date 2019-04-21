const MongoClient = require('mongodb').MongoClient
const getClientOptionsFromMongoDbUri = require('./getClientOptionsFromMongoDbUri')

class DatabaseClient {
  constructor ({url, username, password}, defaultDatabaseName) {
    this.url = url
    this.defaultDatabaseName = defaultDatabaseName

    let options = {}
    if (username && password) {
      options = {
        auth: {
          user: username,
          password
        }
      }
    }

    this.client = new MongoClient(this.url, options)
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

let clientOptions = {}
// TODO: This is set even for review apps because the NODE_ENV set in app.json is not picked up.
if (process.env.NODE_ENV === 'production') {
  console.log('env', process.env)
  clientOptions = getClientOptionsFromMongoDbUri(process.env.MONGODB_URI)
} else {
  clientOptions.url = process.env.DATABASE_URL
}

const databaseClient = new DatabaseClient(clientOptions, process.env.DATABASE_NAME)

module.exports = databaseClient
