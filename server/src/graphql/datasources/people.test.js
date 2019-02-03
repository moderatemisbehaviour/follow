const getDbClient = require('../../getDbClient')
const PeopleDataSource = require('./people')
const resetDatabase = require('../../resetDatabase')

// TODO: Get fixtures from a common place.
const siobhan = {
  name: 'Siobhan Wilson',
  profiles: [
    'https://twitter.com/SiobhanIsBack'
  ]
}
const elon = {
  name: 'Elon Musk',
  photo: 'https: //pbs.twimg.com/profile_images/972170159614906369/0o9cdCOp_400x400.jpg',
  profiles: [
    'https: //twitter.com/elonmusk'
  ]
}

let db
let peopleDataSource

beforeAll(async () => {
  db = await getDbClient.connectAndGetDatabase()
  peopleDataSource = new PeopleDataSource(db)
  // TODO: Create test documents
})

afterAll(async () => {
  await getDbClient.close()
})

describe('create person', () => {
  it('returns an object', async () => {
    const actualResponse = await peopleDataSource.createPerson(siobhan)
    // TODO: Find out why expect.stringMatching does not work for _id property.
    expect(actualResponse).toMatchObject(siobhan)
  })
})

describe('get people', () => {
  beforeEach(async () => {
    await resetDatabase()
    await db.collection('people').insertMany([siobhan, elon])
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
