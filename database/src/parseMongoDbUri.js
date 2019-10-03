const mongoDbUri = require('mongodb-uri')

module.exports = function(uri) {
  return mongoDbUri.parse(uri)
}
