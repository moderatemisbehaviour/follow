const fs = require('fs')
const path = require('path')
const DatabaseClient = require('follow-database/src/DatabaseClient')
const resetDatabase = require('follow-database/src/resetDatabase')
const PeopleDataSource = require('./peopleDataSource')

let databaseClient
let db
let peopleDataSource
let elon
let siobhan

beforeAll(async () => {
  databaseClient = new DatabaseClient(process.env.MONGODB_URI)
  await databaseClient.connect()
  db = databaseClient.db
  peopleDataSource = new PeopleDataSource(db)
})

afterAll(async () => {
  await databaseClient.close()
})

beforeEach(async () => {
  await resetDatabase()
  siobhan = JSON.parse(
    fs.readFileSync(
      path.resolve(`${__dirname}/../../../cypress/fixtures/siobhan.json`),
      'utf8'
    )
  )
  elon = JSON.parse(
    fs.readFileSync(
      path.resolve(`${__dirname}/../../../cypress/fixtures/elon.json`),
      'utf8'
    )
  )
})

describe('create person', () => {
  describe('when the object is valid', () => {
    it('returns an object', async () => {
      const actualResponse = await peopleDataSource.createPerson(siobhan)
      await peopleDataSource.createPerson(siobhan)
      expect(actualResponse).toMatchObject(siobhan)
      expect(actualResponse.id).toMatch(/[\d\w]{24}/)
    })

    it.only('assigns the person a popularity', async () => {
      expect(siobhan.popularity).toBeFalsy()
      expect(elon.popularity).toBeFalsy()

      const updatedSiobhan = await peopleDataSource.createPerson(siobhan)
      const updatedElon = await peopleDataSource.createPerson(elon)

      expect(updatedSiobhan.popularity).toBe(1)
      expect(updatedElon.popularity).toBe(2)
    })
  })

  describe('when the object is invalid', () => {
    describe('because the person has no name', () => {
      it('should throw a validation error', async () => {
        const siobhanInvalid = { ...siobhan }
        delete siobhanInvalid.name
        await expect(
          peopleDataSource.createPerson(siobhanInvalid)
        ).rejects.toThrow(Error)
      })
    })

    describe('because there are no profiles', () => {
      it('should throw a validation error', async () => {
        const siobhanInvalid = { ...siobhan }
        delete siobhanInvalid.profiles
        await expect(
          peopleDataSource.createPerson(siobhanInvalid)
        ).rejects.toThrow(Error)
      })
    })

    describe('because one of the profiles is an empty string', () => {
      it('should throw a validation error', async () => {
        const siobhanInvalid = { ...siobhan }
        siobhanInvalid.profiles[0] = ''
        await expect(
          peopleDataSource.createPerson(siobhanInvalid)
        ).rejects.toThrow(Error)
      })
    })
  })
})

describe('get people', () => {
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

describe('edit person', () => {
  describe('when the object is valid', () => {
    it('returns an object', async () => {
      const peopleCollection = databaseClient.db.collection('people')
      const { insertedId } = await peopleCollection.insertOne({ ...siobhan })
      siobhan.name = 'Siob'

      const personReturned = await peopleDataSource.editPerson(
        insertedId,
        siobhan
      )

      expect(personReturned).toMatchObject(siobhan)
      const personInDatabase = await peopleCollection.findOne({
        _id: insertedId
      })
      expect(personInDatabase).toMatchObject(siobhan)
      expect(personInDatabase.name).toEqual('Siob')
    })
  })
})
