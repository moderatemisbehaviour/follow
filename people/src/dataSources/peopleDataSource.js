const { DataSource } = require('apollo-datasource')
const { ObjectID } = require('mongodb') // TODO: Remove the need for this dependency

// TODO: Replace with Mongo community data source
class PeopleDataSource extends DataSource {
  constructor(db) {
    super()
    this.db = db
  }

  async createPerson(person) {
    const peopleCollection = this.db.collection('people')
    const result = await peopleCollection.insertOne({ ...person }) // Have to shallow clone the object because insertOne mutates the original to add _id.
    const createdPerson = result.ops[0]

    return PeopleDataSource.replaceMongoIdWithApplicationId(createdPerson)
  }

  async editPerson(id, person) {
    const peopleCollection = this.db.collection('people')
    const result = await peopleCollection.replaceOne(
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
    const peopleCollection = this.db.collection('people')
    const cursor = await peopleCollection
      .find({
        name: { $regex: query, $options: 'i' },
        popularity: { $gt: startingPopularity }
      })
      .sort({ popularity: 1 })
      .limit(resultsPerPage)
    const people = await cursor.toArray()
    console.log(resultsPerPage, startingPopularity, people)
    return people.map(PeopleDataSource.replaceMongoIdWithApplicationId)
  }

  async getPerson(id) {
    const peopleCollection = this.db.collection('people')
    const query = { _id: new ObjectID(id) }
    const person = await peopleCollection.findOne(query)
    return PeopleDataSource.replaceMongoIdWithApplicationId(person)
  }

  static replaceMongoIdWithApplicationId(person) {
    person.id = person._id.toHexString()
    delete person._id
    return person
  }
}

module.exports = PeopleDataSource
