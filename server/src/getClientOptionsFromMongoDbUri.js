function getClientOptionsFromMongoDbUri (mongoDbUri) {
  const uriRegex = new RegExp('(?<protocol>mongodb://)(?<username>[\\w\\d_]+):(?<password>[\\w\\d_]+)@(?<hostPortAndPath>[\\w\\d_\\.:/]+)')
  const {protocol, username, password, hostPortAndPath} = mongoDbUri.match(uriRegex).groups
  return {url: protocol + hostPortAndPath, username, password}
}

module.exports = getClientOptionsFromMongoDbUri
