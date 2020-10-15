const { DataSource } = require('apollo-datasource')

// TODO: Replace with Mongo community data source
class UsersDataSource extends DataSource {
  constructor(db) {
    super()
    this.db = db
    this.collection = this.db.collection('users')
  }

  async getUser(id) {
    const query = { _id: id }
    const user = await this.collection.findOne(query)
    return user
  }

  async upsertUser(user) {
    const result = await this.collection.findOneAndReplace(
      { email: user.email },
      { ...user },
      { upsert: true }
    ) // Have to shallow clone the object because insertOne mutates the original to add _id.

    return result.value
  }
}

module.exports = UsersDataSource