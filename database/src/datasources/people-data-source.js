const { DataSource } = require('apollo-datasource')
const { ObjectID } = require('mongodb')

// TODO: Replace with Mongo community data source
class PeopleDataSource extends DataSource {
  constructor(db) {
    super()
    this.db = db
  }

  async createPerson(person) {
    const peopleCollection = this.db.collection('people')
    const result = await peopleCollection.insertOne({ ...person }) // Have to shallow clone the object becase insertOne mutates the original to add _id.
    const insertedDocumentWithIds = result.ops[0]

    return {
      ...insertedDocumentWithIds,
      id: insertedDocumentWithIds._id.toHexString()
    }
  }

  async getPeople(query) {
    const peopleCollection = this.db.collection('people')
    const cursor = peopleCollection
      .find({ name: { $regex: `${query}`, $options: 'i' } })
      .skip(0)
      .limit(5)
    const people = await cursor.toArray()
    return people.map(this.replaceMongoIdWithApplicationId)
  }

  async getPerson(id) {
    const peopleCollection = this.db.collection('people')
    const objectId = new ObjectID(id)
    const query = { _id: objectId }
    const person = await peopleCollection.findOne(query)
    return this.replaceMongoIdWithApplicationId(person)
  }

  replaceMongoIdWithApplicationId(person) {
    return {
      ...person,
      id: person._id.toHexString()
    }
  }
}

module.exports = PeopleDataSource
