module.exports = {
  Query: {
    person: async (_, { id }, { dataSources }) =>
      dataSources.peopleDataSource.getPerson(id),
    people: async (
      _,
      { query, resultsPerPage, startingPopularity },
      { dataSources }
    ) =>
      dataSources.peopleDataSource.getPeople(
        query,
        resultsPerPage,
        startingPopularity
      )
  },
  Mutation: {
    createPerson: async (_, { person }, { dataSources }) =>
      dataSources.peopleDataSource.createPerson(person),
    editPerson: async (_, { id, person }, { dataSources }) =>
      dataSources.peopleDataSource.editPerson(id, person)
  }
}
