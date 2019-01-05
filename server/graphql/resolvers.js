module.exports = {
  Query: {
    person: async (_, { id }, { dataSources }) => dataSources.peopleDataSource.getPerson(id),
    people: async (_, __, { dataSources }) => dataSources.peopleDataSource.getPeople()
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      // const user = await dataSources.userAPI.findOrCreateUser({ email });
      const user = {}
      if (user) return new Buffer(email).toString('base64')
    }
  }
}
