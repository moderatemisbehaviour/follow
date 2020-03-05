const DatabaseClient = require('follow-database/src/DatabaseClient')
const resetDatabase = require('follow-database/src/resetDatabase')

const { updatePopularities } = require('.')

let databaseClient
let peopleCollection
let peopleIds

beforeAll(async () => {
  await resetDatabase()
  databaseClient = await new DatabaseClient(process.env.MONGODB_URI).connect()
  peopleCollection = databaseClient.db.collection('people')

  const people = []
  for (let i = 1; i <= 10; i++) {
    people.push({
      name: `Siobhan Wilson ${i}`,
      image:
        'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg',
      popularity: i,
      profiles: [
        'https://twitter.com/siobhanisback',
        'https://www.youtube.com/user/siobhanwilsonmusic',
        'https://www.facebook.com/siobhanwilsonmusic'
      ]
    })
  }
  const results = await peopleCollection.insertMany(people)
  peopleIds = results.insertedIds
})

afterAll(async () => {
  await databaseClient.close()
})

it('Updates the popularities according to the number of page visits for each person', async () => {
  const peopleIdsOrderedByVisits = [
    peopleIds[7],
    peopleIds[3],
    peopleIds[1],
    peopleIds[9],
    peopleIds[0],
    peopleIds[4],
    peopleIds[5],
    peopleIds[2],
    peopleIds[8],
    peopleIds[6]
  ]

  await updatePopularities(peopleIdsOrderedByVisits)

  const updatedPeople = await peopleCollection
    .find()
    .sort({ popularity: 1 })
    .toArray()
  const updatedPeopleIds = updatedPeople.map(person => person._id)
  expect(updatedPeopleIds).toEqual(peopleIdsOrderedByVisits)
})
