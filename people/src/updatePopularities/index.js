// Import the Google Cloud client library using default credentials
const { BigQuery } = require('@google-cloud/bigquery')
const DatabaseClient = require('follow-database/src/DatabaseClient')

if (require.main === module) {
  getPersonVisits()
    .then(async peopleIdsOrderedByVisits => {
      await updatePopularities(peopleIdsOrderedByVisits)
    })
    .catch(async error => {
      console.error(error.message)
    })
}

async function getPersonVisits() {
  const bigquery = new BigQuery({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: 'people-not-platforms'
  })

  const query = `SELECT *
    FROM \`people-not-platforms.staging.person_visits\`
    `

  const [job] = await bigquery.createQueryJob({
    query: query,
    location: 'europe-west2'
  })
  console.debug(`Job ${job.id} started.`)

  const [rows] = await job.getQueryResults()
  console.info(`${rows.length} people with recorded visits found.`)

  const peopleIdsOrderedByVisits = rows.map(row => row.personId)
  return peopleIdsOrderedByVisits
}

async function updatePopularities(peopleIdsOrderedByVisits) {
  const databaseClient = await new DatabaseClient(
    process.env.MONGODB_URI
  ).connect()
  const peopleCollection = databaseClient.db.collection('people')

  const writeOperations = peopleIdsOrderedByVisits.map((personId, index) => ({
    updateOne: {
      filter: { _id: personId },
      update: { $set: { popularity: index + 1 } }
    }
  }))

  await peopleCollection.dropIndex('popularity_1')
  const result = await peopleCollection.bulkWrite(writeOperations, {
    ordered: false
  })
  console.info(
    `${result.matchedCount} matching people found, ${result.modifiedCount} updated`
  )
  await peopleCollection.createIndex('popularity', { unique: true })

  await databaseClient.close()
}

module.exports = {
  getPersonVisits,
  updatePopularities
}
