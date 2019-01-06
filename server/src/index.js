const createExpressServerForStaticContent = require('./createExpressServerForStaticContent')
const createMongoDbConnection = require('./createMongoDbConnection')
const applyApolloServerMiddleware = require('./applyApolloServerMiddleware')

const expressServer = createExpressServerForStaticContent()
const db = createMongoDbConnection()
const apolloServer = applyApolloServerMiddleware(expressServer, db)

const port = process.env.PORT || 4000
expressServer.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`)
)
