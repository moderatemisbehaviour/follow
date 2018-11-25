const { ApolloServer } = require('apollo-server-express')
const express = require('express')

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

const app = express()
server.applyMiddleware({ app })

app.use(express.static('../client/build')) // TODO: Only do this if env is dev.

const port = process.env.PORT || 4000
app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
)
