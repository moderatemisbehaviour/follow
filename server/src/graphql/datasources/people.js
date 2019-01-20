const {DataSource} = require('apollo-datasource')
const {ObjectID} = require('mongodb')

class PeopleDataSource extends DataSource {
  constructor (db) {
    super()
    this.db = db
  }

  // TODO: Use validated collection.
  async createPerson (person) {
    const peopleCollection = this.db.collection('people')
    const result = await peopleCollection.insertOne(person)
    const insertedDocumentWithIds = result.ops[0]

    return {
      ...insertedDocumentWithIds,
      id: insertedDocumentWithIds._id.toHexString()
    }
  }

  async getPerson (id) {
    const peopleCollection = this.db.collection('people')
    const objectId = new ObjectID(id)
    const query = {_id: objectId}
    const result = await peopleCollection.findOne(query)

    return {
      ...result,
      id: result._id.toHexString()
    }
  }

  getPeople () {
    return [
      {
        id: 1,
        name: 'Siobhan Wilson',
        profiles: [
          {
            id: 1,
            platform: 'TWITTER',
            url: 'https://twitter.com/siobhanisback'
          }
        ]
      },
      {
        id: 2,
        name: 'Elon Musk',
        profiles: [
          {
            id: 2,
            platform: 'TWITTER',
            url: 'https://twitter.com/elonmusk'
          }
        ]
      }
    ]
  }
}

module.exports = PeopleDataSource
