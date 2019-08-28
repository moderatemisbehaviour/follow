const {ApolloServer} = require('apollo-server-express')

const typeDefs = require('./graphql/schema')
const PeopleDataSource = require('../../database/src/datasources/people')
const resolvers = require('./graphql/resolvers')

function applyApolloServerMiddleware (expressServer, db) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      peopleDataSource: new PeopleDataSource(db)
    })
  })
  server.applyMiddleware({ app: expressServer })
  return server
}

module.exports = applyApolloServerMiddleware
