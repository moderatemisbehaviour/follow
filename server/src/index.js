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

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
