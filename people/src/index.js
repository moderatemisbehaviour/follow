const databaseClient = require('@peoplenotplatforms/database')
const applyApolloServerMiddleware = require('./applyApolloServerMiddleware')
const configureExpressToHandleUrlPaths = require('./configureExpressToHandleUrlPaths')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const express = require('express')
const expressServer = express()
const createLoginRoute = require('./createLoginRoute')

databaseClient().then(databaseClient => {
  applySessionMiddleware(expressServer, databaseClient.client)
  expressServer.use(express.json())
  expressServer.post('/login', createLoginRoute(databaseClient))

  const apolloServer = applyApolloServerMiddleware(
    expressServer,
    databaseClient.db
  )

  configureExpressToHandleUrlPaths(expressServer)
  applyStaticHostingMiddleware(expressServer)

  const port = process.env.PORT || 4000
  expressServer.listen({ port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
    )
  )
})

function applySessionMiddleware(expressServer, client) {
  expressServer.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      store: new MongoStore({
        client
      })
    })
  )
}

function applyStaticHostingMiddleware(expressServer) {
  expressServer.use(express.static('../client/build')) // TODO: Only do this if env is not dev.
}
