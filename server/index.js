const {ApolloServer} = require('apollo-server')
const typeDefs = require('./schema')
const ProfileDataSource = require('./datasources/profile');
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    profileDataSource: new ProfileDataSource()
  }),
  context: async () => {
    
  },
})

server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`)
})
