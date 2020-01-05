const setupDatabaseAndGetClient = require('follow-database')

// Run this with MONGODB_URI=mongodb://localhost:27017/follow npx jest searchPerformance --watch --verbose=false

describe('Database search performance', () => {
  const query = 'Siob'
  let db
  let peopleCollection
  let hrstart
  let hrend

  beforeAll(async () => {
    const databaseClient = await setupDatabaseAndGetClient()
    db = databaseClient.db

    await db.dropDatabase()
    await db.createCollection('people')
    peopleCollection = db.collection('people')

    // TODO: Replace with Cypress plugin
    const people = []
    for (let i = 1; i <= 100000; i++) {
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
    await peopleCollection.insertMany(people)
  })

  it('using skip and limit', async () => {
    hrstart = process.hrtime()

    const cursor = await peopleCollection
      .find({
        name: { $regex: `${query}`, $options: 'i' }
      })
      .sort({ popularity: 1 })
      .skip(50000)
      .limit(10000)
    await cursor.toArray()

    hrend = process.hrtime(hrstart)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
  })

  it('using a "range query"', async () => {
    hrstart = process.hrtime()

    const cursor = await peopleCollection
      .find({
        name: { $regex: `${query}`, $options: 'i' },
        popularity: { $gt: 50000 }
      })
      .sort({ popularity: 1 })
      .limit(10000)
    await cursor.toArray()

    hrend = process.hrtime(hrstart)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
  })

  it('using a "range query" with an index', async () => {
    await peopleCollection.createIndex('popularity')

    hrstart = process.hrtime()

    const cursor = await peopleCollection
      .find({
        name: { $regex: `${query}`, $options: 'i' },
        popularity: { $gt: 50000 }
      })
      .sort({ popularity: 1 })
      .limit(10000)
    await cursor.toArray()

    hrend = process.hrtime(hrstart)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
  })
})
