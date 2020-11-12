const { ApolloServer } = require('apollo-server-express')

const typeDefs = require('./graphql/schema')
const PeopleDataSource = require('./dataSources/peopleDataSource')
const resolvers = require('./graphql/resolvers')
const UsersDataSource = require('./dataSources/UsersDataSource')
const Auth = require('./graphql/schema-directives/Auth')

function applyApolloServerMiddleware(expressServer, db) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    dataSources: () => ({
      peopleDataSource: new PeopleDataSource(db),
      usersDataSource: new UsersDataSource(db)
    }),
    schemaDirectives: {
      auth: Auth
    }
  })
  server.applyMiddleware({ app: expressServer })
  return server
}

module.exports = applyApolloServerMiddleware
