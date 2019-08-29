console.log('NODE_ENV is', process.env.NODE_ENV)
console.log('CI is', process.env.CI)

const getDatabase = require('follow-database')

const createExpressServerForStaticContent = require('./createExpressServerForStaticContent')
const applyApolloServerMiddleware = require('./applyApolloServerMiddleware')
const configureExpressToHandleUrlPaths = require('./configureExpressToHandleUrlPaths')

// process.on('SIGINT', () => { console.log('Bye bye!'); process.exit() })

const expressServer = createExpressServerForStaticContent()
getDatabase().then((db) => {
  const apolloServer = applyApolloServerMiddleware(expressServer, db)

  const port = process.env.PORT || 4000
  expressServer.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`)
  )

  configureExpressToHandleUrlPaths(expressServer)
})
