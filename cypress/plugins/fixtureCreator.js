const DatabaseClient = require('../../database/src/DatabaseClient')

const databaseClient = new DatabaseClient(process.env.MONGODB_URI)
databaseClient.connect().then(async _ => {
  const fixtureCreator = require(`./${process.argv[2]}`)
  await fixtureCreator(databaseClient)
  await databaseClient.close()
})
