module.exports = {
  Query: {
    person: async (_, {id}, {dataSources}) => dataSources.peopleDataSource.getPerson(id),
    people: async (_, __, {dataSources}) => dataSources.peopleDataSource.getPeople()
  },
  Mutation: {
    createPerson: async (_, {person}, {dataSources}) => dataSources.peopleDataSource.createPerson(person)
  }
}
