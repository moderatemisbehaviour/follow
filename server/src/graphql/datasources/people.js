const { DataSource } = require('apollo-datasource')

class PeopleDataSource extends DataSource {
  constructor (db) {
    super()
    this.db = db
  }

  // TODO: Use validated collection.
  async createPerson (person) {
    this.addPlatformToProfiles(person)
    const peopleCollection = this.db.collection('people')
    const result = await peopleCollection.insertOne(person)
    const insertedDocumentsWithIds = result.ops
    return insertedDocumentsWithIds
  }

  addPlatformToProfiles (person) {
    person.profiles[0].platform = 'TWITTER'
  }

  getPerson (id) {
    switch (id) {
      case '1':
        return {
          id,
          name: 'Siobhan Wilson',
          photo: 'https://pbs.twimg.com/profile_images/950898677991780353/7sbTf7Wl_400x400.jpg',
          profiles: [
            {
              id: 2,
              platform: 'TWITTER',
              url: 'https://twitter.com/siobhanisback'
            },
            {
              id: 3,
              platform: 'YOUTUBE',
              url: 'https://www.youtube.com/user/siobhanwilsonmusic'
            },
            {
              id: 4,
              platform: 'FACEBOOK',
              url: 'https://www.facebook.com/siobhanwilsonmusic'
            }
          ]
        }
      case '2':
        return {
          id,
          name: 'Elon Musk',
          photo: 'https://pbs.twimg.com/profile_images/972170159614906369/0o9cdCOp_400x400.jpg',
          profiles: [
            {
              id: 1,
              platform: 'TWITTER',
              url: 'https://twitter.com/elonmusk'
            }
          ]
        }
    }
  }

  getPeople () {
    return [
      {
        id: 1,
        name: 'Siobhan Wilson',
        profiles: [
          {
            id: 1,
            platform: 'TWITTER',
            url: 'https://twitter.com/siobhanisback'
          }
        ]
      },
      {
        id: 2,
        name: 'Elon Musk',
        profiles: [
          {
            id: 2,
            platform: 'TWITTER',
            url: 'https://twitter.com/elonmusk'
          }
        ]
      }
    ]
  }

  updateProfile () {
    return true
  }
}

module.exports = PeopleDataSource
