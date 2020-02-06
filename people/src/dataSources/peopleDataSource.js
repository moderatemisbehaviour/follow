const { DataSource } = require('apollo-datasource')
const { ObjectID } = require('mongodb') // TODO: Remove the need for this dependency

// TODO: Replace with Mongo community data source
class PeopleDataSource extends DataSource {
  constructor(db) {
    super()
    this.db = db
    this.collection = this.db.collection('people')
  }

  async createPerson(person) {
    const {
      value: { counter: nextLowestPopularity }
    } = await this.db
      .collection('popularityCounter')
      .findOneAndUpdate(
        { _id: 'popularityCounter' },
        { $inc: { counter: 1 } },
        { returnOriginal: false }
      )

    const result = await this.collection.insertOne({
      ...person,
      popularity: nextLowestPopularity
    }) // Have to shallow clone the object because insertOne mutates the original to add _id.
    const createdPerson = result.ops[0]

    return PeopleDataSource.replaceMongoIdWithApplicationId(createdPerson)
  }

  async editPerson(id, person) {
    const result = await this.collection.replaceOne(
      { _id: new ObjectID(id) },
      { ...person }
    ) // Have to shallow clone the object becase insertOne mutates the original to add _id.
    const editedPerson = result.ops[0]

    if (result.modifiedCount < 1) {
      throw new Error('The edit had no effect!')
    }

    return {
      ...editedPerson,
      id
    }
  }

  async getPeople(query, resultsPerPage, startingPopularity) {
    // TODO: This doesn't work if multiple people have the same popularity
    // as then there are more than 5 results per page but the extras are missed.
    const cursor = await this.collection
      .find({
        name: { $regex: query, $options: 'i' },
        popularity: { $gte: startingPopularity }
      })
      .sort({ popularity: 1 })
      .limit(resultsPerPage)
    const people = await cursor.toArray()
    return people.map(PeopleDataSource.replaceMongoIdWithApplicationId)
  }

  async getPeopleCount(query) {
    const cursor = await this.collection.find({
      name: { $regex: query, $options: 'i' }
    })
    const count = await cursor.count()
    return count
  }

  async getPerson(id) {
    const query = { _id: new ObjectID(id) }
    const person = await this.collection.findOne(query)
    return PeopleDataSource.replaceMongoIdWithApplicationId(person)
  }

  static replaceMongoIdWithApplicationId(person) {
    person.id = person._id.toHexString()
    delete person._id
    return person
  }
}

module.exports = PeopleDataSource
