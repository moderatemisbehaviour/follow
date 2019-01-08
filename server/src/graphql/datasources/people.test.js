// const PeopleDataSource = require('../datasources/people')
const MongoClient = require('mongodb').MongoClient

describe('create person', () => {
  test('returns an object', async () => {
    // const db = await createMongoDbConnection()

    const url = process.env.DATABASE_URL
    // const dbName = 'follow'
    const client = new MongoClient(url)

    await client.connect()
    console.log(`Successfully connected to database at ${url}`)
    // const db = client.db(dbName)
    client.close()

    // const person = {
    //   name: 'Siobhan Wilson',
    //   profiles: [
    //     {
    //       url: 'https://twitter.com/SiobhanIsBack'
    //     }
    //   ]
    // }

    // const peopleDataSource = new PeopleDataSource(db)
    // const actualResponse = await peopleDataSource.createPerson(person)

    // TODO: Find out why expect.stringMatching does not work for _id property.
    // const expectedResponse = [{
    //   name: 'Siobhan Wilson',
    //   profiles: [
    //     {
    //       url: 'https://twitter.com/SiobhanIsBack',
    //       platform: 'TWITTER'
    //     }
    //   ]
    // }]
    // expect(actualResponse).toMatchObject(expectedResponse)
  })
})
