const databaseClient = require('@peoplenotplatforms/database')
const applyApolloServerMiddleware = require('./applyApolloServerMiddleware')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const express = require('express')
const path = require('path')
const createLoginRoute = require('./createLoginRoute')

databaseClient().then(databaseClient => {
  const expressServer = express()

  expressServer.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      store: new MongoStore({
        client: databaseClient.client
      })
    })
  )
  expressServer.use(express.json())
  expressServer.post('/login', createLoginRoute(databaseClient))
  expressServer.post('/logout', async (req, res) => {
    await req.session.destroy()
    res.clearCookie('connect.sid')
    res.clearCookie('isLoggedIn')
    res.send()
  })

  const apolloServer = applyApolloServerMiddleware(
    expressServer,
    databaseClient.db
  )

  applyStaticHostingMiddleware(expressServer)
  configureExpressToHandleUrlPaths(expressServer)

  const port = process.env.PORT || 4000
  expressServer.listen({ port }, () =>
    console.info(
      `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
    )
  )
})

function configureExpressToHandleUrlPaths(expressServer) {
  const indexHtmlPath = path.resolve(
    `${__dirname}/../../client/build/index.html`
  )
  expressServer.use('*', (_, res) => res.sendFile(indexHtmlPath))
}

function applyStaticHostingMiddleware(expressServer) {
  const clientBuildPath = path.resolve(`${__dirname}/../../client/build/`)
  expressServer.use(express.static(clientBuildPath)) // TODO: Only do this if env is not dev.
}
