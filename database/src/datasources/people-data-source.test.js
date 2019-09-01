const DatabaseClient = require('../DatabaseClient')
const PeopleDataSource = require('./people-data-source')
const resetDatabase = require('../resetDatabase')

// TODO: Use a clone of the object rather than the node cache.
const siobhan = require('../../../cypress/fixtures/siobhan.json')
const elon = require('../../../cypress/fixtures/elon.json')

let databaseClient
let database
let peopleDataSource

beforeAll(async () => {
  databaseClient = await new DatabaseClient(process.env.MONGODB_URI)
  database = await databaseClient.connectAndGetDatabase()
  peopleDataSource = new PeopleDataSource(database)
})

afterAll(async () => {
  await databaseClient.close()
})

describe('create person', () => {
  describe('when the object is valid', () => {
    it('returns an object', async () => {
      const actualResponse = await peopleDataSource.createPerson(siobhan)
      await peopleDataSource.createPerson(siobhan)
      // TODO: Find out why expect.stringMatching does not work for _id property.
      expect(actualResponse).toMatchObject(siobhan)
    })
  })

  describe('when the object is invalid', () => {
    describe('because the person has no name', () => {
      it('should throw a validation error', async () => {
        const siobhanInvalid = {...siobhan}
        delete siobhanInvalid.name
        await expect(peopleDataSource.createPerson(siobhanInvalid)).rejects.toThrow(Error)
      })
    })
  })
})

describe('get people', () => {
  beforeEach(async () => {
    await resetDatabase()
    await database.collection('people').insertMany([siobhan, elon])
  })

  describe('when the query matches the name', () => {
    describe('when the query matches the first 2 letters', () => {
      it('should return the person', async () => {
        const query = 'Si'
        const actualResponse = await peopleDataSource.getPeople(query)
        expect(actualResponse).toMatchObject([siobhan])
      })
    })

    describe('when the query matches the first 2 letters case insensitively', () => {
      it('should return the person', async () => {
        const query = 'si'
        const actualResponse = await peopleDataSource.getPeople(query)
        expect(actualResponse).toMatchObject([siobhan])
      })
    })

    describe('when the query matches the first 2 letters of the second name', () => {
      it('should return the person', async () => {
        const query = 'Wi'
        const actualResponse = await peopleDataSource.getPeople(query)
        expect(actualResponse).toMatchObject([siobhan])
      })
    })

    describe('when the query matches the middle of the name', () => {
      it('should return the person', async () => {
        const query = 'han'
        const actualResponse = await peopleDataSource.getPeople(query)
        expect(actualResponse).toMatchObject([siobhan])
      })
    })

    describe('when the query matches multiple names', () => {
      it('should return people ordered by earliest match', async () => {
        const query = 'on'
        const actualResponse = await peopleDataSource.getPeople(query)
        expect(actualResponse).toMatchObject([siobhan, elon])
      })
    })

    xdescribe('when the query matches but has a typo', () => {
      it('should return the person', async () => {
        const query = 'Sibo'
        const actualResponse = await peopleDataSource.getPeople(query)
        expect(actualResponse).toMatchObject([siobhan])
      })
    })
  })
})
