const { ApolloServer } = require('apollo-server')
const typeDefs = require('../graphql/schema')
const ProfileDataSource = require('../graphql/datasources/profile')
const resolvers = require('../graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    profileDataSource: new ProfileDataSource()
  })
})

const port = process.env.PORT || 4000;
server.listen({port}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
