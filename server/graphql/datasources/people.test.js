const PeopleDataSource = require('../datasources/people')
const createMongoDbConnection = require('../../src/createMongoDbConnection')

describe('create person', () => {
  test('returns an object', async () => {
    const db = await createMongoDbConnection()
    const person = {
      name: 'Siobhan Wilson',
      profiles: [
        {
          url: 'https://twitter.com/SiobhanIsBack'
        }
      ]
    }
    const peopleDataSource = new PeopleDataSource(db)
    const actualResponse = await peopleDataSource.createPerson(person)

    const expectedResponse = {
      id: 1,
      name: 'Siobhan Wilson',
      profiles: [
        {
          url: 'https://twitter.com/SiobhanIsBack',
          platform: 'TWITTER'
        }
      ]
    }

    expect(actualResponse).toEqual(expectedResponse)
  })
})
