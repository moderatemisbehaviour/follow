const mongoDbUri = require('mongodb-uri')

function getClientOptionsFromMongoDbUri (uri) {
  return mongoDbUri.parse(uri)
}

module.exports = getClientOptionsFromMongoDbUri
