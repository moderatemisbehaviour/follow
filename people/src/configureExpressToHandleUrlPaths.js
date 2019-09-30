const path = require('path')

function configureExpressToHandleUrlPaths(expressServer) {
  const indexHtmlPath = path.resolve(
    `${__dirname}/../../client/build/index.html`
  )
  expressServer.use('*', (req, res) => res.sendFile(indexHtmlPath))
}

module.exports = configureExpressToHandleUrlPaths
